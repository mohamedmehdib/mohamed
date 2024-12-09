"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useServiceIndex } from "../../useServiceIndex";

const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

interface FormData {
  name: string;
  email: string;
  amount: number;
  service: number;
}

export default function Payment() {
  const { data: session } = useSession();
  const { serviceIndex, setServiceIndex } = useServiceIndex();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/services', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${STRAPI_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setServices(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    amount: 0,
    service: serviceIndex,
  });

  useEffect(() => {
    if (services.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: services[serviceIndex]?.price || 0,
      }));
    }
  }, [services, serviceIndex]);

  useEffect(() => {

      setFormData((prevFormData) => ({
        ...prevFormData,
        service: serviceIndex,
      }));

    }, [])
  

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/create-payment", formData);

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        console.error("Payment URL not found in response");
      }

      await axios.post('http://localhost:1337/api/histories', {
        data: formData
      }, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_KEY}`,
        },
      });

    } catch (err) {
      console.error("Error creating payment:", err);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Pay</button>
    </form>
  );
}
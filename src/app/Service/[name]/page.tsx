"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import BackButton from "../../BackButton";
import Accordion from "../Accordion";
import Footer from "../../Footer";
import Loading from "../../Loading";

const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

if (!STRAPI_API_KEY) {
  console.error("STRAPI_API_KEY is not defined. Check your environment variables.");
}

interface FormData {
  name: string;
  email: string;
  amount: number;
  service: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
}

export default function Payment({ params }: { params: Promise<{ name: string }> }) {
  const router = useRouter(); // Initialize the router
  const { data: session } = useSession();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ name: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    amount: 0,
    service: "",
  });

  const handleError = () => {

  
    router.push(`/error?message=An unexpected error occurred. Please try again later.`);
  };
  

  useEffect(() => {
    setMounted(true);

    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch (err) {
        handleError();
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/services", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${STRAPI_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch services. Please try again later.");
        }

        const data = await response.json();
        setServices(data.data);
      } catch (err: any) {
        handleError();
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (services.length > 0 && resolvedParams) {
      const matchedService = services.find(
        (service) => service.name === resolvedParams.name
      );
      if (matchedService) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          amount: matchedService.price || 0,
          service: matchedService.name,
        }));
      }
    }
  }, [services, resolvedParams]);

  useEffect(() => {
    if (session?.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: session.user?.name || "",
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  if (!mounted || !resolvedParams) {
    return null;
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session) {
      window.location.href = "./Profile";
      return;
    }

    try {
      const response = await axios.post<{ paymentUrl: string }>("http://localhost:5000/api/create-payment", formData);

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        handleError();
      }
    } catch (err: any) {
      handleError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-300 text-zinc-600">
      <BackButton />
      <h1 className="text-center py-10 text-5xl">
        {resolvedParams.name || "Loading service name..."}
      </h1>
      <div className="mx-auto w-2/3 rounded-lg">
        <Accordion
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
        <Accordion
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
        <Accordion
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        />
      </div>

      <div className="flex justify-center">
        <button
          className="p-5 rounded-2xl w-fit my-10 bg-zinc-600 text-gray-300"
          type="submit"
        >
          Reserve session {formData.amount || "N/A"}dt
        </button>
      </div>
      <Footer />
    </form>
  );
}

import { useState, useEffect } from 'react';
import Loading from '../Loading';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Our Services</h1>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service.name}
          <br />
          {service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;

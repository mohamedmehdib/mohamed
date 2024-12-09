"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useServiceIndex } from './useServiceIndex';

import { Red_Hat_Display } from 'next/font/google';
import Loading from './Loading';
const red_hat = Red_Hat_Display({ subsets: ['latin'], weight: '500' });

const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

export default function Services() {
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

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div>
      <Loading/>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-gray-300 text-gray-800 py-5 md:py-10'>
      <h1 className={'text-center py-14 md:py-20 text-5xl ' + red_hat.className}>My Services</h1>
      
      <div className='md:flex justify-around'>
        {services.length > 0 ? (
          services.map((item, index) => (
            <div key={index} className='shadow-2xl shadow-gray-500 p-6 mx-5 md:mx-0 md:w-1/4 space-y-10 md:hover:scale-125 duration-500 rounded-lg'>
              <h1 className='text-3xl'>{item.name}</h1>
              <p>{item.description}</p>
              <button onClick={() => setServiceIndex(index)}>
                <Link href={"./Service/"+item.name} className='mt-4 bg-gray-500 px-6 py-3 rounded-lg'>
                  Select
                </Link>
              </button>
            </div>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import Loading from "../Loading";

const STRAPI_API_URL = "http://localhost:1337/api/histories";
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const SuccessPage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-payment-data", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          await postDataToStrapi(result);
        } else {
          console.error("Failed to fetch payment data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    interface Payment {
      name: string;
      email: string;
      amount: number;
      service: string;
    }
    
    const postDataToStrapi = async (paymentData: Record<string, Payment>) => {
      try {
        const entries = Object.entries(paymentData);
    
        for (const [email, payment] of entries) {
          const checkResponse = await fetch(`${STRAPI_API_URL}?filters[name]=${payment.name}&filters[amount]=${payment.amount}&filters[service]=${payment.service}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${STRAPI_API_KEY}`,
            },
          });
    
          if (!checkResponse.ok) {
            const errorText = await checkResponse.text();
            console.error(`Failed to check for duplicate entry for ${payment.name}:`, errorText);
            continue;
          }
    
          const checkData = await checkResponse.json();
          if (checkData.data && checkData.data.length > 0) {
            continue;
          }
    
          const postResponse = await fetch(STRAPI_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${STRAPI_API_KEY}`,
            },
            body: JSON.stringify({
              data: {
                name: payment.name,
                email: payment.email,
                amount: payment.amount,
                service: payment.service,
              },
            }),
          });
    
          if (!postResponse.ok) {
            const errorText = await postResponse.text();
            console.error(`Failed to post to Strapi for ${payment.name}:`, errorText);
          } else {
            const responseData = await postResponse.json();
          }
        }
      } catch (error) {
        console.error("Error posting data to Strapi:", error);
      }
    };
    
    fetchPaymentData();
  }, []);

  if (!data) return <div><Loading /></div>;

  return (
    <div>
      <BackButton />
      <div className="bg-gray-300 text-zinc-600 min-h-screen flex justify-center items-center p-4">
        <span className="text-center">
          <i className="text-5xl sm:text-6xl md:text-7xl uil uil-check-circle"></i>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-4">The payment success</h1>
        </span>
      </div>
    </div>
  );
};

export default SuccessPage;

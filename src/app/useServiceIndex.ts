"use client"
import { useState, useEffect } from 'react';

export const useServiceIndex = () => {
  const [serviceIndex, setServiceIndex] = useState<number>(-1);

  useEffect(() => {
    const storedIndex = localStorage.getItem('serviceIndex');
    if (storedIndex) {
      setServiceIndex(Number(storedIndex));
    }
  }, []);

  const updateServiceIndex = (index: number) => {
    setServiceIndex(index);
    localStorage.setItem('serviceIndex', String(index));
  };

  return { serviceIndex, setServiceIndex: updateServiceIndex };
};





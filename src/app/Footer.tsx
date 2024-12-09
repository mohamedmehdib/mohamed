"use client"
import { useEffect, useState } from 'react';
import { Ms_Madi} from 'next/font/google';

const l = Ms_Madi({subsets: ['latin'],weight:'400'}) ;

export default function Footer() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    setFontLoaded(true);
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <div className="text-center border-t-2 border-gray-500 py-10 space-y-14 bg-zinc-300 text-gray-600">
      <div className={l.className + " text-6xl md:text-8xl"}>
        Mohamed Gharieni
      </div>
      <ul className="text-3xl md:text-4xl space-x-5">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="hover:text-blue-700 duration-300 uil uil-facebook"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="hover:text-purple-700 duration-300 uil uil-instagram"></i>
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <i className="hover:text-green-700 duration-300 uil uil-whatsapp"></i>
        </a>
      </ul>
      <div>
        Copyrights Ⓒ 2024 . All rights reserved
      </div>
    </div>
  );
}

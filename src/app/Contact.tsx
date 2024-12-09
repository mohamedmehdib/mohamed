"use client"
import React, { useRef, useState } from 'react';

const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch('http://localhost:1337/api/contacts', { // Ensure the correct endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_API_KEY}`,
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred.');
    }
  };

  const inputName = useRef<HTMLInputElement>(null);
  const inputMail = useRef<HTMLInputElement>(null);
  const inputMessage = useRef<HTMLTextAreaElement>(null);

  const clear = () => {
    if (inputName.current) inputName.current.value = '';
    if (inputMail.current) inputMail.current.value = '';
    if (inputMessage.current) inputMessage.current.value = '';
  };

  return (
    <div id="contact" className="text-zinc-600 bg-gray-300 py-5">
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
      />
      <div className="text-center text-3xl md:text-5xl md:py-10">Contact Us!</div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-1/2 my-auto px-10 md:space-y-2">
          <div className="flex text-left text-lg md:text-xl items-center space-x-3">
            <i className="p-5 rounded-full text-3xl md:text-4xl uil uil-map-marker"></i>
            <p>Tunisia, Sousse, Sahloul</p>
          </div>
          <div className="flex text-left text-lg md:text-xl items-center space-x-3">
            <i className="p-5 rounded-full text-3xl md:text-4xl uil uil-phone"></i>
            <p>55 555 555</p>
          </div>
          <div className="flex text-left text-lg md:text-xl items-center space-x-3">
            <i className="p-5 rounded-full text-3xl md:text-4xl uil uil-mailbox"></i>
            <p>contact@gmail.com</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 space-y-5 p-4 md:p-12">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            ref={inputName}
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3"
            placeholder="Enter your name ..."
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            ref={inputMail}
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3"
            placeholder="Enter your email ..."
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            ref={inputMessage}
            className="placeholder:text-gray-600 resize-none outline-none border-2 border-gray-600 bg-zinc-300 rounded-xl text-lg md:text-xl p-2 md:p-3 h-60"
            placeholder="Enter your message ..."
          />
          <button
            className="rounded-xl bg-gray-600 text-zinc-300 w-16 md:w-20 h-10 md:h-14 hover:scale-125 duration-300"
            type='submit'
          >
            Send
          </button>
        </form>
      </div>
      {status && <div className="text-center mt-4 text-lg md:text-xl">{status}</div>}
    </div>
  );
};

export default Contact;

"use client";
import React, { useState, ReactNode } from "react";

interface AccordionProps {
  title: string;
  answer: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="my-5 text-zinc-700 bg-gray-400 p-4 rounded-xl">
      <div
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full py-5 cursor-pointer"
      >
        <span>{title}</span>
        <svg
          className="fill-zinc-600 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-zinc-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;

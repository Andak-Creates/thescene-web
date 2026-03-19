"use client";

import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border border-theme-border rounded-xl bg-theme-surface overflow-hidden transition-all duration-300">
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="font-heading font-semibold text-white text-lg">{question}</span>
        <svg 
          className={`w-5 h-5 text-theme-purple transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-5 border-t border-theme-border opacity-100' : 'max-h-0 py-0 opacity-0'}`}
      >
        <p className="text-theme-muted flex-grow">
          {answer}
        </p>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { question: string; answer: string }[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem 
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default Accordion;

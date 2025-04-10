'use client';

import React, { useEffect, useRef, useState, JSX } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface FAQItemProps {
  question: string;
  answer: string | JSX.Element;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div
      className="border-2 rounded-lg overflow-hidden cursor-pointer hover:bg-primary-100"
      role="button"
      onClick={handleToggle}
    >
      <div className="px-8 py-4 w-full flex justify-between">
        <p className="text-lg font-semibold text-primary-default flex gap-2 items-center">
          <span className="text-3xl">&#x2758;</span>
          {question}
        </p>
        <button onClick={handleToggle}>
          <FaChevronDown
            className={`transform transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <p className="px-8 py-4 w-full bg-gray-200 text-primary-400 font-medium">
          {answer}
        </p>
      </div>
    </div>
  );
}

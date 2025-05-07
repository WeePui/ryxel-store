'use client';

import { JSX, useRef, useState, useEffect } from 'react';

interface TooltipProps {
  text: string;
  button: JSX.Element;
}

export default function Tooltip({ text, button }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState('bottom');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Check bottom edge
      if (containerRect.bottom + tooltipRect.height > window.innerHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }

      // Check right edge
      if (tooltipRect.right > window.innerWidth) {
        tooltipRef.current.style.left = 'auto';
        tooltipRef.current.style.right = '0';
      }
    }
  }, [isVisible]);

  return (
    <div
      className="relative w-fit"
      ref={containerRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {button}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute ${
            position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
          } bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10`}
        >
          {text}
          <div
            className={`absolute ${
              position === 'bottom'
                ? 'top-0 -translate-y-1/2'
                : 'bottom-0 translate-y-1/2'
            } left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45`}
          ></div>
        </div>
      )}
    </div>
  );
}

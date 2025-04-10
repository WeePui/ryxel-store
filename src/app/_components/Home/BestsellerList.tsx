'use client';

import { Product } from '@/app/_types/product';
import BestsellerItem from './BestsellerItem';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface BestsellerListProps {
  products: Product[];
}

export default function BestsellerList({ products }: BestsellerListProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const roundedScrollLeft = Math.round(scrollLeft);
      const roundedMaxScroll = Math.round(scrollWidth - clientWidth);

      setCanScrollLeft(roundedScrollLeft > 0);
      setCanScrollRight(roundedScrollLeft < roundedMaxScroll);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = containerRef.current;
    container?.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container?.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current && containerRef.current.firstChild) {
      const cardWidth =
        (containerRef.current.firstChild as HTMLElement).offsetWidth + 100;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Nút trái */}
      {canScrollLeft && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={() => scroll('left')}
            className="p-4 text-xl bg-gray-100 rounded-full hover:bg-gray-400 shadow-sm"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Nút phải */}
      {canScrollRight && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={() => scroll('right')}
            className="p-4 text-xl bg-gray-100 rounded-full hover:bg-gray-400 shadow-sm"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Overlay gradient trái */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
      )}

      {/* Overlay gradient phải */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />
      )}

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 py-4 snap-x snap-mandatory snap-start"
      >
        {products.map((product) => (
          <div key={product._id}>
            <BestsellerItem item={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

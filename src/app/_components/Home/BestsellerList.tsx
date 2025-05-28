"use client";

import { Product } from "@/app/_types/product";
import BestsellerItem from "./BestsellerItem";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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
    container?.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container?.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current && containerRef.current.firstChild) {
      const cardWidth =
        (containerRef.current.firstChild as HTMLElement).offsetWidth + 100;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Nút trái */}
      {canScrollLeft && (
        <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("left")}
            className="rounded-full bg-gray-100 p-4 text-xl shadow-sm hover:bg-gray-400"
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Nút phải */}
      {canScrollRight && (
        <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("right")}
            className="rounded-full bg-gray-100 p-4 text-xl shadow-sm hover:bg-gray-400"
          >
            <FaChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Overlay gradient trái */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white/80 to-transparent" />
      )}

      {/* Overlay gradient phải */}
      {canScrollRight && (
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white/80 to-transparent" />
      )}

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory snap-start gap-6 overflow-x-auto scroll-smooth px-2 py-4 scrollbar-hide"
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

"use client";

import { Product } from "@/app/_types/product";
import BestsellerItem from "./BestsellerItem";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

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
      {" "}
      {/* Nút trái */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => scroll("left")}
              className="rounded-full bg-gray-100 p-4 text-xl shadow-sm"
              whileHover={{
                backgroundColor: "rgb(156 163 175)",
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChevronLeft className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Nút phải */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => scroll("right")}
              className="rounded-full bg-gray-100 p-4 text-xl shadow-sm"
              whileHover={{
                backgroundColor: "rgb(156 163 175)",
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChevronRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>{" "}
      {/* Overlay gradient trái */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      {/* Overlay gradient phải */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>{" "}
      <motion.div
        ref={containerRef}
        className="flex snap-x snap-mandatory snap-start gap-6 overflow-x-auto scroll-smooth px-2 py-4 scrollbar-hide"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1, // Staggered animation
              type: "spring",
              stiffness: 100,
            }}
          >
            <BestsellerItem item={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

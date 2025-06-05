"use client";

import { Product } from "@/app/_types/product";
import ProductCard from "../Products/ProductCard";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface RecommendedProductsProps {
  products: Product[];
  title?: string;
}

export default function RecommendedProducts({
  products,
  title,
}: RecommendedProductsProps) {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  // Handle effect for scroll events
  useEffect(() => {
    // Early return if products is undefined or empty
    if (!products || products.length === 0) return;

    const scrollContainer = scrollContainerRef.current;

    // Initial check for button visibility
    setTimeout(handleScroll, 100); // Small delay to ensure content is rendered

    // Add scroll event listener
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    // Check button visibility after images load
    const onLoadHandler = () => setTimeout(handleScroll, 200);
    window.addEventListener("load", onLoadHandler);

    // Cleanup
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("load", onLoadHandler);
    };
  }, [products]); // Use products object as dependency

  if (!products || products.length === 0) return null;

  // If title is provided, use it directly, otherwise use a default translation
  const displayTitle = title ? t(title) : t("products.recommendedProducts");

  // Calculate scroll amount based on container width for better UX
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      // Scroll by roughly the width of 2 products for a better UX
      const cardWidth = 250; // Approximate width of a product card including margins
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth * 2),
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      // Scroll by roughly the width of 2 products for a better UX
      const cardWidth = 250; // Approximate width of a product card including margins
      scrollContainerRef.current.scrollBy({
        left: cardWidth * 2,
        behavior: "smooth",
      });
    }
  };

  // Handle scroll events to show/hide buttons appropriately
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // Show left button if we're not at the beginning
      setShowLeftButton(scrollLeft > 0);

      // Show right button if we're not at the end
      setShowRightButton(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  return (
    <motion.div
      className="mx-auto w-full max-w-7xl px-4 py-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="mb-6 text-2xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {displayTitle}
      </motion.h2>

      <div className="relative">
        <motion.div
          className="overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          ref={scrollContainerRef}
        >
          <div className="flex h-full w-max gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="h-full px-2 pt-4"
              >
                <div className="flex h-full">
                  <ProductCard product={product} size="compact" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll buttons (visible only on desktop) */}
        <AnimatePresence>
          {showLeftButton && (
            <motion.button
              className="absolute left-0 top-1/2 z-10 flex -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-4 shadow-md hover:shadow-lg md:hidden"
              onClick={handleScrollLeft}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: -8 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f5f5f5",
                color: "#3a5697",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <FaChevronLeft className="text-primary-default" />
            </motion.button>
          )}

          {showRightButton && (
            <motion.button
              className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 translate-x-2 items-center justify-center rounded-full bg-white p-4 shadow-md hover:shadow-lg md:hidden"
              onClick={handleScrollRight}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 8 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f5f5f5",
                color: "#3a5697",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <FaChevronRight className="text-primary-default" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

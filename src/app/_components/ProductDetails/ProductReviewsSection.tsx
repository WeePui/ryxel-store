"use client";

import { Review } from "@/app/_types/review";
import React from "react";
import ReviewList from "./ReviewList";
import ReviewOverview from "./ReviewOverview";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

interface ProductReviewsSectionProps {
  reviews: Array<Review>;
}

export default function ProductReviewsSection({
  reviews,
}: ProductReviewsSectionProps) {
  const [selectedRating, setSelectedRating] = React.useState(0);
  const { t } = useLanguage();

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  return (
    <motion.section
      className="mx-auto mt-16 flex w-full max-w-7xl flex-col bg-secondary-50 p-4 lg:mt-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="mb-8 text-2xl font-semibold text-primary-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("products.reviews.title")}
      </motion.h2>
      <div className="flex w-full gap-4 lg:flex-col lg:gap-8">
        <motion.div
          className="sticky top-0 h-fit w-full max-w-md flex-[3] self-start rounded-lg px-4 py-3 shadow-md lg:static lg:self-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <ReviewOverview onSelectRating={handleRatingSelect} />
        </motion.div>
        <motion.div
          className="w-full flex-[7]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <ReviewList reviews={reviews} selectedRating={selectedRating} />
        </motion.div>
      </div>
    </motion.section>
  );
}

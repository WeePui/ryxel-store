"use client";

import { Review } from "@/app/_types/review";
import React from "react";
import ReviewList from "./ReviewList";
import ReviewOverview from "./ReviewOverview";
import { useLanguage } from "@/app/_contexts/LanguageContext";

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
    <section className="mx-auto mt-16 flex w-full max-w-7xl flex-col bg-secondary-50 p-4 lg:mt-2">
      <h2 className="mb-8 text-2xl font-semibold text-primary-500">
        {t("products.reviews.title")}
      </h2>
      <div className="flex w-full gap-4 lg:flex-col lg:gap-8">
        <div className="sticky top-0 h-fit w-full max-w-md flex-[3] self-start rounded-lg px-4 py-3 shadow-md lg:self-center">
          <ReviewOverview onSelectRating={handleRatingSelect} />
        </div>
        <div className="w-full flex-[7]">
          <ReviewList reviews={reviews} selectedRating={selectedRating} />
        </div>
      </div>
    </section>
  );
}

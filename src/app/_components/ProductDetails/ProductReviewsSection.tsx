'use client';

import { Review } from '@/app/_types/review';
import React from 'react';
import ReviewList from './ReviewList';
import ReviewOverview from './ReviewOverview';

interface ProductReviewsSectionProps {
  reviews: Array<Review>;
}

export default function ProductReviewsSection({
  reviews,
}: ProductReviewsSectionProps) {
  const [selectedRating, setSelectedRating] = React.useState(0);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  return (
    <section className="mt-16 flex flex-col w-full mx-auto max-w-7xl bg-secondary-50 p-4">
      <h2 className="text-2xl font-semibold text-primary-500 mb-8">
        Đánh giá sản phẩm
      </h2>
      <div className="flex">
        <div className="flex-[3] shadow-md px-4 py-3 rounded-lg h-fit sticky top-0">
          <ReviewOverview onSelectRating={handleRatingSelect} />
        </div>
        <div className="flex-[7]">
          <ReviewList reviews={reviews} selectedRating={selectedRating} />
        </div>
      </div>
    </section>
  );
}

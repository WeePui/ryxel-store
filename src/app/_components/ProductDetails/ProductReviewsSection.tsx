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
    <section className="mt-16 lg:mt-2 flex flex-col w-full mx-auto max-w-7xl bg-secondary-50 p-4">
      <h2 className="text-2xl font-semibold text-primary-500 mb-8">
        Đánh giá sản phẩm
      </h2>
      <div className="flex lg:flex-col lg:gap-8 gap-4 w-full">
        <div className="flex-[3] shadow-md px-4 py-3 rounded-lg lg:self-center h-fit sticky top-0 max-w-md w-full self-start">
          <ReviewOverview onSelectRating={handleRatingSelect} />
        </div>
        <div className="flex-[7] w-full">
          <ReviewList reviews={reviews} selectedRating={selectedRating} />
        </div>
      </div>
    </section>
  );
}

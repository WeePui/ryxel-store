'use client';

import { useProductDetail } from '@/app/_contexts/ProductDetailContext';
import { useMemo, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa6';

interface ReviewOverviewProps {
  onSelectRating: (rating: number) => void;
}

export default function ReviewOverview({
  onSelectRating,
}: ReviewOverviewProps) {
  const [, setSelectedRating] = useState(0);
  const { product } = useProductDetail();
  const ratingCount = useMemo(() => {
    const counter = Array.from({ length: 5 }, (_, i) => {
      return product.reviews.filter((review) => review.rating === i + 1).length;
    });
    return counter;
  }, [product.reviews]);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    onSelectRating(rating);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 lg:gap-0">
      <div className="flex gap-4 items-center ">
        <h3 className="text-[94px] font-title lg:text-[56px] text-primary-500 flex items-center gap-2">
          {product.rating}
        </h3>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            {Array.from({ length: Math.ceil(product.rating) }, (_, i) => (
              <span key={i} className="text-yellow-500 text-xl lg:text-lg">
                <FaStar />
              </span>
            ))}
            {Array.from({ length: 5 - product.rating }, (_, i) => (
              <span key={i} className="text-gray-300 text-xl lg:text-lg">
                <FaRegStar />
              </span>
            ))}
          </div>
          <p className="text-gray-400">{product.ratingsQuantity} đánh giá</p>
        </div>
      </div>
      <div className="flex flex-col w-full px-4 gap-2 lg:px-2 lg:gap-1">
        {product.reviews.length > 0 &&
          Array.from({ length: 5 }, (_, i) => {
            return (
              <RatingProgressBar
                key={i}
                rating={5 - i}
                count={ratingCount[5 - i - 1]}
                total={product.ratingsQuantity}
                onSelectRating={handleRatingSelect}
              />
            );
          })}
        <div
          className="flex justify-between mb-1 mt-3 text-center self-center hover:opacity-70 transition-all duration-300 hover:border-b-[1px] hover:border-primary-default dark:hover:border-white"
          role="button"
          onClick={() => handleRatingSelect(0)}
        >
          <span className="text-sm font-medium lg:text-xs text-primary-default dark:text-white ">
            (Xem tất cả đánh giá)
          </span>
        </div>
      </div>
    </div>
  );
}

interface RatingProgressBarProps {
  rating: number;
  count: number;
  total: number;
  onSelectRating: (rating: number) => void;
}

function RatingProgressBar({
  rating,
  count,
  total,
  onSelectRating,
}: RatingProgressBarProps) {
  const percentage = (count / total) * 100;

  const handleSelectRating = (rating: number) => {
    onSelectRating(rating);
  };

  return (
    <div
      onClick={count > 0 ? () => handleSelectRating(rating) : undefined}
      className="cursor-pointer hover:opacity-70 transition-all hover:scale-105 duration-300"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm lg:text-xs font-medium text-primary-default dark:text-white">
          {rating} sao
        </span>
        <span className="text-sm lg:text-xs font-medium text-primary-default dark:text-white">
          {count}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-primary-default h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

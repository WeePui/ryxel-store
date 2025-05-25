"use client";

import { useProductDetail } from "@/app/_contexts/ProductDetailContext";
import { useMemo, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface ReviewOverviewProps {
  onSelectRating: (rating: number) => void;
}

export default function ReviewOverview({
  onSelectRating,
}: ReviewOverviewProps) {
  const [, setSelectedRating] = useState(0);
  const { product } = useProductDetail();
  const { t } = useLanguage();
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
      <div className="flex items-center gap-4">
        <h3 className="flex items-center gap-2 font-title text-[94px] text-primary-500 lg:text-[56px]">
          {product.rating}
        </h3>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            {Array.from({ length: Math.ceil(product.rating) }, (_, i) => (
              <span key={i} className="text-xl text-yellow-500 lg:text-lg">
                <FaStar />
              </span>
            ))}
            {Array.from({ length: 5 - product.rating }, (_, i) => (
              <span key={i} className="text-xl text-gray-300 lg:text-lg">
                <FaRegStar />
              </span>
            ))}{" "}
          </div>
          <p className="text-gray-400">
            {product.ratingsQuantity} {t("products.reviews.ratings")}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 px-4 lg:gap-1 lg:px-2">
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
          })}{" "}
        <div
          className="mb-1 mt-3 flex justify-between self-center text-center transition-all duration-300 hover:border-b-[1px] hover:border-primary-default hover:opacity-70 dark:hover:border-white"
          role="button"
          onClick={() => handleRatingSelect(0)}
        >
          <span className="text-sm font-medium text-primary-default lg:text-xs dark:text-white">
            ({t("products.reviews.allRatings")})
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
  const { t } = useLanguage();

  const handleSelectRating = (rating: number) => {
    onSelectRating(rating);
  };

  return (
    <div
      onClick={count > 0 ? () => handleSelectRating(rating) : undefined}
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-70"
    >
      <div className="mb-1 flex justify-between">
        <span className="text-sm font-medium text-primary-default lg:text-xs dark:text-white">
          {rating} {t("products.reviews.stars")}
        </span>
        <span className="text-sm font-medium text-primary-default lg:text-xs dark:text-white">
          {count}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2.5 rounded-full bg-primary-default"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

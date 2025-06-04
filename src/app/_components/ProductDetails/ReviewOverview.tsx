"use client";

import { useProductDetail } from "@/app/_contexts/ProductDetailContext";
import { useMemo, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

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
    <motion.div
      className="flex flex-col items-center justify-center gap-2 lg:gap-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.h3
          className="flex items-center gap-2 font-title text-[94px] text-primary-500 lg:text-[56px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {product.rating}
        </motion.h3>
        <div className="flex flex-col gap-1">
          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {Array.from({ length: Math.ceil(product.rating) }, (_, i) => (
              <motion.span
                key={i}
                className="text-xl text-yellow-500 lg:text-lg"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              >
                <FaStar />
              </motion.span>
            ))}
            {Array.from({ length: 5 - Math.ceil(product.rating) }, (_, i) => (
              <motion.span
                key={i}
                className="text-xl text-gray-300 lg:text-lg"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + (Math.ceil(product.rating) + i) * 0.1,
                }}
              >
                <FaRegStar />
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {product.ratingsQuantity} {t("products.reviews.ratings")}
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        className="flex w-full flex-col gap-2 px-4 lg:gap-1 lg:px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
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
        <motion.div
          className="mb-1 mt-3 flex justify-between self-center text-center transition-all duration-300 hover:border-b-[1px] hover:border-primary-default hover:opacity-70"
          role="button"
          onClick={() => handleRatingSelect(0)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm font-medium text-primary-default lg:text-xs">
            ({t("products.reviews.allRatings")})
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
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
    <motion.div
      onClick={count > 0 ? () => handleSelectRating(rating) : undefined}
      className={`cursor-pointer transition-all duration-300 ${
        count > 0 ? "hover:scale-105 hover:opacity-70" : ""
      }`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.6 + (5 - rating) * 0.1 }}
    >
      <div className="mb-1 flex justify-between">
        <span className="text-sm font-medium text-primary-default lg:text-xs">
          {rating} {t("products.reviews.stars")}
        </span>
        <span className="text-sm font-medium text-primary-default lg:text-xs">
          {count}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <motion.div
          className="h-2.5 rounded-full bg-primary-default"
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.7 + (5 - rating) * 0.1 }}
        ></motion.div>
      </div>
    </motion.div>
  );
}

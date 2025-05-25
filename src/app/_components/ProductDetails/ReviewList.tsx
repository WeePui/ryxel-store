"use client";

import { Review } from "@/app/_types/review";
import React, { useEffect } from "react";
import ReviewItem from "./ReviewItem";
import Button from "../UI/Button";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

const REVIEWS_PER_PAGE = 5;

// const blindReview = {
//   _id: 'blind-review',
//   review:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   rating: 5,
//   user: {
//     name: 'Nguyễn Văn A',
//     photo: {
//       url: '/dev-users/super-tester.jpg',
//     },
//   },
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
// };

interface ReviewListProps {
  reviews: Array<Review>;
  selectedRating: number;
}

export default function ReviewList({
  reviews,
  selectedRating,
}: ReviewListProps) {
  const [loadmore, setLoadmore] = React.useState(REVIEWS_PER_PAGE);
  const { t } = useLanguage();
  const handleLoadmore = () => {
    setLoadmore((prev) => prev + REVIEWS_PER_PAGE);
  };

  useEffect(() => {
    setLoadmore(REVIEWS_PER_PAGE);
  }, [selectedRating]);

  const filteredReviews =
    selectedRating > 0
      ? reviews.filter((review) => review.rating === selectedRating)
      : reviews;
  if (filteredReviews.length === 0) {
    return (
      <motion.p
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {t("products.reviews.noReviews")}
      </motion.p>
    );
  }

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {filteredReviews.slice(0, loadmore).map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
      {/* <ReviewItem key={blindReview.user.name} review={blindReview} /> */}{" "}
      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {loadmore < filteredReviews.length && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={handleLoadmore} size="small">
              {t("products.reviews.showMore")}
            </Button>
          </motion.div>
        )}
        {loadmore > REVIEWS_PER_PAGE && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              onClick={() => setLoadmore(REVIEWS_PER_PAGE)}
              size="small"
            >
              {t("products.reviews.showLess")}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

'use client';

import { Review } from '@/app/_types/review';
import React, { useEffect } from 'react';
import ReviewItem from './ReviewItem';
import Button from '../UI/Button';

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
    return <p className="text-center">Sản phẩm này chưa được đánh giá.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {filteredReviews.slice(0, loadmore).map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
      {/* <ReviewItem key={blindReview.user.name} review={blindReview} /> */}
      <div className="flex justify-center gap-4">
        {loadmore < filteredReviews.length && (
          <Button onClick={handleLoadmore} size="small">
            Hiển thị thêm
          </Button>
        )}
        {loadmore > REVIEWS_PER_PAGE && (
          <Button
            type="secondary"
            onClick={() => setLoadmore(REVIEWS_PER_PAGE)}
            size="small"
          >
            Thu gọn
          </Button>
        )}
      </div>
    </div>
  );
}

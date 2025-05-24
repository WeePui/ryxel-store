"use client";

import { Order } from "@/app/_types/order";
import OrderReviewItem from "./OrderReviewItem";
import { useCallback, useState, useTransition } from "react";
import { ReviewInput } from "@/app/_types/validateInput";
import Button from "../UI/Button";
import { createReviewsByOrderAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";

interface FormReviewOrderProps {
  order: Order;
  closeModal?: () => void;
}

export default function FormReviewOrder({
  order,
  closeModal,
}: FormReviewOrderProps) {
  const [isPending, startTransition] = useTransition();
  const [reviews, setReviews] = useState<ReviewInput[]>([]);

  const handleReviewUpdate = useCallback(
    (index: number, review: ReviewInput) => {
      setReviews((prev) => {
        const newReviews = [...prev];
        newReviews[index] = review;
        return newReviews;
      });
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await createReviewsByOrderAction(order._id, reviews);
      if (result.errors) {
        toast.error(result.errors.message);
        return;
      }

      toast.success("Đánh giá của bạn đã được chúng tôi ghi nhận!");
      if (closeModal) {
        closeModal();
      }
    });
  };

  return (
    <form className="w-[600px] max-w-3xl md:max-w-full" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-title text-2xl">Đánh giá sản phẩm</h1>
      <div className="flex flex-col gap-6">
        {order.lineItems.map((item, index) => (
          <OrderReviewItem
            key={index}
            lineItem={item}
            onReviewUpdate={(review) => {
              handleReviewUpdate(index, review as ReviewInput);
            }}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button role="submit" loading={isPending} fullWidth>
          Gửi đánh giá
        </Button>
      </div>
    </form>
  );
}

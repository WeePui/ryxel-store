import { Order } from "@/app/_types/order";
import { useCallback, useState, useTransition } from "react";
import OrderReviewItem from "./OrderReviewItem";
import Button from "../UI/Button";
import { ReviewUpdateInput } from "@/app/_types/validateInput";
import { updateReviewsByOrderAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import { Variant } from "@/app/_types/variant";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface FormUpdateReviewProps {
  order: Order;
  closeModal: () => void;
}

export default function FormUpdateReview({
  order,
  closeModal,
}: FormUpdateReviewProps) {
  const [isPending, startTransition] = useTransition();
  const [isUpdating, setIsUpdating] = useState(false);
  const { t } = useLanguage();

  // Filter lineItems to only include those that have a review
  const reviewedLineItems = order.lineItems.filter((item) => !!item.review);

  const [reviews, setReviews] = useState<Array<ReviewUpdateInput>>(
    reviewedLineItems.map((item) => {
      return {
        _id: item.review!._id, // item.review is now guaranteed to exist
        rating: item.review!.rating,
        review: item.review!.review,
        images: item.review!.images || [],
        video: item.review!.video || null,
      };
    }),
  );

  const handleReviewUpdate = useCallback(
    (_id: string, reviewData: ReviewUpdateInput) => {
      setReviews((prev) =>
        prev.map((r) => (r._id === _id ? { ...reviewData, _id } : r)),
      );
    },
    [],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      await updateReviewsByOrderAction(order._id, reviews);
      closeModal();
      toast.success(t("orders.review.success.update"));
    });
  }

  const updatable =
    order.reviewCount < 2 &&
    new Date(order.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
  return (
    <form className="w-[600px] max-w-3xl md:max-w-full" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-title text-2xl">{t("orders.review.title")}</h1>
      <div className="flex flex-col gap-6">
        {reviewedLineItems.map((item) => (
          <OrderReviewItem
            key={(item.variant as Variant)?._id || (item.variant as string)}
            lineItem={item}
            reviewItem={item.review!} // item.review is now guaranteed to exist
            updatable={updatable}
            onReviewUpdate={(reviewData) => {
              handleReviewUpdate(
                item.review!._id,
                reviewData as unknown as ReviewUpdateInput,
              );
            }}
            setIsUpdating={setIsUpdating}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        {!isUpdating ? (
          <Button onClick={closeModal}>
            {t("orders.review.confirmButton")}
          </Button>
        ) : (
          <Button role="submit" loading={isPending}>
            {t("orders.review.updateButton")}
          </Button>
        )}
      </div>
    </form>
  );
}

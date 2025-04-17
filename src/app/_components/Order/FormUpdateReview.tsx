import { Order } from '@/app/_types/order';
import { useCallback, useState, useTransition } from 'react';
import OrderReviewItem from './OrderReviewItem';
import Spinner from '../UI/Spinner';
import Button from '../UI/Button';
import { ReviewUpdateInput } from '@/app/_types/validateInput';
import { updateReviewsByOrderAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';

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
  const [reviews, setReviews] = useState<Array<ReviewUpdateInput>>(
    order.lineItems.map((item) => {
      return {
        _id: item.review!._id,
        rating: item.review!.rating,
        review: item.review!.review,
        images: item.review!.images || [],
        video: item.review!.video || null,
      };
    })
  );

  const handleReviewUpdate = useCallback(
    (_id: string, review: ReviewUpdateInput) => {
      setReviews((prev) =>
        prev.map((r) => (r._id === _id ? { ...review, _id } : r))
      );
    },
    []
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      await updateReviewsByOrderAction(order._id, reviews);
      closeModal();
      toast.success('Cập nhật đánh giá thành công!');
    });

    console.log(reviews);
  }

  const updatable =
    order.reviewCount < 2 &&
    new Date(order.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

  return (
    <form className="max-w-3xl w-[600px] md:max-w-full" onSubmit={handleSubmit}>
      <h1 className="font-title text-2xl mb-6">Đánh giá sản phẩm</h1>
      <div className="flex flex-col gap-6">
        {order.lineItems.map((item, index) => (
          <OrderReviewItem
            key={index}
            lineItem={item}
            reviewItem={item.review!}
            updatable={updatable}
            onReviewUpdate={(review) => {
              handleReviewUpdate(item.review!._id, review as ReviewUpdateInput);
            }}
            setIsUpdating={setIsUpdating}
          />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        {!isUpdating ? (
          <Button onClick={closeModal}>Xác nhận</Button>
        ) : (
          <Button role="submit" disabled={isPending}>
            {isPending ? <Spinner /> : 'Gửi đánh giá'}
          </Button>
        )}
      </div>
    </form>
  );
}

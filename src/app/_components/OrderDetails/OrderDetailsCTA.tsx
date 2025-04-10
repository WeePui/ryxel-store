'use client';

import { useState, useTransition } from 'react';
import Button from '../UI/Button';
import { useRouter } from 'next/navigation';
import { cancelOrderAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import ConfirmDialogue from '../UI/ConfirmDialogue';
import Modal from '../UI/Modal';
import FormReviewOrder from '../Order/FormReviewOrder';
import { Order } from '@/app/_types/order';
import FormUpdateReview from '../Order/FormUpdateReview';

interface OrderDetailsCTAProps {
  order: Order;
  showDetailsButton?: boolean;
}

export default function OrderDetailsCTA({
  order,
  showDetailsButton = true,
}: OrderDetailsCTAProps) {
  const {
    _id: orderId,
    status: orderStatus,
    createdAt: orderCreatedAt,
  } = order;
  const router = useRouter();
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Order is cancellable if it's created not longer than 30 minutes
  const currentTime = new Date();
  const orderTime = new Date(orderCreatedAt);
  const [isPending, startTransition] = useTransition();

  const isCancellable =
    (orderStatus === 'unpaid' || orderStatus === 'pending') &&
    (currentTime.getTime() - orderTime.getTime()) / (1000 * 60) < 30;
  const isReviewable =
    orderStatus === 'delivered' &&
    order.reviewCount === 0 &&
    currentTime.getTime() - orderTime.getTime() < 7 * 24 * 60 * 60 * 1000;
  const isReviewViewable = orderStatus === 'delivered' && order.reviewCount > 0;

  function handleBuyAgain() {
    router.push(`/checkout?buyAgain=1&orderId=${orderId}`);
  }

  function handleCheckout() {
    router.push(`/checkout?processPayment=1&orderId=${orderId}`);
  }

  function handleCancelOrder() {
    startTransition(async () => {
      const result = await cancelOrderAction(orderId);
      if (result.success) {
        toast.success('Đơn hàng đã được hủy thành công!');
      } else {
        toast.error(result?.errors?.message);
      }
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-4">
      {orderStatus === 'unpaid' && (
        <Button type="primary" onClick={handleCheckout} size="medium">
          Thanh toán
        </Button>
      )}
      {isReviewable && (
        <>
          <Button
            type="primary"
            size="medium"
            onClick={() => setIsModalOpen(true)}
          >
            Đánh giá
          </Button>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <FormReviewOrder
                order={order}
                closeModal={() => setIsModalOpen(false)}
              />
            </Modal>
          )}
        </>
      )}
      {orderStatus === 'cancelled' || orderStatus === 'delivered' ? (
        <Button type="primary" onClick={handleBuyAgain} size="medium">
          Mua lại
        </Button>
      ) : null}
      {isCancellable && (
        <>
          <Button
            type="danger"
            onClick={() => setIsDialogueOpen(true)}
            disabled={isPending}
            size="medium"
          >
            Hủy đơn hàng
          </Button>
          {isDialogueOpen && (
            <Modal onClose={() => setIsDialogueOpen(false)}>
              <ConfirmDialogue
                message={'Bạn có chắc chắn muốn hủy đơn hàng này không?'}
                onConfirm={handleCancelOrder}
                onCancel={() => setIsDialogueOpen(false)}
              />
            </Modal>
          )}
        </>
      )}
      {isReviewViewable && (
        <>
          <Button
            type="secondary"
            size="medium"
            onClick={() => setIsModalOpen(true)}
          >
            Xem đánh giá
          </Button>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <FormUpdateReview
                closeModal={() => setIsModalOpen(false)}
                order={order}
              />
            </Modal>
          )}
        </>
      )}
      {showDetailsButton && (
        <Button
          type="secondary"
          onClick={() => router.push(`orders/${orderId}`)}
          size="medium"
        >
          Xem chi tiết
        </Button>
      )}
    </div>
  );
}

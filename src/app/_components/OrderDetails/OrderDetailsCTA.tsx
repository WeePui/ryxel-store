"use client";

import { useState, useTransition } from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import {
  addMultipleItemsToCartAction,
  cancelOrderAction,
} from "@/app/_libs/actions";
import { toast } from "react-toastify";
import ConfirmDialogue from "../UI/ConfirmDialogue";
import Modal from "../UI/Modal";
import FormReviewOrder from "../Order/FormReviewOrder";
import { Order } from "@/app/_types/order";
import FormUpdateReview from "../Order/FormUpdateReview";
import { FaCartPlus } from "react-icons/fa6";
import { Product } from "@/app/_types/product";

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
    orderCode,
    status: orderStatus,
    createdAt: orderCreatedAt,
  } = order;
  const router = useRouter();
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyAgainDialogueOpen, setBuyAgainDialogueOpen] = useState(false);

  // Order is cancellable if it's created not longer than 30 minutes
  const currentTime = new Date();
  const orderTime = new Date(orderCreatedAt);
  const [isPending, startTransition] = useTransition();

  const isCancellable =
    orderStatus === "unpaid" ||
    (orderStatus === "pending" &&
      (currentTime.getTime() - orderTime.getTime()) / (1000 * 60) < 30);
  const isReviewable =
    orderStatus === "delivered" &&
    order.reviewCount === 0 &&
    currentTime.getTime() - orderTime.getTime() < 7 * 24 * 60 * 60 * 1000;
  const isReviewViewable = orderStatus === "delivered" && order.reviewCount > 0;

  function handleBuyAgain() {
    router.push(`/checkout?buyAgain=1&orderCode=${orderCode}`);
  }

  function handleCheckout() {
    router.push(`/checkout?processPayment=1&orderCode=${orderCode}`);
  }

  function handleCancelOrder() {
    startTransition(async () => {
      const result = await cancelOrderAction(orderId);
      if (result.success) {
        toast.success("Đơn hàng đã được hủy thành công!");
      } else {
        toast.error(result?.errors?.message);
      }
      router.refresh();
    });
  }

  function handleAddToCart() {
    startTransition(async () => {
      const lineItems = order.lineItems.map((item) => ({
        product: (item.product as Product)._id,
        variant: item.variant as string,
        quantity: item.quantity,
      }));

      const result = await addMultipleItemsToCartAction(lineItems);
      if (result.success) {
        toast.success("Tất cả sản phẩm đã được thêm vào giỏ hàng.", {
          icon: <FaCartPlus className="text-primary-500" />,
        });

        router.push("/cart");
      } else {
        toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.", {
          icon: <FaCartPlus className="text-red-500" />,
        });
      }
    });
  }

  return (
    <div className="flex items-center gap-4">
      {orderStatus === "unpaid" && (
        <Button onClick={handleCheckout} size="medium">
          Thanh toán
        </Button>
      )}
      {isReviewable && (
        <>
          <Button size="medium" onClick={() => setIsModalOpen(true)}>
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
      {orderStatus === "cancelled" || orderStatus === "delivered" ? (
        <>
          <Button
            onClick={() => {
              setBuyAgainDialogueOpen(true);
            }}
            size="medium"
          >
            Mua lại
          </Button>
          {buyAgainDialogueOpen && (
            <Modal onClose={() => setBuyAgainDialogueOpen(false)}>
              <ConfirmDialogue
                message={
                  "Bạn muốn chuyển đến trang thanh toán hay thêm toàn bộ vào giỏ hàng?"
                }
                confirmText="Chuyển đến thanh toán"
                onConfirm={handleBuyAgain}
                cancelText="Thêm vào giỏ hàng"
                onCancel={handleAddToCart}
              />
            </Modal>
          )}
        </>
      ) : null}
      {isCancellable && (
        <>
          <Button
            variant="danger"
            onClick={() => setIsDialogueOpen(true)}
            disabled={isPending}
            size="medium"
          >
            Hủy đơn hàng
          </Button>
          {isDialogueOpen && (
            <Modal onClose={() => setIsDialogueOpen(false)}>
              <ConfirmDialogue
                message={"Bạn có chắc chắn muốn hủy đơn hàng này không?"}
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
            variant="secondary"
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
          variant="secondary"
          onClick={() => router.push(`orders/${orderCode}`)}
          size="medium"
        >
          Xem chi tiết
        </Button>
      )}
    </div>
  );
}

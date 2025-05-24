"use client";

import { Order } from "@/app/_types/order";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { useTransition } from "react";
import { createShippingOrderAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import TrackingTimeline from "../../UI/TrackingTimeline";
import NavLink from "../../UI/NavLink";
import { mappingShippingStatus } from "@/app/_utils/mappingShippingStatus";

interface TrackingOrderStatusProps {
  order: Order;
}

export default function TrackingOrderStatus({
  order,
}: TrackingOrderStatusProps) {
  const [pending, startTransition] = useTransition();

  const handleCreateShippingOrder = () => {
    startTransition(async () => {
      const result = await createShippingOrderAction(
        order._id,
        order.orderCode,
      );

      if (result.success) {
        toast.success("Tạo đơn vận chuyển thành công");
      } else {
        toast.error("Tạo đơn vận chuyển thất bại: " + result.errors!.message);
      }
    });
  };

  return (
    <Card title="Theo dõi đơn hàng">
      {order.shippingTracking?.ghnOrderCode ? (
        <div className="flex gap-10 xl:flex-col xl:gap-4">
          <div className="mt-4 flex flex-col gap-2">
            <p className="font-semibold">
              <span className="text-sm text-grey-500">Mã vận đơn: </span>
              <span className="text-lg">
                {order.shippingTracking.ghnOrderCode}
              </span>
            </p>
            <p className="font-semibold">
              <span className="text-sm text-grey-500">
                Trạng thái hiện tại:{" "}
              </span>
              <span className="text-lg">
                {mappingShippingStatus(order.shippingTracking.trackingStatus)}
              </span>
            </p>
            <p className="font-semibold">
              <span className="text-sm text-grey-500">
                Thời gian dự kiến giao hàng:{" "}
              </span>
              <span className="text-lg">
                {new Date(
                  order.shippingTracking.expectedDeliveryDate!,
                )?.toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
            <p className="font-semibold">
              <span className="text-sm text-grey-500">Đơn vị vận chuyển: </span>{" "}
              <span className="text-lg">Giao Hàng Nhanh</span>
            </p>
            <p className="font-semibold">
              <span className="text-sm text-grey-500">Theo dõi vận đơn: </span>
              <NavLink
                href={`https://tracking.ghn.dev/?order_code=${order.shippingTracking.ghnOrderCode}`}
              >{`https://tracking.ghn.dev/?order_code=${order.shippingTracking.ghnOrderCode}`}</NavLink>
            </p>
          </div>
          <div className="p-4">
            <TrackingTimeline history={order.shippingTracking.statusHistory} />
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center gap-4">
          <p className="font-medium text-grey-300">
            Không có thông tin vận chuyển.
          </p>
          <Button
            size="small"
            onClick={handleCreateShippingOrder}
            disabled={
              pending ||
              order.status === "cancelled" ||
              order.status === "refunded"
            }
            loading={pending}
            variant={
              order.status === "cancelled" || order.status === "refunded"
                ? "danger"
                : "primary"
            }
          >
            {order.status === "cancelled" || order.status === "refunded"
              ? "Đơn hàng đã bị huỷ"
              : "Tạo đơn vận chuyển"}
          </Button>
        </div>
      )}
    </Card>
  );
}

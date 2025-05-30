"use client";

import OrderDetailsAddress from "@/app/_components/OrderDetails/OrderDetailsAddress";
import OrderDetailsCTA from "@/app/_components/OrderDetails/OrderDetailsCTA";
import OrderDetailsLineItems from "@/app/_components/OrderDetails/OrderDetailsLineItems";
import OrderDetailsSummary from "@/app/_components/OrderDetails/OrderDetailsSummary";
import NavLink from "@/app/_components/UI/NavLink";
import TrackingTimeline from "@/app/_components/UI/TrackingTimeline";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { Order } from "@/app/_types/order";
import { mappingOrderStatus } from "@/app/_utils/mappingOrderStatus";
import { FaArrowLeft } from "react-icons/fa6";

interface OrderDetailsClientProps {
  order: Order;
}

export default function OrderDetailsClient({ order }: OrderDetailsClientProps) {
  const { t } = useLanguage();
  const orderStatus = mappingOrderStatus(order.status);

  return (
    <div className="flex h-full flex-col bg-white px-8 py-6">
      <div className="mb-4 flex items-center justify-between sm:flex-col sm:items-start sm:gap-4">
        <div>
          <NavLink href="/account/orders" type="secondaryNavInline">
            <span className="flex items-center">
              <FaArrowLeft className="mr-2" />
              {t("account.orders.backToOrders")}
            </span>
          </NavLink>
        </div>
        <div className="text-right sm:text-left">
          <h1 className="mb-2 text-xl font-bold">
            {t("account.orders.orderDetails")}
          </h1>
          <div className="flex items-center gap-2 divide-x-2 divide-gray-200 text-sm">
            <span className="text-grey-400">#{order.orderCode}</span>
            <span
              className={`${orderStatus.textColor} pl-2 font-semibold uppercase`}
            >
              {t(`account.orders.status.${order.status}`)}
            </span>
          </div>
        </div>
      </div>
      <hr className="border-t-1 my-4 border-grey-100" />
      <div className="flex flex-col gap-6 sm:gap-2">
        <div className="mb-6 flex gap-4 md:flex-col sm:-order-2">
          {order.shippingAddress &&
            typeof order.shippingAddress !== "string" && (
              <OrderDetailsAddress address={order.shippingAddress} />
            )}
          {order.shippingTracking?.statusHistory && (
            <TrackingTimeline history={order.shippingTracking.statusHistory} />
          )}
        </div>
        <div className="mb-4 overflow-hidden rounded-lg">
          <OrderDetailsLineItems lineItems={order.lineItems} />
          <OrderDetailsSummary order={order} />
        </div>
        <div className="ml-auto sm:-order-1">
          <OrderDetailsCTA order={order} showDetailsButton={false} />
        </div>
      </div>
    </div>
  );
}

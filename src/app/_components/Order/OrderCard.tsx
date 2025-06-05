"use client";

import OrderItem from "./OrderItem";
import { Order } from "@/app/_types/order";
import { mappingOrderStatus } from "@/app/_utils/mappingOrderStatus";
import OrderDetailsCTA from "../OrderDetails/OrderDetailsCTA";
import formatMoney from "@/app/_utils/formatMoney";
import { useState } from "react";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const orderStatus = mappingOrderStatus(order.status);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2 divide-y-2 divide-gray-100 rounded-lg border-2">
      <div className="flex items-center px-5 pt-4">
        <div className={`flex items-center gap-2`}>
          <span className={`${orderStatus.textColor}`}>{orderStatus.icon}</span>
          <span className={`${orderStatus.textColor} `}>
            {t(`orders.status.${order.status}`)}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(order.updatedAt).toLocaleString(
              t("language") === "vi" ? "vi-VN" : "en-US",
            )}
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center gap-4 divide-y-2 divide-gray-100 px-4 py-4">
        {order.lineItems.map((item, index) => {
          if (!isExpanded && index > 0) return null;
          return <OrderItem key={item.variant as string} item={item} />;
        })}
        {order.lineItems.length > 1 && (
          <button
            className="mt-2 pt-2 text-sm text-primary-500 hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? t("orders.card.collapse")
              : t("orders.card.showMore").replace(
                  "{count}",
                  (order.lineItems.length - 1).toString(),
                )}
          </button>
        )}
      </div>
      <div className="flex flex-col items-end bg-primary-50 px-4 pb-8 pt-2">
        <p className="my-4 text-right text-sm text-grey-300">
          {t("orders.card.total")}:{" "}
          <span className="text-xl font-bold text-primary-default">
            {formatMoney(order.total)}
          </span>
        </p>
        <OrderDetailsCTA order={order} />
      </div>
    </div>
  );
}

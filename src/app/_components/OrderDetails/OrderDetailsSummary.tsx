"use client";

import { Order } from "@/app/_types/order";
import formatMoney from "@/app/_utils/formatMoney";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface OrderDetailsSummaryProps {
  order: Order;
}

export default function OrderDetailsSummary({
  order,
}: OrderDetailsSummaryProps) {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex bg-primary-50 p-4">
        <table className="ml-auto flex items-center gap-4 justify-self-end text-right text-sm">
          <thead>
            <tr className="flex flex-col justify-center">
              <th>{t("cart.orderSummary.subtotal")}:</th>
              <th>{t("cart.orderSummary.discount")}:</th>
              <th>{t("cart.orderSummary.shippingFee")}:</th>
              <th className="flex h-7 items-center justify-end">
                {t("orders.card.total")}:
              </th>
              <th>{t("checkout.summary.paymentMethod")}:</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex flex-col justify-center">
              <td>{formatMoney(order.subtotal)}</td>
              <td>- {formatMoney(order.discountAmount)}</td>
              <td>{formatMoney(order.shippingFee)}</td>
              <td className="text-xl font-bold">{formatMoney(order.total)}</td>
              <td>
                {t(
                  `account.orderDetails.paymentMethods.${order.paymentMethod}`,
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

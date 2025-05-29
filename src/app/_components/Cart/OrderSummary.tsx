"use client";

import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import PaymentMethods from "../UI/PaymentMethods";
import formatMoney from "@/app/_utils/formatMoney";
import { useTransition } from "react";
import { storeSelectedCartItemsAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface OrderSummaryProps {
  subtotal: number;
  selectedItems: {
    product: string;
    variant: string;
  }[];
}

function OrderSummary({ subtotal, selectedItems }: OrderSummaryProps) {
  const { t } = useLanguage();
  const [, startTransition] = useTransition();
  const router = useRouter();

  function handleCheckout() {
    if (selectedItems.length === 0) {
      toast.error(t("cart.messages.noProductsSelected"));
      return;
    }

    startTransition(async () => {
      const result = await storeSelectedCartItemsAction(selectedItems);

      if (result.errors) {
        console.error("Error storing selected items:", result.errors.message);
        return;
      }

      router.push("/checkout?fromCart=1");
    });
  }
  return (
    <div className="sticky top-20 flex flex-col divide-y-2 divide-gray-300 rounded-xl bg-grey-100 px-4 font-semibold">
      <h2 className="py-4 text-2xl font-bold">
        {t("cart.orderSummary.title")}
      </h2>

      <div className="py-6">
        <div className="flex justify-between text-xl">
          <h3>{t("cart.orderSummary.total")}</h3>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <p className="mt-1 text-right text-xs text-grey-400">
          ({t("cart.orderSummary.selectedItems")}: x{selectedItems.length})
        </p>
      </div>

      <div className="flex w-full flex-col">
        <Button onClick={handleCheckout} size="large">
          {t("cart.orderSummary.proceedCheckout")}
        </Button>
        <div className="my-5 flex flex-col items-center text-xs">
          <p>{t("cart.orderSummary.paymentMethods")}</p>
          <div className="mt-2 grid w-36 grid-cols-3 justify-center gap-2 text-5xl">
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

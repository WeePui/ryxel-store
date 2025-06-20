"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../UI/Button";
import PaymentMethods from "../UI/PaymentMethods";
import { verifyDiscountCodeAction } from "@/app/_libs/actions";
import { FaCheck, FaXmark } from "react-icons/fa6";
import formatMoney from "@/app/_utils/formatMoney";
import CheckoutButton from "./CheckoutButton";
import { Address } from "@/app/_types/address";
import { getShippingFee } from "@/app/_libs/apiServices";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface CheckoutItem {
  product: string;
  variant: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  code: string;
  subtotal: number;
  address: Address | null;
  paymentMethod: string | null;
  lineItems: CheckoutItem[];
  onCodeChange?: (code: string) => void;
  existingDiscountAmount?: number;
}

function CheckoutSummary({
  code,
  subtotal,
  address,
  paymentMethod,
  lineItems,
  onCodeChange,
  existingDiscountAmount,
}: CheckoutSummaryProps) {
  const { t } = useLanguage();
  const [discountState, action, isPending] = useActionState(
    verifyDiscountCodeAction,
    {
      success: existingDiscountAmount ? true : false,
      discountAmount: existingDiscountAmount || 0,
      code: code || "",
      errors: {},
    },
  );
  const [isApplyVoucher, setIsApplyVoucher] = useState(false);
  const [loadingShippingFee, startTransition] = useTransition();
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string>("");
  useEffect(() => {
    if (address) {
      startTransition(async () => {
        const response = await getShippingFee(address, lineItems);

        if (response.status === "success" && response.data) {
          const { shippingFee: fee, expectedDeliveryDate: deliveryDate } =
            response.data;

          startTransition(() => {
            setShippingFee(fee);
            setExpectedDeliveryDate(deliveryDate);
          });
        } else {
          console.error("Failed to fetch shipping fee:", response.message);
          // Set default values on error
          startTransition(() => {
            setShippingFee(0);
            setExpectedDeliveryDate("");
          });
        }
      });
    }
  }, [address, lineItems]);

  return (
    <div className="sticky top-20 flex flex-col divide-y-2 divide-gray-300 rounded-xl bg-grey-100 px-4 font-semibold">
      <div className="flex flex-col items-center justify-between gap-2 py-4">
        <h2 className="text-2xl font-bold">{t("checkout.summary.title")}</h2>
        <p className="text-xs text-grey-400">{t("checkout.summary.note")}</p>
      </div>
      <div className="flex flex-col transition-all duration-300">
        <h3
          onClick={() => setIsApplyVoucher((prev) => !prev)}
          className="flex cursor-pointer justify-between py-4 font-semibold"
        >
          {t("checkout.summary.voucher")}
          <span className="text-xl">
            {isApplyVoucher ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </h3>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isApplyVoucher ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isApplyVoucher &&
            (discountState?.success ? (
              discountState?.success && (
                <div className="flex items-center gap-2 pb-4">
                  <FaCheck className="text-xl text-green-500" />
                  {t("checkout.summary.voucherSuccess").replace(
                    "{code}",
                    discountState?.code?.toString().toUpperCase() || "",
                  )}
                </div>
              )
            ) : (
              <form className="flex w-full flex-col gap-2 pb-4" action={action}>
                {discountState?.errors?.message && (
                  <p className="flex items-center gap-2 text-red-500">
                    <FaXmark /> {discountState.errors.message}
                  </p>
                )}
                <div className="flex w-full gap-2">
                  <input
                    name="code"
                    placeholder={t("checkout.summary.voucherPlaceholder")}
                    className="w-full rounded-lg border-2 border-grey-300 bg-transparent p-4 text-lg font-semibold transition-all duration-300 focus:border-primary-default"
                    defaultValue={discountState?.code || ""}
                    onChange={(e) => onCodeChange?.(e.target.value)}
                  />
                  <input
                    name="lineItems"
                    type="hidden"
                    value={JSON.stringify(lineItems)}
                  />
                  <Button role="submit" loading={isPending}>
                    {t("checkout.summary.use")}
                  </Button>
                </div>
              </form>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between">
          <h3>{t("checkout.summary.subtotal")}</h3>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <div>
          <div className="flex justify-between">
            <h3>{t("checkout.summary.shipping")}</h3>
            <span>{formatMoney(shippingFee)}</span>
          </div>
          <p className="text-right text-xs text-gray-500">
            {t("checkout.summary.expectedDelivery")}{" "}
            {new Date(expectedDeliveryDate).toLocaleDateString("vi-VN")}
          </p>
        </div>
        {discountState?.success && (
          <div className="flex justify-between">
            <h3>{t("checkout.summary.discount")}</h3>
            <span>- {formatMoney(discountState?.discountAmount || 0)}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between py-6 text-xl">
        <h3>{t("checkout.summary.total")}</h3>
        <span>
          {formatMoney(
            subtotal -
              (discountState?.discountAmount || 0) +
              (shippingFee || 0),
          )}
        </span>
      </div>
      <div className="flex w-full flex-col">
        <CheckoutButton
          lineItems={lineItems}
          address={address?._id || ""}
          paymentMethod={paymentMethod || ""}
          code={discountState?.code || ""}
          loading={loadingShippingFee}
        />
        <div className="my-5 flex flex-col items-center text-xs">
          <p>{t("checkout.summary.paymentMethod")}</p>
          <div className="mt-2 grid w-36 grid-cols-3 justify-center gap-2 text-5xl">
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;

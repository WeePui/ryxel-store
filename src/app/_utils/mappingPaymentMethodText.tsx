import Image from "next/image";
import { JSX } from "react";
import { useLanguage } from "@/app/_contexts/LanguageContext";

// This mapping is kept for backward compatibility
export const mappingPaymentMethodText: { [key: string]: string } = {
  cod: "Thanh toán khi nhận hàng",
  zalopay: "Thanh toán qua ZaloPay",
  stripe: "Thanh toán qua Stripe (thẻ tín dụng)",
};

// Use this hook for internationalized payment method text
export function usePaymentMethodText() {
  const { t } = useLanguage();

  return {
    getPaymentMethodText: (method: string) => {
      return t(`paymentMethods.${method}`);
    },
  };
}

export const mappingPaymentMethodShortText: { [key: string]: string } = {
  cod: "COD",
  zalopay: "ZaloPay",
  stripe: "Stripe",
};

export const mappingPaymentMethodIcon: { [key: string]: JSX.Element } = {
  cod: (
    <Image
      src="/images/payment-methods/cod.png"
      alt="COD"
      width={16}
      height={16}
    />
  ),
  zalopay: (
    <Image
      src="/images/payment-methods/zalopay.png"
      alt="ZaloPay"
      width={16}
      height={16}
    />
  ),
  stripe: (
    <Image
      src="/images/payment-methods/stripe.png"
      alt="Stripe"
      width={16}
      height={16}
    />
  ),
};

export function mappingPaymentMethod(paymentMethod: string, fullText = true) {
  if (fullText) {
    return {
      text: mappingPaymentMethodText[paymentMethod],
      icon: mappingPaymentMethodIcon[paymentMethod] || null,
    };
  }
  return {
    text: mappingPaymentMethodShortText[paymentMethod],
    icon: mappingPaymentMethodIcon[paymentMethod] || null,
  };
}

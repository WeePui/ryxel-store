import Image from 'next/image';
import { JSX } from 'react';

export const mappingPaymentMethodText: { [key: string]: string } = {
  cod: 'Thanh toán khi nhận hàng',
  zalopay: 'Thanh toán qua ZaloPay',
  stripe: 'Thanh toán qua Stripe (thẻ tín dụng)',
};

export const mappingPaymentMethodShortText: { [key: string]: string } = {
  cod: 'COD',
  zalopay: 'ZaloPay',
  stripe: 'Stripe',
};

export const mappingPaymentMethodIcon: { [key: string]: JSX.Element } = {
  cod: <Image src="/images/payment-methods/cod.png" alt="COD" />,
  zalopay: <Image src="/images/payment-methods/zalopay.png" alt="ZaloPay" />,
  stripe: <Image src="/images/payment-methods/stripe.png" alt="Stripe" />,
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

'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { BiSolidBank } from 'react-icons/bi';
import { FaMoneyCheckDollar } from 'react-icons/fa6';

const codIcon = (
  <Image
    src="/cod.png"
    alt="cod payment method"
    width={40}
    height={40}
    className="border-2 border-gray-300 rounded-md"
    sizes="100%"
  />
);
const stripeIcon = (
  <Image
    src="/stripe.png"
    alt="stripe payment method"
    width={40}
    height={40}
    className="border-2 border-gray-300 rounded-md"
    sizes="100%"
  />
);
const zaloPayIcon = (
  <Image
    src="/zalopay.png"
    alt="ZaloPay payment method"
    width={40}
    height={40}
    className="border-2 border-gray-300 rounded-md"
    sizes="100%"
  />
);

interface SelectPaymentMethodProps {
  onSelect: (method: string) => void;
}

export default function SelectPaymentMethod({
  onSelect,
}: SelectPaymentMethodProps) {
  const [, setSelectedMethod] = useState<string | null>(null);

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
    onSelect(method);
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-8 shadow-md">
      <h2 className="flex items-center text-xl font-bold">
        <FaMoneyCheckDollar />
        <span className="ml-2">Phương thức thanh toán</span>
      </h2>
      <div className="flex flex-col gap-2">
        <p>Chọn phương thức thanh toán</p>
        <ul className="flex flex-col gap-4 font-medium text-lg">
          <PaymentMethodOption
            id="cod"
            label="Thanh toán khi nhận hàng"
            icon={codIcon}
            onSelect={handleSelect}
          />
          <PaymentMethodOption
            id="stripe"
            label="Stripe (Visa, MasterCard)"
            icon={stripeIcon}
            onSelect={handleSelect}
          />
          <PaymentMethodOption
            id="zalopay"
            label="Ví ZaloPay"
            icon={zaloPayIcon}
            onSelect={handleSelect}
          />
          <PaymentMethodOption
            id="atm"
            label="Thẻ ATM (Qua cổng thanh toán ZaloPay)"
            icon={<BiSolidBank className="text-xl" />}
            onSelect={handleSelect}
          />
        </ul>
      </div>
    </div>
  );
}

interface paymentMethodOptionProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onSelect: (method: string) => void;
}

function PaymentMethodOption({
  id,
  label,
  icon,
  onSelect,
}: paymentMethodOptionProps) {
  return (
    <li className="flex items-center gap-5 border-2 p-4 rounded-xl border-gray-300">
      <div className="flex gap-4 items-center">
        <input
          type="radio"
          name="paymentMethod"
          id={id}
          className="w-5 h-5 text-primary-400"
          value={id}
          onChange={(e) => onSelect(e.target.value)}
        />
        {icon && <span className="text-lg">{icon}</span>}
        <label htmlFor={id}>{label}</label>
      </div>
    </li>
  );
}

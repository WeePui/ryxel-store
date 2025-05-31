"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

const codIcon = (
  <Image
    src="/cod.png"
    alt="cod payment method"
    width={40}
    height={40}
    className="rounded-md border-2 border-gray-300"
    sizes="100%"
  />
);
const stripeIcon = (
  <Image
    src="/stripe.png"
    alt="stripe payment method"
    width={40}
    height={40}
    className="rounded-md border-2 border-gray-300"
    sizes="100%"
  />
);
const zaloPayIcon = (
  <Image
    src="/zalopay.png"
    alt="ZaloPay payment method"
    width={40}
    height={40}
    className="rounded-md border-2 border-gray-300"
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
  const { t } = useLanguage();

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
    onSelect(method);
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-8 shadow-md lg:px-4">
      <h2 className="flex items-center text-xl font-bold">
        <FaMoneyCheckDollar />
        <span className="ml-2">{t("checkout.paymentMethods.title")}</span>
      </h2>
      <div className="flex flex-col gap-2">
        <p>{t("checkout.selectPaymentMethod")}</p>
        <ul className="flex flex-col gap-4 text-lg font-medium">
          <PaymentMethodOption
            id="cod"
            label={t("checkout.paymentMethods.cod")}
            icon={codIcon}
            onSelect={handleSelect}
          />
          <PaymentMethodOption
            id="stripe"
            label={t("checkout.paymentMethods.stripe")}
            icon={stripeIcon}
            onSelect={handleSelect}
          />
          <PaymentMethodOption
            id="zalopay"
            label={t("checkout.paymentMethods.zalopay")}
            icon={zaloPayIcon}
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
    <li className="flex items-center gap-5 rounded-xl border-2 border-gray-300 p-4 md:p-2">
      <div className="flex items-center gap-4">
        <input
          type="radio"
          name="paymentMethod"
          id={id}
          className="h-5 w-5 text-primary-400"
          value={id}
          onChange={(e) => onSelect(e.target.value)}
        />
        {icon && <span className="text-lg">{icon}</span>}
        <label htmlFor={id}>{label}</label>
      </div>
    </li>
  );
}

'use client';

import { Address } from '@/app/_types/address';
import React, { useState } from 'react';
import SelectAddress from './SelectAddress';
import CheckoutItems from './CheckoutItems';
import SelectPaymentMethod from './SelectPaymentMethod';
import CheckoutSummary from './CheckoutSummary';
import { LineItem } from '@/app/_types/lineItem';
import { Product } from '@/app/_types/product';

interface CheckoutPageProps {
  addresses: Address[];
  lineItems: LineItem[];
  subtotal: number;
}

export default function CheckoutPage({
  addresses,
  lineItems,
  subtotal,
}: CheckoutPageProps) {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [code, setCode] = useState<string | null>(null);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div className="mx-auto mt-14 lg:mt-4 grid w-full max-w-7xl xl:px-6 grid-cols-[70fr_30fr] lg:grid-cols-1 gap-10">
      <h1 className="col-span-full self-start font-title text-3xl font-semibold text-primary-500">
        Đặt hàng
      </h1>
      <SelectAddress addresses={addresses} onSelect={setSelectedAddress} />
      <CheckoutItems items={lineItems} />
      <SelectPaymentMethod onSelect={setSelectedPaymentMethod} />
      <div className="col-start-2 row-span-3 row-start-2 lg:col-span-full lg:row-start-5">
        <CheckoutSummary
          subtotal={subtotal}
          code={code || ''}
          address={selectedAddress}
          paymentMethod={selectedPaymentMethod}
          lineItems={lineItems.map((item) => {
            return {
              product: (item.product as Product)._id,
              variant: item.variant,
              quantity: item.quantity,
            } as {
              product: string;
              variant: string;
              quantity: number;
            };
          })}
          onCodeChange={handleCodeChange}
        />
      </div>
    </div>
  );
}

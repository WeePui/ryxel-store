'use client';

import { Address } from '@/app/_types/address';
import React from 'react';

interface OrderDetailsProps {
  address: Address;
}

export default function OrderDetailsAddress({ address }: OrderDetailsProps) {
  return (
    <div className="mb-4">
      <h2 className="font-bold text-xl mb-4">Địa chỉ giao hàng</h2>
      <div className="flex flex-col justify-center gap-2 bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold">{address.fullname}</p>
        <div className="text-sm">
          <p className="mb-1">{address.phoneNumber}</p>
          <p>
            {address.address}, {address.district.name}, {address.ward.name},{' '}
            {address.city.name}
          </p>
        </div>
      </div>
    </div>
  );
}

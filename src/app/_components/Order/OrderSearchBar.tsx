'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSistrix } from 'react-icons/fa6';

export default function OrderSearchBar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword) {
      const params = new URLSearchParams();
      params.set('search', keyword);
      router.replace(`orders?${params.toString()}`);
    } else {
      router.replace('orders');
    }
  };

  return (
    <div className="relative">
      <FaSistrix className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-xl text-gray-500" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-60 rounded-full border-2 border-gray-200 py-2 pl-10 pr-8 transition-all duration-500 focus:w-96 focus:outline-none focus:ring-2 focus:ring-tertiary-400"
          placeholder="Tìm kiếm bằng tên sản phẩm, mã đơn hàng, ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </div>
  );
}

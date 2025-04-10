'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSistrix } from 'react-icons/fa6';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (keyword) {
      const params = new URLSearchParams();
      params.set('search', keyword);

      router.replace(`/products?${params.toString()}`);
    }
  }

  return (
    <div className="relative">
      <FaSistrix className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-xl text-gray-500" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-56 rounded-full border-2 border-gray-200 py-2 pl-10 pr-8 transition-all duration-500 focus:w-96 focus:outline-none focus:ring-2 focus:ring-tertiary-400"
          placeholder="Tìm kiếm sản phẩm, danh mục & khác ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;

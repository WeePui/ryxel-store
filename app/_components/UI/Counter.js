'use client';

import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

function Counter() {
  const [count, setCount] = useState(1);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setCount('');
      return;
    }

    const numericValue = Math.max(1, Math.min(10, Number(value)));
    setCount(numericValue);
  };

  const handleBlur = () => {
    if (count === '' || isNaN(count)) {
      setCount(1);
    }
  };

  return (
    <div className="flex h-full items-center justify-between overflow-hidden rounded-xl border-[1px] border-gray-500 text-lg font-bold text-gray-800">
      <button
        className="flex h-full flex-1 items-center justify-center text-center hover:bg-grey-100 disabled:text-gray-300"
        onClick={() => setCount((prev) => Math.max(1, prev - 1))}
        disabled={count <= 1}
      >
        <FaMinus />
      </button>
      <input
        type="number"
        min={1}
        max={10}
        value={count}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="h-full w-full flex-1 text-center focus:outline-none"
      />
      <button
        className="flex h-full flex-1 items-center justify-center hover:bg-grey-100 disabled:text-gray-300"
        onClick={() => setCount((prev) => Math.min(10, prev + 1))}
        disabled={count >= 10}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default Counter;

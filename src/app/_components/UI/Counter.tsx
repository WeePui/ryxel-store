'use client';

import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface CounterProps {
  value?: number;
  onSetValue: (value: number) => void;
}

function Counter({ value = 0, onSetValue }: CounterProps) {
  const [count, setCount] = useState(value + '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setCount('');
      // onSetValue(0);
      return;
    }

    const numericValue = Math.max(1, Math.min(10, Number(value)));
    setCount(numericValue + '');
    onSetValue(numericValue);
  };

  const handleBlur = () => {
    if (count === '' || isNaN(Number(count))) {
      setCount(1 + '');
      onSetValue(1);
    }
  };

  return (
    <div className="flex h-full items-center justify-between overflow-hidden rounded-xl border-[1px] border-gray-300 text-lg font-bold text-gray-800">
      <button
        className="flex h-full flex-1 items-center justify-center text-center hover:bg-grey-100 disabled:text-gray-300"
        onClick={() => {
          const newValue = Math.max(1, Number(count) - 1);
          setCount(newValue + '');
          onSetValue(newValue);
        }}
        disabled={Number(count) <= 1}
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
        onClick={() => {
          const newValue = Math.min(10, Number(count) + 1);
          setCount(newValue + '');
          onSetValue(newValue);
        }}
        disabled={Number(count) >= 10}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default Counter;

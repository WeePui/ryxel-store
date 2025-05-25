"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface CounterProps {
  value?: number;
  onSetValue: (value: number) => void;
}

function Counter({ value = 1, onSetValue }: CounterProps) {
  const [count, setCount] = useState(value + "");

  const normalize = (val: string | number) => {
    const num = Number(val);
    return Math.max(1, Math.min(10, num));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };

  const handleBlur = () => {
    const normalized = normalize(count);
    setCount(normalized + "");
    onSetValue(normalized);
  };

  const handleDecrement = () => {
    const newValue = normalize(Number(count) - 1);
    setCount(newValue + "");
    onSetValue(newValue);
  };

  const handleIncrement = () => {
    const newValue = normalize(Number(count) + 1);
    setCount(newValue + "");
    onSetValue(newValue);
  };

  return (
    <div className="flex h-full items-center justify-between overflow-hidden rounded-xl border-[1px] border-gray-300 text-lg font-bold text-gray-800">
      <button
        className="flex h-full flex-1 items-center justify-center text-center hover:bg-grey-100 disabled:text-gray-300"
        onClick={handleDecrement}
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
        className="h-full w-full flex-1 border-none text-center focus:outline-none"
      />
      <button
        className="flex h-full flex-1 items-center justify-center hover:bg-grey-100 disabled:text-gray-300"
        onClick={handleIncrement}
        disabled={Number(count) >= 10}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default Counter;

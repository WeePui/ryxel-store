'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-between">
      <button
        className="mx-2"
        onClick={() => {
          setCount((c) => c - 1);
        }}
      >
        -
      </button>
      <span>{count}</span>
      <button
        className="mx-2"
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Counter;

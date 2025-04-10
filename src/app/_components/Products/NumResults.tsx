'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NumResultsProps {
  results: number;
  totalResults: number;
}

function NumResults({ results, totalResults }: NumResultsProps) {
  const [displayedResults, setDisplayedResults] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    setDisplayedResults((prev) => {
      return prev + results;
    });
  }, [searchParams, results]);

  return (
    <p className="py-6 text-xs text-grey-400">
      Hiển thị {displayedResults} kết quả trong tổng số {totalResults} sản phẩm
    </p>
  );
}

export default NumResults;

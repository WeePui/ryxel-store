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
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get('page')) || 1;
    if (page > 1 && displayedResults > 0) {
      setDisplayedResults((prev) => prev + results);
    } else {
      setDisplayedResults(results);
    }
  }, [searchParams, displayedResults, results]);

  return (
    <p className="py-6 text-xs text-grey-400">
      Hiển thị {displayedResults} kết quả trong tổng số {totalResults} sản phẩm
    </p>
  );
}

export default NumResults;

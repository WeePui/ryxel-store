'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function NumResults({ results, totalResults }) {
  const [displayedResults, setDisplayedResults] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = params.get('page') || 1;
    if (page > 1 && displayedResults > 0) {
      setDisplayedResults((prev) => prev + results);
    } else {
      setDisplayedResults(results);
    }
  }, [searchParams]);

  return (
    <p className="py-6 text-xs text-grey-400">
      Showing {displayedResults} results of {totalResults} matching products
    </p>
  );
}

export default NumResults;

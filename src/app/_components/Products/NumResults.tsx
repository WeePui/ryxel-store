"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface NumResultsProps {
  results: number;
  totalResults: number;
}

function NumResults({ results, totalResults }: NumResultsProps) {
  const [displayedResults, setDisplayedResults] = useState(0);
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  useEffect(() => {
    setDisplayedResults(results);
  }, [searchParams, results]);

  const resultText = t("products.searchResults.found")
    .replace("{count}", displayedResults.toString())
    .replace("{total}", totalResults.toString());

  return <p className="py-6 text-xs text-grey-400 sm:px-3">{resultText}</p>;
}

export default NumResults;

"use client";

import { useEffect, useState, useCallback, useTransition, useRef } from "react";
import ProductCard from "@components/Products/ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/app/_types/product";
import Pagination from "../UI/Pagination";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface ProductListProps {
  products: Product[];
  totalResults: number;
  resultsPerPage: number;
}

function ProductList({
  products,
  totalResults,
  resultsPerPage,
}: ProductListProps) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleChangePage = useCallback((page: number) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    const timeout = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());

        router.replace(`${pathname}?${params.toString()}`);
        setCurrentPage(page);
      });
    }, 150); // Shorter debounce for pagination

    updateTimeoutRef.current = timeout;
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const page = Number(params.get("page")) || 1;

    setCurrentPage(page);
  }, [searchParams, products]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  if (products.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-8 text-lg font-semibold text-grey-400">
        {t("products.noProducts")}
      </div>
    );
  }

  return (
    <div className={`w-full ${isPending ? "opacity-75" : ""}`}>
      <div className="mb-12 grid auto-rows-min grid-cols-4 gap-x-8 gap-y-12 xl:grid-cols-3 lg:gap-x-3 lg:gap-y-8 md:grid-cols-2">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalResults / resultsPerPage)}
            onPageChange={handleChangePage}
            disabled={isPending}
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;

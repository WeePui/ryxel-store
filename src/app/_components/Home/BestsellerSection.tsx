"use client";

import { getBestsellers } from "@/app/_libs/apiServices";
import React, { useEffect, useState } from "react";
import BestsellerList from "./BestsellerList";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function BestsellerSection() {
  const { language } = useLanguage();
  const [bestsellers, setBestsellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setIsLoading(true);
        setError("");
        const { data } = await getBestsellers();
        console.log("Bestsellers data:", data);
        setBestsellers(data.products || []);
      } catch (err) {
        console.error("Error fetching bestsellers:", err);
        setError(language === "vi" 
          ? "Không thể tải sản phẩm bán chạy. Vui lòng thử lại sau." 
          : "Could not load bestsellers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestsellers();
  }, [language]);
  return (
    <section className="mx-auto mb-12 flex w-full max-w-7xl flex-col items-center justify-center px-6 py-10 lg:mb-0">
      <p className="mb-10 self-start font-title text-3xl font-semibold md:mb-2 md:text-2xl">
        {language === "vi" ? "Sản phẩm bán chạy" : "Best Sellers"}
      </p>
      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="flex h-60 items-center justify-center text-red-500">
          {error}
        </div>
      ) : bestsellers.length === 0 ? (
        <div className="flex h-60 items-center justify-center text-gray-500">
          {language === "vi" ? "Không có sản phẩm bán chạy" : "No bestsellers found"}
        </div>
      ) : (
        <BestsellerList products={bestsellers} />
      )}
    </section>
  );
}

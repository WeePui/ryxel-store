"use client";

import { getBestsellers } from "@/app/_libs/apiServices";
import React, { useEffect, useState } from "react";
import BestsellerList from "./BestsellerList";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

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
        setError(
          language === "vi"
            ? "Không thể tải sản phẩm bán chạy. Vui lòng thử lại sau."
            : "Could not load bestsellers. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestsellers();
  }, [language]);
  return (
    <section className="mx-auto mb-12 flex w-full max-w-7xl flex-col items-center justify-center px-6 py-10 lg:mb-0">
      <motion.p
        className="mb-10 self-start font-title text-3xl font-semibold md:mb-2 md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {language === "vi" ? "Sản phẩm bán chạy" : "Best Sellers"}
      </motion.p>{" "}
      {isLoading ? (
        <motion.div
          className="flex h-60 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </motion.div>
      ) : error ? (
        <motion.div
          className="flex h-60 items-center justify-center text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      ) : bestsellers.length === 0 ? (
        <motion.div
          className="flex h-60 items-center justify-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {language === "vi"
            ? "Không có sản phẩm bán chạy"
            : "No bestsellers found"}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <BestsellerList products={bestsellers} />
        </motion.div>
      )}
    </section>
  );
}

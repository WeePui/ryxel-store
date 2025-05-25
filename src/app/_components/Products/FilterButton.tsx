"use client";

import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface FilterButtonProps {
  children: React.ReactNode;
}

export default function FilterButton({ children }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:auto z-60 flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-white lg:h-[48px]"
      >
        <FaFilter className="text-sm" />
        <span className="font-semibold">{t("products.filter.title")}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 hidden bg-black/50 lg:block"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="absolute right-0 top-0 h-full w-96 bg-white p-4 md:w-full"
            >
              <div className="mb-4 flex items-center justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-500"
                >
                  <FaXmark />
                </button>
              </div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

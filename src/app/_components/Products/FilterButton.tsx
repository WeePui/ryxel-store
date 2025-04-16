'use client';

import { FaFilter } from 'react-icons/fa';
import { useState } from 'react';
import SideFilter from '@components/Products/SideFilter';
import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';

interface FilterButtonProps {
  brands: Array<{ value: string; count: number }>;
  priceRanges: Array<{ min: number; max?: number }>;
  specifications: {
    [key: string]: Array<{
      value: string;
      count: number;
    }>;
  };
}

export default function FilterButton({
  brands,
  priceRanges,
  specifications,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:auto flex justify-center items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg shrink-0 z-60 w-full lg:h-[48px]"
      >
        <FaFilter className="text-sm" />
        <span className="font-semibold">Bộ lọc</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 hidden lg:block"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute right-0 top-0 h-full md:w-full w-96 bg-white p-4"
            >
              <div className="flex justify-end items-center mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-gray-500"
                >
                  <FaXmark />
                </button>
              </div>
              <SideFilter
                brands={brands}
                priceRanges={priceRanges}
                specifications={specifications}
                isMobile
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

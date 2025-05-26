"use client";

import { useProductDetail } from "@/app/_contexts/ProductDetailContext";
import { useState } from "react";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

function ProductDescription() {
  const { currentVariant, product } = useProductDetail();
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="mt-32 flex w-full justify-center bg-secondary-50 p-4 lg:mt-4">
      <motion.div
        className="flex w-full max-w-7xl justify-between lg:flex-col lg:gap-8 lg:p-0"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex w-7/12 flex-col p-4 lg:w-full lg:p-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-primary-500">
            {t("products.description.title")}
          </h2>
          <div className="mt-4 text-primary-700">
            <p>{product.description}</p>
          </div>
        </motion.div>
        <motion.div
          className="w-5/12 lg:w-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-primary-500">
            {t("products.description.specifications")}
          </h2>
          <motion.div
            className="relative mt-4 w-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div
              className={`w-full overflow-hidden rounded-xl border-2 border-primary-default text-left text-gray-700 ${
                isExpanded ? "" : "max-h-40"
              }`}
            >
              <table className="w-full border-separate">
                <tbody>
                  {Object.entries(currentVariant.specifications).map(
                    ([key, value]) => (
                      <tr
                        key={key}
                        className="border-b border-primary-default bg-white capitalize shadow"
                      >
                        <th className="w-[30%] border-r-2 border-primary-default px-4 py-2 font-medium text-primary-600">
                          {key}
                        </th>
                        <td className="w-[70%] px-4 py-2">{value}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary-50 via-secondary-50/60 to-transparent">
                  <button
                    className="block w-full bg-transparent px-4 py-2 text-center font-medium text-primary-500 hover:underline"
                    onClick={toggleExpand}
                  >
                    {t("products.description.showMore")}
                  </button>
                </div>
              )}
            </div>
            {isExpanded && (
              <button
                className="block w-full bg-transparent px-4 py-2 text-center font-medium text-primary-500 hover:underline"
                onClick={toggleExpand}
              >
                {t("products.description.showLess")}
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ProductDescription;

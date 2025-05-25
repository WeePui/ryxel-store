"use client";

import { useProductDetail } from "@/app/_contexts/ProductDetailContext";
import { useState } from "react";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function ProductDescription() {
  const { currentVariant, product } = useProductDetail();
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="mt-32 flex w-full justify-center bg-secondary-50 p-4 lg:mt-4">
      <div className="flex w-full max-w-7xl justify-between lg:flex-col lg:gap-8 lg:p-0">
        <div className="flex w-7/12 flex-col p-4 lg:w-full lg:p-0">
          <h2 className="text-2xl font-semibold text-primary-500">
            {t("products.description.title")}
          </h2>
          <div className="mt-4 text-primary-700">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="w-5/12 p-4 lg:w-full lg:pt-0">
          <h2 className="pl-4 text-2xl font-semibold text-primary-500 lg:pl-0">
            {t("products.description.specifications")}
          </h2>
          <div className="relative mt-4 w-full overflow-hidden">
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
                  {" "}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;

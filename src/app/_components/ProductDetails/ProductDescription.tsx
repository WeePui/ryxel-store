'use client';

import { useProductDetail } from '@/app/_contexts/ProductDetailContext';
import { useState } from 'react';

function ProductDescription() {
  const { currentVariant, product } = useProductDetail();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="mt-32 flex w-full justify-center bg-secondary-50 p-4">
      <div className="flex w-full max-w-7xl justify-between">
        <div className="flex w-7/12 flex-col justify-center p-4">
          <h2 className="text-2xl font-semibold text-primary-500">Mô tả</h2>
          <div className="mt-4 text-primary-700">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="w-5/12 p-4">
          <h2 className="pl-4 text-2xl font-semibold text-primary-500">
            Thông số kĩ thuật
          </h2>
          <div className="relative mt-4 w-full overflow-hidden">
            <div
              className={`w-full overflow-hidden rounded-xl border-2 border-primary-default text-left text-gray-700 ${
                isExpanded ? '' : 'max-h-40'
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
                    )
                  )}
                </tbody>
              </table>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary-50 via-secondary-50/60 to-transparent">
                  <button
                    className="block w-full bg-transparent px-4 py-2 text-center font-medium text-primary-500 hover:underline"
                    onClick={toggleExpand}
                  >
                    Xem thêm
                  </button>
                </div>
              )}
            </div>
            {isExpanded && (
              <button
                className="block w-full bg-transparent px-4 py-2 text-center font-medium text-primary-500 hover:underline"
                onClick={toggleExpand}
              >
                Thu gọn
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;

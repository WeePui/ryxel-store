'use client';

import { memo, useEffect, useState } from 'react';
import Card from '../../UI/Card';
import TabSelector from '../../UI/TabSelector';
import RevenueChart from '../Dashboard/RevenueChart';
import formatMoney from '@/app/_utils/formatMoney';
import AdminDateSelector from '../../UI/AdminDateSelector';
import Loader from '../../UI/Loader';
import { useParams } from 'next/navigation';

export default memo(function CategoryRevenue({ cookies }: { cookies: string }) {
  const { slug } = useParams();
  const [range, setRange] = useState('month');
  const [timeRange, setTimeRange] = useState('');
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/slug/${slug}/summary?${timeRange}&range=${range}`,
        {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies}`,
          },
        }
      );

      if (!response.ok) {
        setData([]);
        setLoading(false);
        return;
      }

      const { data } = await response.json();
      const { sales } = data;
      setTotalSales(data.totalSales);
      setChangeAmount(data.changeAmount);
      setTotalProducts(data.totalProducts);
      setData(sales);
      setLoading(false);
    }

    fetchData();
  }, [range, timeRange, slug, cookies]);

  return (
    <Card
      title="Doanh thu"
      className="flex flex-col flex-grow"
      titleAction={
        <div className="flex items-center gap-4">
          <AdminDateSelector range={range} onSelect={setTimeRange} />
          <TabSelector
            tabLabels={['Theo tháng', 'Theo năm']}
            tabValues={['month', 'year']}
            selectedTab={range}
            onTabSelect={setRange}
          />
        </div>
      }
    >
      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="text-center font-medium text-grey-300">
          Không có dữ liệu
        </div>
      ) : (
        <>
          <RevenueChart data={data} />

          <hr className="mt-4" />
          <div className="flex items-center mt-8 gap-10 justify-around lg:flex-col lg:gap-2 lg:items-start">
            <div className="text-center lg:flex lg:justify-between lg:items-center lg:w-full">
              <div className="text-sm text-gray-500">Tổng doanh thu</div>
              <div className="text-lg font-semibold text-primary-500">
                {formatMoney(totalSales)}
              </div>
            </div>
            <div className="text-center lg:flex lg:justify-between lg:items-center lg:w-full">
              <div className="text-sm text-gray-500">Tăng trưởng</div>
              <div className="text-lg font-semibold text-primary-500">
                {formatMoney(changeAmount)}
              </div>
            </div>
            <div className="text-center lg:flex lg:justify-between lg:items-center lg:w-full">
              <div className="text-sm text-gray-500">Tổng sản phẩm</div>
              <div className="text-lg font-semibold text-primary-500">
                {totalProducts}
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
});

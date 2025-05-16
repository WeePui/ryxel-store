'use client';

import { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import TabSelector from '../../UI/TabSelector';
import PieChart from '../../UI/PieChart';
import AdminDateSelector from '../../UI/AdminDateSelector';
import Loader from '../../UI/Loader';

interface SalesByCategoriesProps {
  cookies: string;
}

export default function SalesByCategories({ cookies }: SalesByCategoriesProps) {
  const [range, setRange] = useState('month');
  const [timeRange, setTimeRange] = useState('');
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dashboard/category-sales?${timeRange}&range=${range}`,
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
      setData(sales);
      setLoading(false);
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, timeRange]);

  return (
    <Card
      title="Doanh số theo danh mục"
      className="flex flex-col gap-6 flex-grow pb-10"
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
        <PieChart data={data} />
      )}
    </Card>
  );
}

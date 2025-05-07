'use client';

import { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import TabSelector from '../../UI/TabSelector';
import BarChart from '../../UI/BarChart';
import AdminDateSelector from '../../UI/AdminDateSelector';
import Loader from '../../UI/Loader';

interface ProductsSoldProps {
  cookies: string;
}

export default function ProductsSold({ cookies }: ProductsSoldProps) {
  const [range, setRange] = useState('month');
  const [timeRange, setTimeRange] = useState('');
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/sold?${timeRange}&range=${range}`,
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

      const { data: apiData } = await response.json();
      const mappedData = apiData.map(
        (item: { name: string; sold: number }) => ({
          name: item.name,
          value: item.sold,
        })
      );
      setData(mappedData);
      setLoading(false);
    }

    fetchData();
  }, [range, timeRange]);

  return (
    <Card
      title="Sản phẩm đã bán"
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
      {loading ? <Loader /> : <BarChart data={data} />}{' '}
    </Card>
  );
}

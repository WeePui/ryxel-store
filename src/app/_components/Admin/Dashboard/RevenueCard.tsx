'use client';

import { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import TabSelector from '../../UI/TabSelector';
import dynamic from 'next/dynamic';
import Loader from '../../UI/Loader';
import AdminDateSelector from '../../UI/AdminDateSelector';
const DynamicRevenueChart = dynamic(() => import('./RevenueChart'), {
  loading: () => <Loader />,
});

interface RevenueCardProps {
  cookies: string;
}

export default function RevenueCard({ cookies }: RevenueCardProps) {
  const [range, setRange] = useState('month');
  const [timeRange, setTimeRange] = useState('');
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dashboard/revenue?${timeRange}&range=${range}`,
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
      const { revenue } = data;
      setData(revenue);
      setLoading(false);
    }

    fetchData();
  }, [range, timeRange]);

  return (
    <Card
      title="Doanh thu"
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
      {loading ? <Loader /> : <DynamicRevenueChart data={data} />}
    </Card>
  );
}

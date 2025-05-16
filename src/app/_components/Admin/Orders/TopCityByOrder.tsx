'use client';

import { useEffect, useState } from 'react';
import AdminDateSelector from '../../UI/AdminDateSelector';
import Card from '../../UI/Card';
import PieChart from '../../UI/PieChart';
import TabSelector from '../../UI/TabSelector';
import Loader from '../../UI/Loader';

// const data = [
//   { name: 'Hà Nội', value: 400 },
//   { name: 'TP.HCM', value: 300 },
//   { name: 'Đà Nẵng', value: 200 },
//   { name: 'Hải Phòng', value: 100 },
//   { name: 'Cần Thơ', value: 50 },
// ];

export default function TopCityByOrder({ authToken }: { authToken: string }) {
  const [range, setRange] = useState('month');
  const [timeRange, setTimeRange] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/top-provinces?${timeRange}&range=${range}`,
        {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        setData([]);
        setLoading(false);
        return;
      }

      const { data } = await response.json();
      setData(data);
      setLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, timeRange]);

  return (
    <Card
      title="Top 6 tỉnh giàu nhất VN"
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

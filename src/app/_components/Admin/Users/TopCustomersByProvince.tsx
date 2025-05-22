'use client';

import Card from '../../UI/Card';
import AdminDateSelector from '../../UI/AdminDateSelector';
import TabSelector from '../../UI/TabSelector';
import { useState } from 'react';
import DonutChart from '../../UI/DonutChart';

const data = [
  { name: 'Hà Nội', value: 100 },
  { name: 'Hồ Chí Minh', value: 200 },
  { name: 'Đà Nẵng', value: 150 },
  { name: 'Hải Phòng', value: 80 },
  { name: 'Cần Thơ', value: 120 },
  { name: 'Nha Trang', value: 90 },
];

export default function TopCustomersByProvince() {
  const [range, setRange] = useState('month');
  const [timeRange, setTimeRange] = useState<string>('year=2023&month=1');

  return (
    <Card
      title="Top 5 người tui luôn tin tưởng"
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
      <DonutChart data={data} isMoney={false} />
    </Card>
  );
}

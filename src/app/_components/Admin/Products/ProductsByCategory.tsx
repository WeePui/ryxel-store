'use client';

import { useState } from 'react';
import Card from '../../UI/Card';
import TabSelector from '../../UI/TabSelector';
import PieChart from '../../UI/PieChart';

export default function ProductsByCategory() {
  const [range, setRange] = useState('day');

  return (
    <Card
      title="Sản phẩm theo danh mục"
      className="flex flex-col gap-6 flex-grow pb-10"
      titleAction={
        <TabSelector
          tabLabels={['Theo ngày', 'Theo tuần', 'Theo tháng']}
          tabValues={['day', 'week', 'month']}
          selectedTab={range}
          onTabSelect={setRange}
        />
      }
    >
      <PieChart />
    </Card>
  );
}

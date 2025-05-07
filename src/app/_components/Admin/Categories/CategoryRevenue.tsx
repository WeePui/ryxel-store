'use client';

import { useState } from 'react';
import Card from '../../UI/Card';
import TabSelector from '../../UI/TabSelector';
import RevenueChart from '../Dashboard/RevenueChart';
import formatMoney from '@/app/_utils/formatMoney';

export default function CategoryRevenue() {
  const [range, setRange] = useState('day');

  return (
    <Card
      title="Doanh thu"
      className="flex flex-col flex-grow "
      titleAction={
        <TabSelector
          tabLabels={['Theo ngày', 'Theo tuần', 'Theo tháng']}
          tabValues={['day', 'week', 'month']}
          selectedTab={range}
          onTabSelect={setRange}
        />
      }
    >
      <RevenueChart />
      <hr className="mt-4" />
      <div className="flex items-center mt-2 gap-10 justify-around lg:flex-col lg:gap-2 lg:items-start">
        <div className="text-center lg:flex lg:justify-between lg:items-center lg:w-full">
          <div className="text-sm text-gray-500">Tổng doanh thu</div>
          <div className="text-lg font-semibold text-gray-800">
            {formatMoney(1000000)}
          </div>
        </div>
        <div className="text-center lg:flex lg:justify-between lg:items-center lg:w-full">
          <div className="text-sm text-gray-500">Tăng trưởng</div>
          <div className="text-lg font-semibold text-gray-800">
            {formatMoney(1000000)}
          </div>
        </div>
        <div className="text-center lg:flex lg:justify-between lg:items-center lg:w-full">
          <div className="text-sm text-gray-500">Tổng sản phẩm</div>
          <div className="text-lg font-semibold text-gray-800">40000</div>
        </div>
      </div>
    </Card>
  );
}

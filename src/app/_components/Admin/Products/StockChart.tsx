'use client';

import Card from '../../UI/Card';
import DonutChart from '../../UI/DonutChart';

interface StockChartProps {
  data: {
    inStock: number;
    outStock: number;
  };
}

export default function StockChart({ data }: StockChartProps) {
  const chartData = [
    { name: 'Còn hàng', value: data.inStock, color: '#4CAF50' },
    { name: 'Hết hàng', value: data.outStock, color: '#F44336' },
  ];

  return (
    <Card title="Tồn kho" className="flex flex-col gap-6 flex-grow pb-10">
      <DonutChart data={chartData} />
    </Card>
  );
}

'use client';

import { formatMoneyCompact } from '@/app/_utils/formatMoney';
import { memo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useWindowSize } from '@/app/_hooks/useWindowSize';

const COLOR_PALETTE = [
  '#FF6384', // đỏ hồng
  '#36A2EB', // xanh dương
  '#FFCE56', // vàng
  '#4BC0C0', // xanh ngọc
  '#9966FF', // tím
  '#FF9F40', // cam
  '#E7E9ED', // xám nhạt
];

interface StockStatusDonutChartProps {
  data: Array<{ name: string; value: number }> | undefined;
  isMoney?: boolean;
}

function StockStatusDonutChart({
  data,
  isMoney = true,
}: StockStatusDonutChartProps) {
  const { width } = useWindowSize();
  const isSmall = width < 300;

  const safeData =
    data?.map((item, index) => ({
      ...item,
      color: COLOR_PALETTE[index % COLOR_PALETTE.length],
    })) ?? [];

  if (safeData.length === 0) {
    return (
      <div className="text-center font-medium text-grey-300">
        Không có dữ liệu
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <RechartPieChart>
          <Pie
            data={safeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            label={
              isMoney
                ? !isSmall
                  ? ({ value }) => formatMoneyCompact(value)
                  : undefined
                : ({ value }) => value
            }
          >
            {safeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              isMoney ? `${formatMoneyCompact(value)}` : value,
              name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconSize={10}
            iconType="circle"
            formatter={(value: string) => (
              <span style={{ textTransform: 'capitalize' }}>{value}</span>
            )}
          />
        </RechartPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(StockStatusDonutChart);

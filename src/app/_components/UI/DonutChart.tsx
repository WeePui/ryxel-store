'use client';

import { memo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useWindowSize } from '@/app/_hooks/useWindowSize';

interface StockStatusDonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

function StockStatusDonutChart({ data }: StockStatusDonutChartProps) {
  const { width } = useWindowSize();
  const isSmall = width < 300;

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            label={
              !isSmall
                ? ({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                : undefined
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => value.toLocaleString('vi-VN')}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(StockStatusDonutChart);

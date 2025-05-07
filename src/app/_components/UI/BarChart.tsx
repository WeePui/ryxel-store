'use client';

import { useWindowSize } from '@/app/_hooks/useWindowSize';
import { memo } from 'react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

interface BarChartProps {
  data: Array<{ name: string; value: number }> | undefined;
}

const formatLegendLabel = (value: string) => {
  const map: Record<string, string> = {
    value: 'Số lượng đã bán',
    // nếu sau này có thêm bar khác → thêm ở đây
    // stock: 'Tồn kho'
  };

  return map[value] ?? value;
};

function BarChart({ data }: BarChartProps) {
  const { width } = useWindowSize();
  const isSmallScreen = width < 768;

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ dy: 10, fontSize: isSmallScreen ? 10 : 12 }}
          />
          {!isSmallScreen && (
            <YAxis
              tickFormatter={(value) => value.toLocaleString('vi-VN')}
              tick={{ dx: -10, fontSize: 12 }}
            />
          )}
          <Tooltip
            formatter={(value: number) => value.toLocaleString('vi-VN')}
          />
          <Legend
            verticalAlign="top"
            align="right"
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
            formatter={formatLegendLabel}
          />
          <Bar dataKey="value" fill="#f57615" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(BarChart);

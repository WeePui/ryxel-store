'use client';

import { useWindowSize } from '@/app/_hooks/useWindowSize';
import formatMoney from '@/app/_utils/formatMoney';
import { memo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

// const data = [
//   { name: 'Page A', revenue: 4000 },
//   { name: 'Page B', revenue: 3000 },
//   { name: 'Page C', revenue: 2000 },
//   { name: 'Page D', revenue: 2780 },
//   { name: 'Page E', revenue: 1890 },
//   { name: 'Page F', revenue: 2390 },
//   { name: 'Page G', revenue: 3490 },
// ];

interface RevenueChartProps {
  data: Array<{ name: string; value: number }> | undefined;
}

const formatLegendLabel = (value: string) => {
  const map: Record<string, string> = {
    value: 'Doanh thu (VND)',
    // nếu sau này có thêm line khác → thêm ở đây
    // profit: 'Lợi nhuận (VND)'
  };

  return map[value] ?? value;
};

function RevenueChart({ data }: RevenueChartProps) {
  const { width } = useWindowSize();
  const isSmallScreen = width < 768;

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ dy: 10, fontSize: isSmallScreen ? 10 : 12 }}
          />
          {!isSmallScreen && (
            <YAxis
              width={90}
              tickFormatter={(value) => formatMoney(value)}
              tick={{ dx: -10, fontSize: 12 }}
            />
          )}
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
            formatter={formatLegendLabel}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(RevenueChart);

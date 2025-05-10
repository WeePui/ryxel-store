'use client';

import { useWindowSize } from '@/app/_hooks/useWindowSize';
import { formatMoneyCompact } from '@/app/_utils/formatMoney';
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

const formatLegendLabel = (value: string) => {
  const map: Record<string, string> = {
    value: 'Số lượng đã bán',
    sales: 'Doanh số',
    revenue: 'Doanh thu',
    expense: 'Chi phí',
    // nếu sau này có thêm bar khác → thêm ở đây
    // stock: 'Tồn kho'
  };

  return map[value] ?? value;
};

interface BarChartProps {
  data: Array<Record<string, number | string>> | undefined;
  keys: string[]; // các trường muốn hiển thị như ['sales', 'revenue']
}

function BarChart({ data, keys }: BarChartProps) {
  const { width } = useWindowSize();
  const isSmallScreen = width < 768;
  const moneyFields = ['sales', 'revenue', 'expense'];

  const colors = ['#f57615', '#8884d8', '#82ca9d', '#ffc658'];

  const isMoneyChart = keys.some((key) => moneyFields.includes(key));

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
              tickFormatter={(value) =>
                isMoneyChart
                  ? formatMoneyCompact(value)
                  : value.toLocaleString('vi-VN')
              }
              tick={{ dx: -10, fontSize: 12 }}
            />
          )}
          <Tooltip
            formatter={(value: number) =>
              isMoneyChart
                ? value.toLocaleString('vi-VN') + ' ₫'
                : value.toLocaleString('vi-VN')
            }
          />
          <Legend
            verticalAlign="top"
            align="right"
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
            formatter={formatLegendLabel}
          />

          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(BarChart);

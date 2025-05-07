import { memo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// const data = [
//   { name: 'Thời trang', value: 4000, color: '#FF6384' },
//   { name: 'Điện tử', value: 3000, color: '#36A2EB' },
//   { name: 'Đồ gia dụng', value: 2000, color: '#FFCE56' },
//   { name: 'Sách', value: 2780, color: '#FF6384' },
//   { name: 'Thể thao', value: 1890, color: '#36A2EB' },
// ];

const COLOR_PALETTE = [
  '#FF6384', // đỏ hồng
  '#36A2EB', // xanh dương
  '#FFCE56', // vàng
  '#4BC0C0', // xanh ngọc
  '#9966FF', // tím
  '#FF9F40', // cam
  '#E7E9ED', // xám nhạt
];

interface PieChartProps {
  data: Array<{ name: string; value: number }> | undefined;
}

function PieChart({ data }: PieChartProps) {
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
        <RechartPieChart width={400} height={400}>
          <Pie
            data={safeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {safeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            iconSize={10}
            iconType="circle"
            style={{ textTransform: 'capitalize' }}
          />
          <Tooltip />
        </RechartPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(PieChart);

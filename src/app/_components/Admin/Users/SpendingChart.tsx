"use client";

import Card from "@/app/_components/UI/Card";
import formatMoney from "@/app/_utils/formatMoney";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpendingData {
  _id: { year: number; month: number };
  totalSpent: number;
  orderCount: number;
}

interface SpendingChartProps {
  data: SpendingData[];
}

export default function SpendingChart({ data }: SpendingChartProps) {
  const chartData = data.map((item) => ({
    month: `${item._id.month}/${item._id.year}`,
    spending: item.totalSpent,
    orders: item.orderCount,
  }));

  return (
    <Card title="Chi tiêu theo tháng (6 tháng gần nhất)">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="month" />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => formatMoney(value)}
            />
            <YAxis yAxisId="right" orientation="right" tickLine={false} />
            <Tooltip
              formatter={(value, name) => {
                if (name === "spending") return formatMoney(value as number);
                return value;
              }}
              labelFormatter={(label) => `Tháng ${label}`}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="spending"
              name="Chi tiêu"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              name="Số đơn hàng"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

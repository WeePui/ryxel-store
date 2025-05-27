"use client";

import Card from "@/app/_components/UI/Card";
import formatMoney from "@utils/formatMoney";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CategoryData {
  _id: string;
  categoryName: string;
  totalSpent: number;
  itemCount: number;
}

interface FavoriteCategoriesChartProps {
  data: CategoryData[];
  colors: string[];
}

export default function FavoriteCategoriesChart({
  data,
  colors,
}: FavoriteCategoriesChartProps) {
  const chartData = data.slice(0, 5).map((cat, index) => ({
    name: cat.categoryName,
    value: cat.totalSpent,
    fill: colors[index % colors.length],
    items: cat.itemCount,
  }));

  return (
    <Card title="Danh mục sản phẩm yêu thích">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(value) => formatMoney(value)}
            />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip
              formatter={(value, name) => {
                if (name === "value") return formatMoney(value as number);
                return value;
              }}
              labelFormatter={(label) => `Danh mục: ${label}`}
            />
            <Bar dataKey="value" name="Tổng chi tiêu" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

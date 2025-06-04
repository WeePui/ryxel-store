"use client";

import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import AdminDateSelector from "../../UI/AdminDateSelector";
import TabSelector from "../../UI/TabSelector";
import Loader from "../../UI/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  FaUser,
  FaUserCheck,
  FaUsersCog,
  FaUserShield,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

interface StatItem {
  value: number;
  changeRate: number;
}

interface UserStatsData {
  totalUsers: StatItem;
  totalActiveUsers: StatItem;
  totalVerifiedUsers: StatItem;
  totalAdminUsers: StatItem;
}

interface UserStatisticsProps {
  authToken: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function UserStatistics({ authToken }: UserStatisticsProps) {
  const [range, setRange] = useState("month");
  const [timeRange, setTimeRange] = useState<string>("year=2023&month=1");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStatsData | null>(null);
  const [chartView, setChartView] = useState<"bar" | "pie" | "line" | "radar">(
    "bar",
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users/users-summary?${timeRange}&range=${range}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, timeRange]);

  const statItems = [
    {
      title: "Tổng số người dùng",
      data: stats?.totalUsers,
      icon: <FaUser className="text-blue-500" size={20} />,
      color: "#0088FE",
    },
    {
      title: "Người dùng hoạt động",
      data: stats?.totalActiveUsers,
      icon: <FaUserCheck className="text-green-500" size={20} />,
      color: "#00C49F",
    },
    {
      title: "Người dùng đã xác thực",
      data: stats?.totalVerifiedUsers,
      icon: <FaUsersCog className="text-amber-500" size={20} />,
      color: "#FFBB28",
    },
    {
      title: "Quản trị viên",
      data: stats?.totalAdminUsers,
      icon: <FaUserShield className="text-red-500" size={20} />,
      color: "#FF8042",
    },
  ];

  const chartData = statItems.map((item) => ({
    name: item.title,
    value: item.data?.value || 0,
    fill: item.color,
  }));
  const nextChartView = () => {
    setChartView((prev) => {
      if (prev === "bar") return "pie";
      if (prev === "pie") return "line";
      if (prev === "line") return "radar";
      return "bar";
    });
  };

  return (
    <Card
      title="Thống kê người dùng"
      className="flex flex-grow flex-col gap-6"
      titleAction={
        <div className="flex items-center gap-4">
          <AdminDateSelector range={range} onSelect={setTimeRange} />
          <TabSelector
            tabLabels={["Theo tháng", "Theo năm"]}
            tabValues={["month", "year"]}
            selectedTab={range}
            onTabSelect={setRange}
          />
        </div>
      }
    >
      {loading ? (
        <Loader />
      ) : !stats ? (
        <div className="text-center font-medium text-grey-300">
          Không có dữ liệu
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 md:grid-cols-2">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-md border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  {item.icon}
                  <span
                    className={`flex items-center text-sm ${
                      (item.data?.changeRate || 0) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {(item.data?.changeRate || 0) >= 0 ? (
                      <FaArrowUp className="mr-1" />
                    ) : (
                      <FaArrowDown className="mr-1" />
                    )}
                    {Math.abs(item.data?.changeRate || 0)}%
                  </span>
                </div>
                <h3 className="text-sm text-gray-500">{item.title}</h3>
                <span className="mt-1 text-2xl font-bold">
                  {item.data?.value || 0}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Biểu đồ phân bố người dùng
              </h3>
              <button
                onClick={nextChartView}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm transition-colors hover:bg-gray-200"
              >
                {chartView === "bar"
                  ? "Xem dạng tròn"
                  : chartView === "pie"
                    ? "Xem dạng đường"
                    : chartView === "line"
                      ? "Xem dạng radar"
                      : "Xem dạng cột"}
              </button>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartView === "bar" ? (
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                ) : chartView === "pie" ? (
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : chartView === "line" ? (
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                ) : (
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={chartData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Số lượng"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

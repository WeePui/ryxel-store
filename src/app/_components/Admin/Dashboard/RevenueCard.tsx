"use client";

import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import TabSelector from "../../UI/TabSelector";
import dynamic from "next/dynamic";
import Loader from "../../UI/Loader";
import AdminDateSelector from "../../UI/AdminDateSelector";
const DynamicRevenueChart = dynamic(() => import("./RevenueChart"), {
  loading: () => <Loader />,
});

interface RevenueCardProps {
  cookies: string;
}

export default function RevenueCard({ cookies }: RevenueCardProps) {
  const [range, setRange] = useState("month");
  const [timeRange, setTimeRange] = useState("");
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dashboard/revenue?${timeRange}&range=${range}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      const { revenue } = data;
      setData(revenue || []);
    } catch (err) {
      console.error("Error fetching revenue:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, timeRange]);

  return (
    <Card
      title="Doanh thu"
      className="flex flex-grow flex-col gap-6 pb-10"
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
      ) : error ? (
        <div className="text-center">
          <div className="mb-2 font-medium text-red-500">{error}</div>
          <button
            onClick={fetchData}
            className="rounded bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
          >
            Thử lại
          </button>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center font-medium text-grey-300">
          Không có dữ liệu
        </div>
      ) : (
        <DynamicRevenueChart data={data} />
      )}
    </Card>
  );
}

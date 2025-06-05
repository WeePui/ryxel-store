"use client";

import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import AdminDateSelector from "../../UI/AdminDateSelector";
import TabSelector from "../../UI/TabSelector";
import DonutChart from "../../UI/DonutChart";
import Loader from "../../UI/Loader";
import Button from "@components/UI/Button";

// const data = [
//   { name: 'Chờ xác nhận', value: 400 },
//   { name: 'Đang giao hàng', value: 300 },
//   { name: 'Đã giao hàng', value: 200 },
//   { name: 'Đã hủy', value: 100 },
//   { name: 'Hoàn trả', value: 50 },
// ];

export default function OrderByStatusChart({
  authToken,
}: {
  authToken: string;
}) {
  const [range, setRange] = useState("month");
  const [timeRange, setTimeRange] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams();
      params.append("range", range);
      if (timeRange) {
        const timeParams = new URLSearchParams(timeRange);
        timeParams.forEach((value, key) => {
          params.append(key, value);
        });
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/order-by-status?${params.toString()}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      setData(data || []);
    } catch (error) {
      console.error("Error fetching order by status data:", error);
      setError(true);
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
      title="Đơn hàng theo trạng thái"
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
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <p className="text-red-500">
            Không thể tải dữ liệu. Vui lòng thử lại.
          </p>
          <Button onClick={fetchData}>Thử lại</Button>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center font-medium text-grey-300">
          Không có dữ liệu
        </div>
      ) : (
        <DonutChart data={data} isMoney={false} />
      )}
    </Card>
  );
}

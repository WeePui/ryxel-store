"use client";

import { useEffect, useState } from "react";
import AdminDateSelector from "../../UI/AdminDateSelector";
import Card from "../../UI/Card";
import PieChart from "../../UI/PieChart";
import TabSelector from "../../UI/TabSelector";
import Loader from "../../UI/Loader";
import Button from "@components/UI/Button";

// const data = [
//   { name: 'Hà Nội', value: 400 },
//   { name: 'TP.HCM', value: 300 },
//   { name: 'Đà Nẵng', value: 200 },
//   { name: 'Hải Phòng', value: 100 },
//   { name: 'Cần Thơ', value: 50 },
// ];

export default function TopCityByOrder({ authToken }: { authToken: string }) {
  const [range, setRange] = useState("month");
  const [timeRange, setTimeRange] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders/top-provinces?${params.toString()}`,
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      setData(data || []);
    } catch (err) {
      console.error("Error fetching top cities:", err);
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
      title="Top 6 tỉnh giàu nhất VN"
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
          <div className="mb-4 font-medium text-red-500">{error}</div>
          <Button onClick={fetchData}>Thử lại</Button>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center font-medium text-grey-300">
          Không có dữ liệu
        </div>
      ) : (
        <PieChart data={data} />
      )}
    </Card>
  );
}

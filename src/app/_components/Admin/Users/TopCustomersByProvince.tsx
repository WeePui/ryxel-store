"use client";

import Card from "../../UI/Card";
import AdminDateSelector from "../../UI/AdminDateSelector";
import TabSelector from "../../UI/TabSelector";
import { useEffect, useState } from "react";
import DonutChart from "../../UI/DonutChart";
import Loader from "../../UI/Loader";
import Button from "@components/UI/Button";

// const data = [
//   { name: "Hà Nội", value: 100 },
//   { name: "Hồ Chí Minh", value: 200 },
//   { name: "Đà Nẵng", value: 150 },
//   { name: "Hải Phòng", value: 80 },
//   { name: "Cần Thơ", value: 120 },
//   { name: "Nha Trang", value: 90 },
// ];

interface TopCustomersByProvinceProps {
  authToken: string;
}

export default function TopCustomersByProvince({
  authToken,
}: TopCustomersByProvinceProps) {
  const [range, setRange] = useState("month");
  const [timeRange, setTimeRange] = useState<string>("");
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users/top-provinces?${params.toString()}`,
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
      setData(data);
    } catch (error) {
      console.error("Error fetching top customers by province data:", error);
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
      title="Top 6 tỉnh đông dân nhất Ryxel"
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
          <div className="mb-4 font-medium text-red-500">
            Không thể tải dữ liệu. Vui lòng thử lại.
          </div>
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

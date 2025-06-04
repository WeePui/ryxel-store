"use client";

import Card from "../../UI/Card";
import AdminDateSelector from "../../UI/AdminDateSelector";
import TabSelector from "../../UI/TabSelector";
import { useEffect, useState } from "react";
import DonutChart from "../../UI/DonutChart";
import Loader from "../../UI/Loader";

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

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users/top-provinces?${timeRange}&range=${range}`,
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
        setData([]);
        setLoading(false);
        return;
      }

      const { data } = await response.json();
      setData(data);
      setLoading(false);
    }

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

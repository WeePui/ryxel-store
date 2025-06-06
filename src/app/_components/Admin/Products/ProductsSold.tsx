"use client";

import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import TabSelector from "../../UI/TabSelector";
import BarChart from "../../UI/BarChart";
import AdminDateSelector from "../../UI/AdminDateSelector";
import Loader from "../../UI/Loader";
import Button from "@components/UI/Button";

interface ProductsSoldProps {
  cookies: string;
}

export default function ProductsSold({ cookies }: ProductsSoldProps) {
  const [range, setRange] = useState("month");
  const [timeRange, setTimeRange] = useState("");
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/sold?${params.toString()}`,
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
        throw new Error("Failed to fetch data");
      }
      const { data: apiData } = await response.json();
      const mappedData = apiData.map(
        (item: { name: string; sold: number }) => ({
          name: item.name,
          value: item.sold,
        }),
      );
      setData(mappedData);
    } catch (error) {
      console.error("Error fetching products sold data:", error);
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
      title="Sản phẩm đã bán"
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
        <BarChart data={data} keys={["value"]} />
      )}
    </Card>
  );
}

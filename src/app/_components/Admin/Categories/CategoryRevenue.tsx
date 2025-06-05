"use client";

import { memo, useEffect, useState } from "react";
import Card from "../../UI/Card";
import TabSelector from "../../UI/TabSelector";
import RevenueChart from "../Dashboard/RevenueChart";
import formatMoney from "@/app/_utils/formatMoney";
import AdminDateSelector from "../../UI/AdminDateSelector";
import Loader from "../../UI/Loader";
import { useParams } from "next/navigation";

export default memo(function CategoryRevenue({ cookies }: { cookies: string }) {
  const { slug } = useParams();
  const [range, setRange] = useState("month");
  const [timeRange, setTimeRange] = useState("");
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('range', range);
      if (timeRange) {
        const timeParams = new URLSearchParams(timeRange);
        timeParams.forEach((value, key) => {
          params.append(key, value);
        });
      }
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/slug/${slug}/summary?${params.toString()}`,
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
      const { sales } = data;
      setTotalSales(data.totalSales || 0);
      setChangeAmount(data.changeAmount || 0);
      setTotalProducts(data.totalProducts || 0);
      setData(sales || []);
    } catch (err) {
      console.error("Error fetching category revenue:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      setData([]);
      setTotalSales(0);
      setChangeAmount(0);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, timeRange, slug, cookies]);

  return (
    <Card
      title="Doanh thu"
      className="flex flex-grow flex-col"
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
        <>
          <RevenueChart data={data} />

          <hr className="mt-4" />
          <div className="mt-8 flex items-center justify-around gap-10 lg:flex-col lg:items-start lg:gap-2">
            <div className="text-center lg:flex lg:w-full lg:items-center lg:justify-between">
              <div className="text-sm text-gray-500">Tổng doanh thu</div>
              <div className="text-lg font-semibold text-primary-500">
                {formatMoney(totalSales)}
              </div>
            </div>
            <div className="text-center lg:flex lg:w-full lg:items-center lg:justify-between">
              <div className="text-sm text-gray-500">Tăng trưởng</div>
              <div className="text-lg font-semibold text-primary-500">
                {formatMoney(changeAmount)}
              </div>
            </div>
            <div className="text-center lg:flex lg:w-full lg:items-center lg:justify-between">
              <div className="text-sm text-gray-500">Tổng sản phẩm</div>
              <div className="text-lg font-semibold text-primary-500">
                {totalProducts}
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
});

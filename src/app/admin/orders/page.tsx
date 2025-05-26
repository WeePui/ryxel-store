import RevenueCard from "@/app/_components/Admin/Dashboard/RevenueCard";
import OrderByStatusChart from "@/app/_components/Admin/Orders/OrderByStatusChart";
import OrderFilter from "@/app/_components/Admin/Orders/OrderFilter";
import OrderStatCard from "@/app/_components/Admin/Orders/OrderStatCard";
import OrderTable from "@/app/_components/Admin/Orders/OrderTable";
import TopCityByOrder from "@/app/_components/Admin/Orders/TopCityByOrder";
import FilterButton from "@/app/_components/Products/FilterButton";
import SortSelector from "@/app/_components/Products/SortSelector";
import { getAdminOrders, getOrderSummaryStats } from "@/app/_libs/apiServices";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";
  const filter = await searchParams;

  const [adminOrdersData, orderSummaryData] = await Promise.all([
    getAdminOrders(token, filter),
    getOrderSummaryStats(token),
  ]);

  const { orders, resultsPerPage, totalResults } = adminOrdersData;
  const {
    totalOrders,
    totalPendingOrders,
    totalShippedOrders,
    totalDeliveredOrders,
    totalCancelOrders,
  } = orderSummaryData;

  return (
    <div className="grid grid-cols-4 gap-6 p-6 xl:grid-cols-2 md:grid-cols-1">
      <div className="col-span-full">
        <OrderStatCard
          totalOrders={totalOrders}
          totalPendingOrders={totalPendingOrders}
          totalCancelOrders={totalCancelOrders}
          totalShippedOrders={totalShippedOrders}
          totalDeliveredOrders={totalDeliveredOrders}
        />
      </div>
      <div className="col-span-1 xl:col-span-full">
        <TopCityByOrder authToken={token} />
      </div>
      <div className="col-span-2 w-full overflow-x-auto xl:col-span-full">
        <RevenueCard cookies={token} />
      </div>
      <div className="col-span-1 xl:col-span-full">
        <OrderByStatusChart authToken={token} />
      </div>
      <div className="cols-span-full hidden py-4 lg:block">
        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex-[6]">
            <SortSelector>
              <option value="createdAt">Ngày tạo</option>
              <option value="updatedAt">Ngày cập nhật</option>
              <option value="-total">Tổng giá trị (cao - thấp)</option>
              <option value="total">Tổng giá trị (thấp - cao)</option>
            </SortSelector>
          </div>
          <div className="whitespace-nowrap md:flex-[4]">
            <FilterButton>
              <OrderFilter isMobile />
            </FilterButton>
          </div>
        </div>
      </div>
      <div className="col-span-full items-end lg:hidden">
        <SortSelector>
          <option value="createdAt">Ngày tạo</option>
          <option value="updatedAt">Ngày cập nhật</option>
          <option value="-total">Tổng giá trị (cao - thấp)</option>
          <option value="total">Tổng giá trị (thấp - cao)</option>
        </SortSelector>
      </div>
      <div className="col-span-full grid grid-cols-[20fr_80fr] gap-x-6 xl:grid-cols-[25fr_75fr] lg:grid-cols-1">
        <div className="sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-auto rounded-xl shadow-md scrollbar-hide lg:hidden">
          <OrderFilter />
        </div>
        <OrderTable
          data={orders}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
        />
      </div>
    </div>
  );
}

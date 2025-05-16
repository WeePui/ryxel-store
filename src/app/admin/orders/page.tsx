import RevenueCard from '@/app/_components/Admin/Dashboard/RevenueCard';
import OrderByStatusChart from '@/app/_components/Admin/Orders/OrderByStatusChart';
import OrderFilter from '@/app/_components/Admin/Orders/OrderFilter';
import OrderStatCard from '@/app/_components/Admin/Orders/OrderStatCard';
import OrderTable from '@/app/_components/Admin/Orders/OrderTable';
import TopCityByOrder from '@/app/_components/Admin/Orders/TopCityByOrder';
import FilterButton from '@/app/_components/Products/FilterButton';
import SortSelector from '@/app/_components/Products/SortSelector';
import Card from '@/app/_components/UI/Card';
import { getAdminOrders, getOrderSummaryStats } from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';

interface PageProps {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value || '';
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
    <div className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 p-6 gap-6">
      <div className="col-span-full">
        <OrderStatCard
          totalOrders={totalOrders}
          totalPendingOrders={totalPendingOrders}
          totalCancelOrders={totalCancelOrders}
          totalShippedOrders={totalShippedOrders}
          totalDeliveredOrders={totalDeliveredOrders}
        />
      </div>
      <div className="col-span-1">
        <TopCityByOrder authToken={token} />
      </div>
      <div className="col-span-2 xl:col-span-4 w-full overflow-x-auto">
        <RevenueCard cookies={token} />
      </div>
      <div className="col-span-1">
        <OrderByStatusChart authToken={token} />
      </div>
      <div className="hidden lg:block py-4 cols-span-full">
        <div className="hidden lg:flex gap-2 items-center">
          <div className="flex-[6]">
            <SortSelector>
              <option value="createdAt">Ngày tạo</option>
              <option value="updatedAt">Ngày cập nhật</option>
              <option value="-total">Tổng giá trị (cao - thấp)</option>
              <option value="total">Tổng giá trị (thấp - cao)</option>
            </SortSelector>
          </div>
          <div className="md:flex-[4] whitespace-nowrap">
            <FilterButton>
              <OrderFilter isMobile />
            </FilterButton>
          </div>
        </div>
      </div>
      <div className="lg:hidden col-span-full items-end">
        <SortSelector>
          <option value="createdAt">Ngày tạo</option>
          <option value="updatedAt">Ngày cập nhật</option>
          <option value="-total">Tổng giá trị (cao - thấp)</option>
          <option value="total">Tổng giá trị (thấp - cao)</option>
        </SortSelector>
      </div>
      <div className="grid grid-cols-[20fr_80fr] xl:grid-cols-[25fr_75fr] lg:grid-cols-1 gap-x-6 col-span-full">
        <div className="lg:hidden sticky top-4 max-h-[calc(100vh-2rem)] h-fit shadow-md rounded-xl overflow-auto scrollbar-hide">
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

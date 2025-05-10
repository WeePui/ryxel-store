import OrderSummary from '@/app/_components/Admin/Dashboard/OrderSummary';
import RevenueCard from '@/app/_components/Admin/Dashboard/RevenueCard';
import SalesByCategories from '@/app/_components/Admin/Dashboard/SalesByCategories';
import StatCard from '@/app/_components/Admin/Dashboard/StatCard';
import TopCustomers from '@/app/_components/Admin/Dashboard/TopCustomers';
import TopSellingProducts from '@/app/_components/Admin/Dashboard/TopSellingProducts';
import { getDashboardStats, getRecentOrders } from '@/app/_libs/apiServices';
import { formatMoneyCompact } from '@/app/_utils/formatMoney';
import { cookies } from 'next/headers';
import { FaBoxes, FaDollarSign, FaReceipt, FaUser } from 'react-icons/fa';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value || '';
  if (!token) {
    throw new Error('No token found');
  }

  const { data: dashboardStatsData } = await getDashboardStats({
    value: token,
  });
  const { data: recentOrders } = await getRecentOrders({
    value: token,
  });

  return (
    <div className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 p-6 gap-6">
      <div className="flex gap-4 col-span-4 w-full flex-wrap flex-shrink-0">
        <StatCard
          title="Tổng doanh số"
          value={formatMoneyCompact(dashboardStatsData.sales.value)}
          icon={<FaDollarSign />}
          iconColor="#4F46E5"
          changeRate={dashboardStatsData.sales.changeRate}
        />
        <StatCard
          title="Tổng sản phẩm"
          value={dashboardStatsData.totalProducts.value}
          iconColor="#d6cc0e"
          changeRate={dashboardStatsData.totalProducts.changeRate}
          icon={<FaBoxes />}
        />
        <StatCard
          title="Tổng khách hàng"
          value={dashboardStatsData.totalUsers.value}
          iconColor="#f04fd8"
          changeRate={dashboardStatsData.totalUsers.changeRate}
          icon={<FaUser />}
        />
        <StatCard
          title="Tổng đơn hàng"
          value={dashboardStatsData.totalOrders.value}
          iconColor="#a71e1e"
          changeRate={dashboardStatsData.totalOrders.changeRate}
          icon={<FaReceipt />}
        />
      </div>
      <div className="xl:col-span-4">
        <TopCustomers cookies={token} />
      </div>
      <div className="col-span-2 xl:col-span-4 w-full overflow-x-auto">
        <RevenueCard cookies={token} />
      </div>
      <div className="xl:col-span-4">
        <SalesByCategories cookies={token} />
      </div>
      <div className="col-span-2 xl:col-span-4">
        <TopSellingProducts />
      </div>
      <div className="col-span-4">
        <OrderSummary data={recentOrders} />
      </div>
    </div>
  );
}

import OrderSummary from "@/app/_components/Admin/Dashboard/OrderSummary";
import RevenueCard from "@/app/_components/Admin/Dashboard/RevenueCard";
import StatCard from "@/app/_components/Admin/Dashboard/StatCard";
import { getDashboardStats, getRecentOrders } from "@/app/_libs/apiServices";
import { formatMoneyCompact } from "@/app/_utils/formatMoney";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FaBoxes, FaDollarSign, FaReceipt, FaUser } from "react-icons/fa";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";
import { SafeSalesByCategories, SafeTopCustomers } from "@/app/_components/UI/AdminErrorBoundaryWrappers";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value || "";
  if (!token) {
    notFound();
  }

  const dashboardStatsResponse = await getDashboardStats({
    value: token,
  });
  
  if (dashboardStatsResponse.status === "error") {
    return <ApiErrorDisplay error={dashboardStatsResponse} title="Failed to Load Dashboard Stats" />;
  }

  const recentOrdersResponse = await getRecentOrders({
    value: token,
  });

  if (recentOrdersResponse.status === "error") {
    return <ApiErrorDisplay error={recentOrdersResponse} title="Failed to Load Recent Orders" />;
  }

  const { data: dashboardStatsData } = dashboardStatsResponse;
  const { data: recentOrders } = recentOrdersResponse;

  return (
    <div className="grid grid-cols-4 gap-6 p-6 xl:grid-cols-2 md:grid-cols-1">
      <div className="col-span-4 flex w-full flex-shrink-0 flex-wrap gap-4">
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
      </div>      <div className="xl:col-span-4">
        <SafeTopCustomers cookies={token} />
      </div>
      <div className="col-span-2 w-full overflow-x-auto xl:col-span-4">
        <RevenueCard cookies={token} />
      </div>
      <div className="xl:col-span-4">
        <SafeSalesByCategories cookies={token} />
      </div>
      <div className="col-span-4">
        <OrderSummary data={recentOrders} />
      </div>
    </div>
  );
}

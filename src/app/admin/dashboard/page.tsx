import OrderSummary from "@/app/_components/Admin/Dashboard/OrderSummary";
import RevenueCard from "@/app/_components/Admin/Dashboard/RevenueCard";
import StatCard from "@/app/_components/Admin/Dashboard/StatCard";
import { getDashboardStats, getRecentOrders } from "@/app/_libs/apiServices";
import { formatMoneyCompact } from "@/app/_utils/formatMoney";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FaBoxes, FaDollarSign, FaReceipt, FaUser } from "react-icons/fa";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";
import {
  SafeSalesByCategories,
  SafeTopCustomers,
} from "@/app/_components/UI/AdminErrorBoundaryWrappers";

export default async function Page() {
  try {
    console.log("Dashboard page: Starting to load");

    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value || "";

    console.log("Dashboard page: Token found:", !!token);

    if (!token) {
      console.log("Dashboard page: No token, redirecting to 404");
      notFound();
    }

    console.log("Dashboard page: Fetching dashboard stats");
    const dashboardStatsResponse = await getDashboardStats({
      value: token,
    });

    console.log(
      "Dashboard page: Dashboard stats response status:",
      dashboardStatsResponse.status,
    );

    if (dashboardStatsResponse.status === "error") {
      console.error(
        "Dashboard page: Dashboard stats error:",
        dashboardStatsResponse.message,
      );
      return (
        <ApiErrorDisplay
          error={dashboardStatsResponse}
          title="Failed to Load Dashboard Stats"
        />
      );
    }

    console.log("Dashboard page: Fetching recent orders");
    const recentOrdersResponse = await getRecentOrders({
      value: token,
    });

    console.log(
      "Dashboard page: Recent orders response status:",
      recentOrdersResponse.status,
    );

    if (recentOrdersResponse.status === "error") {
      console.error(
        "Dashboard page: Recent orders error:",
        recentOrdersResponse.message,
      );
      return (
        <ApiErrorDisplay
          error={recentOrdersResponse}
          title="Failed to Load Recent Orders"
        />
      );
    }

    const { data: dashboardStatsData } = dashboardStatsResponse;
    const { data: recentOrders } = recentOrdersResponse;

    console.log("Dashboard page: Data loaded successfully, rendering page");

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
        </div>{" "}
        <div className="xl:col-span-4">
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
        </div>{" "}
      </div>
    );
  } catch (error) {
    console.error("Dashboard page: Unexpected error occurred:", error);
    throw new Error(
      `Dashboard loading failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

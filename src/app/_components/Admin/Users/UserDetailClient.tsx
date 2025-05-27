"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserAnalytics,
  getUserOrderHistory,
  updateUserStatus,
} from "@/app/_libs/apiServices";
import { User } from "@/app/_types/user";
import { Order } from "@/app/_types/order";
import formatMoney from "@/app/_utils/formatMoney";
import Button from "@/app/_components/UI/Button";
import {
  FaArrowLeft,
  FaChartLine,
  FaShoppingCart,
  FaStar,
  FaGift,
} from "react-icons/fa";

// Import our new components
import UserProfileCard from "./UserProfileCard";
import StatCard from "./StatCard";
import SpendingChart from "./SpendingChart";
import OrderStatusChart from "./OrderStatusChart";
import FavoriteCategoriesChart from "./FavoriteCategoriesChart";
import OrderHistoryTable from "./OrderHistoryTable";
import EditUserModal from "./EditUserModal";

interface UserDetailClientProps {
  userId: string;
  authToken: string;
}

interface UserAnalytics {
  user: User;
  orderStats: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  };
  recentOrders: Order[];
  reviewStats: {
    totalReviews: number;
    averageRating: number;
  };
  monthlySpending: Array<{
    _id: { year: number; month: number };
    totalSpent: number;
    orderCount: number;
  }>;
  favoriteCategories: Array<{
    _id: string;
    categoryName: string;
    totalSpent: number;
    itemCount: number;
  }>;
}

interface OrderHistoryData {
  orders: Order[];
  totalResults: number;
  page: number;
  totalPages: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function UserDetailClient({
  userId,
  authToken,
}: UserDetailClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryData | null>(
    null,
  );
  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const [orderFilter, setOrderFilter] = useState<string>("");
  const [orderHistoryLoading, setOrderHistoryLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    emailVerified: false,
    active: true,
    role: "user",
  });

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, authToken]);

  useEffect(() => {
    fetchOrderHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrderPage, orderFilter]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const analyticsData = await getUserAnalytics(userId, authToken);
      setAnalytics(analyticsData.data); // Set initial status values for editing
      if (analyticsData.data.user) {
        setStatusUpdate({
          emailVerified: analyticsData.data.user.emailVerified,
          active: analyticsData.data.user.active,
          role: analyticsData.data.user.role,
        });
      }
    } catch (error) {
      console.error("Error fetching user analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      setOrderHistoryLoading(true);
      const orderData = await getUserOrderHistory(userId, authToken, {
        page: currentOrderPage,
        limit: 10,
        status: orderFilter || undefined,
        sort: "-createdAt",
      });
      setOrderHistory(orderData.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setOrderHistoryLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await updateUserStatus(userId, statusUpdate, authToken);
      setEditingUser(false);
      fetchUserData(); // Refresh data
      alert("Cập nhật trạng thái người dùng thành công!");
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái!");
    }
  };

  const handleStatusChange = (key: string, value: boolean | string) => {
    setStatusUpdate((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading || !analytics) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  const { user, orderStats, reviewStats, monthlySpending, favoriteCategories } =
    analytics;

  const orderStatusData = [
    { name: "Hoàn thành", value: orderStats.completedOrders, fill: "#00C49F" },
    { name: "Đang xử lý", value: orderStats.pendingOrders, fill: "#FFBB28" },
    { name: "Đã hủy", value: orderStats.cancelledOrders, fill: "#FF8042" },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="small"
            icon={<FaArrowLeft />}
          >
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Chi tiết người dùng
          </h1>
        </div>
      </div>

      {/* User Profile Card */}
      <UserProfileCard user={user} onEditClick={() => setEditingUser(true)} />

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6 lg:grid-cols-2 md:grid-cols-1">
        <StatCard
          title="Tổng đơn hàng"
          value={orderStats.totalOrders}
          icon={<FaShoppingCart />}
          gradient="bg-gradient-to-r from-blue-500 to-blue-600"
        />

        <StatCard
          title="Tổng chi tiêu"
          value={formatMoney(orderStats.totalSpent)}
          icon={<FaChartLine />}
          gradient="bg-gradient-to-r from-green-500 to-green-600"
        />

        <StatCard
          title="Giá trị TB/đơn"
          value={formatMoney(orderStats.averageOrderValue)}
          icon={<FaGift />}
          gradient="bg-gradient-to-r from-yellow-500 to-yellow-600"
        />

        <StatCard
          title="Đánh giá"
          value={reviewStats.totalReviews}
          description={
            reviewStats.averageRating > 0
              ? `${reviewStats.averageRating.toFixed(1)} sao`
              : undefined
          }
          icon={<FaStar />}
          gradient="bg-gradient-to-r from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
        {monthlySpending.length > 0 && <SpendingChart data={monthlySpending} />}

        {orderStats.totalOrders > 0 && (
          <OrderStatusChart data={orderStatusData} />
        )}
      </div>

      {/* Favorite Categories */}
      {favoriteCategories.length > 0 && (
        <FavoriteCategoriesChart data={favoriteCategories} colors={COLORS} />
      )}

      {/* Order History */}
      <OrderHistoryTable
        orders={orderHistory?.orders || []}
        totalResults={orderHistory?.totalResults || 0}
        currentPage={currentOrderPage}
        totalPages={orderHistory?.totalPages || 1}
        onPageChange={setCurrentOrderPage}
        onFilterChange={(value) => {
          setOrderFilter(value);
          setCurrentOrderPage(1);
        }}
        currentFilter={orderFilter}
        loading={orderHistoryLoading}
      />

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={user}
          statusUpdate={statusUpdate}
          onStatusChange={handleStatusChange}
          onSave={handleStatusUpdate}
          onCancel={() => setEditingUser(false)}
        />
      )}
    </div>
  );
}

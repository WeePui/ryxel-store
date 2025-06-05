"use client";

import { useState, useEffect } from "react";
import {
  getNotificationStatsAction,
  getNotificationHistoryAction,
  sendPromotionalNotificationAction,
  sendNotificationToUserAction,
  sendNotificationToAllUsersAction,
} from "@/app/_libs/actions";
import Button from "@/app/_components/UI/Button";
import Modal from "@/app/_components/UI/Modal";
import Input from "@/app/_components/UI/Input";
import { toast } from "react-toastify";
import {
  FaBell,
  FaPaperPlane,
  FaUsers,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import Loader from "@/app/_components/UI/Loader";

interface NotificationStats {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  totalUsers: number;
  activeTokens: number;
  recentActivity: Array<{
    type: string;
    count: number;
    date: string;
  }>;
}

interface NotificationHistoryItem {
  _id: string;
  title: string;
  body: string;
  type: string;
  targetUserCount: number;
  deliveredCount: number;
  failedCount: number;
  createdAt: string;
  status: string;
}

export default function AdminNotificationsPage() {
  const [stats, setStats] = useState<NotificationStats | null>(null);
  const [history, setHistory] = useState<NotificationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingNotification, setSendingNotification] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "history" | "send">(
    "dashboard",
  );
  // Send notification form state
  const [notificationForm, setNotificationForm] = useState({
    type: "promotional" as "promotional" | "user" | "broadcast",
    title: "",
    body: "",
    email: "",
    data: {} as Record<string, string | number | boolean>,
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchHistory()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getNotificationStatsAction();
      if (response.success && "data" in response) {
        setStats(response.data);
      } else {
        toast.error(
          response.errors?.message || "Failed to fetch notification stats",
        );
      }
    } catch {
      toast.error("An unexpected error occurred while fetching stats");
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await getNotificationHistoryAction(1, 50);
      if (response.success && "data" in response) {
        setHistory(response.data.notifications || []);
      } else {
        toast.error(
          response.errors?.message || "Failed to fetch notification history",
        );
      }
    } catch {
      toast.error("An unexpected error occurred while fetching history");
    }
  };
  const handleSendNotification = async () => {
    if (!notificationForm.title.trim() || !notificationForm.body.trim()) {
      toast.error("Title and body are required");
      return;
    }

    if (notificationForm.type === "user" && !notificationForm.email.trim()) {
      toast.error("Email address is required for user-specific notifications");
      return;
    }

    // Email validation for user-specific notifications
    if (notificationForm.type === "user") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(notificationForm.email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    setSendingNotification(true);
    try {
      let response;

      switch (notificationForm.type) {
        case "promotional":
          response = await sendPromotionalNotificationAction(
            notificationForm.title,
            notificationForm.body,
            notificationForm.data,
          );
          break;
        case "user":
          response = await sendNotificationToUserAction(
            notificationForm.email,
            notificationForm.title,
            notificationForm.body,
            notificationForm.data,
          );
          break;
        case "broadcast":
          response = await sendNotificationToAllUsersAction(
            notificationForm.title,
            notificationForm.body,
            notificationForm.data,
          );
          break;
        default:
          throw new Error("Invalid notification type");
      }

      if (response.success) {
        toast.success("Notification sent successfully!");
        setShowSendDialog(false);
        setNotificationForm({
          type: "promotional",
          title: "",
          body: "",
          email: "",
          data: {},
        });
        await fetchStats();
        await fetchHistory();
      } else {
        toast.error(response.errors?.message || "Failed to send notification");
      }
    } catch {
      toast.error("An unexpected error occurred while sending notification");
    } finally {
      setSendingNotification(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setNotificationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const StatCard = ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className={`rounded-lg border-l-4 bg-white p-6 shadow-md ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-2xl ${color.replace("border-l-", "text-")}`}>
          {icon}
        </div>
      </div>
    </div>
  );
  const TabButton = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border border-blue-300 bg-blue-100 text-blue-700"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between md:flex-col md:items-start md:gap-6">
        <div>
          <h1 className="font-title text-3xl font-bold text-primary-500">
            Quản lí thông báo
          </h1>
          <p className="mt-2 text-gray-600">
            Quản lí và theo dõi các thông báo được gửi đến người dùng.
          </p>
        </div>
        <Button
          onClick={() => setShowSendDialog(true)}
          icon={<FaPaperPlane />}
          className="md:self-end"
        >
          Tạo thông báo
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 border-b md:justify-center">
        <TabButton
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <TabButton
          label="Lịch sử thông báo"
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        />
      </div>
      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 lg:grid-cols-2 md:grid-cols-1">
            <StatCard
              title="Tổng thông báo"
              value={stats?.totalSent || 0}
              icon={<FaPaperPlane />}
              color="border-l-blue-500"
            />
            <StatCard
              title="Thông báo đã gửi"
              value={stats?.totalDelivered || 0}
              icon={<FaUsers />}
              color="border-l-green-500"
            />
            <StatCard
              title="Thông báo thất bại"
              value={stats?.totalFailed || 0}
              icon={<FaChartLine />}
              color="border-l-red-500"
            />
            <StatCard
              title="Nguời dùng nhận thông báo"
              value={stats?.activeTokens || 0}
              icon={<FaBell />}
              color="border-l-purple-500"
            />
          </div>

          {/* Recent Activity */}
          {stats?.recentActivity && stats.recentActivity.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Hoạt động gần đây
              </h3>
              <div className="space-y-3">
                {stats.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-gray-50 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.type}
                      </p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800">
                      {activity.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* History Tab */}
      {activeTab === "history" && (
        <div className="rounded-lg bg-white shadow-md">
          <div className="border-b p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <FaClock />
              Lịch sử thông báo
            </h3>
          </div>
          <div className="p-6">
            {history.length === 0 ? (
              <div className="py-8 text-center">
                <FaClock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Chưa có thông báo nào được gửi
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Bắt đầu gửi thông báo đầu tiên.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((notification) => (
                  <div
                    key={notification._id}
                    className="rounded-lg border p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.body}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          <span>Loại thông báo: {notification.type}</span>
                          <span>Đối tượng: {notification.targetUserCount}</span>
                          <span>Đã gửi: {notification.deliveredCount}</span>
                          <span>Gửi thất bại: {notification.failedCount}</span>
                          <span>
                            {new Date(
                              notification.createdAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            notification.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : notification.status === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {notification.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Send Notification Modal */}
      {showSendDialog && (
        <Modal onClose={() => setShowSendDialog(false)}>
          <div className="p-6">
            <h3 className="mb-12 flex items-center gap-2 font-title text-2xl font-semibold text-primary-500">
              Tạo thông báo
            </h3>

            <div className="space-y-4">
              <div>
                <Input
                  id="notification-type"
                  label="Loại thông báo"
                  type="select"
                  value={notificationForm.type}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  options={[
                    { value: "promotional", label: "Khuyến mãi" },
                    { value: "user", label: "Người dùng cụ thể" },
                    { value: "broadcast", label: "Toàn bộ người dùng" },
                  ]}
                />
              </div>
              {notificationForm.type === "user" && (
                <div>
                  <Input
                    id="user-email"
                    label="Email Address"
                    type="email"
                    value={notificationForm.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    placeholder="user@example.com"
                  />
                </div>
              )}
              <div>
                <Input
                  id="notification-title"
                  label="Tiêu đề"
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                />
              </div>
              <div>
                <Input
                  id="notification-body"
                  label="Nội dung"
                  type="textarea"
                  value={notificationForm.body}
                  onChange={(e) => handleFormChange("body", e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  onClick={() => setShowSendDialog(false)}
                  variant="secondary"
                >
                  Huỷ
                </Button>
                <Button
                  onClick={handleSendNotification}
                  loading={sendingNotification}
                >
                  {sendingNotification ? "Đang gửi..." : "Gửi thông báo"}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

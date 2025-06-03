"use client";

import { useState, useEffect } from "react";
import {
  getUserNotificationsAction,
  markNotificationAsReadAction,
  markAllNotificationsAsReadAction,
  deleteNotificationAction,
  deleteAllNotificationsAction,
} from "@/app/_libs/actions";
import Button from "@/app/_components/UI/Button";
import { FaBell, FaCheck, FaCheckDouble, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "@/app/_components/UI/Loader";

interface Notification {
  _id: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}

interface NotificationResponse {
  data: {
    notifications: Notification[];
    pagination: {
      totalCount: number;
      currentPage: number;
      totalPages: number;
    };
    unreadCount: number;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchNotifications = async (page = 1, unreadOnly = false) => {
    try {
      setLoading(true);
      const response = await getUserNotificationsAction(page, 20, unreadOnly);

      if (response.success) {
        const { data } = response.data as NotificationResponse;
        console.log("Fetched notifications:", data);

        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
        setCurrentPage(data.pagination.currentPage || 1);
        setTotalPages(data.pagination.totalPages || 1);
      } else {
        // Ensure we have fallback values on error
        setNotifications([]);
        setUnreadCount(0);
        setCurrentPage(1);
        setTotalPages(1);
        toast.error(
          response.errors?.message || "Failed to fetch notifications",
        );
      }
    } catch {
      // Ensure we have fallback values on exception
      setNotifications([]);
      setUnreadCount(0);
      setCurrentPage(1);
      setTotalPages(1);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await markNotificationAsReadAction(notificationId);

      if (response.success) {
        toast.success("Notification marked as read");
        fetchNotifications(currentPage, filter === "unread");
      } else {
        toast.error(
          response.errors?.message || "Failed to mark notification as read",
        );
      }
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await markAllNotificationsAsReadAction();

      if (response.success) {
        toast.success("All notifications marked as read");
        fetchNotifications(currentPage, filter === "unread");
      } else {
        toast.error(
          response.errors?.message ||
            "Failed to mark all notifications as read",
        );
      }
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      const response = await deleteNotificationAction(notificationId);

      if (response.success) {
        toast.success("Notification deleted successfully");
        fetchNotifications(currentPage, filter === "unread");
      } else {
        toast.error(
          response.errors?.message || "Failed to delete notification",
        );
      }
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      const response = await deleteAllNotificationsAction();

      if (response.success) {
        toast.success("All notifications deleted successfully");
        fetchNotifications(currentPage, filter === "unread");
      } else {
        toast.error(
          response.errors?.message || "Failed to delete all notifications",
        );
      }
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  const handleFilterChange = (newFilter: "all" | "unread" | "read") => {
    setFilter(newFilter);
    const unreadOnly = newFilter === "unread";
    fetchNotifications(1, unreadOnly);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-800";
      case "shipping":
        return "bg-green-100 text-green-800";
      case "promotional":
        return "bg-purple-100 text-purple-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading && (notifications?.length === 0 || !notifications)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaBell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              variant="tertiary"
              size="small"
              className="flex items-center gap-2"
            >
              <FaCheckDouble className="h-4 w-4" />
              Mark All Read
            </Button>
          )}

          {(notifications?.length ?? 0) > 0 && (
            <Button
              onClick={handleDeleteAllNotifications}
              variant="danger"
              size="small"
              className="flex items-center gap-2"
            >
              <FaTrash className="h-4 w-4" />
              Delete All
            </Button>
          )}
        </div>
      </div>

      {/* Filter buttons */}
      <div className="mb-6 flex gap-2">
        <Button
          onClick={() => handleFilterChange("all")}
          variant={filter === "all" ? "primary" : "tertiary"}
          size="small"
        >
          All
        </Button>
        <Button
          onClick={() => handleFilterChange("unread")}
          variant={filter === "unread" ? "primary" : "tertiary"}
          size="small"
        >
          Unread
        </Button>
        <Button
          onClick={() => handleFilterChange("read")}
          variant={filter === "read" ? "primary" : "tertiary"}
          size="small"
        >
          Read
        </Button>
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {(notifications?.length ?? 0) === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
            <FaBell className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          (notifications || []).map((notification) => (
            <div
              key={notification._id}
              className={`rounded-lg border bg-white p-4 shadow-sm transition-all ${!notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getNotificationTypeColor(notification.type)}`}
                    >
                      {notification.type}
                    </span>
                    {!notification.isRead && (
                      <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        New
                      </span>
                    )}
                  </div>

                  <p className="mb-2 text-gray-600">{notification.body}</p>

                  <p className="text-sm text-gray-400">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>

                <div className="ml-4 flex gap-2">
                  {!notification.isRead && (
                    <Button
                      onClick={() => handleMarkAsRead(notification._id)}
                      variant="tertiary"
                      size="small"
                      className="flex items-center gap-1"
                    >
                      <FaCheck className="h-3 w-3" />
                      Mark Read
                    </Button>
                  )}

                  <Button
                    onClick={() => handleDeleteNotification(notification._id)}
                    variant="danger"
                    size="small"
                    className="flex items-center gap-1"
                  >
                    <FaTrash className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button
            onClick={() =>
              fetchNotifications(currentPage - 1, filter === "unread")
            }
            disabled={currentPage === 1}
            variant="tertiary"
          >
            Previous
          </Button>

          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={() =>
              fetchNotifications(currentPage + 1, filter === "unread")
            }
            disabled={currentPage === totalPages}
            variant="tertiary"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

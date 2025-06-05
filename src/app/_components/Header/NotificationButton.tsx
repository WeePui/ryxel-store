"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBell } from "react-icons/fa";
import { useNotificationContext } from "@/app/_contexts/NotificationContext";

interface NotificationButtonProps {
  className?: string;
}

export default function NotificationButton({
  className = "",
}: NotificationButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { unreadCount, refreshUnreadCount } = useNotificationContext();

  useEffect(() => {
    const fetchWithLoading = async () => {
      setLoading(true);
      try {
        await refreshUnreadCount();
      } finally {
        setLoading(false);
      }
    };

    fetchWithLoading();

    // Set up periodic refresh every 60 seconds
    const interval = setInterval(refreshUnreadCount, 60000);

    return () => clearInterval(interval);
  }, [refreshUnreadCount]);

  // Refresh count when returning from notifications page
  useEffect(() => {
    if (pathname !== "/notifications") {
      refreshUnreadCount();
    }
  }, [pathname, refreshUnreadCount]);

  const handleClick = () => {
    router.push("/notifications");
  };

  return (
    <button
      onClick={handleClick}
      className={`relative rounded-lg transition-colors hover:bg-gray-100 ${className}`}
      title={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
      disabled={loading}
      aria-label={`Notifications ${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
    >
      <FaBell className={`text-xl transition-colors hover:text-gray-400`} />

      {unreadCount > 0 && (
        <span className="absolute -right-3 -top-3 flex h-5 w-5 min-w-[20px] animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {loading && (
        <span className="absolute -right-3 -top-3 h-2 w-2 animate-ping rounded-full bg-blue-400"></span>
      )}
    </button>
  );
}

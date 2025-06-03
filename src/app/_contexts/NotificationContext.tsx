"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { MessagePayload } from "firebase/messaging";
import { useNotifications } from "../_libs/notificationService";
import { getUserNotificationsAction } from "../_libs/actions";
import { toast } from "react-toastify";

interface NotificationContextType {
  isSupported: boolean;
  permission: NotificationPermission;
  isSetup: boolean;
  setupNotifications: () => Promise<boolean>;
  requestPermission: () => Promise<boolean>;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isSetup, setIsSetup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const {
    setupNotifications,
    requestPermission,
    getPermissionStatus,
    onMessage,
    showNotification,
    isSupported,
  } = useNotifications();
  const refreshUnreadCount = useCallback(async () => {
    try {
      const response = await getUserNotificationsAction(1, 1, undefined);

      if (response.success && response.data) {
        setUnreadCount(response.data.data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  }, []);

  const handleSetupNotifications = useCallback(async (): Promise<boolean> => {
    try {
      const success = await setupNotifications();
      setIsSetup(success);
      setPermission(getPermissionStatus());
      return success;
    } catch (error) {
      console.error("Error setting up notifications:", error);
      return false;
    }
  }, [setupNotifications, getPermissionStatus]);
  useEffect(() => {
    // Initialize permission status
    setPermission(getPermissionStatus());

    // Auto-setup notifications if permission is already granted
    if (getPermissionStatus() === "granted") {
      handleSetupNotifications();
    }

    // Initialize unread count
    refreshUnreadCount();

    // Listen for foreground messages
    const unsubscribe = onMessage((payload: MessagePayload) => {
      console.log("Foreground notification received:", payload);

      // Show notification if app is in foreground
      const title = payload.notification?.title || "New Notification";
      const body = payload.notification?.body || "You have a new notification";

      // Show browser notification
      showNotification(title, {
        body,
        data: payload.data,
        requireInteraction: true,
      });

      // Show toast notification
      toast.info(body);

      // Update unread count
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      unsubscribe();
    };
  }, [
    getPermissionStatus,
    onMessage,
    showNotification,
    handleSetupNotifications,
    refreshUnreadCount,
  ]);
  const handleRequestPermission = useCallback(async (): Promise<boolean> => {
    console.log("handleRequestPermission called");
    console.log(
      "Current Notification.permission:",
      typeof window !== "undefined" ? Notification?.permission : "server-side",
    );

    try {
      const granted = await requestPermission();
      console.log("requestPermission result:", granted);

      setPermission(getPermissionStatus());
      console.log("Updated permission state:", getPermissionStatus());

      if (granted) {
        console.log("Setting up notifications...");
        await handleSetupNotifications();
      }

      return granted;
    } catch (error) {
      console.error("Error requesting permission:", error);
      return false;
    }
  }, [requestPermission, getPermissionStatus, handleSetupNotifications]);
  const value: NotificationContextType = {
    isSupported,
    permission,
    isSetup,
    setupNotifications: handleSetupNotifications,
    requestPermission: handleRequestPermission,
    unreadCount,
    setUnreadCount,
    refreshUnreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};

// Notification permission banner component
export const NotificationPermissionBanner: React.FC = () => {
  const { isSupported, permission, requestPermission } =
    useNotificationContext();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner if notifications are supported but permission not granted
    setShowBanner(isSupported && permission === "default");
  }, [isSupported, permission]);
  const handleEnable = async () => {
    console.log("Enable button clicked");
    console.log("Current permission:", permission);
    console.log("isSupported:", isSupported);

    try {
      const granted = await requestPermission();
      console.log("Permission request result:", granted);

      if (granted) {
        setShowBanner(false);
        console.log("Permission granted, banner hidden");
      } else {
        console.log("Permission denied or failed");
      }
    } catch (error) {
      console.error("Error in handleEnable:", error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Store dismissal in localStorage to not show again for a while
    localStorage.setItem(
      "notification-banner-dismissed",
      Date.now().toString(),
    );
  };

  // Check if banner was dismissed recently (within 7 days)
  useEffect(() => {
    const dismissed = localStorage.getItem("notification-banner-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (dismissedTime > weekAgo) {
        setShowBanner(false);
      }
    }
  }, []);

  if (!showBanner) {
    return null;
  }

  return (
    <div className="bg-blue-600 px-4 py-3 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">
              Enable notifications to stay updated on your orders and exclusive
              offers!
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEnable}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-gray-100"
          >
            Enable
          </button>
          <button
            onClick={handleDismiss}
            className="text-blue-200 transition-colors hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

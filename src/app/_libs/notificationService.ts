"use client";

import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  MessagePayload,
  Messaging,
} from "firebase/messaging";
import {
  registerNotificationTokenAction,
  unregisterNotificationTokenAction,
} from "@/app/_libs/actions";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu6u_ELkSewKXfy1VPeTdP9lemSC5hmSk",
  authDomain: "ryxel-store-3d1f7.firebaseapp.com",
  projectId: "ryxel-store-3d1f7",
  storageBucket: "ryxel-store-3d1f7.firebasestorage.app",
  messagingSenderId: "797462533871",
  appId: "1:797462533871:web:945a2e5baf7d573bb52d1a",
  measurementId: "G-H9KBVM8G0R",
};

// VAPID key for push notifications
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY;

class NotificationService {
  private app: FirebaseApp | null = null;
  private messaging: Messaging | null = null;
  private currentToken: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.app = initializeApp(firebaseConfig);
      this.messaging = getMessaging(this.app);
    }
  }
  // Request notification permission
  async requestPermission(): Promise<boolean> {
    console.log("NotificationService.requestPermission called");

    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications");
      return false;
    }

    console.log("Current Notification.permission:", Notification.permission);
    console.log("Is HTTPS:", window.location.protocol === "https:");
    console.log("Current location:", window.location.href);

    if (Notification.permission === "granted") {
      console.log("Permission already granted");
      return true;
    }

    if (Notification.permission === "denied") {
      console.warn("Notification permission denied");
      return false;
    }

    console.log("Requesting notification permission...");
    try {
      const permission = await Notification.requestPermission();
      console.log("Permission request result:", permission);
      return permission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }

  // Get FCM token
  async getToken(): Promise<string | null> {
    if (!this.messaging) {
      console.error("Firebase messaging not initialized");
      return null;
    }

    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        console.warn("Notification permission not granted");
        return null;
      }

      const token = await getToken(this.messaging, { vapidKey: VAPID_KEY });

      if (token) {
        this.currentToken = token;
        console.log("FCM Token:", token);

        // Register token with backend
        await this.registerToken(token);

        return token;
      } else {
        console.warn("No registration token available");
        return null;
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
      return null;
    }
  }

  // Register token with backend
  async registerToken(token: string): Promise<boolean> {
    try {
      const platform = this.getPlatform();
      const deviceInfo = this.getDeviceInfo();

      const response = await registerNotificationTokenAction(
        token,
        platform,
        deviceInfo,
      );

      if (response.success) {
        console.log("Token registered successfully");
        return true;
      } else {
        console.error("Failed to register token:", response.errors?.message);
        return false;
      }
    } catch (error) {
      console.error("Error registering token:", error);
      return false;
    }
  }

  // Unregister token from backend
  async unregisterToken(token?: string): Promise<boolean> {
    try {
      const tokenToUnregister = token || this.currentToken;
      if (!tokenToUnregister) {
        console.warn("No token to unregister");
        return false;
      }

      const response =
        await unregisterNotificationTokenAction(tokenToUnregister);

      if (response.success) {
        console.log("Token unregistered successfully");
        this.currentToken = null;
        return true;
      } else {
        console.error("Failed to unregister token:", response.errors?.message);
        return false;
      }
    } catch (error) {
      console.error("Error unregistering token:", error);
      return false;
    }
  }

  // Listen for foreground messages
  onMessage(callback: (payload: MessagePayload) => void): () => void {
    if (!this.messaging) {
      console.error("Firebase messaging not initialized");
      return () => {};
    }

    const unsubscribe = onMessage(this.messaging, (payload) => {
      console.log("Foreground message received:", payload);
      callback(payload);
    });

    return unsubscribe;
  }

  // Show notification in foreground
  showNotification(
    title: string,
    options?: NotificationOptions,
  ): Notification | null {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications");
      return null;
    }

    if (Notification.permission !== "granted") {
      console.warn("Notification permission not granted");
      return null;
    }

    return new Notification(title, {
      icon: "/logo.png",
      badge: "/logo.png",
      tag: "ryxel-notification",
      ...options,
    });
  }

  // Get platform information
  private getPlatform(): string {
    if (typeof window === "undefined") return "unknown";

    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes("android")) return "android";
    if (userAgent.includes("iphone") || userAgent.includes("ipad"))
      return "ios";
    if (userAgent.includes("windows")) return "windows";
    if (userAgent.includes("mac")) return "macos";
    if (userAgent.includes("linux")) return "linux";

    return "web";
  }

  // Get device information
  private getDeviceInfo(): string {
    if (typeof window === "undefined") return "unknown";

    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;

    return `${platform} - ${userAgent.split(" ")[0]}`;
  }

  // Check if notifications are supported
  isSupported(): boolean {
    return (
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator
    );
  }

  // Check current permission status
  getPermissionStatus(): NotificationPermission {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return "default";
    }
    return Notification.permission;
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;

// Hook for React components
export const useNotifications = () => {
  const setupNotifications = async () => {
    try {
      if (!notificationService.isSupported()) {
        console.warn("Notifications not supported in this browser");
        return false;
      }

      const token = await notificationService.getToken();
      return !!token;
    } catch (error) {
      console.error("Error setting up notifications:", error);
      return false;
    }
  };

  const requestPermission = () => notificationService.requestPermission();
  const getPermissionStatus = () => notificationService.getPermissionStatus();
  const onMessage = (callback: (payload: MessagePayload) => void) =>
    notificationService.onMessage(callback);
  const showNotification = (title: string, options?: NotificationOptions) =>
    notificationService.showNotification(title, options);

  return {
    setupNotifications,
    requestPermission,
    getPermissionStatus,
    onMessage,
    showNotification,
    isSupported: notificationService.isSupported(),
  };
};

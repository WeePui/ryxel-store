// FCM utilities for handling token registration
import { fetchToken } from "@utils/firebase";

/**
 * Registers the FCM token for the currently logged-in user
 * This should be called after successful login or when the user grants notification permissions
 * @param authToken - JWT token passed from server-side component
 */
export async function registerUserFcmToken(
  authToken?: string,
): Promise<boolean> {
  try {
    // Check if notifications are supported and permitted
    if (!("Notification" in window)) {
      return false;
    }

    // Check if permission is granted
    if (Notification.permission !== "granted") {
      return false;
    }

    // Get FCM token
    const fcmToken = await fetchToken();
    if (!fcmToken) {
      return false;
    }

    // Check if user token is provided
    if (!authToken) {
      return false;
    }

    // Register the FCM token with the user using the new API endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/fcm-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          fcmToken,
        }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to register FCM token:", errorData);
      return false;
    }

    await response.json();
    return true;
  } catch (error) {
    console.error("Failed to register FCM token:", error);
    return false;
  }
}

/**
 * Requests notification permission and registers FCM token if granted
 * @param authToken - JWT token passed from server-side component
 */
export async function requestNotificationPermissionAndRegister(
  authToken?: string,
): Promise<boolean> {
  try {
    if (!("Notification" in window)) {
      return false;
    }

    // Request permission if not already granted
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        return false;
      }
    } else if (Notification.permission === "denied") {
      return false;
    }

    // Permission is granted, register the token
    return await registerUserFcmToken(authToken);
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
}

/**
 * Unregisters the current device's FCM token when user logs out
 * @param authToken - JWT token for authentication
 */
export async function unregisterCurrentFcmToken(
  authToken: string,
): Promise<boolean> {
  try {
    // Check if notifications are supported
    if (!("Notification" in window)) {
      return false;
    }

    // Get the current FCM token to unregister
    const fcmToken = await fetchToken();
    if (!fcmToken) {
      return false;
    }

    // Call the API to remove the FCM token from user's record
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/fcm-token`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          fcmToken,
        }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to unregister FCM token:", errorData);
      return false;
    }

    await response.json();
    return true;
  } catch (error) {
    console.error("Failed to unregister FCM token:", error);
    return false;
  }
}

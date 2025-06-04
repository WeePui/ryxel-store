"use client";

import { useEffect } from "react";
import { registerUserFcmToken } from "@utils/fcm";

/**
 * Hook that automatically registers FCM token when user is logged in
 * This should be used in components that are only shown to authenticated users
 * @param authToken - JWT token passed from server-side component
 */
export function useFcmTokenRegistration(authToken?: string) {
  useEffect(() => {
    const registerToken = async () => {
      // Check if user is authenticated before attempting FCM registration

      if (!authToken) {
        return;
      }

      // Wait a bit to ensure the client is fully hydrated
      setTimeout(async () => {
        try {
          await registerUserFcmToken(authToken);
        } catch (error) {
          console.error("Error in FCM token registration:", error);
        }
      }, 1000);
    };

    registerToken();
  }, [authToken]); // Add authToken to dependency array
}

export default useFcmTokenRegistration;

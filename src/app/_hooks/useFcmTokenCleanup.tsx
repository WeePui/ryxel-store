"use client";

import { useCallback } from "react";
import { unregisterCurrentFcmToken } from "@utils/fcm";

/**
 * Hook that provides FCM token cleanup functionality
 * This should be used before logout to clean up FCM tokens
 */
export function useFcmTokenCleanup() {
  const cleanupFcmToken = useCallback(async (authToken?: string) => {
    if (!authToken) {
      return false;
    }

    try {
      const result = await unregisterCurrentFcmToken(authToken);
      return result;
    } catch (error) {
      console.error("Error during FCM token cleanup:", error);
      return false;
    }
  }, []);

  return { cleanupFcmToken };
}

export default useFcmTokenCleanup;

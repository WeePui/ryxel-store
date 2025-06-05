import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface ApiError {
  status: "error";
  message: string;
  statusCode?: number;
}

interface UseApiErrorReturn {
  error: ApiError | null;
  setError: (error: ApiError | null) => void;
  handleError: (error: ApiError) => void;
  clearError: () => void;
  hasError: boolean;
}

/**
 * Custom hook for managing API errors consistently across components
 * Provides error state management and optional toast notifications
 *
 * @param showToast - Whether to show toast notifications for errors
 * @returns Object with error state and helper functions
 */
export function useApiError(showToast: boolean = true): UseApiErrorReturn {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback(
    (apiError: ApiError) => {
      setError(apiError);

      if (showToast) {
        toast.error(apiError.message || "An error occurred");
      }
    },
    [showToast],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    setError,
    handleError,
    clearError,
    hasError: error !== null,
  };
}

/**
 * Utility functions for handling API responses and errors
 */

interface ApiResponse<T = unknown> {
  status: string;
  data?: T;
  message?: string;
  statusCode?: number;
}

interface ApiError {
  status: "error";
  message: string;
  statusCode?: number;
}

/**
 * Type guard to check if an API response is an error
 */
export function isApiError(response: ApiResponse): response is ApiError {
  return response.status === "error";
}

/**
 * Type guard to check if an API response is successful
 */
export function isApiSuccess<T>(
  response: ApiResponse<T>,
): response is { status: "success"; data: T } {
  return response.status === "success" && response.data !== undefined;
}

/**
 * Extract error message from API response
 */
export function getErrorMessage(response: ApiResponse): string {
  return response.message || "An unexpected error occurred";
}

/**
 * Extract status code from API response
 */
export function getStatusCode(response: ApiResponse): number | undefined {
  return response.statusCode;
}

/**
 * Helper function to handle API responses with automatic error checking
 */
export function handleApiResponse<T>(
  response: ApiResponse<T>,
  onSuccess: (data: T) => void,
  onError: (error: ApiError) => void,
): void {
  if (isApiError(response)) {
    onError(response);
  } else if (isApiSuccess(response)) {
    onSuccess(response.data);
  } else {
    onError({
      status: "error",
      message: "Invalid API response format",
      statusCode: 500,
    });
  }
}

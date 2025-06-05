import { FaExclamationTriangle } from "react-icons/fa";

interface ApiErrorDisplayProps {
  error: {
    status: string;
    message?: string;
    statusCode?: number;
  };
  title?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  showIcon?: boolean;
  showStatusCode?: boolean;
}

/**
 * Reusable component for displaying API errors consistently across the application
 *
 * @param error - The error object returned from API services
 * @param title - Optional custom title for the error display
 * @param className - Additional CSS classes
 * @param size - Size variant for the error display
 * @param showIcon - Whether to show the error icon
 * @param showStatusCode - Whether to display the HTTP status code
 */
export default function ApiErrorDisplay({
  error,
  title = "Error",
  className = "",
  size = "medium",
  showIcon = true,
  showStatusCode = true,
}: ApiErrorDisplayProps) {
  const sizeClasses = {
    small: {
      container: "min-h-[200px]",
      title: "text-lg font-semibold",
      message: "text-sm",
      icon: "text-2xl",
    },
    medium: {
      container: "min-h-[400px]",
      title: "text-2xl font-bold",
      message: "text-base",
      icon: "text-3xl",
    },
    large: {
      container: "min-h-[500px]",
      title: "text-3xl font-bold",
      message: "text-lg",
      icon: "text-4xl",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={`flex ${classes.container} items-center justify-center ${className}`}
    >
      <div className="text-center">
        {showIcon && (
          <div className="mb-4 flex justify-center">
            <FaExclamationTriangle className={`text-red-500 ${classes.icon}`} />
          </div>
        )}
        <h1 className={`mb-2 text-red-600 ${classes.title}`}>{title}</h1>
        <p className={`text-gray-600 ${classes.message}`}>
          {error.message || "An unexpected error occurred"}
        </p>
        {showStatusCode && error.statusCode && (
          <p className="mt-1 text-sm text-gray-500">
            Status Code: {error.statusCode}
          </p>
        )}
      </div>
    </div>
  );
}

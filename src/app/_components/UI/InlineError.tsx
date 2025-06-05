import React from "react";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

interface InlineErrorProps {
  message: string;
  type?: "error" | "warning" | "info" | "success";
  size?: "small" | "medium";
  className?: string;
  showIcon?: boolean;
}

/**
 * Lightweight inline error/message component for form fields and small notifications
 */
export default function InlineError({
  message,
  type = "error",
  size = "medium",
  className = "",
  showIcon = true,
}: InlineErrorProps) {
  const typeConfig = {
    error: {
      icon: FaExclamationCircle,
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    warning: {
      icon: FaExclamationCircle,
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    info: {
      icon: FaInfoCircle,
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    success: {
      icon: FaCheckCircle,
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  };

  const sizeClasses = {
    small: "p-2 text-xs",
    medium: "p-3 text-sm",
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={`flex items-center gap-2 rounded-md border ${config.bgColor} ${config.borderColor} ${config.textColor} ${sizeClasses[size]} ${className} `}
    >
      {showIcon && <IconComponent className="flex-shrink-0" />}
      <span className="flex-1">{message}</span>
    </div>
  );
}

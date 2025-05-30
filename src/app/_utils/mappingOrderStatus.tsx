import { JSX } from "react";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaClockRotateLeft,
  FaGears,
  FaHandshakeSlash,
  FaTruck,
} from "react-icons/fa6";

export function mappingOrderStatus(orderStatus: string): {
  icon: JSX.Element;
  textColor: string;
  text: string;
  color: string;
  status: string;
} {
  switch (orderStatus) {
    case "unpaid":
      return {
        icon: <FaHandshakeSlash className="inline" />,
        textColor: "text-red-500",
        text: "Chưa thanh toán",
        color: "#ef4444",
        status: orderStatus,
      };
    case "pending":
      return {
        icon: <FaClockRotateLeft className="inline" />,
        textColor: "text-yellow-500",
        text: "Chờ xác nhận",
        color: "#eab308",
        status: orderStatus,
      };
    case "processing":
      return {
        icon: <FaGears className="inline" />,
        textColor: "text-blue-500",
        text: "Đang xử lý",
        color: "#3b82f6",
        status: orderStatus,
      };
    case "shipped":
      return {
        textColor: "text-orange-500",
        icon: <FaTruck className="inline" />,
        text: "Đã vận chuyển",
        color: "#f97316",
        status: orderStatus,
      };
    case "delivered":
      return {
        icon: <FaCircleCheck className="inline" />,
        textColor: "text-green-500",
        text: "Đã giao",
        color: "#22c55e",
        status: orderStatus,
      };
    case "cancelled":
      return {
        icon: <FaCircleXmark className="inline" />,
        textColor: "text-red-500",
        text: "Đã hủy",
        color: "#ef4444",
        status: orderStatus,
      };
    case "refunded":
      return {
        icon: <FaCircleXmark className="inline" />,
        textColor: "text-red-500",
        text: "Đã hoàn tiền",
        color: "#ef4444",
        status: orderStatus,
      };
    default:
      return {
        icon: <FaTruck className="inline" />,
        textColor: "text-white",
        text: "Không xác định",
        color: "#000000",
        status: "unknown",
      };
  }
}

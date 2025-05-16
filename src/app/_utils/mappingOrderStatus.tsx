import { JSX } from 'react';
import {
  FaCircleCheck,
  FaCircleXmark,
  FaClockRotateLeft,
  FaGears,
  FaHandshakeSlash,
  FaTruck,
} from 'react-icons/fa6';

export function mappingOrderStatus(orderStatus: string): {
  icon: JSX.Element;
  textColor: string;
  text: string;
  color: string;
} {
  switch (orderStatus) {
    case 'unpaid':
      return {
        icon: <FaHandshakeSlash className="inline" />,
        textColor: 'text-red-500',
        text: 'Chưa thanh toán',
        color: '#ef4444',
      };
    case 'pending':
      return {
        icon: <FaClockRotateLeft className="inline" />,
        textColor: 'text-yellow-500',
        text: 'Chờ xác nhận',
        color: '#eab308',
      };
    case 'processing':
      return {
        icon: <FaGears className="inline" />,
        textColor: 'text-blue-500',
        text: 'Đang xử lý',
        color: '#3b82f6',
      };
    case 'shipped':
      return {
        textColor: 'text-orange-500',
        icon: <FaTruck className="inline" />,
        text: 'Đã vận chuyển',
        color: '#f97316',
      };
    case 'delivered':
      return {
        icon: <FaCircleCheck className="inline" />,
        textColor: 'text-green-500',
        text: 'Đã giao',
        color: '#22c55e',
      };
    case 'cancelled':
      return {
        icon: <FaCircleXmark className="inline" />,
        textColor: 'text-red-500',
        text: 'Đã hủy',
        color: '#ef4444',
      };
    case 'refunded':
      return {
        icon: <FaCircleXmark className="inline" />,
        textColor: 'text-red-500',
        text: 'Đã hoàn tiền',
        color: '#ef4444',
      };
    default:
      return {
        icon: <FaTruck className="inline" />,
        textColor: 'text-white',
        text: 'Không xác định',
        color: '#000000',
      };
  }
}

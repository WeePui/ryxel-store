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
} {
  switch (orderStatus) {
    case 'unpaid':
      return {
        icon: <FaHandshakeSlash className="inline" />,
        textColor: 'text-red-500',
        text: 'Chưa thanh toán',
      };
    case 'pending':
      return {
        icon: <FaClockRotateLeft className="inline" />,
        textColor: 'text-yellow-500',
        text: 'Chờ xác nhận',
      };
    case 'processing':
      return {
        icon: <FaGears className="inline" />,
        textColor: 'text-blue-500',
        text: 'Đang xử lý',
      };
    case 'shipped':
      return {
        textColor: 'text-orange-500',
        icon: <FaTruck className="inline" />,
        text: 'Đã giao',
      };
    case 'delivered':
      return {
        icon: <FaCircleCheck className="inline" />,
        textColor: 'text-gray-500',
        text: 'Đã giao',
      };
    case 'cancelled':
      return {
        icon: <FaCircleXmark className="inline" />,
        textColor: 'text-red-500',
        text: 'Đã hủy',
      };
    default:
      return {
        icon: <FaTruck className="inline" />,
        textColor: 'text-black',
        text: 'Không xác định',
      };
  }
}

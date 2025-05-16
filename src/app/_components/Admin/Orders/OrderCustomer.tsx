import { User } from '@/app/_types/user';
import React from 'react';
import Card from '../../UI/Card';
import { FaRegUser } from 'react-icons/fa';

interface OrderCustomerProps {
  user: User;
}

export default function OrderCustomer({ user }: OrderCustomerProps) {
  return (
    <Card title="Tài khoản đặt hàng">
      <div className="flex items-center gap-2 mt-4 font-semibold">
        <FaRegUser className="stroke-8" />
        <span className="font-semibold whitespace-nowrap">{user.name}</span>
        {user.emailVerified ? (
          <div className="bg-green-500 rounded-full p-1 flex items-center gap-1 text-white text-[9px] ml-4 whitespace-nowrap">
            Đã xác thực
          </div>
        ) : (
          <div className="bg-red-500 rounded-full py-[2px] px-1 flex items-center gap-1 text-white text-[9px] ml-4 whitespace-nowrap">
            Chưa xác thực
          </div>
        )}
      </div>
      <div className="flex-col flex gap-1 text-gray-500 text-sm mt-2">
        <span>{user.email}</span>
        <span>
          Ngày tạo: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
        </span>
      </div>
    </Card>
  );
}

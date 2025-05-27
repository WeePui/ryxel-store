"use client";

import { User } from "@/app/_types/user";
import Card from "@/app/_components/UI/Card";
import Image from "next/image";
import {
  FaEnvelope,
  FaCalendar,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
} from "react-icons/fa";
import Button from "@/app/_components/UI/Button";

interface UserProfileCardProps {
  user: User;
  onEditClick: () => void;
}

export default function UserProfileCard({
  user,
  onEditClick,
}: UserProfileCardProps) {
  return (
    <Card title="Thông tin cá nhân" className="relative">
      <div className="flex items-start gap-6 md:flex-col md:items-center">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src={user.photo?.url || "/dev-users/default.png"}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-3 md:text-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 md:justify-center">
              <FaEnvelope />
              {user.email}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div>
              <p className="text-sm text-gray-500">Giới tính</p>
              <p className="font-medium text-gray-700">
                {user.gender
                  ? user.gender === "male"
                    ? "Nam"
                    : user.gender === "female"
                      ? "Nữ"
                      : "Khác"
                  : "Chưa cập nhật"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium text-gray-700">
                {user.phoneNo || "Chưa cập nhật"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Ngày tham gia</p>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-blue-500" />
                <p className="font-medium text-gray-700">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Vai trò</p>
              <div className="flex items-center gap-2">
                <FaShieldAlt
                  className={
                    user.role === "admin" ? "text-purple-500" : "text-blue-500"
                  }
                />
                <p className="font-medium text-gray-700">
                  {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Trạng thái Email</p>
              <div className="flex items-center gap-2">
                {user.emailVerified ? (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    <p className="font-medium text-green-700">Đã xác thực</p>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-500" />
                    <p className="font-medium text-red-700">Chưa xác thực</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button variant="primary" onClick={onEditClick} icon={<FaEdit />}>
          Chỉnh sửa
        </Button>
      </div>
    </Card>
  );
}

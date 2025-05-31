"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@/app/_types/user";
import { getAllUsers } from "@/app/_libs/apiServices";
import Card from "../../UI/Card";
import { Table, TableColumn } from "../../UI/Table";
import UserFilter from "./UserFilter";
import Image from "next/image";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaEye } from "react-icons/fa";
import NavLink from "../../UI/NavLink";

interface UserTableProps {
  authToken: string;
}

interface UserData {
  users: User[];
  results: number;
}

export default function UserTable({ authToken }: UserTableProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [exportData, setExportData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    search?: string;
    role?: string;
    emailVerified?: string;
  }>({});

  const resultsPerPage = 10;
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const [currentPageData, allUsersData] = await Promise.all([
        // Fetch current page data
        getAllUsers(authToken, {
          ...filters,
          page: currentPage,
          limit: resultsPerPage,
          sort: "-createdAt",
        }),
        // Fetch all users data for export (without pagination)
        getAllUsers(authToken, {
          ...filters,
          sort: "-createdAt",
          limit: 1000, // Large limit to get all data
        }),
      ]);

      setUserData(currentPageData);
      setExportData(allUsersData.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUserData({ users: [], results: 0 });
      setExportData([]);
    } finally {
      setLoading(false);
    }
  }, [authToken, currentPage, filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleFilter = (newFilters: {
    search?: string;
    role?: string;
    emailVerified?: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleReset = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  // Define columns for the enhanced Table component
  const columns: TableColumn<User>[] = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
            {" "}
            <Image
              src={record.photo?.url || "/dev-users/default.png"}
              alt={record.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-primary-500">{record.name}</p>
            <p className="text-sm text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
      csvRender: (_, record) => `${record.name} (${record.email})`,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (value) => (
        <div
          className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
            value === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {value === "admin" ? "Quản trị viên" : "Người dùng"}
        </div>
      ),
      csvRender: (value) =>
        value === "admin" ? "Quản trị viên" : "Người dùng",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (value) => {
        if (!value) return <span className="text-gray-500">Chưa cập nhật</span>;
        const genderMap: Record<string, string> = {
          male: "Nam",
          female: "Nữ",
          other: "Khác",
        };
        return <span>{genderMap[value as string] || (value as string)}</span>;
      },
      csvRender: (value) => {
        if (!value) return "Chưa cập nhật";
        const genderMap: Record<string, string> = {
          male: "Nam",
          female: "Nữ",
          other: "Khác",
        };
        return genderMap[value as string] || (value as string);
      },
    },
    {
      title: "Trạng thái email",
      dataIndex: "emailVerified",
      key: "emailVerified",
      render: (value) => (
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <FaCheckCircle className="text-green-500" />
              <span className="text-green-700">Đã xác thực</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500" />
              <span className="text-red-700">Chưa xác thực</span>
            </>
          )}
        </div>
      ),
      csvRender: (value) => (value ? "Đã xác thực" : "Chưa xác thực"),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => new Date(value as string).toLocaleDateString("vi-VN"),
      csvRender: (value) =>
        new Date(value as string).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "actions",
      render: (value, record) => (
        <div className="flex items-center justify-center gap-2">
          <NavLink
            href={`/admin/users/${value as string}`}
            className="flex items-center gap-1 rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
          >
            <FaEye />
            <span className="sr-only">Xem chi tiết</span>
          </NavLink>
          <button
            className="flex items-center gap-1 rounded px-2 py-1 text-sm text-green-600 hover:bg-green-50"
            onClick={() => {
              // TODO: Add edit functionality
              console.log("Edit user:", record);
            }}
          >
            <FaEdit />
            <span className="sr-only">Chỉnh sửa</span>
          </button>
        </div>
      ),
      csvRender: () => "Xem/Chỉnh sửa", // Simple text for actions column
      align: "center",
    },
  ];

  return (
    <Card
      title="Quản lý người dùng"
      className="w-full"
      titleAction={
        <div className="text-sm text-gray-500">
          {userData?.results || 0} người dùng
        </div>
      }
    >
      <div className="space-y-4">
        {/* Filter Component */}
        <UserFilter onFilter={handleFilter} onReset={handleReset} />

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : userData && userData.users.length > 0 ? (
          <Table
            data={userData.users}
            columns={columns}
            rowKey="_id"
            pagination={{
              total: userData.results,
              current: currentPage,
              pageSize: resultsPerPage,
              onChange: handleChangePage,
              showSizeChanger: false, // Disable page size changer since it's handled server-side
              showQuickJumper: true,
              showTotal: (total: number, range: [number, number]) =>
                `${range[0]}-${range[1]} của ${total} người dùng`,
            }}
            exportData={exportData}
            exportFileName="danh-sach-nguoi-dung.csv"
            className="w-full"
          />
        ) : (
          <div className="py-8 text-center text-gray-500">
            {filters.search || filters.role || filters.emailVerified
              ? "Không tìm thấy người dùng nào phù hợp với bộ lọc"
              : "Không có người dùng nào"}
          </div>
        )}
      </div>
    </Card>
  );
}

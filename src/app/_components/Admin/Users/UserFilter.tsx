"use client";

import { useState } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

interface UserFilterProps {
  onFilter: (filters: {
    search?: string;
    role?: string;
    emailVerified?: string;
  }) => void;
  onReset: () => void;
}

export default function UserFilter({ onFilter, onReset }: UserFilterProps) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      search: search.trim() || undefined,
      role: role || undefined,
      emailVerified: emailVerified || undefined,
    });
  };

  const handleReset = () => {
    setSearch("");
    setRole("");
    setEmailVerified("");
    setShowFilters(false);
    onReset();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
        >
          <FaFilter className="text-sm" />
          Bộ lọc
        </button>

        {/* Search Button */}
        <button
          type="submit"
          className="rounded-lg bg-primary-500 px-6 py-2 text-white hover:bg-primary-600"
        >
          Tìm kiếm
        </button>

        {/* Reset Button */}
        {(search || role || emailVerified) && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
          >
            <FaTimes className="text-sm" />
            Xóa bộ lọc
          </button>
        )}
      </form>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
          {/* Role Filter */}
          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Vai trò
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Tất cả vai trò</option>
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          {/* Email Verified Filter */}
          <div>
            <label
              htmlFor="emailVerified"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Trạng thái email
            </label>
            <select
              id="emailVerified"
              value={emailVerified}
              onChange={(e) => setEmailVerified(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="true">Đã xác thực</option>
              <option value="false">Chưa xác thực</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

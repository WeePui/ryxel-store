"use client";

import { User } from "@/app/_types/user";
import Button from "@/app/_components/UI/Button";
import { FaTimes } from "react-icons/fa";

interface EditUserModalProps {
  user: User;
  statusUpdate: {
    emailVerified: boolean;
    active: boolean;
    role: string;
  };
  onStatusChange: (key: string, value: boolean | string) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

export default function EditUserModal({
  statusUpdate,
  onStatusChange,
  onSave,
  onCancel,
}: EditUserModalProps) {
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Chỉnh sửa người dùng</h2>
          <Button
            variant="ghost"
            size="small"
            iconOnly
            icon={<FaTimes />}
            onClick={onCancel}
          />
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <span className="font-medium">Xác thực email</span>
              <button
                type="button"
                className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300"
                onClick={() =>
                  onStatusChange("emailVerified", !statusUpdate.emailVerified)
                }
              >
                <span
                  className={`absolute h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                    statusUpdate.emailVerified ? "left-7" : "left-1"
                  } top-1`}
                ></span>
                <span
                  className={`block h-full w-full rounded-full transition-colors duration-300 ${
                    statusUpdate.emailVerified ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <span className="font-medium">Trạng thái hoạt động</span>
              <button
                type="button"
                className="relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300"
                onClick={() => onStatusChange("active", !statusUpdate.active)}
              >
                <span
                  className={`absolute h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                    statusUpdate.active ? "left-7" : "left-1"
                  } top-1`}
                ></span>
                <span
                  className={`block h-full w-full rounded-full transition-colors duration-300 ${
                    statusUpdate.active ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
              </button>
            </div>
          </div>
          <div>
            <label className="mb-2 block font-medium">Vai trò</label>
            <select
              value={statusUpdate.role}
              onChange={(e) => onStatusChange("role", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="secondary" type="button" onClick={onCancel}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

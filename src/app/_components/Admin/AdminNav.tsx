"use client";

import { useToggleAdminSidebar } from "@/app/_contexts/ToggleAdminSidebarContext";
import { usePathname, useRouter } from "next/navigation";
import { JSX, useState } from "react";
import {
  FaBell,
  FaBoxes,
  FaLayerGroup,
  FaReceipt,
  FaThLarge,
  FaUsers,
} from "react-icons/fa";
import { FaCircleChevronRight, FaTicket } from "react-icons/fa6";

export default function AdminNav() {
  const { isOpen } = useToggleAdminSidebar();

  return (
    <div className="flex flex-1 flex-col gap-8 px-8 sm:px-12">
      <section
        className={`flex flex-col gap-6 ${
          isOpen ? "items-start" : "items-center"
        }`}
      >
        <h2
          className={`font-title text-[12px] font-semibold uppercase tracking-wider text-grey-300`}
        >
          {isOpen ? "Cửa hàng" : "•"}
        </h2>
        <AdminNavItem
          icon={<FaThLarge />}
          label="Dashboard"
          href="/admin/dashboard"
        />
        <AdminNavItem
          icon={<FaBoxes />}
          label="Sản phẩm"
          href="/admin/products"
        >
          <AdminNavItem label="Danh sách sản phẩm" href="/admin/products" />
          <AdminNavItem label="Thêm sản phẩm" href="/admin/products/add" />
        </AdminNavItem>
        <AdminNavItem
          icon={<FaReceipt />}
          label="Đơn hàng"
          href="/admin/orders"
        />
        <AdminNavItem
          icon={<FaLayerGroup />}
          label="Danh mục"
          href="/admin/categories"
        />
        <AdminNavItem
          icon={<FaTicket />}
          label="Khuyến mãi"
          href="/admin/vouchers"
        />
      </section>
      <section
        className={`flex flex-col gap-6 ${
          isOpen ? "items-start" : "items-center"
        }`}
      >
        <h2 className="font-title text-[12px] font-semibold uppercase tracking-wider text-grey-300">
          {isOpen ? "Khách hàng" : "•"}
        </h2>
        <AdminNavItem
          icon={<FaUsers />}
          label="Khách hàng"
          href="/admin/users"
        />
        <AdminNavItem
          icon={<FaBell />}
          label="Thông báo"
          href="/admin/notifications"
        />
      </section>
    </div>
  );
}

interface AdminNavItemProps {
  icon?: JSX.Element;
  label: string;
  href: string;
  children?: React.ReactNode;
}

function AdminNavItem({ icon, label, href, children }: AdminNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, setIsOpen } = useToggleAdminSidebar();
  const isActive = pathname === href;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsOpen(true);
  };

  return (
    <div
      className={`flex flex-col ${
        isActive ? "text-grey-50" : "text-grey-200"
      } ${isOpen ? "items-start" : "items-center"}`}
      onClick={children ? toggleExpand : () => router.push(href)}
    >
      <div className="flex w-full cursor-pointer items-center gap-4">
        <div className="text-xl">{icon}</div>
        <span
          className={`font-semibold transition-all duration-300 ${
            isOpen ? "inline" : "hidden"
          }`}
          title={!isOpen ? label : undefined}
        >
          {label}
        </span>
        {children && isOpen ? (
          <FaCircleChevronRight
            className={`ml-auto text-sm transition-all duration-300 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        ) : null}
      </div>
      {children && isOpen && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "opacity-1 max-h-[1000px]" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 pl-5 pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

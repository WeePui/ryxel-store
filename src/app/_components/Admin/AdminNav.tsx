'use client';

import { useToggleAdminSidebar } from '@/app/_contexts/ToggleAdminSidebarContext';
import { usePathname, useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import {
  FaBoxes,
  FaHeadset,
  FaLayerGroup,
  FaReceipt,
  FaThLarge,
  FaUsers,
} from 'react-icons/fa';
import { FaCircleChevronRight, FaGears } from 'react-icons/fa6';

export default function AdminNav() {
  const { isOpen } = useToggleAdminSidebar();

  return (
    <div
      className={`flex flex-col ${
        isOpen ? 'px-8 sm:px-12' : 'justify-center'
      } gap-8 justify-between flex-1`}
    >
      <section
        className={`flex flex-col gap-6 ${
          isOpen ? 'items-start' : 'items-center'
        }`}
      >
        <h2
          className={`text-[12px] font-title font-semibold text-grey-300 uppercase tracking-wider`}
        >
          {isOpen ? 'Cửa hàng' : '•'}
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
      </section>
      <section
        className={`flex flex-col gap-6 ${
          isOpen ? 'items-start' : 'items-center'
        }`}
      >
        <h2 className="text-[12px] font-title font-semibold text-grey-300 uppercase tracking-wider">
          {isOpen ? 'Khách hàng' : '•'}
        </h2>
        <AdminNavItem
          icon={<FaUsers />}
          label="Khách hàng"
          href="/admin/users"
        />
      </section>
      <section
        className={`flex flex-col gap-6 ${
          isOpen ? 'items-start' : 'items-center'
        }`}
      >
        <AdminNavItem
          icon={<FaGears />}
          label="Cài đặt"
          href="/admin/settings"
        />
        <AdminNavItem
          icon={<FaHeadset />}
          label="Hỗ trợ"
          href="/admin/support"
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
        isActive ? 'text-grey-50' : 'text-grey-200'
      } ${isOpen ? 'items-start' : 'items-center'}`}
      onClick={children ? toggleExpand : () => router.push(href)}
    >
      <div className="flex items-center gap-4 cursor-pointer w-full">
        <div className="text-xl">{icon}</div>
        <span
          className={`transition-all duration-300 font-semibold ${
            isOpen ? 'inline' : 'hidden'
          }`}
          title={!isOpen ? label : undefined}
        >
          {label}
        </span>
        {children && isOpen ? (
          <FaCircleChevronRight
            className={`ml-auto transition-all duration-300 text-sm ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        ) : null}
      </div>
      {children && isOpen && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[1000px] opacity-1' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2 pl-5 pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

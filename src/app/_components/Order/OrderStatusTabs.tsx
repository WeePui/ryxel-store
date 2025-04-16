'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface OrderStatusTabsProps {
  onChangeTab?: (status: string) => void;
}

export default function OrderStatusTabs({ onChangeTab }: OrderStatusTabsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  const handleTabChange = (status: string) => {
    setActiveTab(status);
    if (onChangeTab) {
      onChangeTab(status);
    }

    if (status === 'all') {
      router.push('orders');
    }
  };

  return (
    <div>
      <ul className="text-sm font-medium text-center rounded-lg shadow-sm flex dark:divide-gray-700 dark:text-gray-400 overflow-hidden overflow-x-auto w-full scrollbar-hide whitespace-nowrap">
        <TabItem
          href="#"
          current={activeTab === 'all'}
          onClick={() => handleTabChange('all')}
        >
          Tất cả
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === 'unpaid'}
          onClick={() => handleTabChange('unpaid')}
        >
          Chưa thanh toán
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === 'pending'}
          onClick={() => handleTabChange('pending')}
        >
          Chờ xác nhận
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === 'processing'}
          onClick={() => handleTabChange('processing')}
        >
          Đang xử lí
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === 'shipped'}
          onClick={() => handleTabChange('shipped')}
        >
          Đang giao
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === 'delivered'}
          onClick={() => handleTabChange('delivered')}
        >
          Đã giao
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === 'canceled'}
          onClick={() => handleTabChange('canceled')}
        >
          Đã hủy
        </TabItem>
      </ul>
    </div>
  );
}

interface TabItemProps {
  children: React.ReactNode;
  href: string;
  current?: boolean;
  onClick?: () => void;
}

function TabItem({ children, href, current, onClick }: TabItemProps) {
  return (
    <li
      className={`w-full focus-within:z-10 flex items-stretch justify-center`}
      onClick={onClick}
    >
      <Link
        href={href}
        className={`${
          current
            ? 'text-white bg-primary-default'
            : 'text-primary-500 bg-white'
        } text-center w-full px-4 py-2 flex items-center justify-center border-s-0 border-gray-600 dark:border-gray-700 hover:rounded-t-lg hover:text-primary-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-tertiary-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300`}
      >
        {children}
      </Link>
    </li>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface OrderStatusTabsProps {
  onChangeTab?: (status: string) => void;
}

export default function OrderStatusTabs({ onChangeTab }: OrderStatusTabsProps) {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const { t } = useLanguage();

  const handleTabChange = (status: string) => {
    setActiveTab(status);
    if (onChangeTab) {
      onChangeTab(status);
    }

    if (status === "all") {
      router.push("orders");
    }
  };

  return (
    <div>
      <ul className="flex w-full overflow-hidden overflow-x-auto whitespace-nowrap rounded-lg text-center text-sm font-medium shadow-sm scrollbar-hide dark:divide-gray-700 dark:text-gray-400">
        {" "}
        <TabItem
          href="#"
          current={activeTab === "all"}
          onClick={() => handleTabChange("all")}
        >
          {t("orders.status.all")}
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === "unpaid"}
          onClick={() => handleTabChange("unpaid")}
        >
          {t("orders.status.unpaid")}
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === "pending"}
          onClick={() => handleTabChange("pending")}
        >
          {t("orders.status.pending")}
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === "processing"}
          onClick={() => handleTabChange("processing")}
        >
          {t("orders.status.processing")}
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === "shipped"}
          onClick={() => handleTabChange("shipped")}
        >
          {t("orders.status.shipped")}
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === "delivered"}
          onClick={() => handleTabChange("delivered")}
        >
          {t("orders.status.delivered")}
        </TabItem>
        <TabItem
          href="#"
          current={activeTab === "cancelled"}
          onClick={() => handleTabChange("cancelled")}
        >
          {t("orders.status.cancelled")}
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
      className={`flex w-full items-stretch justify-center focus-within:z-10`}
      onClick={onClick}
    >
      <Link
        href={href}
        className={`${
          current
            ? "bg-primary-default text-white"
            : "bg-white text-primary-500"
        } flex w-full items-center justify-center border-s-0 border-gray-600 px-4 py-2 text-center transition-all duration-300 hover:rounded-t-lg hover:bg-gray-200 hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-tertiary-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
      >
        {children}
      </Link>
    </li>
  );
}

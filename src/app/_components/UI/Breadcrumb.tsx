"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";
import { FaChevronRight } from "react-icons/fa6";
import NavLink from "./NavLink";

interface BreadcrumbItem {
  label?: string;
  href?: string;
  translateKey?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`flex items-center text-sm font-semibold text-grey-400 ${className} max-w-full overflow-auto scrollbar-hide`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const label = item.translateKey
          ? t(item.translateKey)
          : item.label || "";

        return (
          <div key={index} className="flex items-center">
            {index > 0 && <FaChevronRight className="mx-2 text-xs" />}

            {item.href && !isLast ? (
              <NavLink href={item.href}>
                <span className="text-grey-400 md:truncate">{label}</span>
              </NavLink>
            ) : (
              <span
                className={`${isLast ? "text-primary-500" : "text-grey-400"} text-ellipsis md:truncate`}
              >
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

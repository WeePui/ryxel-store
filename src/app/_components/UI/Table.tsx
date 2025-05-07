import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

export function Table({ children, className, bordered }: TableProps) {
  return (
    <table
      className={`${className} ${
        bordered ? 'border border-gray-200 border-collapse' : ''
      }`}
    >
      {children}
    </table>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return <thead className={`md:hidden ${className}`}>{children}</thead>;
}

export function TableHeaderRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tr className={`grid grid-cols-6 ${className}`}>{children}</tr>;
}

export function TableHeaderCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`text-left text-sm font-medium text-gray-500 px-2 py-2 dark:text-gray-400 ${className}`}
    >
      {children}
    </th>
  );
}

export function TableBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tbody
      className={`${className} md:divide-y-2 md:flex md:flex-col md:gap-4 md:pb-2`}
    >
      {children}
    </tbody>
  );
}

export function TableBodyRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`md:grid-cols-1 md:gap-y-2 md:p-4 md:rounded-lg md:shadow-sm md:bg-white grid grid-cols-6 ${className} hover:bg-secondary-200`}
    >
      {children}
    </tr>
  );
}

interface TableBodyCellProps {
  children: React.ReactNode;
  label?: string; // dùng để hiển thị tên trường
  className?: string;
}

export function TableBodyCell({
  children,
  label,
  className,
}: TableBodyCellProps) {
  return (
    <td
      className={`relative text-sm text-gray-900 dark:text-gray-300 py-3 md:py-1 px-2 ${className}`}
    >
      <span className="hidden md:block font-medium text-gray-500 mb-1 truncate">
        {label}
      </span>
      {children}
    </td>
  );
}

"use client";

import React, { useState } from "react";
import { Table as AntTable, Button, Dropdown, Checkbox, Tooltip } from "antd";
import type {
  TableProps as AntTableProps,
  ColumnType as TableColumnType,
  TablePaginationConfig,
} from "antd/es/table";
import { SortOrder } from "antd/es/table/interface";
import { DownloadOutlined, SettingOutlined } from "@ant-design/icons";

export interface TableColumn<T extends object> {
  dataIndex: keyof T | string;
  key?: string;
  title: string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  sortDirections?: SortOrder[];
  defaultSortOrder?: SortOrder;
  width?: number | string;
  align?: "left" | "center" | "right";
  responsive?: ("xxl" | "xl" | "lg" | "md" | "sm" | "xs")[];
  fixed?: "left" | "right" | boolean;
  ellipsis?: boolean;
  // For CSV export - function to extract plain text from complex render functions
  csvRender?: (value: unknown, record: T, index: number) => string;
}

export interface TableProps<T extends object> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  pagination?: TablePaginationConfig | false;
  scroll?: { x?: number | string | true; y?: number | string };
  bordered?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
  onChange?: AntTableProps<T>["onChange"];
  expandable?: AntTableProps<T>["expandable"];
  showSorterTooltip?: boolean;
  sticky?:
    | boolean
    | {
        offsetHeader?: number;
        offsetScroll?: number;
        getContainer?: () => HTMLElement;
      };
  summary?: (data: readonly T[]) => React.ReactNode;
  onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLElement>;
  // For CSV export - all data instead of just current page
  exportData?: T[];
  exportFileName?: string;
}

export function Table<T extends object>({
  data,
  columns,
  loading = false,
  rowKey = "id",
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} của ${total} mục`,
  },
  scroll,
  bordered = false,
  size = "middle",
  className,
  onChange,
  expandable,
  showSorterTooltip = true,
  sticky = false,
  summary,
  onRow,
  exportData,
  exportFileName = "table-data.csv",
}: TableProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => (col.key as string) || (col.dataIndex as string)),
  );

  // Transform các columns để phù hợp với cách hiển thị trên mobile
  const responsiveColumns: TableColumnType<T>[] = columns
    .filter((column) => {
      const columnKey = (column.key as string) || (column.dataIndex as string);
      return visibleColumns.includes(columnKey);
    })
    .map((column) => {
      // Properly convert custom column type to Ant Design's ColumnType
      const antColumn: TableColumnType<T> = {
        ...column,
        title: column.title,
        dataIndex: column.dataIndex as string,
        key: column.key,
        align: column.align, // Make sure align property is explicitly passed
        render: column.render || ((value) => value),
        onCell: () => {
          // Need to return this type to satisfy Ant Design's requirements
          return {
            style: {
              "--data-label": `"${column.title}"`,
            } as React.CSSProperties,
            className: column.align
              ? `ant-table-cell-align-${column.align}`
              : "",
          };
        },
      };
      return antColumn;
    });

  // Helper function to safely access nested properties
  const getNestedValue = (obj: T, path: string): unknown => {
    return path.split(".").reduce((prev, curr) => {
      return prev && typeof prev === "object"
        ? (prev as Record<string, unknown>)[curr]
        : undefined;
    }, obj as unknown);
  };
  // Export to CSV
  const exportToCSV = () => {
    // Use exportData if provided (all data), otherwise use current page data
    const dataToExport = exportData || data;
    if (dataToExport.length === 0) return;

    // Filter columns to only include visible ones for export
    const visibleColumnsToExport = columns.filter((column) => {
      const columnKey = (column.key as string) || (column.dataIndex as string);
      return visibleColumns.includes(columnKey);
    });

    const headers = visibleColumnsToExport.map((col) => col.title).join(",");
    const csvRows = dataToExport.map((row, index) => {
      return visibleColumnsToExport
        .map((col) => {
          const dataIndex = col.dataIndex as string;
          let value: unknown;

          // Get the raw value
          if (dataIndex.includes(".")) {
            value = getNestedValue(row, dataIndex);
          } else {
            value = row[dataIndex as keyof T];
          } // Use csvRender if provided for plain text extraction
          if (col.csvRender) {
            value = col.csvRender(value, row, index);
          } else if (
            col.render &&
            typeof value !== "string" &&
            typeof value !== "number"
          ) {
            // For complex render functions without csvRender, try to extract meaningful text
            if (
              dataIndex === "name" &&
              typeof row === "object" &&
              row !== null
            ) {
              // For user/product name fields that might have complex renders
              const recordWithName = row as Record<string, unknown>;
              value = recordWithName.name || recordWithName.title || value;
            } else {
              // Default fallback for complex renders
              value = String(value);
            }
          }

          // Clean and escape the value for CSV
          const stringValue =
            value !== undefined && value !== null ? String(value) : "";
          return `"${stringValue.replace(/"/g, '""')}"`;
        })
        .join(",");
    });

    const csvString = [headers, ...csvRows].join("\n");

    // Add UTF-8 BOM for Vietnamese character support
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvString], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", exportFileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Column visibility menu items
  const columnItems = columns.map((column) => {
    const key = (column.key as string) || (column.dataIndex as string);
    return {
      key,
      label: (
        <div className="flex items-center">
          <Checkbox
            checked={visibleColumns.includes(key)}
            onChange={(e) => {
              if (e.target.checked) {
                setVisibleColumns([...visibleColumns, key]);
              } else {
                if (visibleColumns.length > 1) {
                  setVisibleColumns(visibleColumns.filter((k) => k !== key));
                }
              }
            }}
          >
            {column.title}
          </Checkbox>
        </div>
      ),
    };
  });

  return (
    <div className={`responsive-table-container ${className || ""}`}>
      <style jsx global>{`
        /* Desktop-first approach - mặc định hiển thị bảng đầy đủ */
        .responsive-table-container .ant-table {
          overflow-x: auto;
        }
        /* Apply alignment classes for desktop view - using more specific selectors */
        .responsive-table-container
          .ant-table-container
          .ant-table-content
          table
          tbody
          tr
          td.ant-table-cell.ant-table-cell-align-left {
          text-align: left !important;
        }

        .responsive-table-container
          .ant-table-container
          .ant-table-content
          table
          tbody
          tr
          td.ant-table-cell.ant-table-cell-align-center {
          text-align: center !important;
        }

        .responsive-table-container
          .ant-table-container
          .ant-table-content
          table
          tbody
          tr
          td.ant-table-cell.ant-table-cell-align-right {
          text-align: right !important;
        }

        /* Mobile responsive - chuyển sang hiển thị dạng card khi màn hình nhỏ hơn md */
        @media (max-width: 768px) {
          .responsive-table-container .ant-table-thead {
            display: none;
          }

          .responsive-table-container .ant-table-tbody > tr {
            display: block;
            border: 1px solid #f0f0f0;
            padding: 8px 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          .responsive-table-container .ant-table-tbody > tr > td {
            display: flex;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
            text-align: right; /* Default alignment for mobile view */
          }

          .responsive-table-container .ant-table-tbody > tr > td:last-child {
            border-bottom: none;
          }

          /* Apply align attribute on desktop */
          .responsive-table-container
            .ant-table-tbody
            > tr
            > td.ant-table-cell-align-center {
            justify-content: center;
          }

          .responsive-table-container
            .ant-table-tbody
            > tr
            > td.ant-table-cell-align-left {
            justify-content: flex-start;
          }

          .responsive-table-container
            .ant-table-tbody
            > tr
            > td.ant-table-cell-align-right {
            justify-content: flex-end;
          }

          .responsive-table-container .ant-table-tbody > tr > td:before {
            content: var(--data-label, "");
            font-weight: 500;
            margin-right: auto;
            color: #666;
          }
        }
      `}</style>
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <Tooltip
          title={
            exportData
              ? "Xuất tất cả dữ liệu dạng CSV"
              : "Xuất dữ liệu trang hiện tại dạng CSV"
          }
        >
          <Button
            onClick={exportToCSV}
            icon={<DownloadOutlined />}
            disabled={(exportData || data).length === 0}
          >
            {exportData ? `Xuất CSV (${exportData.length})` : "Xuất CSV"}
          </Button>
        </Tooltip>
        <Dropdown
          menu={{
            items: columnItems,
          }}
          trigger={["click"]}
        >
          <Button icon={<SettingOutlined />}>Tùy chỉnh cột</Button>
        </Dropdown>
      </div>
      <AntTable
        dataSource={data}
        columns={responsiveColumns}
        loading={loading}
        rowKey={rowKey}
        pagination={pagination}
        scroll={scroll}
        bordered={bordered}
        size={size}
        onChange={onChange}
        expandable={expandable}
        showSorterTooltip={showSorterTooltip}
        sticky={sticky}
        summary={summary}
        onRow={onRow}
      />
    </div>
  );
}

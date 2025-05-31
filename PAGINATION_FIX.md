# Table Pagination Configuration Guide

## Issue Resolution: Ant Design Table Pagination Warning

**Warning:** `dataSource` length is less than `pagination.total` but large than `pagination.pageSize`

## Root Cause

This warning occurs when using server-side pagination with Ant Design tables where:

- `dataSource` contains only current page data (e.g., 10 items)
- `pagination.total` represents total items across all pages (e.g., 100 items)
- Ant Design expects either all data with client-side pagination OR properly configured server-side pagination

## Solution Applied

Updated all admin table components with proper server-side pagination configuration:

```tsx
pagination={{
  total: totalResults,           // Total items across all pages
  current: currentPage,          // Current page number
  pageSize: resultsPerPage,      // Items per page
  onChange: handleChangePage,    // Page change handler
  showSizeChanger: false,        // Disable since handled server-side
  showQuickJumper: true,         // Allow quick page jumping
  showTotal: (total: number, range: [number, number]) =>
    `${range[0]}-${range[1]} của ${total} items`,
}}
```

## Files Updated

- `ProductsTable.tsx` - Products admin table
- `UserTable.tsx` - Users admin table
- `VoucherTable.tsx` - Vouchers admin table
- `OrderHistoryTable.tsx` - Order history table
- `OrderTable.tsx` - Orders admin table

## Best Practices

1. **Server-side pagination**: Use `showSizeChanger: false` to prevent conflicts
2. **Client-side pagination**: Let Ant Design handle everything automatically
3. **showTotal**: Always provide clear pagination info to users
4. **showQuickJumper**: Enable for better UX with large datasets

## Future Development

When creating new table components:

1. Decide between client-side vs server-side pagination
2. Configure pagination props accordingly
3. Test with various data sizes to ensure no warnings

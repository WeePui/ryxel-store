"use client";

import { useContext } from "react";
import { LanguageContext } from "@/app/_contexts/LanguageContext";

// Vietnamese fallback translations - add more as needed
const vietnameseFallback = {
  // Header translations
  "header.profile": "Hồ sơ",
  "header.orders": "Đơn hàng",
  "header.logout": "Đăng xuất",
  "header.searchbar.searchPlaceholder":
    "Tìm kiếm sản phẩm, danh mục & khác ...",

  // Products filter translations
  "products.filter.title": "Bộ lọc",
  "products.filter.reset": "Đặt lại",
  "products.filter.brand": "Thương hiệu",
  "products.filter.price": "Giá",
  "products.filter.rating": "Đánh giá",
  // Category filter translations
  "products.filter.category": "Danh mục",
  "products.filter.all": "Tất cả",

  // Sort selector translations
  "products.sortBy": "Sắp xếp theo",
  "products.sortOptions.newest": "Mới nhất",
  "products.sortOptions.priceHighToLow": "Giá: Cao đến thấp",
  "products.sortOptions.priceLowToHigh": "Giá: Thấp đến cao",
  "products.sortOptions.bestSelling": "Bán chạy nhất",
  "products.sortOptions.topRated": "Đánh giá cao nhất",
  // Blog translations
  "blog.categories.all": "Tất cả",
  "blog.categories.gamingGear": "Gaming Gear",
  "blog.categories.tutorials": "Hướng dẫn",
  "blog.categories.esports": "Esports",
  "blog.categories.software": "Phần mềm",
  "blog.categories.technology": "Công nghệ",
  "blog.noArticles": "Không có bài viết nào trong danh mục này.",

  // Blog category mappings (for filtering)
  "blog.categoryMap.Gaming Gear": "Gaming Gear",
  "blog.categoryMap.Hướng dẫn": "Hướng dẫn",
  "blog.categoryMap.Esports": "Esports",
  "blog.categoryMap.Phần mềm": "Phần mềm",
  "blog.categoryMap.Công nghệ": "Công nghệ",

  // Confirm dialogue translations
  "confirmDialogue.cancel": "Hủy",
  "confirmDialogue.confirm": "Xác nhận",

  // Add more translations as needed for other components
};

/**
 * Safe translation hook that falls back to Vietnamese when not in LanguageProvider context
 * This allows components to work both in user-facing pages (with LanguageProvider)
 * and admin pages (without LanguageProvider)
 */
export const useSafeTranslation = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    // Fallback to Vietnamese when not in LanguageProvider context
    return (key: string) =>
      vietnameseFallback[key as keyof typeof vietnameseFallback] || key;
  }

  return context.t;
};

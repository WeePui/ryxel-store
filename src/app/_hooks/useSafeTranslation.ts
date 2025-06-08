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
  // Timeline tracking translations
  "timelineTracking.collapse": "Thu gọn",
  "timelineTracking.showMore": "Hiển thị thêm",
  language: "vi",
  // Order details translations
  "account.orderDetails.products": "Sản phẩm",
  "account.orderDetails.totalItems": "Tổng cộng {count} sản phẩm",
  // Order item translations
  "account.orders.variant": "Phiên bản",
  "account.orders.quantity": "Số lượng",
  "account.orders.subtotal": "Tạm tính",

  // Cart and order summary translations
  "cart.orderSummary.subtotal": "Tạm tính",
  "cart.orderSummary.discount": "Giảm giá",
  "cart.orderSummary.shippingFee": "Phí vận chuyển",
  "orders.card.total": "Tổng cộng",
  "checkout.summary.paymentMethod": "Phương thức thanh toán",

  // Payment method translations
  "account.orderDetails.paymentMethods.cod": "Thanh toán khi nhận hàng",
  "account.orderDetails.paymentMethods.stripe": "Thẻ tín dụng/ghi nợ",
  "account.orderDetails.paymentMethods.zalopay": "ZaloPay",

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

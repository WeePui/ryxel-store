"use client";

import React from "react";
import {
  FaCreditCard,
  FaHeadset,
  FaShieldHeart,
  FaThumbsUp,
  FaTruck,
} from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function FeaturesSection() {
  const { language } = useLanguage();
  return (
    <section className="mx-auto flex max-w-7xl gap-24 px-4 py-20 lg:py-12 md:flex-col md:gap-10">
      {" "}
      <div className="flex flex-[3] flex-col justify-start gap-4 tracking-wider text-gray-700">
        <p className="font-title text-5xl md:text-3xl">
          {language === "vi"
            ? "Lí do để mua hàng tại Ryxel.com"
            : "Why shop at Ryxel.com"}
        </p>
        <p className="md:text-sm">
          {language === "vi"
            ? "Tại Ryxel, chúng tôi không chỉ cung cấp thiết bị gaming cao cấp, mà còn mang đến trải nghiệm mua sắm chuyên nghiệp, nhanh chóng và tận tâm."
            : "At Ryxel, we not only provide premium gaming equipment, but also deliver a professional, fast, and dedicated shopping experience."}
        </p>
      </div>
      <div className="grid flex-[7] grid-cols-3 gap-12 lg:justify-items-center md:grid-cols-2 md:gap-4">
        {" "}
        <div className="flex flex-col">
          <FaTruck className="text-5xl md:text-3xl" />
          <span className="mt-4 font-bold">
            {language === "vi" ? "Giao hàng hoả tốc" : "Express Delivery"}
          </span>
          <span className="mt-2 max-w-48 text-sm font-semibold text-gray-500">
            {language === "vi"
              ? "Nhận hàng trong ngày tại TP.HCM và Hà Nội. Tối đa 2 ngày cho các tỉnh thành khác."
              : "Same-day delivery in Ho Chi Minh City and Hanoi. Maximum 2 days for other provinces."}
          </span>
        </div>
        <div className="flex flex-col">
          <FaShieldHeart className="text-5xl md:text-3xl" />
          <span className="mt-4 font-bold">
            {language === "vi" ? "Đổi trả dễ dàng" : "Easy Returns"}
          </span>
          <span className="mt-2 max-w-48 text-sm font-semibold text-gray-500">
            {language === "vi"
              ? "Mua sắm không âu lo với chính sách đổi trả trong vòng 7 ngày. Hoàn tiền 100% nếu sản phẩm không đúng như mô tả."
              : "Worry-free shopping with our 7-day return policy. 100% refund if the product is not as described."}
          </span>
        </div>
        <div className="flex flex-col">
          <FaCreditCard className="text-5xl md:text-3xl" />
          <span className="mt-4 font-bold">
            {language === "vi" ? "Thanh toán linh hoạt" : "Flexible Payment"}
          </span>
          <span className="mt-2 max-w-48 text-sm font-semibold text-gray-500">
            {language === "vi"
              ? "Hỗ trợ nhiều hình thức thanh toán như chuyển khoản, thẻ tín dụng, ví điện tử và thanh toán khi nhận hàng (COD)."
              : "Support various payment methods such as bank transfer, credit card, e-wallet, and cash on delivery (COD)."}
          </span>
        </div>
        <div className="flex flex-col">
          <FaHeadset className="text-5xl md:text-3xl" />
          <span className="mt-4 font-bold">
            {language === "vi"
              ? "Hỗ trợ khách hàng 24/7"
              : "24/7 Customer Support"}
          </span>
          <span className="mt-2 max-w-48 text-sm font-semibold text-gray-500">
            {language === "vi"
              ? "Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi."
              : "Our customer service team is always ready to assist you anytime, anywhere."}
          </span>
        </div>
        <div className="flex flex-col">
          <FaThumbsUp className="text-5xl md:text-3xl" />
          <span className="mt-4 font-bold">
            {language === "vi" ? "Sản phẩm cao cấp" : "Premium Products"}
          </span>
          <span className="mt-2 max-w-48 text-sm font-semibold text-gray-500">
            {language === "vi"
              ? "Cam kết cung cấp các sản phẩm chính hãng, chất lượng cao từ các thương hiệu nổi tiếng trong ngành gaming."
              : "Committed to providing authentic, high-quality products from renowned brands in the gaming industry."}
          </span>
        </div>
      </div>
    </section>
  );
}

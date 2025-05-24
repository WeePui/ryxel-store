"use client";

import React from "react";
import NavLink from "../UI/NavLink";
import { FaChevronRight } from "react-icons/fa6";
import FAQItem from "./FAQItem";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function FAQTranslated() {
  const { t, language } = useLanguage();

  // Define FAQs for both languages
  const faqs = {
    vi: [
      {
        question: "Ryxel Store là gì?",
        answer:
          "Ryxel Store là cửa hàng chuyên cung cấp gaming gear và phụ kiện PC, bao gồm chuột, bàn phím, tai nghe, ghế gaming, bàn gaming và nhiều sản phẩm khác dành cho game thủ.",
      },
      {
        question: "Tôi có thể thanh toán bằng những phương thức nào?",
        answer: (
          <span>
            Bạn có thể thanh toán bằng{" "}
            <strong>
              thẻ tín dụng, chuyển khoản ngân hàng, hoặc ví điện tử
            </strong>
            .
          </span>
        ),
      },
      {
        question: "Tôi có thể đặt hàng tại Ryxel Store như thế nào?",
        answer:
          "Bạn có thể đặt hàng trực tiếp trên website bằng cách chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn.",
      },
      {
        question: "Tôi có thể đổi trả sản phẩm không?",
        answer: (
          <span>
            Có. Nếu sản phẩm bị lỗi hoặc không đúng như mô tả, bạn có thể liên
            hệ{" "}
            <NavLink type="mainNavInline" href="mailto:support@ryxelstore.com">
              <strong>support@ryxelstore.com</strong>
            </NavLink>{" "}
            trong vòng 7 ngày kể từ khi nhận hàng để được hướng dẫn đổi/trả.
          </span>
        ),
      },
      {
        question: "Có cách nào để theo dõi đơn hàng không?",
        answer:
          "Có. Sau khi đặt hàng, bạn sẽ nhận được email xác nhận có chứa thông tin theo dõi đơn hàng của mình.",
      },
    ],
    en: [
      {
        question: "What is Ryxel Store?",
        answer:
          "Ryxel Store is a shop specializing in gaming gear and PC accessories, including mice, keyboards, headsets, gaming chairs, gaming desks, and many other products for gamers.",
      },
      {
        question: "What payment methods can I use?",
        answer: (
          <span>
            You can pay with{" "}
            <strong>credit cards, bank transfers, or e-wallets</strong>.
          </span>
        ),
      },
      {
        question: "How can I place an order at Ryxel Store?",
        answer:
          "You can place an order directly on the website by selecting products, adding them to your cart, and following the checkout instructions.",
      },
      {
        question: "Can I return or exchange products?",
        answer: (
          <span>
            Yes. If the product is defective or not as described, you can
            contact{" "}
            <NavLink type="mainNavInline" href="mailto:support@ryxelstore.com">
              <strong>support@ryxelstore.com</strong>
            </NavLink>{" "}
            within 7 days of receiving the order for return/exchange guidance.
          </span>
        ),
      },
      {
        question: "Is there a way to track my order?",
        answer:
          "Yes. After placing an order, you will receive a confirmation email containing tracking information for your order.",
      },
    ],
  };

  // Select the appropriate FAQs based on current language
  const currentFaqs = language === "vi" ? faqs.vi : faqs.en;

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col gap-10 xl:px-6 lg:mt-4">
      <div>
        <h1 className="font-title text-3xl font-semibold text-primary-500">
          {t("faq.title")}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">{t("header.shop")}</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">{t("faq.title")}</span>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-3xl flex-col gap-6 text-grey-700">
          {currentFaqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

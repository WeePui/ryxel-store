"use client";

import React from "react";
import NavLink from "../UI/NavLink";
import { FaChevronRight } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function PrivacyPolicyTranslated() {
  const { t, language } = useLanguage();

  const content = {
    vi: {
      title: "Chính sách Quyền riêng tư",
      date: "Ngày có hiệu lực: 24/04/2025",
      intro:
        "Tại Ryxel Store, chúng tôi coi trọng sự riêng tư và bảo mật của khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi sử dụng trang web và ứng dụng Ryxel.",
      section1: {
        title: "1. Thông tin Chúng tôi Thu thập",
        intro: "Chúng tôi có thể thu thập các loại thông tin sau:",
        items: [
          "Thông tin cá nhân như tên, email, số điện thoại, địa chỉ giao hàng.",
          "Thông tin thanh toán và lịch sử đơn hàng.",
          "Dữ liệu sử dụng, chẳng hạn như trang bạn truy cập và thời gian sử dụng.",
          "Thông tin thiết bị (bao gồm iPhone, iPad hoặc thiết bị Android) để tối ưu trải nghiệm.",
        ],
      },
      section2: {
        title: "2. Mục đích Sử dụng Thông tin",
        intro: "Thông tin của bạn được dùng để:",
        items: [
          "Xử lý đơn hàng và cung cấp dịch vụ khách hàng.",
          "Phân tích hành vi để cải thiện UI/UX, bao gồm cả trên mobile app và website.",
          "Gửi thông báo khuyến mãi, cập nhật sản phẩm mới (nếu bạn đồng ý).",
        ],
      },
      section3: {
        title: "3. Bảo mật Dữ liệu",
        content:
          "Chúng tôi sử dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân khỏi truy cập trái phép, mất mát hoặc sử dụng sai mục đích. Tất cả dữ liệu được lưu trữ an toàn trên hệ thống được mã hóa và tuân thủ các quy định bảo mật hiện hành.",
      },
      section4: {
        title: "4. Chia sẻ Thông tin",
        intro:
          "Chúng tôi không bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba ngoại trừ các trường hợp:",
        items: [
          "Phục vụ giao hàng hoặc xử lý thanh toán thông qua bên cung cấp dịch vụ đáng tin cậy.",
          "Tuân thủ yêu cầu pháp lý từ cơ quan có thẩm quyền.",
        ],
      },
      section5: {
        title: "5. Quyền của Người dùng",
        content:
          "Bạn có quyền truy cập, sửa đổi, xóa thông tin cá nhân của mình hoặc hạn chế việc xử lý dữ liệu. Để thực hiện các quyền này, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi theo thông tin bên dưới.",
      },
      section6: {
        title: "6. Thay đổi Chính sách",
        content:
          "Chúng tôi có thể cập nhật chính sách này theo thời gian. Khi có thay đổi đáng kể, chúng tôi sẽ thông báo qua email hoặc thông báo trên trang web của chúng tôi.",
      },
      section7: {
        title: "7. Liên hệ",
        content:
          "Nếu bạn có bất kỳ câu hỏi nào về chính sách quyền riêng tư của chúng tôi, vui lòng liên hệ:",
        email: "privacy@ryxelstore.com",
        address:
          "Ryxel Store, 1 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP.HCM",
      },
    },
    en: {
      title: "Privacy Policy",
      date: "Effective Date: April 24, 2025",
      intro:
        "At Ryxel Store, we value your privacy and the security of your personal information. This policy describes how we collect, use, and protect your personal information when you use the Ryxel website and application.",
      section1: {
        title: "1. Information We Collect",
        intro: "We may collect the following types of information:",
        items: [
          "Personal information such as name, email, phone number, delivery address.",
          "Payment information and order history.",
          "Usage data, such as pages you visit and time spent.",
          "Device information (including iPhone, iPad, or Android devices) to optimize experience.",
        ],
      },
      section2: {
        title: "2. How We Use Your Information",
        intro: "Your information is used to:",
        items: [
          "Process orders and provide customer service.",
          "Analyze behavior to improve UI/UX, including on mobile app and website.",
          "Send promotional notifications, new product updates (if you agree).",
        ],
      },
      section3: {
        title: "3. Data Security",
        content:
          "We employ technical and organizational security measures to protect personal information from unauthorized access, loss, or misuse. All data is securely stored on encrypted systems and complies with current security regulations.",
      },
      section4: {
        title: "4. Information Sharing",
        intro:
          "We do not sell or share personal information with third parties except in cases of:",
        items: [
          "Delivery services or payment processing through trusted service providers.",
          "Compliance with legal requirements from authorities.",
        ],
      },
      section5: {
        title: "5. User Rights",
        content:
          "You have the right to access, modify, delete your personal information, or restrict data processing. To exercise these rights, please contact our support team using the information below.",
      },
      section6: {
        title: "6. Policy Changes",
        content:
          "We may update this policy from time to time. When significant changes occur, we will notify you via email or through notifications on our website.",
      },
      section7: {
        title: "7. Contact Us",
        content:
          "If you have any questions about our privacy policy, please contact:",
        email: "privacy@ryxelstore.com",
        address:
          "Ryxel Store, 1 Vo Van Ngan, Linh Chieu Ward, Thu Duc City, HCMC",
      },
    },
  };

  const currentContent = language === "vi" ? content.vi : content.en;

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col gap-10 xl:px-6 lg:mt-4">
      <div>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">{t("header.shop")}</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">{t("footer.privacy")}</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 text-left text-grey-700">
        <div className="flex flex-col gap-4">
          <h2 className="font-title text-4xl font-bold tracking-wide text-primary-500">
            {currentContent.title}
          </h2>
          <p className="italic">{currentContent.date}</p>
          <p className="font-medium">{currentContent.intro}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section1.title}</h3>
          <p className="font-medium">{currentContent.section1.intro}</p>
          <ul className="ml-10 list-disc font-medium">
            {currentContent.section1.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section2.title}</h3>
          <p className="font-medium">{currentContent.section2.intro}</p>
          <ul className="ml-10 list-disc font-medium">
            {currentContent.section2.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section3.title}</h3>
          <p className="font-medium">{currentContent.section3.content}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section4.title}</h3>
          <p className="font-medium">{currentContent.section4.intro}</p>
          <ul className="ml-10 list-disc font-medium">
            {currentContent.section4.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section5.title}</h3>
          <p className="font-medium">{currentContent.section5.content}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section6.title}</h3>
          <p className="font-medium">{currentContent.section6.content}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section7.title}</h3>
          <p className="font-medium">{currentContent.section7.content}</p>
          <p className="font-medium">
            <strong>Email:</strong> {currentContent.section7.email}
          </p>
          <p className="font-medium">
            <strong>{language === "vi" ? "Địa chỉ" : "Address"}:</strong>{" "}
            {currentContent.section7.address}
          </p>
        </div>
      </div>
    </div>
  );
}

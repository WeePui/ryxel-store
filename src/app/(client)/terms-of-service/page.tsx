"use client";

import NavLink from "@components/UI/NavLink";
import { FaChevronRight } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function TermsOfServiceTranslated() {
  const { t, language } = useLanguage();

  const content = {
    vi: {
      title: "Điều khoản và Dịch vụ",
      date: "Ngày có hiệu lực: 24/02/2025",
      intro:
        "Chào mừng bạn đến với Ryxel! Trước khi sử dụng ứng dụng của chúng tôi, vui lòng đọc kỹ các điều khoản và dịch vụ dưới đây. Bằng cách sử dụng ứng dụng của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản này.",
      section1: {
        title: "1. Chấp nhận Điều khoản",
        content:
          "Bằng cách truy cập và sử dụng Ryxel, bạn đồng ý tuân thủ các điều khoản và dịch vụ này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng ứng dụng của chúng tôi.",
      },
      section2: {
        title: "2. Sửa đổi Điều khoản",
        content:
          "Chúng tôi có quyền sửa đổi các điều khoản này bất kỳ lúc nào. Mọi thay đổi sẽ được thông báo trên trang web hoặc trong ứng dụng và có hiệu lực ngay lập tức sau khi đăng. Việc bạn tiếp tục sử dụng ứng dụng sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.",
      },
      section3: {
        title: "3. Quyền riêng tư",
        content:
          "Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Vui lòng xem Chính sách Quyền riêng tư của chúng tôi để biết thêm chi tiết về cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
      },
      section4: {
        title: "4. Sử dụng Ứng dụng",
        content:
          "Bạn đồng ý sử dụng Ryxel chỉ cho các mục đích hợp pháp và tuân thủ tất cả các quy định pháp luật hiện hành. Bạn không được sử dụng ứng dụng của chúng tôi để:",
        items: [
          "Phát tán bất kỳ nội dung trái pháp luật, khiêu dâm, hoặc vi phạm quyền sở hữu trí tuệ.",
          "Thực hiện bất kỳ hành vi lừa đảo hoặc gian lận nào.",
          "Can thiệp vào hoạt động của ứng dụng hoặc phá hoại hệ thống của chúng tôi.",
        ],
      },
      section5: {
        title: "5. Sản phẩm và Dịch vụ",
        content:
          "Ryxel cung cấp các sản phẩm và dịch vụ liên quan đến gaming, bao gồm nhưng không giới hạn ở các sản phẩm phần cứng, phần mềm, và phụ kiện chơi game. Chúng tôi cam kết cung cấp sản phẩm và dịch vụ chất lượng cao, nhưng không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng sản phẩm và dịch vụ của chúng tôi.",
      },
      section6: {
        title: "6. Thanh toán và Hoàn tiền",
        content:
          "Các chính sách thanh toán và hoàn tiền được áp dụng cụ thể cho từng sản phẩm và dịch vụ. Vui lòng xem thông tin chi tiết về chính sách thanh toán và hoàn tiền trên trang sản phẩm hoặc liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.",
      },
      section7: {
        title: "7. Sở hữu trí tuệ",
        content:
          "Tất cả nội dung trên Ryxel, bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, hình ảnh, âm thanh, và phần mềm, đều thuộc quyền sở hữu của Ryxel Store hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ Việt Nam và quốc tế.",
      },
      section8: {
        title: "8. Liên hệ",
        content:
          "Nếu bạn có bất kỳ câu hỏi nào liên quan đến các điều khoản này, vui lòng liên hệ với chúng tôi qua:",
        contact:
          "support@ryxelstore.com hoặc gọi cho chúng tôi theo số: (+84) 912 823 83.",
      },
    },
    en: {
      title: "Terms of Service",
      date: "Effective Date: February 24, 2025",
      intro:
        "Welcome to Ryxel! Before using our application, please carefully read the terms and services below. By using our application, you agree to comply with and be bound by these terms.",
      section1: {
        title: "1. Acceptance of Terms",
        content:
          "By accessing and using Ryxel, you agree to comply with these terms and services. If you disagree with any part of these terms, please do not use our application.",
      },
      section2: {
        title: "2. Modification of Terms",
        content:
          "We reserve the right to modify these terms at any time. Any changes will be notified on the website or in the application and will be effective immediately upon posting. Your continued use of the application after changes indicates your acceptance of the new terms.",
      },
      section3: {
        title: "3. Privacy",
        content:
          "We are committed to protecting your privacy. Please review our Privacy Policy for details on how we collect, use, and protect your personal information.",
      },
      section4: {
        title: "4. Application Use",
        content:
          "You agree to use Ryxel only for lawful purposes and in compliance with all applicable laws. You shall not use our application to:",
        items: [
          "Distribute any illegal, pornographic content, or violate intellectual property rights.",
          "Conduct any fraudulent or deceptive activities.",
          "Interfere with the application's operation or sabotage our system.",
        ],
      },
      section5: {
        title: "5. Products and Services",
        content:
          "Ryxel provides gaming-related products and services, including but not limited to hardware, software, and gaming accessories. We are committed to providing high-quality products and services, but are not responsible for any damages arising from the use of our products and services.",
      },
      section6: {
        title: "6. Payment and Refunds",
        content:
          "Payment and refund policies apply specifically to each product and service. Please see detailed information about payment and refund policies on the product page or contact our customer support.",
      },
      section7: {
        title: "7. Intellectual Property",
        content:
          "All content on Ryxel, including but not limited to text, graphics, logos, images, audio, and software, is the property of Ryxel Store or our content providers and is protected by Vietnamese and international intellectual property laws.",
      },
      section8: {
        title: "8. Contact Us",
        content:
          "If you have any questions regarding these terms, please contact us at:",
        contact: "support@ryxelstore.com or call us at: (+84) 912 823 83.",
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
          <span className="text-primary-500">{t("footer.terms")}</span>
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
          <p className="font-medium">{currentContent.section1.content}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section2.title}</h3>
          <p className="font-medium">{currentContent.section2.content}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section3.title}</h3>
          <p className="font-medium">{currentContent.section3.content}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section4.title}</h3>
          <p className="font-medium">{currentContent.section4.content}</p>
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
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{currentContent.section8.title}</h3>
          <p className="font-medium">
            {currentContent.section8.content}{" "}
            <NavLink type="mainNavInline" href="mailto:support@ryxelstore.com">
              <span className="border-b-[1px] font-semibold">
                support@ryxelstore.com
              </span>
            </NavLink>{" "}
            {language === "vi"
              ? "hoặc gọi cho chúng tôi theo số:"
              : "or call us at:"}{" "}
            <NavLink type="mainNavInline" href="tel:+8491282383">
              <span className="border-b-[1px] font-semibold">
                (+84) 912 823 83
              </span>
            </NavLink>{" "}
            .
          </p>
        </div>
      </div>
    </div>
  );
}

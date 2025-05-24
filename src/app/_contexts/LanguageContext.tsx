"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  header: {
    shop: {
      vi: "Cửa hàng",
      en: "Shop",
    },
    categories: {
      vi: "Danh mục",
      en: "Categories",
    },
    aboutUs: {
      vi: "Về chúng tôi",
      en: "About Us",
    },
    blogs: {
      vi: "Blogs",
      en: "Blogs",
    },
    contact: {
      vi: "Liên hệ",
      en: "Contact",
    },
    closeMenu: {
      vi: "Đóng menu",
      en: "Close menu",
    },
    language: {
      vi: "Ngôn ngữ",
      en: "Language",
    },
    search: {
      vi: "Tìm kiếm sản phẩm...",
      en: "Search products...",
    },
    account: {
      vi: "Tài khoản",
      en: "Account",
    },
    login: {
      vi: "Đăng nhập",
      en: "Login",
    },
    register: {
      vi: "Đăng ký",
      en: "Register",
    },
    logout: {
      vi: "Đăng xuất",
      en: "Logout",
    },
    profile: {
      vi: "Hồ sơ",
      en: "Profile",
    },
    orders: {
      vi: "Đơn hàng",
      en: "Orders",
    },
    cart: {
      vi: "Giỏ hàng",
      en: "Cart",
    },
    user: {
      vi: "Người dùng",
      en: "User",
      login: {
        vi: "Đăng nhập",
        en: "Login",
      },
    },
    searchbar: {
      searchPlaceholder: {
        vi: "Tìm kiếm sản phẩm, danh mục & khác ...",
        en: "Search products, categories & more ...",
      },
    },
  },
  aboutUs: {
    title: {
      vi: "Về Chúng Tôi",
      en: "About Us",
    },
    subtitle: {
      vi: "Chúng tôi là ai và câu chuyện của Ryxel Store",
      en: "Who we are and the story behind Ryxel Store",
    },
    ourMission: {
      vi: "Sứ mệnh của chúng tôi",
      en: "Our Mission",
    },
    missionDesc: {
      vi: "Mang đến trải nghiệm gaming tốt nhất cho game thủ Việt Nam thông qua các sản phẩm chất lượng cao và dịch vụ xuất sắc.",
      en: "To provide the best gaming experience for Vietnamese gamers through high-quality products and excellent service.",
    },
    ourVision: {
      vi: "Tầm nhìn của chúng tôi",
      en: "Our Vision",
    },
    visionDesc: {
      vi: "Trở thành nhà phân phối thiết bị gaming hàng đầu Đông Nam Á, đồng thời xây dựng cộng đồng game thủ phát triển mạnh mẽ tại Việt Nam.",
      en: "To become the leading gaming equipment distributor in Southeast Asia while building a strong gaming community in Vietnam.",
    },
    ourValues: {
      vi: "Giá trị cốt lõi",
      en: "Our Values",
    },
    valueQuality: {
      vi: "Chất Lượng Không Thỏa Hiệp",
      en: "Uncompromising Quality",
    },
    valueQualityDesc: {
      vi: "Chúng tôi chỉ cung cấp những thiết bị gaming đã được kiểm nghiệm kỹ càng, từ những thương hiệu uy tín toàn cầu, đảm bảo trải nghiệm chơi game tốt nhất.",
      en: "We only provide gaming equipment that has been thoroughly tested, from globally reputable brands, ensuring the best gaming experience.",
    },
    valueCommunity: {
      vi: "Cộng Đồng Là Trên Hết",
      en: "Community First",
    },
    valueCommunityDesc: {
      vi: "Ryxel Store không đơn thuần là cửa hàng, mà là nơi gắn kết cộng đồng game thủ, tổ chức các sự kiện, giải đấu và chia sẻ kiến thức gaming.",
      en: "Ryxel Store is not simply a store, but a place that connects the gaming community, organizes events, tournaments and shares gaming knowledge.",
    },
    valueInnovation: {
      vi: "Không Ngừng Đổi Mới",
      en: "Continuous Innovation",
    },
    valueInnovationDesc: {
      vi: "Chúng tôi luôn cập nhật xu hướng và công nghệ mới nhất trong ngành gaming, đảm bảo khách hàng luôn có quyền tiếp cận sớm nhất với những sản phẩm tân tiến.",
      en: "We constantly update with the latest trends and technologies in the gaming industry, ensuring customers always have early access to advanced products.",
    },
    ourStory: {
      title: {
        vi: "Từ Những Buổi Chơi Game Đêm Khuya",
        en: "From Late Night Gaming Sessions",
      },
      paragraph1: {
        vi: "Ryxel Store bắt đầu từ những trải nghiệm không mấy dễ chịu của ba người bạn - Bùi Quang Huy, Đường Nguyễn An Khang và Đoàn Văn Hiếu - khi sử dụng các thiết bị gaming không đạt chất lượng trong các trận đấu quan trọng.",
        en: "Ryxel Store began from the unpleasant experiences of three friends - Bui Quang Huy, Duong Nguyen An Khang, and Doan Van Hieu - when using poor quality gaming equipment in important matches.",
      },
      paragraph2: {
        vi: 'Có lần, trong một giải đấu quan trọng, chuột của Huy đột nhiên ngừng hoạt động giữa ván đấu quyết định, Khang thì liên tục phải chịu đựng với bàn phím không nhận phím và Hiếu thì được "phục vụ" bằng một tai nghe có âm thanh delay đến nửa giây.',
        en: "Once, during an important tournament, Huy's mouse suddenly stopped working in the middle of a decisive match, Khang had to endure a keyboard that wouldn't register keystrokes, and Hieu was \"served\" with headphones that had sound delayed by half a second.",
      },
      paragraph3: {
        vi: 'Cả ba đã thốt lên: "Tại sao game thủ Việt Nam phải chấp nhận điều này?" - Và đó là lúc Ryxel Store ra đời với sứ mệnh mang đến những thiết bị gaming chất lượng cao với giá thành hợp lý cho game thủ Việt Nam.',
        en: 'All three exclaimed: "Why do Vietnamese gamers have to accept this?" - And that\'s when Ryxel Store was born with the mission of bringing high-quality gaming equipment at reasonable prices to Vietnamese gamers.',
      },
      imageAlt: {
        vi: "Đam mê Gaming",
        en: "Gaming Passion",
      },
    },
    milestones: {
      title: {
        vi: "Hành Trình Phát Triển",
        en: "Our Journey",
      },
      m2021: {
        title: {
          vi: "Ý tưởng ra đời",
          en: "The Concept Is Born",
        },
        description: {
          vi: "Ba anh em gặp nhau tại một giải đấu và quyết định tạo ra thay đổi cho làng game Việt.",
          en: "Three friends met at a gaming tournament and decided to create a change for Vietnam's gaming scene.",
        },
      },
      m2022: {
        title: {
          vi: "Mở cửa hàng online",
          en: "Online Store Launch",
        },
        description: {
          vi: "Cửa hàng trực tuyến đầu tiên ra mắt với doanh số khiêm tốn nhưng đầy triển vọng.",
          en: "The first online store launched with modest but promising sales.",
        },
      },
      m2023: {
        title: {
          vi: "Mở rộng quy mô",
          en: "Expansion",
        },
        description: {
          vi: "Khai trương cửa hàng vật lý đầu tiên tại Quận 1, TP.HCM với đầy đủ các sản phẩm cao cấp.",
          en: "Opened the first physical store in District 1, HCMC with a full range of premium products.",
        },
      },
      m2024: {
        title: {
          vi: "Tài trợ giải đấu",
          en: "Tournament Sponsorship",
        },
        description: {
          vi: "Bắt đầu đồng hành cùng các giải đấu Esports lớn của Việt Nam như VCS và VCL.",
          en: "Began sponsoring major Vietnamese Esports tournaments like VCS and VCL.",
        },
      },
      m2025: {
        title: {
          vi: "Phát triển quốc tế",
          en: "International Growth",
        },
        description: {
          vi: "Mở rộng hoạt động ra thị trường Đông Nam Á và trở thành nhà phân phối độc quyền nhiều thương hiệu.",
          en: "Expanded to Southeast Asian markets and became the exclusive distributor for many brands.",
        },
      },
    },
    teamSection: {
      title: {
        vi: "Đội Ngũ Sáng Lập",
        en: "Founding Team",
      },
      founder1: {
        name: "Bùi Quang Huy",
        role: {
          vi: "CEO & Người Sáng Lập",
          en: "CEO & Founder",
        },
        bio: {
          vi: "Cựu game thủ chuyên nghiệp với 8 năm kinh nghiệm trong lĩnh vực phát triển phần cứng gaming. Huy có niềm đam mê bất tận với chuột gaming và luôn đi đầu trong việc tìm kiếm công nghệ mới.",
          en: "Former professional gamer with 8 years experience in gaming hardware development. Huy has an endless passion for gaming mice and is always at the forefront of seeking new technology.",
        },
      },
      founder2: {
        name: "Đường Nguyễn An Khang",
        role: {
          vi: "COO & Đồng Sáng Lập",
          en: "COO & Co-founder",
        },
        bio: {
          vi: "Chuyên gia marketing và tổ chức sự kiện Esports với hơn 5 năm kinh nghiệm. Khang từng là nhà sản xuất nội dung cho một số đội tuyển Esports hàng đầu Việt Nam trước khi đồng sáng lập Ryxel.",
          en: "Marketing expert and Esports event organizer with over 5 years of experience. Khang was a content producer for some of Vietnam's top Esports teams before co-founding Ryxel.",
        },
      },
      founder3: {
        name: "Đoàn Văn Hiếu",
        role: {
          vi: "CTO & Đồng Sáng Lập",
          en: "CTO & Co-founder",
        },
        bio: {
          vi: "Kỹ sư phần cứng với chuyên môn sâu về bàn phím cơ và tai nghe gaming. Hiếu có 7 năm kinh nghiệm làm việc tại các công ty công nghệ lớn trước khi quyết định theo đuổi đam mê với Ryxel Store.",
          en: "Hardware engineer with expertise in mechanical keyboards and gaming headsets. Hiếu has 7 years of experience at major tech companies before pursuing his passion with Ryxel Store.",
        },
      },
    },
    location: {
      title: {
        vi: "Trụ Sở Chính Tại TP.HCM",
        en: "Headquarters in Ho Chi Minh City",
      },
      description1: {
        vi: "Đặt tại trung tâm thành phố sôi động, Ryxel Store không chỉ là nơi bán sản phẩm mà còn là điểm đến của cộng đồng game thủ với không gian trải nghiệm thiết bị, khu vực giải trí và cà phê gaming.",
        en: "Located in the center of the vibrant city, Ryxel Store is not just a place to sell products but also a destination for the gaming community with equipment testing spaces, entertainment areas, and a gaming cafe.",
      },
      description2: {
        vi: "Với diện tích hơn 500m², Ryxel Store mang đến không gian hiện đại, được thiết kế với concept futuristic gaming, tái hiện không khí của các giải đấu Esports đỉnh cao.",
        en: "With an area of over 500m², Ryxel Store offers a modern space, designed with a futuristic gaming concept, recreating the atmosphere of top Esports tournaments.",
      },
      address: {
        vi: "1 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP.HCM",
        en: "1 Vo Van Ngan, Linh Chieu Ward, Thu Duc City, HCMC",
      },
      imageAlt: {
        vi: "Thành phố Hồ Chí Minh",
        en: "Ho Chi Minh City",
      },
    },
    funFacts: {
      title: {
        vi: "Những Điều Thú Vị Về Ryxel",
        en: "Fun Facts About Ryxel",
      },
      fact1: {
        title: {
          vi: "Tên Ryxel ra đời như thế nào?",
          en: "How did the name Ryxel come about?",
        },
        description: {
          vi: 'Tên "Ryxel" đến từ việc kết hợp "Ry" (viết tắt của "Ryzen" - là CPU yêu thích của Huy) và "xel" (từ "pixel" - đơn vị hình ảnh nhỏ nhất, biểu thị cho sự chi tiết và chất lượng). Ban đầu là tên nickname của Huy trong game, sau trở thành tên thương hiệu.',
          en: 'The name "Ryxel" comes from combining "Ry" (short for "Ryzen" - Huy\'s favorite CPU) and "xel" (from "pixel" - the smallest image unit, signifying detail and quality). Initially it was Huy\'s in-game nickname, later becoming the brand name.',
        },
      },
      fact2: {
        title: {
          vi: "Mascot đặc biệt",
          en: "Special Mascot",
        },
        description: {
          vi: 'Mascot của Ryxel là một chú mèo tên "Pixel" luôn đeo tai nghe gaming. Mỗi lần khách hàng đến cửa hàng đều có thể gặp Pixel đang "test" các thiết bị mới - thực ra là nằm ngủ trên bàn phím mechanical đắt tiền! Pixel còn có tài khoản Instagram riêng với hơn 50.000 followers.',
          en: 'Ryxel\'s mascot is a cat named "Pixel" who always wears gaming headphones. Customers visiting the store can see Pixel "testing" new equipment - actually sleeping on expensive mechanical keyboards! Pixel has his own Instagram account with over 50,000 followers.',
        },
      },
      fact3: {
        title: {
          vi: "Đơn hàng đặc biệt nhất",
          en: "Most Special Order",
        },
        description: {
          vi: "Đơn hàng lớn nhất từng được đặt tại Ryxel là setup gaming trị giá 500 triệu đồng cho một streamer nổi tiếng. Lúc giao hàng, cả ba anh em founder đều tự tay mang đến và lắp đặt, nhưng sau đó phát hiện ra nhà streamer ở... tầng 30 mà thang máy lại hỏng!",
          en: "The largest order ever placed at Ryxel was a gaming setup worth 500 million VND for a famous streamer. Upon delivery, all three founders personally carried and installed it, only to discover the streamer lived on the 30th floor... and the elevator was broken!",
        },
      },
    },
    productShowcase: {
      title: {
        vi: "Gaming Gear Đỉnh Cao",
        en: "Top-tier Gaming Gear",
      },
      subtitle: {
        vi: "Thiết Bị Gaming Chính Hãng",
        en: "Authentic Gaming Equipment",
      },
      description: {
        vi: "Ryxel Store tự hào là đối tác chính thức của các thương hiệu gaming hàng đầu thế giới như Logitech G, Razer, SteelSeries, và nhiều thương hiệu cao cấp khác.",
        en: "Ryxel Store is proud to be the official partner of the world's leading gaming brands such as Logitech G, Razer, SteelSeries, and many other premium brands.",
      },
      buttonText: {
        vi: "Khám Phá Sản Phẩm",
        en: "Explore Products",
      },
      imageAlt: {
        vi: "Thiết Bị Gaming",
        en: "Gaming Gear",
      },
    },
    cta: {
      title: {
        vi: "Sẵn Sàng Nâng Cấp Trải Nghiệm Gaming?",
        en: "Ready to Upgrade Your Gaming Experience?",
      },
      description: {
        vi: "Đến với Ryxel Store để khám phá thiết bị gaming chất lượng cao cấp và trở thành một phần của cộng đồng game thủ chuyên nghiệp.",
        en: "Come to Ryxel Store to discover high-quality gaming equipment and become part of a professional gaming community.",
      },
      primaryButton: {
        vi: "Ghé Thăm Cửa Hàng",
        en: "Visit Our Store",
      },
      secondaryButton: {
        vi: "Liên Hệ Với Chúng Tôi",
        en: "Contact Us",
      },
    },
  },
  buttons: {
    switchToVi: {
      vi: "VI",
      en: "EN",
    },
  },
  footer: {
    company: {
      vi: "Ryxel Company",
      en: "Ryxel Company",
    },
    aboutUs: {
      vi: "Về chúng tôi",
      en: "About Us",
    },
    terms: {
      vi: "Điều khoản và Dịch vụ",
      en: "Terms of Service",
    },
    privacy: {
      vi: "Chính sách bảo mật",
      en: "Privacy Policy",
    },
    faq: {
      vi: "FAQ",
      en: "FAQ",
    },
    contact: {
      vi: "Liên hệ",
      en: "Contact",
    },
    workingHours: {
      vi: "Giờ làm việc",
      en: "Working Hours",
    },
    phone: {
      vi: "SĐT",
      en: "Phone",
    },
    payment: {
      vi: "Thanh toán",
      en: "Payment Methods",
    },
    followUs: {
      vi: "Theo dõi chúng tôi",
      en: "Follow Us",
    },
    mobileApp: {
      vi: "Ứng dụng di động",
      en: "Mobile App",
    },
    mobileAppQR: {
      vi: "Ryxel mã QR tải ứng dụng di động",
      en: "Ryxel mobile app downloading QR-code",
    },
    allRights: {
      vi: "Tất cả các quyền được bảo lưu. Trụ sở chính của Ryxel Inc. tại Thành phố Hồ Chí Minh, Việt Nam.",
      en: "All rights reserved. Ryxel Inc. Headquarters are in Ho Chi Minh City, Vietnam.",
    },
  },
  contact: {
    title: {
      vi: "Liên hệ",
      en: "Contact Us",
    },
    subtitle: {
      vi: "Liên hệ với chúng tôi!",
      en: "Get in touch with us!",
    },
    description: {
      vi: "Tại Ryxel Store, chúng tôi luôn đặt khách hàng lên hàng đầu và cam kết mang đến dịch vụ hỗ trợ khách hàng tốt nhất. Chúng tôi tự hào khi nhận được nhiều lời khen về sự chuyên nghiệp và tận tâm của đội ngũ hỗ trợ. Với chúng tôi, chất lượng dịch vụ luôn phải đạt tiêu chuẩn cao nhất. Dù bạn gặp vấn đề kỹ thuật, muốn đặt trước sản phẩm, kiểm tra tình trạng hàng hay cần tư vấn mua sắm, chúng tôi luôn sẵn sàng giúp đỡ.",
      en: "At Ryxel Store, we always put customers first and commit to providing the best customer support. We take pride in receiving many compliments on the professionalism and dedication of our support team. For us, service quality must always meet the highest standards. Whether you encounter technical issues, want to pre-order products, check order status, or need shopping advice, we are always ready to help.",
    },
    contactMethods: {
      title: {
        vi: "Cách liên hệ với chúng tôi",
        en: "How to Contact Us",
      },
      description: {
        vi: "Đừng ngần ngại liên hệ với chúng tôi qua email hoặc số điện thoại. Chúng tôi cung cấp nhiều kênh hỗ trợ khác nhau để bạn có thể nhận được sự trợ giúp theo cách thuận tiện nhất. Thời gian làm việc của bộ phận chăm sóc khách hàng là cả tuần, 08:00 - 17:00 (Giờ Việt Nam - ICT: UTC+07:00). Dưới đây là các địa chỉ email để bạn liên hệ với đúng bộ phận nhằm được hỗ trợ nhanh nhất.",
        en: "Don't hesitate to contact us via email or phone. We provide multiple support channels so you can get help in the most convenient way. Our customer service department works 7 days a week, 08:00 - 17:00 (Vietnam Time - ICT: UTC+07:00). Below are the email addresses for you to contact the right department for the fastest support.",
      },
    },
    generalInquiries: {
      title: {
        vi: "Câu hỏi chung hoặc liên quan đến đơn hàng",
        en: "General Inquiries or Order-Related Questions",
      },
      description: {
        vi: "Nếu bạn có thắc mắc về sản phẩm hoặc các vấn đề chung, vui lòng liên hệ info@ryxelstore.com. Chúng tôi sẽ hỗ trợ bạn trong mọi trường hợp, từ thay đổi sản phẩm, hủy đơn hàng cho đến các câu hỏi khác. Khi gửi email về đơn hàng, vui lòng cung cấp Mã đơn hàng hoặc Số khách hàng để chúng tôi có thể xử lý nhanh chóng.",
        en: "If you have questions about products or general issues, please contact info@ryxelstore.com. We will assist you in all cases, from changing products, canceling orders to other questions. When sending an email about an order, please provide your Order ID or Customer Number so we can process it quickly.",
      },
    },
    technicalSupport: {
      title: {
        vi: "Hỗ trợ kỹ thuật & đổi trả",
        en: "Technical Support & Returns",
      },
      description: {
        vi: "Sau khi nhận hàng, nếu bạn cần hỗ trợ về cách sử dụng sản phẩm hoặc muốn đổi/trả hàng, vui lòng liên hệ (+84) 912 823 83 hoặc email support@ryxelstore.com. Chúng tôi sẽ hướng dẫn bạn các bước tiếp theo sau khi nhận được yêu cầu. Khi gửi email về đổi/trả hàng hoặc bảo hành, hãy ghi rõ Mã đơn hàng trong tiêu đề email để chúng tôi xử lý nhanh nhất.",
        en: "After receiving the product, if you need help with how to use the product or want to exchange/return it, please contact (+84) 912 823 83 or email support@ryxelstore.com. We will guide you through the next steps after receiving your request. When sending an email about returns or warranty, please clearly state your Order ID in the email subject for us to process it as quickly as possible.",
      },
    },
  },
  faq: {
    title: {
      vi: "Câu hỏi thường gặp",
      en: "Frequently Asked Questions",
    },
    subtitle: {
      vi: "Bạn có thắc mắc? Chúng tôi đã có câu trả lời cho bạn.",
      en: "Got questions? We've got answers for you.",
    },
    categories: {
      ordering: {
        vi: "Đặt hàng & Thanh toán",
        en: "Ordering & Payment",
      },
      shipping: {
        vi: "Vận chuyển & Giao hàng",
        en: "Shipping & Delivery",
      },
      returns: {
        vi: "Đổi trả & Hoàn tiền",
        en: "Returns & Refunds",
      },
      products: {
        vi: "Sản phẩm & Dịch vụ",
        en: "Products & Services",
      },
      account: {
        vi: "Tài khoản & Bảo mật",
        en: "Account & Security",
      },
    },
  },
  notFound: {
    title: {
      vi: "Không tìm thấy trang",
      en: "Page Not Found",
    },
    subtitle: {
      vi: "Rất tiếc, trang bạn đang tìm kiếm không tồn tại.",
      en: "Sorry, the page you are looking for doesn't exist.",
    },
    description: {
      vi: "Có vẻ như trang bạn đang tìm kiếm đã bị di chuyển, xóa hoặc không còn tồn tại. Hãy kiểm tra lại URL hoặc quay về trang chủ.",
      en: "It seems that the page you are looking for has been moved, deleted or does not exist. Please check the URL or return to the homepage.",
    },
    goHome: {
      vi: "Quay về trang chủ",
      en: "Back to home",
    },
  },
  privacyPolicy: {
    title: {
      vi: "Chính sách bảo mật",
      en: "Privacy Policy",
    },
    lastUpdated: {
      vi: "Cập nhật lần cuối",
      en: "Last Updated",
    },
  },
  termsOfService: {
    title: {
      vi: "Điều khoản dịch vụ",
      en: "Terms of Service",
    },
    lastUpdated: {
      vi: "Cập nhật lần cuối",
      en: "Last Updated",
    },
  },
  common: {
    // Common translations
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");
  // Load language preference from localStorage on client-side or detect from browser
  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Language | null;
    if (storedLang && (storedLang === "vi" || storedLang === "en")) {
      setLanguage(storedLang);
      document.documentElement.lang = storedLang;
    } else {
      // Auto-detect language from browser settings for first-time visitors
      try {
        const browserLang = navigator.language.toLowerCase().split("-")[0];
        const detectedLang = browserLang === "vi" ? "vi" : "en";
        setLanguage(detectedLang);
        document.documentElement.lang = detectedLang;
      } catch (error) {
        console.error("Error detecting browser language:", error);
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);
  // Translation function
  const t = (key: string): string => {
    try {
      const keyParts = key.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let result: any = translations;

      // Navigate through nested objects
      for (const part of keyParts) {
        if (!result) return key;
        result = result[part];
      }

      // Access the language-specific value
      if (result && typeof result === "object" && result[language]) {
        return result[language];
      }

      return key;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

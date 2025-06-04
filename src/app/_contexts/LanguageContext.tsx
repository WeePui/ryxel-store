"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  language: {
    vi: "vi",
    en: "en",
  },
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
          vi: "Khai trương cửa hàng vật lý đầu tiên tại Thủ Đức, TP.HCM với đầy đủ các sản phẩm cao cấp.",
          en: "Opened the first physical store in Thu Duc, HCMC with a full range of premium products.",
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
  chatbot: {
    title: {
      vi: "Trợ lý Ryxel",
      en: "Ryxel Assistant",
    },
    placeholder: {
      vi: "Nhập câu hỏi...",
      en: "Type your question...",
    },
    loading: {
      vi: "Đang trả lời...",
      en: "Replying...",
    },
    errorConnection: {
      vi: "Lỗi kết nối, vui lòng thử lại sau.",
      en: "Connection error, please try again later.",
    },
  },
  products: {
    title: {
      vi: "Sản phẩm",
      en: "Products",
    },
    outOfStock: {
      vi: "Hết hàng",
      en: "Out of stock",
    },
    noProducts: {
      vi: "Không có sản phẩm nào phù hợp với bộ lọc của bạn. Vui lòng đặt lại bộ lọc.",
      en: "No products match your filter criteria. Please reset the filters.",
    },
    sortBy: {
      vi: "Sắp xếp:",
      en: "Sort by:",
    },
    searchResults: {
      found: {
        vi: "Đã tìm thấy {count} trong tổng số {total} sản phẩm.",
        en: "Found {count} products out of {total} products.",
      },
    },
    sortOptions: {
      newest: {
        vi: "Mới nhất",
        en: "Newest",
      },
      priceHighToLow: {
        vi: "Giá: cao đến thấp",
        en: "Price: high to low",
      },
      priceLowToHigh: {
        vi: "Giá: thấp đến cao",
        en: "Price: low to high",
      },
      bestSelling: {
        vi: "Bán chạy nhất",
        en: "Best selling",
      },
      topRated: {
        vi: "Đánh giá cao nhất",
        en: "Top rated",
      },
    },
    boughtTogether: {
      vi: "Thường được mua chung",
      en: "Frequently Bought Together",
    },
    similarProducts: {
      vi: "Sản phẩm tương tự",
      en: "Similar Products",
    },
    addToCart: {
      vi: "Thêm vào giỏ hàng",
      en: "Add to Cart",
    },
    chooseProduct: {
      vi: "Chọn sản phẩm:",
      en: "Select product:",
    },
    home: {
      vi: "Trang chủ",
      en: "Home",
    },
    shop: {
      vi: "Cửa hàng",
      en: "Shop",
    },
    successAddToCart: {
      vi: "Sản phẩm đã được thêm vào giỏ hàng.",
      en: "Product has been added to cart.",
    },
    loginRequired: {
      vi: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.",
      en: "You need to login to add products to your cart.",
    },
    filter: {
      title: {
        vi: "Bộ lọc",
        en: "Filter",
      },
      all: {
        vi: "Tất cả",
        en: "All",
      },
      brand: {
        vi: "Thương hiệu",
        en: "Brand",
      },
      price: {
        vi: "Giá",
        en: "Price",
      },
      rating: {
        vi: "Đánh giá",
        en: "Rating",
      },
      apply: {
        vi: "Áp dụng",
        en: "Apply",
      },
      reset: {
        vi: "Đặt lại",
        en: "Reset",
      },
    },
    reviews: {
      sold: {
        vi: "đã bán",
        en: "sold",
      },
      ratings: {
        vi: "đánh giá",
        en: "ratings",
      },
      classification: {
        vi: "Phân loại",
        en: "Type",
      },
      showMore: {
        vi: "Hiển thị thêm",
        en: "Show more",
      },
      showLess: {
        vi: "Thu gọn",
        en: "Show less",
      },
      noReviews: {
        vi: "Chưa có đánh giá nào",
        en: "No reviews yet",
      },
      filterByRating: {
        vi: "Lọc theo đánh giá",
        en: "Filter by rating",
      },
      allRatings: {
        vi: "Tất cả đánh giá",
        en: "All ratings",
      },
      stars: {
        vi: "sao",
        en: "stars",
      },
      title: {
        vi: "Đánh giá sản phẩm",
        en: "Product Reviews",
      },
      loadError: {
        vi: "Không thể tải đánh giá sản phẩm. Vui lòng thử lại sau.",
        en: "Could not load product reviews. Please try again later.",
      },
      notFound: {
        vi: "Không có đánh giá nào cho sản phẩm này",
        en: "No reviews found for this product",
      },
    },
    description: {
      title: {
        vi: "Mô tả",
        en: "Description",
      },
      specifications: {
        vi: "Thông số kĩ thuật",
        en: "Specifications",
      },
      showMore: {
        vi: "Xem thêm",
        en: "Show more",
      },
      showLess: {
        vi: "Thu gọn",
        en: "Show less",
      },
    },
  },
  home: {
    bestsellers: {
      title: {
        vi: "Sản phẩm bán chạy",
        en: "Best Sellers",
      },
      loadError: {
        vi: "Không thể tải sản phẩm bán chạy. Vui lòng thử lại sau.",
        en: "Could not load bestsellers. Please try again later.",
      },
      notFound: {
        vi: "Không có sản phẩm bán chạy",
        en: "No bestsellers found",
      },
    },
    reviews: {
      title: {
        vi: "Đánh giá sản phẩm",
        en: "Product Reviews",
      },
      noReviews: {
        vi: "Chưa có đánh giá nào",
        en: "No reviews yet",
      },
      filterByRating: {
        vi: "Lọc theo đánh giá",
        en: "Filter by rating",
      },
      allRatings: {
        vi: "Tất cả đánh giá",
        en: "All ratings",
      },
      stars: {
        vi: "sao",
        en: "stars",
      },
      ratings: {
        vi: "đánh giá",
        en: "ratings",
      },
      sold: {
        vi: "đã bán",
        en: "sold",
      },
      classification: {
        vi: "Phân loại",
        en: "Type",
      },
      showMore: {
        vi: "Hiển thị thêm",
        en: "Show more",
      },
      showLess: {
        vi: "Thu gọn",
        en: "Show less",
      },
    },
    description: {
      title: {
        vi: "Mô tả",
        en: "Description",
      },
      specifications: {
        vi: "Thông số kĩ thuật",
        en: "Specifications",
      },
      showMore: {
        vi: "Xem thêm",
        en: "Show more",
      },
      showLess: {
        vi: "Thu gọn",
        en: "Show less",
      },
    },
    searchResults: {
      found: {
        vi: "Tìm thấy {count} kết quả trong tổng số {total} sản phẩm",
        en: "Found {count} results out of {total} products",
      },
    },
    filter: {
      title: {
        vi: "Bộ lọc",
        en: "Filter",
      },
      all: {
        vi: "Tất cả",
        en: "All",
      },
      brand: {
        vi: "Thương hiệu",
        en: "Brand",
      },
      price: {
        vi: "Giá",
        en: "Price",
      },
      rating: {
        vi: "Đánh giá",
        en: "Rating",
      },
      apply: {
        vi: "Áp dụng",
        en: "Apply",
      },
      reset: {
        vi: "Đặt lại",
        en: "Reset",
      },
    },
    pagination: {
      previous: {
        vi: "Trang trước",
        en: "Previous",
      },
      next: {
        vi: "Trang sau",
        en: "Next",
      },
      page: {
        vi: "Trang {page} trên {totalPages}",
        en: "Page {page} of {totalPages}",
      },
    },
    carousel: {
      previous: {
        vi: "Ảnh trước",
        en: "Previous image",
      },
      next: {
        vi: "Ảnh tiếp theo",
        en: "Next image",
      },
      thumbnail: {
        vi: "Hiển thị ảnh {index}",
        en: "Show image {index}",
      },
    },
  },
  navigation: {
    categories: {
      title: {
        vi: "Mua sắm theo danh mục",
        en: "Shop by Category",
      },
      all: {
        vi: "Tất cả",
        en: "All",
      },
      gaming: {
        mouse: {
          vi: "Chuột Gaming",
          en: "Gaming Mouse",
        },
        keyboard: {
          vi: "Bàn phím",
          en: "Keyboard",
        },
        headphone: {
          vi: "Tai nghe",
          en: "Headphones",
        },
        table: {
          vi: "Bàn Gaming",
          en: "Gaming Desk",
        },
        chair: {
          vi: "Ghế Gaming",
          en: "Gaming Chair",
        },
        accessory: {
          vi: "Phụ kiện",
          en: "Accessories",
        },
      },
    },
    brands: {
      title: {
        vi: "Thương hiệu",
        en: "Brands",
      },
    },
    reference: {
      title: {
        vi: "Tham khảo",
        en: "Reference",
      },
      bestSellers: {
        vi: "Sản phẩm bán chạy",
        en: "Best Sellers",
      },
      spatialAudio: {
        vi: "Apple Spatial Sound",
        en: "Apple Spatial Sound",
      },
      durability: {
        vi: "Bền bỉ tuyệt đối",
        en: "Ultimate Durability",
      },
      sennheiserPartner: {
        vi: "Đối tác chính hãng Sennheiser",
        en: "Official Sennheiser Partner",
      },
      wireless: {
        vi: "Trải nghiệm không dây",
        en: "Wireless Experience",
      },
    },
  },
  cart: {
    title: {
      vi: "Giỏ hàng",
      en: "Cart",
    },
    home: {
      vi: "Trang chủ",
      en: "Home",
    },
    shop: {
      vi: "Cửa hàng",
      en: "Shop",
    },
    emptyCart: {
      title: {
        vi: "Vẫn chưa có gì trong giỏ hàng của bạn.",
        en: "Your cart is still empty.",
      },
      subtitle: {
        vi: "Cửa hàng của chúng tôi đang có những điều tuyệt vời đang chờ đợi bạn.",
        en: "Our store has amazing things waiting for you.",
      },
    },
    modal: {
      title: {
        vi: "Sản phẩm đã thêm",
        en: "Added products",
      },
      empty: {
        vi: "Giỏ hàng của bạn đang trống.",
        en: "Your cart is empty.",
      },
      viewCart: {
        vi: "Xem giỏ hàng",
        en: "View cart",
      },
      productsCount: {
        vi: "sản phẩm",
        en: "products",
      },
    },
    selectAll: {
      vi: "Chọn tất cả",
      en: "Select All",
    },
    clearAll: {
      vi: "Xoá tất cả",
      en: "Clear All",
    },
    selectProduct: {
      vi: "Chọn sản phẩm",
      en: "Select Product",
    },
    variant: {
      vi: "Phân loại",
      en: "Variant",
    },
    quantity: {
      vi: "Số lượng",
      en: "Quantity",
    },
    price: {
      vi: "Đơn giá",
      en: "Price",
    },
    outOfStock: {
      vi: "Hết hàng",
      en: "Out of Stock",
    },
    remove: {
      vi: "Xoá bỏ",
      en: "Remove",
    },
    noSelectableItems: {
      vi: "Giỏ hàng của bạn không có sản phẩm nào còn hàng",
      en: "Your cart has no products in stock",
    },
    orderSummary: {
      title: {
        vi: "Tóm tắt đơn hàng",
        en: "Order Summary",
      },
      total: {
        vi: "Tổng thanh toán",
        en: "Total Payment",
      },
      subtotal: {
        vi: "Tổng tiền hàng",
        en: "Merchandise Subtotal",
      },
      discount: {
        vi: "Giảm giá",
        en: "Discount",
      },
      shippingFee: {
        vi: "Phí vận chuyển",
        en: "Shipping Fee",
      },
      selectedItems: {
        vi: "Sản phẩm đã chọn",
        en: "Selected Products",
      },
      proceedCheckout: {
        vi: "Tiến hành đặt hàng",
        en: "Proceed to Checkout",
      },
      paymentMethods: {
        vi: "Phương thức thanh toán",
        en: "Payment Methods",
      },
      selectPaymentMethod: {
        vi: "Chọn phương thức thanh toán",
        en: "Select payment method",
      },
    },
    confirmations: {
      confirmText: {
        vi: "Xác nhận",
        en: "Confirm",
      },
      cancel: {
        vi: "Huỷ bỏ",
        en: "Cancel",
      },
      remove: {
        vi: "Xoá",
        en: "Remove",
      },
      clearCart: {
        vi: "Bạn có chắc chắn muốn xoá giỏ hàng?",
        en: "Are you sure you want to clear the cart?",
      },
      removeItem: {
        vi: "Bạn có chắc muốn xoá {productName} ra khỏi giỏ hàng?",
        en: "Are you sure you want to remove {productName} from the cart?",
      },
    },
    messages: {
      noProductsSelected: {
        vi: "Bạn chưa chọn sản phẩm nào để thanh toán!",
        en: "You haven't selected any products to checkout!",
      },
      clearCartSuccess: {
        vi: "Xoá giỏ hàng thành công!",
        en: "Cart cleared successfully!",
      },
    },
    errors: {
      unpaidOrder: {
        vi: "Bạn có đơn hàng chưa thanh toán để có thể tiếp tục đặt hàng vui lòng thanh toán hoặc huỷ đơn hàng.",
        en: "You have an unpaid order. To continue ordering, please pay or cancel the order.",
      },
      verifiedNeeded: {
        vi: "Bạn cần xác thực tài khoản của mình để tiếp tục.",
        en: "You need to verify your account to continue.",
      },
    },
  },
  common: {
    loading: {
      vi: "Đang tải...",
      en: "Loading...",
    },
    error: {
      vi: "Đã xảy ra lỗi",
      en: "An error occurred",
    },
  },
  auth: {
    login: {
      title: {
        vi: "Tài khoản Ryxel",
        en: "Ryxel Account",
      },
      forgotPassword: {
        vi: "Quên mật khẩu?",
        en: "Forgot password?",
      },
      noAccount: {
        vi: "Bạn chưa có tài khoản?",
        en: "Don't have an account?",
      },
      createAccount: {
        vi: "Tạo tài khoản",
        en: "Create account",
      },
    },
    signup: {
      title: {
        vi: "Chỉ một tài khoản cho mọi dịch vụ của Ryxel Store",
        en: "One account for all Ryxel Store services",
      },
      alreadyHaveAccount: {
        vi: "Đã có tài khoản?",
        en: "Already have an account?",
      },
      login: {
        vi: "Đi tới Đăng nhập",
        en: "Go to Login",
      },
      termsAgreement: {
        vi: "Khi bạn chọn vào ô này đồng nghĩa rằng bạn đồng ý với Quy chế hoạt động và Chính sách bảo mật của chúng tôi.",
        en: "By checking this box, you agree to our Terms of Service and Privacy Policy.",
      },
      publicInfo: {
        vi: "Thông tin này sẽ được thấy bởi mọi người",
        en: "This information will be visible to everyone",
      },
      dob: {
        vi: "Ngày sinh",
        en: "Date of birth",
      },
      dobWarning: {
        vi: "Lưu ý: Bạn sẽ không thể thay đổi ngày sinh sau này",
        en: "Note: You won't be able to change your date of birth later",
      },
      gender: {
        vi: "Giới tính",
        en: "Gender",
      },
      male: {
        vi: "Nam",
        en: "Male",
      },
      female: {
        vi: "Nữ",
        en: "Female",
      },
      other: {
        vi: "Khác",
        en: "Other",
      },
      emailAccount: {
        vi: "Đây sẽ là tài khoản Ryxel Store của bạn",
        en: "This will be your Ryxel Store account",
      },
    },
    forgotPassword: {
      title: {
        vi: "Đặt lại mật khẩu",
        en: "Reset Password",
      },
      subtitle: {
        vi: "Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu",
        en: "Enter your email to receive password reset instructions",
      },
      backToLogin: {
        vi: "Trở lại đăng nhập",
        en: "Back to login",
      },
      sendInstructions: {
        vi: "Tiếp theo",
        en: "Next",
      },
      enterEmail: {
        vi: "Xin hãy điền vào địa chỉ e-mail mà bạn đã dùng để đăng kí, sau đó bấm vào nút Tiếp theo.",
        en: "Please enter the email address you used to register, then click the Next button.",
      },
      instructions: {
        vi: "Một e-mail có chứa liên kết (URL) lấy lại mật khẩu sẽ được gửi đến bạn.",
        en: "An email containing a password reset link (URL) will be sent to you.",
      },
      emailSent: {
        vi: "Chúng tôi đã gửi một e-mail tới địa chỉ e-mail mà bạn đã dùng để đăng kí",
        en: "We've sent an email to the address you used to register",
      },
      clickLink: {
        vi: "Có một liên kết (URL) được đính kèm trong e-mail, xin vui lòng bấm vào liên kết đó để đặt lại mật khẩu.",
        en: "There is a link (URL) attached in the email, please click on that link to reset your password.",
      },
      noEmail: {
        vi: "Bạn không tìm thấy e-mail?",
        en: "Can't find the email?",
      },
      pleaseCheck: {
        vi: "Xin hãy chắc chắn rằng bạn đã kiểm tra các điều sau:",
        en: "Please make sure you have checked the following:",
      },
      checkPoints: {
        correctEmail: {
          vi: "E-mail có đang được gửi đến đúng địa chỉ e-mail của bạn.",
          en: "The email is being sent to the correct email address.",
        },
        spamFolder: {
          vi: "E-mail không nằm trong thư mục spam/rác.",
          en: "The email is not in the spam/junk folder.",
        },
        noFilters: {
          vi: "Không có bộ lọc e-mail nào nhắm đến các e-mail được gửi từ @ryxel.com.",
          en: "There are no email filters targeting emails sent from @ryxel.com.",
        },
        registeredEmail: {
          vi: "E-mail được sử dụng là e-mail đã dùng để đăng kí tài khoản Ryxel Store.",
          en: "The email used is the email used to register for the Ryxel Store account.",
        },
      },
    },
    resetPassword: {
      title: {
        vi: "Đặt lại mật khẩu",
        en: "Reset Password",
      },
      subtitle: {
        vi: "Xin hãy điền vào mật khẩu mới cho tài khoản của bạn.",
        en: "Please enter a new password for your account.",
      },
      submit: {
        vi: "Cập nhật mật khẩu",
        en: "Update password",
      },
      success: {
        vi: "Mật khẩu đã được đặt lại thành công!",
        en: "Password has been reset successfully!",
      },
      invalidToken: {
        vi: "Token lấy lại mật khẩu của bạn không hợp lệ hoặc đã hết hạn.",
        en: "Your password reset token is invalid or has expired.",
      },
      tryAgain: {
        vi: "Bạn có thể thử lại bằng cách bấm vào nút Quên mật khẩu bên dưới.",
        en: "You can try again by clicking the Forgot Password button below.",
      },
    },
    verifyEmail: {
      title: {
        vi: "Xác thực email",
        en: "Verify Email",
      },
      almostDone: {
        vi: "Chỉ một chút nữa",
        en: "Almost Done",
      },
      sentOTP: {
        vi: "Chúng tôi đã gửi e-mail có chứa OTP tới địa chỉ e-mail của bạn. Xin lưu ý OTP chỉ có tác dụng trong 10 phút.",
        en: "We've sent an email containing an OTP to your email address. Please note that the OTP is only valid for 10 minutes.",
      },
      enterBelow: {
        vi: "Xin hãy nhập OTP dưới đây:",
        en: "Please enter the OTP below:",
      },
      loginSuccessNote: {
        vi: "Bạn đã đăng nhập thành công. Nhưng bạn sẽ không thể tiến hành đặt hàng nếu chưa xác nhận tài khoản.",
        en: "You have logged in successfully. However, you will not be able to proceed with placing orders until you verify your account.",
      },
      confirmButton: {
        vi: "Xác nhận",
        en: "Confirm",
      },
      resendOTP: {
        vi: "Gửi lại OTP",
        en: "Resend OTP",
      },
      resendIn: {
        vi: "Gửi lại OTP trong",
        en: "Resend OTP in",
      },
      seconds: {
        vi: "giây",
        en: "seconds",
      },
      sending: {
        vi: "Đang gửi ...",
        en: "Sending ...",
      },
      checking: {
        vi: "Đang xác thực email của bạn...",
        en: "Verifying your email...",
      },
      success: {
        vi: "Email đã được xác thực thành công!",
        en: "Email verified successfully!",
      },
      error: {
        vi: "Xác thực email thất bại.",
        en: "Email verification failed.",
      },
      expired: {
        vi: "Liên kết xác thực đã hết hạn.",
        en: "Verification link has expired.",
      },
      backToLogin: {
        vi: "Trở lại đăng nhập",
        en: "Back to login",
      },
    },
    reauthenticate: {
      title: {
        vi: "Xác thực lại",
        en: "Re-authenticate",
      },
      subtitle: {
        vi: "Vui lòng nhập mật khẩu của bạn để tiếp tục",
        en: "Please enter your password to continue",
      },
      submit: {
        vi: "Xác thực",
        en: "Authenticate",
      },
    },
    form: {
      email: {
        label: {
          vi: "Email",
          en: "Email",
        },
        placeholder: {
          vi: "Nhập email của bạn",
          en: "Enter your email",
        },
      },
      password: {
        label: {
          vi: "Mật khẩu",
          en: "Password",
        },
        placeholder: {
          vi: "Nhập mật khẩu của bạn",
          en: "Enter your password",
        },
      },
      fullName: {
        label: {
          vi: "Họ và tên",
          en: "Full name",
        },
        placeholder: {
          vi: "Nhập họ và tên của bạn",
          en: "Enter your full name",
        },
      },
      confirmPassword: {
        label: {
          vi: "Xác nhận mật khẩu",
          en: "Confirm password",
        },
        placeholder: {
          vi: "Nhập lại mật khẩu của bạn",
          en: "Re-enter your password",
        },
      },
      phone: {
        label: {
          vi: "Số điện thoại",
          en: "Phone number",
        },
        placeholder: {
          vi: "Nhập số điện thoại của bạn",
          en: "Enter your phone number",
        },
      },
      currentPassword: {
        label: {
          vi: "Mật khẩu hiện tại",
          en: "Current password",
        },
        placeholder: {
          vi: "Nhập mật khẩu hiện tại của bạn",
          en: "Enter your current password",
        },
      },
      newPassword: {
        label: {
          vi: "Mật khẩu mới",
          en: "New password",
        },
        placeholder: {
          vi: "Nhập mật khẩu mới của bạn",
          en: "Enter your new password",
        },
      },
      submit: {
        login: {
          vi: "Đăng nhập",
          en: "Login",
        },
        signup: {
          vi: "Đăng ký",
          en: "Sign up",
        },
      },
    },
  },
  account: {
    navigation: {
      profile: {
        vi: "Hồ sơ",
        en: "Profile",
      },
      orders: {
        vi: "Đơn hàng",
        en: "Orders",
      },
      addresses: {
        vi: "Địa chỉ giao hàng",
        en: "Shipping Addresses",
      },
      updatePassword: {
        vi: "Đổi mật khẩu",
        en: "Change Password",
      },
      wishlist: {
        vi: "Danh sách yêu thích",
        en: "Wishlist",
      },
      logout: {
        vi: "Đăng xuất",
        en: "Logout",
      },
      showMenu: {
        vi: "Hiện menu",
        en: "Show menu",
      },
      hideMenu: {
        vi: "Ẩn menu",
        en: "Hide menu",
      },
    },
    profile: {
      title: {
        vi: "Hồ sơ của tôi",
        en: "My Profile",
      },
      description: {
        vi: "Quản lí thông tin hồ sơ của bạn để tăng tính bảo mật.",
        en: "Manage your profile information to enhance security.",
      },
      personalInfo: {
        vi: "Thông tin cá nhân",
        en: "Personal Information",
      },
      updateInfo: {
        vi: "Cập nhật thông tin",
        en: "Update Information",
      },
      updateProfile: {
        vi: "Cập nhật hồ sơ",
        en: "Update Profile",
      },
      gender: {
        vi: "Giới tính",
        en: "Gender",
      },
      male: {
        vi: "Nam",
        en: "Male",
      },
      female: {
        vi: "Nữ",
        en: "Female",
      },
      other: {
        vi: "Khác",
        en: "Other",
      },
      phone: {
        vi: "Số điện thoại",
        en: "Phone Number",
      },
      birthday: {
        vi: "Sinh nhật",
        en: "Birthday",
      },
      noPhone: {
        vi: "(Bạn vẫn chưa thêm số điện thoại)",
        en: "(You haven't added a phone number yet)",
      },
      noBirthday: {
        vi: "(Bạn vẫn chưa thêm ngày sinh)",
        en: "(You haven't added your birthday yet)",
      },
      verify: {
        vi: "Xác thực",
        en: "Verify",
      },
      change: {
        vi: "Thay đổi",
        en: "Change",
      },
      email: {
        vi: "Email",
        en: "Email",
      },
      phoneNotAdded: {
        vi: "(Bạn vẫn chưa thêm số điện thoại)",
        en: "(You haven't added a phone number yet)",
      },
      birthdayNotAdded: {
        vi: "(Bạn vẫn chưa thêm ngày sinh)",
        en: "(You haven't added your birthday yet)",
      },
      changeAvatar: {
        vi: "Đổi ảnh đại diện",
        en: "Change Avatar",
      },
      clickToChange: {
        vi: "Bấm vào ảnh để thay đổi",
        en: "Click on the image to change",
      },
      imageFormat: {
        vi: "Định dạng: .JPEG, .JPG, .PNG",
        en: "Format: .JPEG, .JPG, .PNG",
      },
      currentPassword: {
        vi: "Mật khẩu hiện tại",
        en: "Current Password",
      },
      newPassword: {
        vi: "Mật khẩu mới",
        en: "New Password",
      },
      confirmPassword: {
        vi: "Xác nhận mật khẩu",
        en: "Confirm Password",
      },
      changePassword: {
        vi: "Đổi mật khẩu",
        en: "Change Password",
      },
    },
    orders: {
      title: {
        vi: "Đơn hàng",
        en: "Orders",
      },
      description: {
        vi: "Quản lí thông tin đơn hàng của bạn.",
        en: "Manage your order information.",
      },
      orderDetails: {
        vi: "Chi tiết đơn hàng",
        en: "Order Details",
      },
      backToOrders: {
        vi: "Quay lại",
        en: "Back",
      },
      searchPlaceholder: {
        vi: "Tìm kiếm bằng tên sản phẩm, mã đơn hàng, ...",
        en: "Search by product name, order code, ...",
      },
      notFound: {
        vi: "Không tìm thấy đơn hàng",
        en: "Order not found",
      },
      variant: {
        vi: "Phân loại",
        en: "Variant",
      },
      quantity: {
        vi: "Số lượng",
        en: "Quantity",
      },
      subtotal: {
        vi: "Thành tiền",
        en: "Subtotal",
      },
      status: {
        unpaid: {
          vi: "Chưa thanh toán",
          en: "Unpaid",
        },
        pending: {
          vi: "Chờ xác nhận",
          en: "Pending",
        },
        processing: {
          vi: "Đang xử lý",
          en: "Processing",
        },
        shipped: {
          vi: "Đã vận chuyển",
          en: "Shipped",
        },
        delivered: {
          vi: "Đã giao",
          en: "Delivered",
        },
        cancelled: {
          vi: "Đã hủy",
          en: "Cancelled",
        },
        refunded: {
          vi: "Đã hoàn tiền",
          en: "Refunded",
        },
      },
      card: {
        total: {
          vi: "Tổng tiền",
          en: "Total",
        },
        collapse: {
          vi: "Thu gọn",
          en: "Collapse",
        },
        showMore: {
          vi: "Xem thêm {count} sản phẩm khác",
          en: "Show {count} more products",
        },
      },
      actions: {
        payment: {
          vi: "Thanh toán",
          en: "Pay now",
        },
        review: {
          vi: "Đánh giá",
          en: "Review",
        },
        viewReview: {
          vi: "Xem đánh giá",
          en: "View review",
        },
        buyAgain: {
          vi: "Mua lại",
          en: "Buy again",
        },
        cancel: {
          vi: "Hủy đơn hàng",
          en: "Cancel order",
        },
        detail: {
          vi: "Xem chi tiết",
          en: "View details",
        },
        addToCart: {
          vi: "Thêm vào giỏ hàng",
          en: "Add to cart",
        },
      },
      confirmCancel: {
        vi: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
        en: "Are you sure you want to cancel this order?",
      },
      buyAgainChoice: {
        vi: "Bạn muốn chuyển đến trang thanh toán hay thêm toàn bộ vào giỏ hàng?",
        en: "Would you like to go to checkout or add all items to cart?",
      },
      buyAgainCheckout: {
        vi: "Chuyển đến thanh toán",
        en: "Go to checkout",
      },
      buyAgainAddToCart: {
        vi: "Thêm vào giỏ hàng",
        en: "Add to cart",
      },
      messages: {
        cancelSuccess: {
          vi: "Đơn hàng đã được hủy thành công!",
          en: "Order cancelled successfully!",
        },
        addedToCartSuccess: {
          vi: "Tất cả sản phẩm đã được thêm vào giỏ hàng.",
          en: "All items have been added to your cart.",
        },
        addedToCartError: {
          vi: "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.",
          en: "An error occurred while adding products to your cart.",
        },
      },
    },
    orderDetails: {
      title: {
        vi: "Chi tiết đơn hàng #{orderId}",
        en: "Order Details #{orderId}",
      },
      products: {
        vi: "Sản phẩm trong đơn hàng",
        en: "Products in Order",
      },
      totalItems: {
        vi: "Tổng số sản phẩm: {count}",
        en: "Total Items: {count}",
      },
      orderInfo: {
        vi: "Thông tin đơn hàng",
        en: "Order Information",
      },
      orderDate: {
        vi: "Ngày đặt hàng",
        en: "Order Date",
      },
      orderStatus: {
        vi: "Trạng thái đơn hàng",
        en: "Order Status",
      },
      shippingAddress: {
        vi: "Địa chỉ giao hàng",
        en: "Shipping Address",
      },
      paymentMethod: {
        vi: "Phương thức thanh toán",
        en: "Payment Method",
      },
      itemsOrdered: {
        vi: "Sản phẩm đã đặt",
        en: "Items Ordered",
      },
      totalAmount: {
        vi: "Tổng tiền thanh toán",
        en: "Total Amount",
      },
      paymentMethods: {
        cod: {
          vi: "Thanh toán khi nhận hàng",
          en: "Cash on Delivery",
        },
        stripe: {
          vi: "Stripe (Link, Visa, MasterCard)",
          en: "Stripe (Link, Visa, MasterCard)",
        },
        zalopay: {
          vi: "Ví ZaloPay (Thẻ ATM/tín dụng)",
          en: "ZaloPay Wallet (ATM/Credit Card)",
        },
      },
    },
    addresses: {
      title: {
        vi: "Địa chỉ giao hàng",
        en: "Shipping Addresses",
      },
      addressList: {
        vi: "Địa chỉ",
        en: "Addresses",
      },
      defaultLabel: {
        vi: "Mặc định",
        en: "Default",
      },
      update: {
        vi: "Cập nhật",
        en: "Update",
      },
      delete: {
        vi: "Xoá",
        en: "Delete",
      },
      setDefault: {
        vi: "Đặt mặc định",
        en: "Set as Default",
      },
      confirmDelete: {
        vi: "Bạn chắc muốn xoá địa chỉ giao hàng này?",
        en: "Are you sure you want to delete this shipping address?",
      },
      addNew: {
        vi: "Địa chỉ mới",
        en: "New Address",
      },
      updateTitle: {
        vi: "Cập nhật địa chỉ",
        en: "Update Address",
      },
      form: {
        fullname: {
          vi: "Họ và tên",
          en: "Full Name",
        },
        phoneNumber: {
          vi: "Số điện thoại",
          en: "Phone Number",
        },
        address: {
          vi: "Địa chỉ (số nhà & tên đường)",
          en: "Address (house number & street)",
        },
        addressDetail: {
          vi: "Địa chỉ chi tiết (tuỳ chọn)",
          en: "Detailed address (optional)",
        },
        setDefaultLabel: {
          vi: "Đặt mặc định",
          en: "Set as default",
        },
        addButton: {
          vi: "Thêm",
          en: "Add",
        },
        updateButton: {
          vi: "Cập nhật",
          en: "Update",
        },
      },
      location: {
        provinceLabel: {
          vi: "Tỉnh/Thành phố",
          en: "Province/City",
        },
        provincePlaceholder: {
          vi: "Chọn tỉnh/thành phố",
          en: "Select province/city",
        },
        districtLabel: {
          vi: "Quận/Huyện",
          en: "District",
        },
        districtPlaceholder: {
          vi: "Chọn quận/huyện",
          en: "Select district",
        },
        wardLabel: {
          vi: "Phường/Xã",
          en: "Ward/Commune",
        },
        wardPlaceholder: {
          vi: "Chọn phường/xã",
          en: "Select ward/commune",
        },
      },
      success: {
        added: {
          vi: "Thêm địa chỉ thành công",
          en: "Address added successfully",
        },
        updated: {
          vi: "Cập nhật địa chỉ thành công",
          en: "Address updated successfully",
        },
        deleted: {
          vi: "Xoá địa chỉ thành công",
          en: "Address deleted successfully",
        },
        setDefault: {
          vi: "Đặt địa chỉ mặc định thành công",
          en: "Address set as default successfully",
        },
      },
    },
    updatePassword: {
      title: {
        vi: "Thay đổi mật khẩu",
        en: "Change Password",
      },
      description: {
        vi: "Nhằm bảo mật tài khoản, TUYỆT ĐỐI không chia sẻ mật khẩu với bất kì ai",
        en: "For account security, NEVER share your password with anyone",
      },
      success: {
        vi: "Mật khẩu đã được cập nhật thành công!",
        en: "Password updated successfully!",
      },
    },
    wishlist: {
      title: {
        vi: "Danh sách yêu thích",
        en: "Wishlist",
      },
      description: {
        vi: "Quản lí danh sách yêu thích của bạn để dễ dàng theo dõi và mua sắm.",
        en: "Manage your wishlist for easy tracking and shopping.",
      },
      empty: {
        vi: "Không có sản phẩm nào trong danh sách của bạn.",
        en: "No products in your wishlist.",
      },
      addProducts: {
        vi: "Thêm sản phẩm yêu thích",
        en: "Add favorite products",
      },
      addToCart: {
        vi: "Thêm giỏ hàng",
        en: "Add to Cart",
      },
      productName: {
        vi: "Tên sản phẩm",
        en: "Product Name",
      },
      category: {
        vi: "Phân loại",
        en: "Category",
      },
      price: {
        vi: "Giá",
        en: "Price",
      },
      priceLabel: {
        vi: "Giá tiền:",
        en: "Price:",
      },
      stock: {
        vi: "Tình trạng",
        en: "Stock",
      },
      action: {
        vi: "Hành động",
        en: "Action",
      },
      addAllToCart: {
        vi: "Thêm tất cả vào giỏ",
        en: "Add All to Cart",
      },
      clearWishlist: {
        vi: "Xóa tất cả",
        en: "Clear All",
      },
      addAllToCartSuccess: {
        vi: "Tất cả sản phẩm đã được thêm vào giỏ hàng.",
        en: "All products have been added to cart.",
      },
      addAllToCartError: {
        vi: "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.",
        en: "An error occurred while adding products to cart.",
      },
      share: {
        vi: "Chia sẻ",
        en: "Share",
      },
      inStock: {
        vi: "Còn hàng",
        en: "In Stock",
      },
      outOfStock: {
        vi: "Hết hàng",
        en: "Out of Stock",
      },
    },
    orderReview: {
      variant: {
        vi: "Phân loại:",
        en: "Variant:",
      },
      productQuality: {
        vi: "Chất lượng sản phẩm:",
        en: "Product Quality:",
      },
      clickToRate: {
        vi: "(bấm chọn để đánh giá)",
        en: "(click to rate)",
      },
      content: {
        vi: "Nội dung",
        en: "Content",
      },
      placeholder: {
        vi: "Viết đánh giá (tối đa 500 ký tự)",
        en: "Write a review (max 500 characters)",
      },
      edit: {
        vi: "Sửa",
        en: "Edit",
      },
      addPhotoVideo: {
        vi: "Thêm ảnh hoặc video",
        en: "Add photo or video",
      },
      addPhoto: {
        vi: "Thêm ảnh",
        en: "Add photo",
      },
      addVideo: {
        vi: "Thêm video",
        en: "Add video",
      },
      fileSizeLimit: {
        vi: "Kích thước ảnh/video tối đa 5MB",
        en: "Max file size 5MB",
      },
      videoLimit: {
        vi: "Chỉ được tải lên tối đa 1 video",
        en: "Maximum 1 video allowed",
      },
      imageVideoLimit: {
        vi: "Chỉ được tải lên tối đa 2 ảnh và video",
        en: "Maximum 2 images and videos allowed",
      },
    },
  },
  checkout: {
    title: {
      vi: "Đặt hàng",
      en: "Checkout",
    },
    pageTitle: {
      vi: "Thanh toán",
      en: "Checkout",
    },
    steps: {
      shipping: {
        vi: "Thông tin giao hàng",
        en: "Shipping Information",
      },
      payment: {
        vi: "Phương thức thanh toán",
        en: "Payment Method",
      },
      confirm: {
        vi: "Xác nhận đơn hàng",
        en: "Order Confirmation",
      },
    },
    addressList: {
      title: {
        vi: "Danh sách địa chỉ",
        en: "Address List",
      },
      selectAddress: {
        vi: "Chọn địa chỉ",
        en: "Select Address",
      },
    },
    selectAddress: {
      title: {
        vi: "Địa chỉ nhận hàng",
        en: "Shipping Address",
      },
      change: {
        vi: "Thay đổi",
        en: "Change",
      },
      confirmDialog: {
        vi: "Bạn chưa có địa chỉ giao hàng nào được thêm. Bạn có muốn thêm địa chỉ mới?",
        en: "You don't have any shipping addresses added. Would you like to add a new address?",
      },
    },
    item: {
      subtotal: {
        vi: "Thành tiền",
        en: "Subtotal",
      },
    },
    summary: {
      title: {
        vi: "Tóm tắt đơn hàng",
        en: "Order Summary",
      },
      note: {
        vi: "*Lưu ý: bạn chỉ có thể huỷ đơn trong vòng 30 phút kể từ khi đặt hàng và trước khi đơn hàng được xác nhận.",
        en: "*Note: you can only cancel your order within 30 minutes from placing it and before the order is confirmed.",
      },
      voucher: {
        vi: "Áp dụng voucher",
        en: "Apply voucher",
      },
      voucherSuccess: {
        vi: "{code} đã được sử dụng thành công",
        en: "{code} has been applied successfully",
      },
      voucherPlaceholder: {
        vi: "Mã giảm giá",
        en: "Voucher code",
      },
      use: {
        vi: "Dùng",
        en: "Use",
      },
      subtotal: {
        vi: "Tổng cộng",
        en: "Subtotal",
      },
      shipping: {
        vi: "Phí vận chuyển",
        en: "Shipping fee",
      },
      expectedDelivery: {
        vi: "*Dự kiến giao hàng:",
        en: "*Expected delivery:",
      },
      discount: {
        vi: "Giảm giá",
        en: "Discount",
      },
      total: {
        vi: "Tổng thanh toán",
        en: "Total payment",
      },
      paymentMethod: {
        vi: "Phương thức thanh toán",
        en: "Payment method",
      },
    },
    paymentMethods: {
      title: {
        vi: "Phương thức thanh toán",
        en: "Payment Method",
      },
      cod: {
        vi: "Thanh toán khi nhận hàng",
        en: "Cash on Delivery",
      },
      stripe: {
        vi: "Thanh toán qua Stripe (Link, Visa, MasterCard)",
        en: "Stripe Payment (Link, Visa, MasterCard)",
      },
      zalopay: {
        vi: "Thanh toán qua ZaloPay (Thẻ ATM/tín dụng)",
        en: "ZaloPay Payment (ATM/Credit Card)",
      },
    },
    selectPaymentMethod: {
      vi: "Chọn phương thức thanh toán",
      en: "Select a payment method",
    },
  },
  orders: {
    status: {
      all: {
        vi: "Tất cả",
        en: "All",
      },
      unpaid: {
        vi: "Chưa thanh toán",
        en: "Unpaid",
      },
      pending: {
        vi: "Chờ xác nhận",
        en: "Pending",
      },
      processing: {
        vi: "Đang xử lí",
        en: "Processing",
      },
      shipped: {
        vi: "Đang giao",
        en: "Shipped",
      },
      delivered: {
        vi: "Đã giao",
        en: "Delivered",
      },
      cancelled: {
        vi: "Đã hủy",
        en: "Cancelled",
      },
    },
    card: {
      total: {
        vi: "Tổng tiền",
        en: "Total",
      },
      collapse: {
        vi: "Thu gọn",
        en: "Collapse",
      },
      showMore: {
        vi: "Xem thêm {count} sản phẩm",
        en: "Show {count} more products",
      },
    },
    dashboard: {
      empty: {
        vi: "Không có đơn hàng nào phù hợp với bộ lọc",
        en: "No orders match your filter",
      },
    },
    review: {
      title: {
        vi: "Đánh giá sản phẩm",
        en: "Review Products",
      },
      submitButton: {
        vi: "Gửi đánh giá",
        en: "Submit Review",
      },
      updateButton: {
        vi: "Cập nhật đánh giá",
        en: "Update Review",
      },
      confirmButton: {
        vi: "Xác nhận",
        en: "Confirm",
      },
      success: {
        message: {
          vi: "Đánh giá của bạn đã được gửi thành công!",
          en: "Your review has been submitted successfully!",
        },
        update: {
          vi: "Đánh giá của bạn đã được cập nhật thành công!",
          en: "Your review has been updated successfully!",
        },
      },
    },
  },
  blog: {
    categories: {
      all: {
        vi: "Tất cả",
        en: "All",
      },
      gamingGear: {
        vi: "Gaming Gear",
        en: "Gaming Gear",
      },
      tutorials: {
        vi: "Hướng dẫn",
        en: "Tutorials",
      },
      esports: {
        vi: "Esports",
        en: "Esports",
      },
      technology: {
        vi: "Công nghệ",
        en: "Technology",
      },
      software: {
        vi: "Phần mềm",
        en: "Software",
      },
    },
    categoryMap: {
      "Gaming Gear": {
        vi: "Gaming Gear",
        en: "Gaming Gear",
      },
      "Hướng dẫn": {
        vi: "Hướng dẫn",
        en: "Tutorials",
      },
      Esports: {
        vi: "Esports",
        en: "Esports",
      },
      "Công nghệ": {
        vi: "Công nghệ",
        en: "Technology",
      },
      "Phần mềm": {
        vi: "Phần mềm",
        en: "Software",
      },
    },
    noArticles: {
      vi: "Không có bài viết nào trong danh mục này.",
      en: "No articles found in this category.",
    },
  },
  confirmDialogue: {
    cancel: {
      vi: "Hủy",
      en: "Cancel",
    },
    confirm: {
      vi: "Xác nhận",
      en: "Confirm",
    },
  },
  notifications: {
    title: {
      vi: "Thông báo",
      en: "Notifications",
    },
    markAllRead: {
      vi: "Đánh dấu tất cả đã đọc",
      en: "Mark all as read",
    },
    deleteAll: {
     
      vi: "Xóa tất cả",
      en: "Delete all",
    },
    filter: {
      all: {
        vi: "Tất cả",
        en: "All",
      },
      unread: {
        vi: "Chưa đọc",
        en: "Unread",
      },
      read: {
        vi: "Đã đọc",
        en: "Read",
      },
    },
    noNotifications: {
      vi: "Không có thông báo nào",
      en: "No notifications",
    },
    type: {
      order: {
        vi: "Đơn hàng",
        en: "Order",
      },
      shipping: {
        vi: "Vận chuyển",
        en: "Shipping",
      },
      promotional: {
        vi: "Khuyến mãi",
        en: "Promotional",
      },
      system: {
        vi: "Hệ thống",
        en: "System",
      },
      general: {
        vi: "Chung",
        en: "General",
      },
    },
    new: {
      vi: "Mới",
      en: "New",
    },
    markRead: {
      vi: "Đánh dấu đã đọc",
      en: "Mark as read",
    },
    delete: {
      vi: "Xóa",
      en: "Delete",
    },
  },
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
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

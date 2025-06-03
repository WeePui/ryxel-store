"use client";

import HeroSlider from "../Home/HeroSlider";
import BestsellerSection from "../Home/BestsellerSection";
import HotCategoriesSection from "../Home/HotCategoriesSection";
import TestimonialSection from "../Home/TestimonialSection";
import NewReleasesSection from "../Home/NewReleasesSection";
import FeaturesSection from "../Home/FeaturesSection";
import { useLanguage } from "../../_contexts/LanguageContext";
import { motion } from "framer-motion";

const slidesContent = {
  vi: [
    {
      title: "Chúng tôi ở đây để nâng tầm trải nghiệm của bạn",
      subTitle: "Không Chỉ Là Gears, Mà Là Phong Cách Của Bạn",
      image: "/hero-1.jpg",
      slideButtonContent: "Đi tới cửa hàng",
      href: "/products",
    },
    {
      title: "Bạn cũng là một tuyển thủ tiềm năng",
      subTitle:
        "Thử ngay chuột của Wee - Quán quân The Lake Village Tournament",
      image: "/hero-2.jpg",
      slideButtonContent: "Trở thành nhà vô địch",
      href: "/products/chuot-gaming-co-day-hyperx-pulsefire-haste-ii",
    },
    {
      title: "Tạo nên sự khác biệt",
      subTitle: "Chúng tôi hân hạnh mang đến dịch vụ tốt nhất cho bạn",
      image: "/hero-3.jpg",
      slideButtonContent: "Sẵn sàng thay đổi",
      href: "/products?category=phu-kien",
    },
  ],
  en: [
    {
      title: "We're here to elevate your experience",
      subTitle: "Not Just Gears, But Your Style",
      image: "/hero-1.jpg",
      slideButtonContent: "Go to store",
      href: "/products",
    },
    {
      title: "You are also a potential champion",
      subTitle: "Try Wee's mouse - The Lake Village Tournament Champion",
      image: "/hero-2.jpg",
      slideButtonContent: "Become a champion",
      href: "/products/chuot-gaming-co-day-hyperx-pulsefire-haste-ii",
    },
    {
      title: "Make a difference",
      subTitle: "We are honored to bring you the best service",
      image: "/hero-3.jpg",
      slideButtonContent: "Ready for change",
      href: "/products?category=phu-kien",
    },
  ],
};

// Định nghĩa các variant animation
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const slideLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function HomePageContent() {
  const { language } = useLanguage();
  const slides = slidesContent[language] || slidesContent["vi"]; // Fallback to Vietnamese if language is undefined

  return (
    <>
      <section className="relative flex h-[calc(100dvh-4rem)] w-full items-center justify-center overflow-hidden bg-gray-800 xl:h-[60vh] sm:h-[70vh]">
        <HeroSlider slides={slides} />
      </section>
      {/* Apply framer-motion animations to each section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
      >
        <HotCategoriesSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={slideLeftVariants}
        className="w-full"
      >
        <NewReleasesSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={slideRightVariants}
        className="max-w-full"
      >
        <BestsellerSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={scaleVariants}
      >
        <FeaturesSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariants}
        className="w-full"
      >
        <TestimonialSection />
      </motion.div>
    </>
  );
}

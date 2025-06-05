"use client";

import { useRouter } from "next/navigation";
import { FaMouse } from "react-icons/fa";
import { FaChair, FaGears, FaHeadphones, FaKeyboard } from "react-icons/fa6";
import { PiDeskBold } from "react-icons/pi";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

export default function HotCategoriesSection() {
  const router = useRouter();
  const { language } = useLanguage();

  // Định nghĩa variant cho container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Định nghĩa variant cho category item
  const categoryVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="mx-auto w-full max-w-7xl rounded-2xl bg-[#fefefe] bg-gradient-to-b from-slate-100 to-white px-10 py-14 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] lg:mt-4 md:px-2">
      <motion.p
        className="text-center font-title text-3xl font-semibold"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {language === "vi" ? "Danh mục nổi bật" : "Featured Categories"}
      </motion.p>

      <motion.div
        className="mt-10 grid grid-cols-6 content-center gap-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow"
          role="button"
          onClick={() => router.push("/products?category=Chuột")}
          variants={categoryVariants}
          whileHover={{ scale: 1.05 }}
        >
          <FaMouse className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Chuột Gaming" : "Gaming Mice"}
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow"
          role="button"
          onClick={() => router.push("/products?category=Bàn+phím")}
          variants={categoryVariants}
          whileHover={{ scale: 1.05 }}
        >
          <FaKeyboard className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Bàn phím cơ" : "Mechanical Keyboards"}
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow"
          role="button"
          onClick={() => router.push("/products?category=Tai+nghe")}
          variants={categoryVariants}
          whileHover={{ scale: 1.05 }}
        >
          <FaHeadphones className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Tai nghe" : "Headphones"}
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow"
          role="button"
          onClick={() => router.push("/products?category=Bàn")}
          variants={categoryVariants}
          whileHover={{ scale: 1.05 }}
        >
          <PiDeskBold className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Bàn" : "Tables"}
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow"
          role="button"
          onClick={() => router.push("/products?category=Ghế")}
          variants={categoryVariants}
          whileHover={{ scale: 1.05 }}
        >
          <FaChair className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Ghế" : "Chairs"}
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow"
          role="button"
          onClick={() => router.push("/products?category=Phụ+kiện")}
          variants={categoryVariants}
          whileHover={{ scale: 1.05 }}
        >
          <FaGears className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Phụ kiện" : "Accessories"}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

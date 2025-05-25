"use client";

import { useRouter } from "next/navigation";
import { FaMouse } from "react-icons/fa";
import { FaChair, FaGears, FaHeadphones, FaKeyboard } from "react-icons/fa6";
import { PiDeskBold } from "react-icons/pi";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function HotCategoriesSection() {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl rounded-2xl bg-[#fefefe] bg-gradient-to-b from-slate-100 to-white px-10 py-14 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] lg:mt-4 md:px-2">
      <p className="text-center font-title text-3xl font-semibold">
        {language === "vi" ? "Danh mục nổi bật" : "Featured Categories"}
      </p>
      <div className="mt-10 grid grid-cols-6 content-center gap-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-2">
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow transition-transform hover:scale-105"
          role="button"
          onClick={() => router.push("/products?category=Chuột")}
        >
          {" "}
          <FaMouse className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Chuột Gaming" : "Gaming Mice"}
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow transition-transform hover:scale-105"
          role="button"
          onClick={() => router.push("/products?category=Bàn+phím")}
        >
          <FaKeyboard className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Bàn phím cơ" : "Mechanical Keyboards"}
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow transition-transform hover:scale-105"
          role="button"
          onClick={() => router.push("/products?category=Tai+nghe")}
        >
          <FaHeadphones className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Tai nghe" : "Headphones"}
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow transition-transform hover:scale-105"
          role="button"
          onClick={() => router.push("/products?category=Bàn")}
        >
          <PiDeskBold className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Bàn" : "Tables"}
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow transition-transform hover:scale-105"
          role="button"
          onClick={() => router.push("/products?category=Ghế")}
        >
          <FaChair className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Ghế" : "Chairs"}
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/5 p-4 shadow transition-transform hover:scale-105"
          role="button"
          onClick={() => router.push("/products?category=Phụ+kiện")}
        >
          <FaGears className="text-7xl" />
          <p className="text-center text-lg font-semibold">
            {language === "vi" ? "Phụ kiện" : "Accessories"}
          </p>
        </div>
      </div>
    </section>
  );
}

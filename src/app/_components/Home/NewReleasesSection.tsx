"use client";

import formatMoney from "@/app/_utils/formatMoney";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function NewReleasesSection() {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 lg:py-16 md:py-12 sm:py-10">
      <div className="relative flex h-[20rem] items-center overflow-hidden rounded-2xl bg-black shadow-xl lg:h-[18rem] md:h-[16rem] sm:h-auto">
        <Image
          src="/steelseries-new-release.jpg"
          alt="Chuột Ryxel Aether RGB"
          fill
          className="object-cover opacity-40"
        />{" "}
        <div className="relative z-10 max-w-xl px-10 text-white md:px-6 sm:max-w-full sm:px-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {language === "vi" ? "Mới cập bến" : "New Arrival"}
          </span>
          <h2 className="mt-6 text-3xl font-bold">
            {language === "vi"
              ? "Tai nghe Steelseries Arctis Nova Pro Wireless"
              : "Steelseries Arctis Nova Pro Wireless Headphones"}
          </h2>
          <p className="mt-4 text-base text-white/90 md:hidden">
            {language === "vi"
              ? "Micro ClearCast Gen 2 mang đến trải nghiệm giao tiếp không gián đoạn, Dolby Atmos cho âm thanh vòm 7.1, và công nghệ Active Noise Cancellation."
              : "ClearCast Gen 2 microphone delivers uninterrupted communication, Dolby Atmos for 7.1 surround sound, and Active Noise Cancellation technology."}
          </p>
          <div className="mt-6 flex items-center gap-4 md:justify-between">
            <span className="text-primary-light text-xl font-semibold">
              {formatMoney(9490000)}
            </span>
            <button
              className="bg-primary hover:bg-primary-dark flex items-center gap-2 rounded-lg px-5 py-2 font-semibold text-white transition"
              onClick={() =>
                router.push(
                  "/products/tai-nghe-steelseries-arctis-nova-pro-wireless",
                )
              }
            >
              {language === "vi" ? "Mua ngay" : "Buy now"}{" "}
              <FaCircleChevronRight className="mt-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

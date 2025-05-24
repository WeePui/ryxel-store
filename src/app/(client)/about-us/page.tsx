"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import AboutUsTranslated from "@/app/_components/AboutUs/AboutUsTranslated";

export default function AboutUs() {
  const [, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-us/esport-competition.jpg"
            alt={t("aboutUs.title")}
            fill
            className="object-cover object-center brightness-[60%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
        </div>
        <div className="container relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
          <div className="md:max-w-full">
            <motion.h1
              className="mb-6 text-5xl font-bold text-white lg:text-center md:text-4xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("aboutUs.title")}
            </motion.h1>
            <motion.p
              className="text-xl text-white lg:text-center md:text-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("aboutUs.subtitle")}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main content using AboutUsTranslated component */}
      <AboutUsTranslated />
    </div>
  );
}

"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";
import Image from "next/image";

const LABELS = {
  vi: {
    text: "VI",
    toggle: "Switch to English",
    code: "vn",
  },
  en: {
    text: "EN",
    toggle: "Chuyển sang tiếng Việt",
    code: "gb",
  },
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };
  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className={`group flex h-9 items-center gap-2 rounded-full border px-3 ${
          language === "vi"
            ? "border-primary-600 bg-primary-50 text-primary-600"
            : "border-primary-400 text-primary-500"
        } font-medium transition-all duration-300 hover:bg-primary-100 hover:shadow-md`}
        aria-label={LABELS[language].toggle}
        title={LABELS[language].toggle}
      >
        <Image
          src={`/flags/${LABELS[language].code}.svg`}
          alt={`${language === "vi" ? "Vietnamese" : "English"} flag`}
          width={16}
          height={16}
          className="rounded-sm"
        />
        <span className="font-semibold">{LABELS[language].text}</span>
      </button>
    </div>
  );
}

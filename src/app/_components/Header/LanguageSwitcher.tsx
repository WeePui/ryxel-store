"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };
  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className={`flex h-8 w-8 items-center justify-center rounded-full border ${
          language === "vi"
            ? "border-primary-600 bg-primary-50 font-bold"
            : "border-primary-400"
        } font-medium text-primary-500 transition-colors hover:bg-primary-50`}
        aria-label={
          language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"
        }
        title={
          language === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"
        }
      >
        {language === "vi" ? "EN" : "VI"}
      </button>
    </div>
  );
}

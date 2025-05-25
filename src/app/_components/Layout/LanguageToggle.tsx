"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";
import Image from "next/image";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage(language === "en" ? "vi" : "en")}
        className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-grey-200/20"
      >
        {" "}
        <Image
          src={`/flags/${language === "en" ? "gb" : "vn"}.svg`}
          alt={language === "en" ? "English" : "Tiếng Việt"}
          width={20}
          height={20}
          className="rounded-sm"
        />
        <span className="text-sm font-semibold">{t("buttons.switchToVi")}</span>
      </button>
    </div>
  );
}

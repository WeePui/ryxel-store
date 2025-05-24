"use client";

import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import Navigation from "@components/Header/HeaderNav";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <button
        className="hidden text-2xl text-primary-500 transition-all duration-200 ease-in-out hover:text-primary-600 lg:block"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <FaBars />
      </button>{" "}
      {menuOpen && (
        <div className="fixed top-0 z-40 flex h-full animate-slide-in-reverse flex-col gap-6 overflow-y-auto bg-white p-6 shadow-lg lg:right-0 lg:w-7/12 md:left-0 md:w-full md:animate-slide-in">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-primary sticky top-0 z-10 self-end bg-white text-3xl"
            aria-label="Đóng menu"
          >
            <FaXmark />
          </button>
          <SearchBar />{" "}
          <div className="flex-1 px-6 py-4">
            <Navigation isMobile={true} onNavigate={() => setMenuOpen(false)} />{" "}
            <div className="mt-8 flex items-center gap-2">
              <span className="text-primary-500">{t("header.language")}:</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

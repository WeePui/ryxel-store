"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";
import { FaCircleUser } from "react-icons/fa6";
import NavLink from "@/app/_components/UI/NavLink";

export default function LoginButton() {
  const { t } = useLanguage();

  return (
    <NavLink hoverUnderline={false} href="/login">
      <div className="flex items-center gap-2">
        <FaCircleUser className="text-xl" />
        <span className="lg:hidden">{t("header.login")}</span>
      </div>
    </NavLink>
  );
}

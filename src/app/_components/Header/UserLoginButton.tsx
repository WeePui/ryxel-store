"use client";

import { FaCircleUser } from "react-icons/fa6";
import NavLink from "../UI/NavLink";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export function UserLoginButton() {
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

"use client";

import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import NavLink from "@/app/_components/UI/NavLink";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import FormSignup from "./FormSignup";

export default function ClientSignupPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10 xl:px-6 lg:gap-6">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        {t("auth.signup.title")}
      </h2>
      <div className="flex items-center justify-center gap-4">
        <p className="text-gray-400">{t("auth.signup.alreadyHaveAccount")}</p>
        <NavLink href="/login">
          <FaArrowUpRightFromSquare />
          <span className="font-bold">{t("auth.signup.login")}</span>
        </NavLink>
      </div>
      <FormSignup />
    </div>
  );
}

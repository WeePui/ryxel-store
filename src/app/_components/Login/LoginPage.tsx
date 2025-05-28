"use client";

import Button from "@/app/_components/UI/Button";
import NavLink from "@/app/_components/UI/NavLink";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import FormLogin from "./FormLogin";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10 xl:px-6 lg:gap-6">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        {t("auth.login.title")}
      </h2>
      <FormLogin />
      <NavLink href="/forgot-password">
        {t("auth.login.forgotPassword")}
      </NavLink>
      <hr className="my-1 w-1/2 border-t border-gray-200" />
      <div className="flex flex-col items-center gap-4">
        <p>{t("auth.login.noAccount")}</p>
        <Button variant="primary" href="/signup">
          {t("auth.login.createAccount")}
        </Button>
      </div>
    </div>
  );
}

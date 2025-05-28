"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";
import FormForgotPassword from "@/app/_components/ResetPassword/FormForgotPassword";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-8 xl:px-6">
      <h1 className="font-title text-3xl font-semibold text-primary-500">
        {t("auth.forgotPassword.title")}
      </h1>

      <FormForgotPassword />
    </div>
  );
}

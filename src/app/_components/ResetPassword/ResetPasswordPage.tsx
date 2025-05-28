"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";
import FormResetPassword from "@/app/_components/ResetPassword/FormResetPassword";

interface ResetPasswordProps {
  resetToken: string;
}

export default function ResetPasswordPage({ resetToken }: ResetPasswordProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-8 xl:px-6">
      <h1 className="font-title text-3xl font-semibold text-primary-500">
        {t("auth.resetPassword.title")}
      </h1>
      <FormResetPassword resetToken={resetToken} />
    </div>
  );
}

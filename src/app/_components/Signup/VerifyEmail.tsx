"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";
import OTPInput from "@/app/_components/ResetPassword/OTPInput";
import ResendOTPTranslated from "@/app/_components/ResetPassword/ResendOTP";
import { FaCircleInfo } from "react-icons/fa6";

export default function VerifyEmail() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto my-auto flex max-w-7xl flex-col items-center justify-center gap-8 pt-32 xl:px-6 lg:pt-16">
      <h1 className="text-3xl font-bold text-primary-500">
        {t("auth.verifyEmail.almostDone")}
      </h1>
      <div className="text-center text-grey-default">
        <p>{t("auth.verifyEmail.sentOTP")}</p>
        <p>{t("auth.verifyEmail.enterBelow")}</p>
      </div>
      <OTPInput />
      <ResendOTPTranslated />
      <p className="my-2 flex items-center gap-2 text-sm text-grey-300">
        <span>
          <FaCircleInfo />
        </span>
        {t("auth.verifyEmail.loginSuccessNote")}
      </p>
    </div>
  );
}

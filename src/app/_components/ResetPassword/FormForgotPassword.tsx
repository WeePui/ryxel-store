"use client";

import { useActionState } from "react";
import Spinner from "@/app/_components/UI/Spinner";
import { forgotPasswordAction } from "@libs/actions";
import { FaCircleExclamation, FaCircleQuestion } from "react-icons/fa6";
import Input from "@/app/_components/UI/Input";
import Button from "@/app/_components/UI/Button";
import { hasFormError } from "@/app/_helpers/hasFormError";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function FormForgotPassword() {
  const { t } = useLanguage();
  const [state, action, isPending] = useActionState(forgotPasswordAction, {
    success: false,
    errors: { message: "", email: "" },
  });

  if (isPending) return <Spinner />;

  if (state.success) {
    return (
      <>
        <p className="flex flex-col items-center gap-2 text-sm text-grey-300">
          <span className="block">{t("auth.forgotPassword.emailSent")}</span>
          {t("auth.forgotPassword.clickLink")}
        </p>
        <div className="flex w-full max-w-xl flex-col gap-2 rounded-lg bg-white px-16 py-12 shadow-sm lg:px-8">
          <h4 className="flex items-center gap-2 text-lg font-bold">
            <FaCircleQuestion /> {t("auth.forgotPassword.noEmail")}
          </h4>
          <p className="text-grey-500">
            {t("auth.forgotPassword.pleaseCheck")}
          </p>
          <ul className="flex list-disc flex-col gap-[1px] pl-4 text-sm text-grey-400">
            <li>{t("auth.forgotPassword.checkPoints.correctEmail")}</li>
            <li>{t("auth.forgotPassword.checkPoints.spamFolder")}</li>
            <li>{t("auth.forgotPassword.checkPoints.noFilters")}</li>
            <li>{t("auth.forgotPassword.checkPoints.registeredEmail")}</li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="flex flex-col items-center gap-2 text-sm text-grey-300">
        <span className="block">{t("auth.forgotPassword.enterEmail")}</span>
        {t("auth.forgotPassword.instructions")}
      </p>
      <form
        action={action}
        className="flex w-full max-w-xl flex-col items-center gap-8 rounded-lg bg-white px-16 py-12 shadow-sm lg:px-8"
      >
        {hasFormError("message", state.errors) && (
          <p className="flex items-center gap-2 p-2 text-sm text-red-500">
            <FaCircleExclamation />
            {state.errors.message}
          </p>
        )}
        <Input
          id="email"
          name="email"
          type="email"
          label={t("auth.form.email.label")}
          placeholder={t("auth.form.email.placeholder")}
          defaultValue={state?.errors.email}
          error={!!state?.errors.email}
          errorMessage={state?.errors.email}
        />
        <Button role="submit" loading={isPending}>
          {t("auth.forgotPassword.sendInstructions")}
        </Button>
      </form>
    </>
  );
}

export default FormForgotPassword;

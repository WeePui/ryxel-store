"use client";

import { useActionState } from "react";
import Spinner from "@/app/_components/UI/Spinner";
import { resetPasswordAction } from "@libs/actions";
import { FaRegCircleXmark } from "react-icons/fa6";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface FormResetPasswordProps {
  resetToken: string;
}

function FormResetPassword({ resetToken }: FormResetPasswordProps) {
  const { t } = useLanguage();
  const [state, action, isPending] = useActionState(resetPasswordAction, {
    success: undefined,
    errors: {},
  });

  if (isPending) return <Spinner />;

  if (state?.success === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-16 py-12 text-grey-400 shadow-sm lg:px-8">
        <FaRegCircleXmark className="text-5xl text-red-500" />
        <p>{t("auth.resetPassword.invalidToken")}</p>
        <p className="mb-4">{t("auth.resetPassword.tryAgain")}</p>
        <Button href="/forgot-password">
          {t("auth.forgotPassword.title")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-grey-300">
        {t("auth.resetPassword.subtitle")}
      </p>
      <form
        action={action}
        className="flex w-full max-w-xl flex-col items-center gap-8 rounded-lg bg-white px-16 py-12 shadow-sm lg:px-8"
      >
        <Input
          id="password"
          type="password"
          name="password"
          label={t("auth.form.newPassword.label")}
          placeholder={t("auth.form.newPassword.placeholder")}
          error={!!state?.errors?.password}
          errorMessage={state?.errors?.password}
        />
        <Input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          label={t("auth.form.confirmPassword.label")}
          placeholder={t("auth.form.confirmPassword.placeholder")}
          error={!!state?.errors?.password}
        />
        <input type="hidden" name="resetToken" value={resetToken} />
        <Button role="submit" loading={isPending}>
          {t("auth.resetPassword.submit")}
        </Button>
      </form>
    </>
  );
}

export default FormResetPassword;

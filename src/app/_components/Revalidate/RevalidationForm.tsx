"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { reauthenticateAction } from "@libs/actions";
import Input from "@components/UI/Input";
import Button from "@components/UI/Button";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function RevalidationForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const [state, action, isPending] = useActionState(
    reauthenticateAction.bind(null, redirectUrl),
    undefined,
  );

  return (
    <form className="flex w-full flex-col items-center gap-6" action={action}>
      <Input
        name="password"
        id="password"
        label={t("auth.form.password.label")}
        placeholder={t("auth.form.password.placeholder")}
        type="password"
        error={!!state?.errors?.password}
        errorMessage={state?.errors?.password}
      />
      <Button role="submit" loading={isPending}>
        {t("auth.reauthenticate.submit")}
      </Button>
    </form>
  );
}

export default RevalidationForm;

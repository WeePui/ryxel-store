"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { reauthenticateAction } from "@libs/actions";
import Input from "@components/UI/Input";
import Button from "@components/UI/Button";

function RevalidationForm() {
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
        label="Mật khẩu"
        type="password"
        error={!!state?.errors?.password}
        errorMessage={state?.errors?.password}
      />
      <Button role="submit" loading={isPending}>
        Xác nhận
      </Button>
    </form>
  );
}

export default RevalidationForm;

"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/app/_components/UI/Button";
import Input from "@/app/_components/UI/Input";
import { updatePasswordAction } from "@libs/actions";
import { hasFormError } from "@/app/_helpers/hasFormError";
import Loader from "../UI/Loader";

function FormUpdatePassword() {
  const [state, action, isPending] = useActionState(updatePasswordAction, {
    success: false,
    errors: {},
  });

  useEffect(() => {
    if (state?.success) {
      toast.success("Password updated successfully");
      return;
    }

    if (state?.errors && "message" in state.errors) {
      toast.error(state.errors.message);
      return;
    }
  }, [state?.success, state?.errors]);

  if (isPending) return <Loader />;

  return (
    <form
      className="flex w-full max-w-lg flex-col items-center gap-4 py-4"
      action={action}
    >
      <Input
        name="passwordCurrent"
        id="passwordCurrent"
        type="password"
        label="Mật khẩu hiện tại"
        error={
          hasFormError("passwordCurrent", state.errors) ||
          !!state?.errors?.message
        }
        errorMessage={state?.errors?.passwordCurrent || state?.errors?.message}
      />
      <Input
        name="password"
        id="password"
        type="password"
        label="Mật khẩu mới"
        error={hasFormError("password", state.errors)}
        errorMessage={state?.errors?.password}
      />
      <Input
        name="passwordConfirm"
        id="passwordConfirm"
        type="password"
        label="Xác nhận mật khẩu"
        error={hasFormError("passwordConfirm", state.errors)}
        errorMessage={state?.errors?.passwordConfirm}
      />

      <div className="mt-6 flex justify-center">
        <Button role="submit" size="medium">
          Đổi mật khẩu
        </Button>
      </div>
    </form>
  );
}

export default FormUpdatePassword;

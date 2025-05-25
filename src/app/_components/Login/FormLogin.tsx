"use client";

import Button from "@/app/_components/UI/Button";
import Input from "@/app/_components/UI/Input";
import { useActionState } from "react";
import { loginAction } from "@libs/actions";
import errorMessages from "@/app/_utils/mappingErrorMessages";

function FormLogin() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10 lg:mt-4">
      <div className="w-full max-w-lg gap-2 rounded-lg bg-white px-16 py-8 shadow-sm lg:px-8">
        <h3 className="mb-8 text-center text-lg font-extrabold text-primary-500">
          Đăng nhập bằng mật khẩu
        </h3>
        <form
          className="flex w-full flex-col items-center gap-6"
          action={action}
        >
          <Input
            id="email"
            type="email"
            name="email"
            label="Địa chỉ email"
            error={!!state?.errors?.email}
            errorMessage={state?.errors?.email}
          />
          <Input
            id="password"
            type="password"
            name="password"
            label="Mật khẩu"
            error={!!state?.errors?.password}
            errorMessage={errorMessages[state?.errors?.password as string]}
          />
          <Button loading={isPending} role="submit">
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;

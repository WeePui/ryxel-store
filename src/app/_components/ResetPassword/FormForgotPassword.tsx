"use client";

import { useActionState } from "react";
import Spinner from "@/app/_components/UI/Spinner";
import { forgotPasswordAction } from "@libs/actions";
import { FaCircleExclamation, FaCircleQuestion } from "react-icons/fa6";
import Input from "@/app/_components/UI/Input";
import Button from "@/app/_components/UI/Button";
import { hasFormError } from "@/app/_helpers/hasFormError";

function FormForgotPassword() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, {
    success: false,
    errors: { message: "", email: "" },
  });

  if (isPending) return <Spinner />;

  if (state.success) {
    return (
      <>
        <p className="flex flex-col items-center gap-2 text-sm text-grey-300">
          <span className="block">
            Chúng tôi đã gửi một e-mail tới địa chỉ e-mail mà bạn đã dùng để
            đăng kí{" "}
          </span>
          Có một liên kết (URL) được đính kèm trong e-mail, xin vui lòng bấm vào
          liên kết đó để đặt lại mật khẩu.
        </p>
        <div className="flex w-full max-w-xl flex-col gap-2 rounded-lg bg-white px-16 py-12 shadow-sm lg:px-8">
          <h4 className="flex items-center gap-2 text-lg font-bold">
            <FaCircleQuestion /> Bạn không tìm thấy e-mail?
          </h4>
          <p className="text-grey-500">
            Xin hãy chắc chắn rằng bạn đã kiểm tra các điều sau:
          </p>
          <ul className="flex list-disc flex-col gap-[1px] pl-4 text-sm text-grey-400">
            <li>E-mail có đang được gửi đến đúng địa chỉ e-mail của bạn.</li>
            <li>E-mail không nằm trong thư mục spam/rác.</li>
            <li>
              Không có bộ lọc e-mail nào nhắm đến các e-mail được gửi từ
              @ryxel.com.
            </li>
            <li>
              E-mail được sử dụng là e-mail đã dùng để đăng kí tài khoản Ryxel
              Store.
            </li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="flex flex-col items-center gap-2 text-sm text-grey-300">
        <span className="block">
          Xin hãy điền vào địa chỉ e-mail mà bạn đã dùng để đăng kí, sau đó bấm
          vào nút Tiếp theo.
        </span>
        Một e-mail có chứa liên kết (URL) lấy lại mật khẩu sẽ được gửi đến bạn.
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
          label="Địa chỉ e-mail"
          defaultValue={state?.errors.email}
          error={!!state?.errors.email}
          errorMessage={state?.errors.email}
        />
        <Button role="submit" loading={isPending}>
          Tiếp theo
        </Button>
      </form>
    </>
  );
}

export default FormForgotPassword;

'use client';

import { useActionState } from 'react';
import { signupAction } from '@libs/actions';
import Input from '@components/UI/Input';
import Button from '@components/UI/Button';
import { FaCircleInfo, FaCircleExclamation } from 'react-icons/fa6';
import Link from 'next/link';
import { FormError } from '@/app/_types/formError';
import { SignupInput } from '@/app/_types/validateInput';
import Spinner from '../UI/Spinner';

function FormSignup() {
  const [state, action, isPending] = useActionState(signupAction, {
    success: false,
    inputData: {} as SignupInput,
    errors: {} as FormError,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (state?.errors?.[name]) {
      state.errors[name] = '';
    }

    if (state?.inputData)
      state.inputData = { ...state.inputData, [name]: value };
  };

  return (
    <div className="w-full max-w-xl gap-2 rounded-lg bg-white px-16 lg:px-8 py-8 shadow-sm">
      <h3 className="mb-8 text-center text-primary-500">
        Chỉ một tài khoản cho mọi dịch vụ của Ryxel Store
      </h3>
      <form className="flex w-full flex-col items-center gap-6" action={action}>
        {state?.errors?.message && (
          <p className="text-sm text-red-500">{state?.errors?.message}</p>
        )}

        <div className="w-full">
          {state?.errors?.name && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.name}
            </p>
          )}
          <Input
            id="name"
            type="text"
            name="name"
            label="Tên tài khoản"
            error={!!state?.errors?.name}
            defaultValue={state?.inputData?.name || ''}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            Thông tin này sẽ được thấy bởi mọi người
          </p>
        </div>

        <div className="w-full">
          {state?.errors?.dob && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.dob}
            </p>
          )}
          <Input
            id="dob"
            type="date"
            name="dob"
            label="Ngày sinh"
            error={!!state?.errors?.dob}
            defaultValue={state?.inputData?.dob || ''}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            Lưu ý: Bạn sẽ không thể thay đổi ngày sinh sau này
          </p>
        </div>

        <div className="w-full">
          {state?.errors?.gender && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.gender}
            </p>
          )}
          <Input
            id="gender"
            type="select"
            name="gender"
            label="Giới tính"
            options={[
              { label: 'Nam', value: 'male' },
              { label: 'Nữ', value: 'female' },
              { label: 'Khác', value: 'other' },
            ]}
            error={!!state?.errors?.gender}
            onChange={handleInputChange}
          />
        </div>

        <hr className="my-1 w-full border-t border-grey-100" />

        <div className="w-full">
          {state?.errors?.email && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.email}
            </p>
          )}
          <Input
            name="email"
            id="email"
            label="Địa chỉ email"
            type="email"
            error={!!state?.errors?.email}
            defaultValue={state?.inputData?.email || ''}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            Đây sẽ là tài khoản Ryxel Store của bạn
          </p>
        </div>

        <div className="w-full">
          {state?.errors?.password && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.password}
            </p>
          )}
          <Input
            id="password"
            type="password"
            name="password"
            label="Mật khẩu"
            error={!!state?.errors?.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full">
          {state?.errors?.passwordConfirm && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.passwordConfirm}
            </p>
          )}
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            label="Xác nhận mật khẩu"
            error={!!state?.errors?.passwordConfirm}
            onChange={handleInputChange}
          />
        </div>

        <hr className="my-1 w-full border-t border-grey-100" />

        <div className="w-full">
          {state?.errors?.terms && (
            <p className="flex items-center gap-2 p-2 text-xs text-red-500">
              <FaCircleExclamation />
              {state?.errors?.terms}
            </p>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="h-5 w-5 rounded-md border border-grey-300 focus:ring-primary-500 focus:ring-1 focus:ring-offset-primary-500 checked:bg-primary-500 mr-2"
            />
            <p className="text-sm text-grey-300">
              Khi bạn chọn vào ô này đồng nghĩa rằng bạn đồng ý với{' '}
              <Link
                href="/terms-of-service"
                className="gap-2 font-normal text-primary-400 transition-colors duration-300 hover:text-grey-300"
              >
                Quy chế hoạt động
              </Link>{' '}
              và{' '}
              <Link
                href="/privacy-policy"
                className="gap-2 font-normal text-primary-400 transition-colors duration-300 hover:text-grey-300"
                target="_blank"
              >
                Chính sách bảo mật
              </Link>{' '}
              của chúng tôi.
            </p>
          </div>
        </div>

        <hr className="my-1 w-full border-t border-grey-100" />

        <Button type="primary" disabled={isPending} role="submit">
          {isPending ? <Spinner /> : 'Đăng ký'}
        </Button>
      </form>
    </div>
  );
}

export default FormSignup;

'use client';

import { useActionState } from 'react';
import { signupAction } from '@libs/actions';
import Input from '@components/Input';
import Button from '@components/Button';
import { FaCircleInfo, FaCircleExclamation } from 'react-icons/fa6';
import Link from 'next/link';

function FormSignup() {
  const [state, action, isPending] = useActionState(signupAction, {
    inputData: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (state?.errors?.[name]) {
      state.errors[name] = undefined;
    }
    state.inputData = { ...state.inputData, [name]: value };
  };

  return (
    <div className="w-full max-w-xl gap-2 rounded-lg bg-white px-16 py-8 shadow-sm">
      <h3 className="mb-8 text-center text-primary-500">
        One account for all Ryxel Store services
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
            label="Enter your username"
            error={state?.errors?.name}
            defaultValue={state?.inputData?.name || ''}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            This will be shown to others on Ryxel Store
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
            label="Birthday"
            error={state?.errors?.dob}
            defaultValue={state?.inputData?.dob || ''}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            You can't change your birthday later
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
            label="Gender"
            options={['male', 'female', 'other']}
            error={state?.errors?.gender}
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
            label="E-mail address"
            type="email"
            error={state?.errors?.email}
            defaultValue={state?.inputData?.email || ''}
            onChange={handleInputChange}
          />
          <p className="flex items-center gap-2 p-2 text-xs text-grey-300">
            <FaCircleInfo />
            This will be your new Ryxel Store account
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
            label="Password"
            error={state?.errors?.password}
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
            label="Confirm password"
            error={state?.errors?.passwordConfirm}
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
              className="h-6 w-6"
            />
            <p className="text-sm text-grey-300">
              By checking the box and clicking on the "Submit" button below, you
              agree to the Ryxel Store{' '}
              <Link
                href="/terms"
                className="gap-2 font-normal text-primary-400 transition-colors duration-300 hover:text-grey-300"
              >
                Terms of Service
              </Link>
              and{' '}
              <Link
                href="/privacy"
                className="gap-2 font-normal text-primary-400 transition-colors duration-300 hover:text-grey-300"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <hr className="my-1 w-full border-t border-grey-100" />

        <Button type="primary" disable={isPending} role="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default FormSignup;

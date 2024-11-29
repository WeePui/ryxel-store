'use client';

import { useActionState } from 'react';
import Spinner from '@components/Spinner';
import { forgotPasswordAction } from '@libs/actions';
import {
  FaCircleExclamation,
  FaCircleQuestion,
  FaRegCircleXmark,
} from 'react-icons/fa6';
import Input from '@components/Input';
import Button from '@components/Button';

function FormForgotPassword() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, {
    email: '',
    success: false,
  });

  if (isPending) return <Spinner />;

  if (state.success) {
    return (
      <>
        <p className="flex flex-col items-center gap-2 text-sm text-grey-300">
          <span className="block">
            An e-mail has been sent to the e-mail address you used to sign up.
          </span>
          There is an URL included in the email, clicked on that URL to reset
          your password.
        </p>
        <div className="flex w-full max-w-xl flex-col gap-2 rounded-lg bg-white px-16 py-12 shadow-sm">
          <h4 className="flex items-center gap-2 text-lg font-bold">
            <FaCircleQuestion /> Couldn't see the e-mail?
          </h4>
          <p className="text-grey-500">
            Please check the following things and try again:
          </p>
          <ul className="flex list-disc flex-col gap-[1px] pl-4 text-sm text-grey-400">
            <li>The e-mail is being sent to the correct e-mail address.</li>
            <li>The e-mail is not being sent to a spam/junk e-mail folder.</li>
            <li>
              There are no e-mail account filters that may be blocking e-mails
              from @ryxel.com.
            </li>
            <li>
              Make sure the e-mail account is the one registered to your Ryxel
              Account.
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
          Please enter the e-mail address registered to your account, and then
          select Submit.
        </span>
        An e-mail will be sent to that address containing a link to reset your
        password.
      </p>
      <form
        action={action}
        className="flex w-full max-w-xl flex-col items-center gap-8 rounded-lg bg-white px-16 py-12 shadow-sm"
      >
        {state.errors?.message && (
          <p className="flex items-center gap-2 p-2 text-sm text-red-500">
            <FaCircleExclamation />
            {state.errors.message}
          </p>
        )}
        <Input
          name="email"
          type="email"
          label="E-mail address"
          defaultValue={state?.email || ''}
          error={state?.errors}
        />
        <Button type="primary" role="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default FormForgotPassword;

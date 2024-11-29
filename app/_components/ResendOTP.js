'use client';

import { useEffect, useActionState, useState } from 'react';
import { sendOTPAction } from '@libs/actions';

function ResendOTP({ maxAttempts = 3, delay = 60 }) {
  const [state, action, isPending] = useActionState(sendOTPAction, {
    counter: 0,
  });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;

    if (state.counter > 0) {
      setTimer(delay);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.counter]);

  return (
    <form className="flex flex-col items-center" action={action}>
      <button
        type="submit"
        disabled={timer > 0 || isPending}
        className={`text-sm font-medium ${
          timer > 0
            ? 'cursor-not-allowed text-gray-400'
            : 'text-primary-500 hover:text-primary-700'
        }`}
      >
        {timer > 0
          ? `Resend OTP in ${timer}s`
          : isPending
            ? 'Sending...'
            : 'Resend OTP'}
      </button>
      {state.errors && (
        <p className="mt-2 text-sm text-red-500">{state.errors.message}</p>
      )}
      <input type="hidden" name="counter" value={state.counter + 1} />
    </form>
  );
}

export default ResendOTP;

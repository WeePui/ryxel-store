"use client";

import { useEffect, useActionState, useState } from "react";
import { sendOTPAction } from "@libs/actions";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface ResendOTPProps {
  maxAttempts?: number;
  delay?: number;
}

function ResendOTP({ delay = 60 }: ResendOTPProps) {
  const { t } = useLanguage();
  const [state, action, isPending] = useActionState(sendOTPAction, {
    counter: 0,
  });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.counter > 0) {
      setTimer(delay);
      interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else {
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [state.counter, delay]);

  return (
    <form className="flex flex-col items-center" action={action}>
      <button
        type="submit"
        disabled={timer > 0 || isPending}
        className={`text-sm font-medium ${
          timer > 0
            ? "cursor-not-allowed text-gray-400"
            : "text-primary-500 hover:text-primary-700"
        }`}
      >
        {timer > 0
          ? `${t("auth.verifyEmail.resendIn")} ${timer} ${t("auth.verifyEmail.seconds")}`
          : isPending
            ? t("auth.verifyEmail.sending")
            : t("auth.verifyEmail.resendOTP")}
      </button>
      {state.errors && (
        <p className="mt-2 text-sm text-red-500">{state.errors.message}</p>
      )}
      <input type="hidden" name="counter" value={state.counter + 1} />
    </form>
  );
}

export default ResendOTP;

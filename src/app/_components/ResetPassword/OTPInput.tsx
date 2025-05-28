"use client";

import { useRef, useState, useActionState } from "react";
import Loader from "@/app/_components/UI/Loader";
import Button from "@/app/_components/UI/Button";
import { verifyOTPAction } from "@libs/actions";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function OTPInput() {
  const { t } = useLanguage();
  const [state, action, isPending] = useActionState(verifyOTPAction, undefined);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef<HTMLInputElement[]>([]);

  if (isPending) return <Loader />;

  if (state?.errors?.message) alert(state?.errors?.message);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pasteData.forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    inputs.current[pasteData.length - 1].focus();
  };

  return (
    <form action={action} className="flex flex-col items-center gap-8">
      <div className="flex gap-2" onPaste={handlePaste}>
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              if (el) inputs.current[index] = el;
            }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-grey-300 bg-transparent text-center font-bold text-primary-default focus:border-primary-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500"
          />
        ))}
        <input type="hidden" name="otp" value={otp.join("")} />
      </div>
      <Button role="submit">{t("auth.verifyEmail.confirmButton")}</Button>
    </form>
  );
}

export default OTPInput;

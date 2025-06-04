"use client";

import { useActionState, ReactNode, useRef } from "react";
import { logoutAction } from "@libs/actions";
import Spinner from "@components/UI/Spinner";

function SignoutButton({ children }: { children: ReactNode }) {
  const [, action, isPending] = useActionState(logoutAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    // Get FCM token from localStorage and add to form data
    if (typeof window !== "undefined") {
      const fcmToken = localStorage.getItem("fcmToken");
      if (fcmToken) {
        formData.set("fcmToken", fcmToken);
      }
    }

    return action(formData);
  };

  if (isPending) return <Spinner />;

  return (
    <form ref={formRef} action={handleSubmit}>
      {children}
    </form>
  );
}

export default SignoutButton;

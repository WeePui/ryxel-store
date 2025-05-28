"use client";

import Image from "next/image";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import NavLink from "../UI/NavLink";
import RevalidationForm from "./RevalidationForm";

interface ReauthenticateWrapperProps {
  user: {
    name: string;
    photo: {
      url: string;
    };
  };
}

function ReauthenticateWrapper({ user }: ReauthenticateWrapperProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10 xl:px-6">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        {t("auth.reauthenticate.title")}
      </h2>
      <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10">
        <div className="flex w-full max-w-2xl flex-col items-center gap-2 rounded-lg bg-white px-16 py-8 shadow-sm sm:px-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <Image
              src={user.photo.url}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="mb-8 text-center text-xl font-extrabold text-primary-500">
            {user?.name}
          </h3>
          <RevalidationForm />
        </div>
      </div>
      <NavLink href="/forgot-password">{t("auth.forgotPassword.link")}</NavLink>
    </div>
  );
}

export default ReauthenticateWrapper;

"use client";

import { useLanguage } from "@/app/_contexts/LanguageContext";

interface AccountPageProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
  titleAction?: React.ReactNode;
  error?: Error;
}

function AccountPage({
  children,
  title = "Just a title",
  description,
  titleKey,
  descriptionKey,
  titleAction,
  error,
}: AccountPageProps) {
  const { t } = useLanguage();

  const displayTitle = titleKey ? t(titleKey) : title;
  const displayDescription = descriptionKey ? t(descriptionKey) : description;
  return (
    <div className="flex h-full flex-col bg-white px-8 py-6">
      <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
        <div>
          <h1 className="text-xl font-bold">{displayTitle}</h1>
          <p className="text-sm text-grey-400">{displayDescription}</p>
        </div>
        {titleAction}
      </div>
      <hr className="border-t-1 my-4 border-grey-100" />
      {error ? <p>{error.message}</p> : children}
    </div>
  );
}

export default AccountPage;

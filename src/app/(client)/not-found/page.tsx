"use client";

import Button from "@/app/_components/UI/Button";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHouse } from "react-icons/fa6";

export default function Page() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Image
        src="/404.svg"
        alt={t("notFound.title")}
        width={400}
        height={400}
        className="mb-8"
      />
      <h1 className="mb-3 text-4xl font-bold text-primary-500">
        {t("notFound.title")}
      </h1>
      <p className="mb-4 text-xl text-primary-400">{t("notFound.subtitle")}</p>
      <p className="mb-8 max-w-md text-gray-600">{t("notFound.description")}</p>
      <Button onClick={() => router.push("/")} size="large" icon={<FaHouse />}>
        {t("notFound.goHome")}
      </Button>
    </div>
  );
}

"use client";

import { User } from "@/app/_types/user";
import Image from "next/image";
import { useState } from "react";
import SideNavList from "./SideNavList";
import { FaChevronDown } from "react-icons/fa6";
import Button from "../UI/Button";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface ClientWrapperProps {
  user: User;
}

export default function ClientWrapper({ user }: ClientWrapperProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 h-fit max-h-[calc(100vh-2rem)] py-10 pl-2 lg:static">
      <div className="lg:flex lg:justify-between">
        <div className="flex items-center gap-6 lg:gap-4">
          <div className="relative aspect-square w-1/4 overflow-hidden rounded-full ring-2 ring-primary-default lg:w-12">
            <Image src={user.photo.url} alt={user.name} fill />
          </div>
          <span className="text-lg font-bold text-grey-300">{user.name}</span>
        </div>{" "}
        <Button
          className="hidden lg:block"
          onClick={() => setIsOpen(!isOpen)}
          size="small"
        >
          <span className="flex items-center gap-2">
            {isOpen
              ? t("account.navigation.hideMenu")
              : t("account.navigation.showMenu")}
            <FaChevronDown
              className={`transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </Button>
      </div>
      <div
        className={`block lg:hidden ${
          isOpen ? "lg:!block" : "lg:!hidden"
        } px-4 lg:px-0`}
      >
        <SideNavList />
      </div>
    </div>
  );
}

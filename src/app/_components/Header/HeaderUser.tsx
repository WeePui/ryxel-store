"use client";

import { User } from "@/app/_types/user";
import NavLink from "../UI/NavLink";
import LoggedUser from "@/app/_components/Header/LoggedUser";
import { FaCircleUser } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface HeaderUserProps {
  user?: User;
}

function HeaderUser({ user }: HeaderUserProps) {
  const { t } = useLanguage();

  if (!user)
    return (
      <NavLink hoverUnderline={false} href="/login">
        <div className="flex items-center gap-2">
          <FaCircleUser className="text-xl" />
          <span className="lg:hidden">{t("header.user.login")}</span>
        </div>
      </NavLink>
    );

  return <>{user && <LoggedUser user={user} />}</>;
}

export default HeaderUser;

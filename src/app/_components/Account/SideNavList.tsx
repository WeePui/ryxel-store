"use client";

import {
  FaAddressCard,
  FaBagShopping,
  FaTruckFast,
  FaLock,
  FaDoorOpen,
  FaHeart,
} from "react-icons/fa6";
import NavLink from "../UI/NavLink";
import SignoutButton from "../UI/SignoutButton";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function SideNavList() {
  const pathName = usePathname();
  const { t } = useLanguage();

  return (
    <ul className="mt-10 flex flex-col gap-4 text-lg text-primary-500 lg:mt-6 lg:gap-2 lg:text-base lg:font-semibold">
      <li>
        <NavLink
          type="sideNav"
          href="/account/profile"
          active={pathName.includes("/profile")}
        >
          <FaAddressCard className="text" />
          {t("account.navigation.profile")}
        </NavLink>
      </li>
      <li>
        <NavLink
          type="sideNav"
          href="/account/orders"
          active={pathName.includes("/orders")}
        >
          <FaBagShopping />
          {t("account.navigation.orders")}
        </NavLink>
      </li>
      <li className="">
        <NavLink
          type="sideNav"
          href="/account/addresses"
          active={pathName.includes("/addresses")}
        >
          <FaTruckFast />
          {t("account.navigation.addresses")}
        </NavLink>
      </li>
      <li>
        <NavLink
          type="sideNav"
          href="/account/updatePassword"
          active={pathName.includes("/updatePassword")}
        >
          <FaLock />
          {t("account.navigation.updatePassword")}
        </NavLink>
      </li>
      <li className="---mt-8">
        <NavLink
          type="sideNav"
          href="/account/wishlist"
          active={pathName.includes("/wishlist")}
        >
          <FaHeart className="text" />
          {t("account.navigation.wishlist")}
        </NavLink>
      </li>
      <li className="---mt-8">
        <SignoutButton>
          <button
            className="group flex items-center gap-8 px-4 py-2 font-normal text-red-500 transition-colors duration-300 hover:text-red-600"
            type="submit"
          >
            <FaDoorOpen />
            {t("account.navigation.logout")}
          </button>
        </SignoutButton>
      </li>
    </ul>
  );
}

export default SideNavList;

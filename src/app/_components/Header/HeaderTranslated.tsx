"use client";

import Logo from "../UI/Logo";
import Navigation from "./HeaderNav";
import SearchBar from "./SearchBar";
import HeaderUser from "./HeaderUser";
import Spinner from "../UI/Spinner";
import { Suspense } from "react";
import HeaderCart from "./HeaderCart";
import MobileMenuTranslated from "./MobileMenuTranslated";
import LanguageSwitcher from "./LanguageSwitcher";
import { Cart } from "@/app/_types/cart";
import { User } from "@/app/_types/user";
// import { useLanguage } from '@/app/_contexts/LanguageContext';

interface HeaderTranslatedProps {
  cart?: Cart;
  user?: User;
}

export default function HeaderTranslated({
  cart,
  user,
}: HeaderTranslatedProps) {
  // const { t } = useLanguage();

  return (
    <header className="relative z-50 h-16 w-full border-b border-primary-700 bg-white px-6 font-title xl:px-6 lg:px-0">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <div className="lg:hidden">
            <Navigation />
          </div>
        </div>
        <div className="flex items-center gap-8 lg:gap-4 lg:pr-4">
          <div className="lg:hidden">
            <SearchBar onHeader={true} />
          </div>
          <Suspense fallback={<Spinner />}>
            <HeaderCart cart={cart} />
          </Suspense>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Suspense fallback={<Spinner />}>
              <HeaderUser user={user} />
            </Suspense>
          </div>
          <MobileMenuTranslated />
        </div>
      </div>
    </header>
  );
}

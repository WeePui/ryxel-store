"use client";

import Logo from "../UI/Logo";
import Navigation from "./HeaderNav";
import SearchBar from "./SearchBar";
import HeaderUser from "./HeaderUser";
import Spinner from "../UI/Spinner";
import { Suspense } from "react";
import HeaderCart from "./HeaderCart";
import LanguageSwitcher from "./LanguageSwitcher";
import NotificationButton from "./NotificationButton";
import { Cart } from "@/app/_types/cart";
import { User } from "@/app/_types/user";
import MobileMenu from "./MobileMenu";
// import { useLanguage } from '@/app/_contexts/LanguageContext';

interface HeaderClientProps {
  cart?: Cart;
  user?: User;
}

export default function HeaderClient({ cart, user }: HeaderClientProps) {
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
          <div className="sm:hidden">
            <LanguageSwitcher />
          </div>
          <Suspense fallback={<Spinner />}>
            <HeaderCart cart={cart} />
          </Suspense>
          {user && (
            <Suspense fallback={<Spinner />}>
              <NotificationButton />
            </Suspense>
          )}
          <div className="flex items-center gap-4">
            <Suspense fallback={<Spinner />}>
              <HeaderUser user={user} />
            </Suspense>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

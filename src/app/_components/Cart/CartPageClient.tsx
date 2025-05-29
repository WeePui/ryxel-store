"use client";

import CartSummary from "@/app/_components/Cart/CartSummary";
import Breadcrumb from "@/app/_components/UI/Breadcrumb";
import NavLink from "@/app/_components/UI/NavLink";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { LineItem } from "@/app/_types/lineItem";
import { FaCartShopping } from "react-icons/fa6";

interface CartPageClientProps {
  items: LineItem[];
  error: string | null;
}

export default function CartPageClient({ items, error }: CartPageClientProps) {
  const { t } = useLanguage();

  const breadcrumbItems = [
    {
      translateKey: "cart.home",
      href: "/",
    },
    {
      translateKey: "cart.shop",
      href: "/products",
    },
    {
      translateKey: "cart.title",
    },
  ];

  return (
    <div className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-[70fr_30fr] gap-10 xl:px-6 lg:mt-4 lg:grid-cols-1">
      <div className="col-span-full">
        <h1 className="font-title text-3xl font-semibold text-primary-500">
          {t("cart.title")}
        </h1>
        <div className="mt-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      {items.length === 0 ? (
        <div className="col-span-full flex flex-col items-center gap-8">
          <FaCartShopping className="text-7xl" />
          <p className="flex flex-col items-center text-xl font-semibold text-grey-400">
            {t("cart.emptyCart.title")}
            <NavLink href="/products">{t("cart.emptyCart.subtitle")}</NavLink>
          </p>
        </div>
      ) : (
        <CartSummary items={items} error={error} />
      )}
    </div>
  );
}

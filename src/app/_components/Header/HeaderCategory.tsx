"use client";

import Image from "next/image";
import NavLink from "../UI/NavLink";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/_contexts/LanguageContext";

export default function HeaderCategory() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
    if (id) {
      router.push(`/products?category=${id}`);
    }
  };

  return (
    <div className="fixed left-0 z-10 mx-auto w-full border-b border-primary-200 bg-grey-50 p-4 shadow-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[60fr_40fr] divide-x divide-primary-200">
        {" "}
        <div className="p-6">
          <h1 className="mb-4 text-xl">{t("navigation.categories.title")}</h1>
          <div className="flex">
            <div className="grid w-fit grid-cols-3 justify-start gap-x-12 gap-y-6">
              <div
                className="group flex w-fit flex-col items-center gap-2"
                id="Mouse"
                role="button"
                onClick={handleClick}
              >
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image
                    src={"/categories/mouse-category.jpg"}
                    alt={t("navigation.categories.gaming.mouse")}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">
                  {t("navigation.categories.gaming.mouse")}
                </p>
              </div>
              <div
                className="group flex w-fit flex-col items-center gap-2"
                id="Keyboard"
                role="button"
                onClick={handleClick}
              >
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image
                    src={"/categories/keyboard-category.jpg"}
                    alt={t("navigation.categories.gaming.keyboard")}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">
                  {t("navigation.categories.gaming.keyboard")}
                </p>
              </div>
              <div
                className="group flex w-fit flex-col items-center gap-2"
                role="button"
                id="Headphone"
                onClick={handleClick}
              >
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image
                    src={"/categories/headset-category.jpg"}
                    alt={t("navigation.categories.gaming.headphone")}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">
                  {t("navigation.categories.gaming.headphone")}
                </p>
              </div>
              <div
                className="group flex w-fit flex-col items-center gap-2"
                role="button"
                id="Table"
                onClick={handleClick}
              >
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image
                    src={"/categories/table-category.jpg"}
                    alt={t("navigation.categories.gaming.table")}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">
                  {t("navigation.categories.gaming.table")}
                </p>
              </div>
              <div
                className="group flex w-fit flex-col items-center gap-2"
                role="button"
                id="Chair"
                onClick={handleClick}
              >
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image
                    src={"/categories/chair-category.jpg"}
                    alt={t("navigation.categories.gaming.chair")}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">
                  {t("navigation.categories.gaming.chair")}
                </p>
              </div>
              <div
                className="group flex w-fit flex-col items-center gap-2"
                role="button"
                id="Accessory"
                onClick={handleClick}
              >
                <div className="relative aspect-square w-32 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image
                    src={"/categories/accessory-category.jpg"}
                    alt={t("navigation.categories.gaming.accessory")}
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">
                  {t("navigation.categories.gaming.accessory")}
                </p>
              </div>
            </div>
            <div className="ml-12 flex w-fit flex-col gap-2">
              <NavLink href="/products?brand=Logitech">
                <span className="text-base">Logitech</span>
              </NavLink>
              <NavLink href="/products?brand=Razer">
                <span className="text-base">Razer</span>
              </NavLink>
              <NavLink href="/products?brand=Steelseries">
                <span className="text-base">SteelSeries</span>
              </NavLink>
              <NavLink href="/products?brand=ASUS">
                <span className="text-base">ASUS</span>
              </NavLink>
              <NavLink href="/products?brand=HyperWork">
                <span className="text-base">HyperWork</span>
              </NavLink>
              <NavLink href="/products?brand=AKKO">
                <span className="text-base">AKKO</span>
              </NavLink>
              <NavLink href="/products?brand=Corsair">
                <span className="text-base">Corsair</span>
              </NavLink>
              <NavLink href="/products?brand=Pulsar">
                <span className="text-base">Pulsar</span>
              </NavLink>
              <NavLink href="/products?brand=HyperX">
                <span className="text-base">HyperX</span>
              </NavLink>
            </div>
          </div>
        </div>{" "}
        <div className="p-6 pl-12">
          <h1 className="text-xl">{t("navigation.reference.title")}</h1>
          <div className="mt-4 flex flex-col gap-2">
            <NavLink href="/products?sort=-sold" type="mainNavInline">
              <span className="text-base">
                {t("navigation.reference.bestSellers")}
              </span>
            </NavLink>
            <NavLink
              href={`/products?specs=%7B"sound"%3A"Apple+Spacial+Sound"%7D`}
              type="mainNavInline"
            >
              {" "}
              <span className="text-base">
                {t("navigation.reference.spatialAudio")}
              </span>
            </NavLink>
            <NavLink
              href={`/products?specs=%7B"material"%3A"Steel%2FFabric"%7D`}
              type="mainNavInline"
            >
              <span className="text-base">
                {t("navigation.reference.durability")}
              </span>
            </NavLink>
            <NavLink href="/products?brand=Sennheiser" type="mainNavInline">
              <span className="text-base">
                {t("navigation.reference.sennheiserPartner")}
              </span>
            </NavLink>
            <NavLink
              href={`/products?specs=%7B"connection"%3A"Wireless"%7D`}
              type="mainNavInline"
            >
              <span className="text-base">
                {t("navigation.reference.wireless")}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

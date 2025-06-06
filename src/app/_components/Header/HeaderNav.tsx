"use client";

import NavLink from "@/app/_components/UI/NavLink";
import { useEffect, useRef, useState } from "react";
import HeaderCategory from "./HeaderCategory";
import { useLanguage } from "@/app/_contexts/LanguageContext";

function HeaderNav({
  isMobile,
  onNavigate,
}: {
  isMobile?: boolean;
  onNavigate?: () => void;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const { t } = useLanguage();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    const handleScroll = () => {
      setIsModalVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
    setIsModalVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsModalVisible(false);
    }, 200);
  };

  return (
    <nav className="z-10 text-lg">
      <ul className="flex gap-8 text-primary-500 xl:gap-5 lg:flex-col">
        <li onClick={onNavigate}>
          <NavLink href="/products" onClick={onNavigate}>
            {t("header.shop")}
          </NavLink>
        </li>
        {!isMobile && !isTouchDevice && (
          <li className="xl:hidden">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink href="#">{t("header.categories")}</NavLink>
              {isModalVisible && (
                <div className="absolute left-0 top-full z-50 w-screen">
                  <HeaderCategory />
                </div>
              )}
            </div>
          </li>
        )}
        {isMobile && (
          <li className="flex flex-col">
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="flex items-center justify-between py-2"
            >
              <span>{t("header.categories")}</span>
              <span className="text-lg">{openCategory ? "−" : "+"}</span>
            </button>

            {openCategory && (
              <div className="flex flex-col gap-4 pl-4">
                {/* Product Categories */}
                <div>
                  <h3 className="mb-2 font-semibold text-primary-700">
                    {t("header.shop")}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <NavLink
                      href="/products?category=Chuột"
                      onClick={onNavigate}
                    >
                      {t("navigation.categories.gaming.mouse")}
                    </NavLink>
                    <NavLink
                      href="/products?category=Bàn+phím"
                      onClick={onNavigate}
                    >
                      {t("navigation.categories.gaming.keyboard")}
                    </NavLink>
                    <NavLink
                      href="/products?category=Tai+nghe"
                      onClick={onNavigate}
                    >
                      {t("navigation.categories.gaming.headphone")}
                    </NavLink>
                    <NavLink href="/products?category=Bàn" onClick={onNavigate}>
                      {t("navigation.categories.gaming.table")}
                    </NavLink>
                    <NavLink href="/products?category=Ghế" onClick={onNavigate}>
                      {t("navigation.categories.gaming.chair")}
                    </NavLink>
                    <NavLink
                      href="/products?category=Phụ+kiện"
                      onClick={onNavigate}
                    >
                      {t("navigation.categories.gaming.accessory")}
                    </NavLink>
                  </div>
                </div>
                {/* Brands */}
                <div>
                  <h3 className="mb-2 font-semibold text-primary-700">
                    {t("navigation.brands.title")}
                  </h3>{" "}
                  <div className="flex flex-col gap-2">
                    <NavLink
                      href="/products?brand=Logitech"
                      onClick={onNavigate}
                    >
                      Logitech
                    </NavLink>
                    <NavLink href="/products?brand=Razer" onClick={onNavigate}>
                      Razer
                    </NavLink>
                    <NavLink
                      href="/products?brand=Steelseries"
                      onClick={onNavigate}
                    >
                      SteelSeries
                    </NavLink>
                    <NavLink href="/products?brand=ASUS" onClick={onNavigate}>
                      ASUS
                    </NavLink>
                    <NavLink
                      href="/products?brand=HyperWork"
                      onClick={onNavigate}
                    >
                      HyperWork
                    </NavLink>
                    <NavLink href="/products?brand=AKKO" onClick={onNavigate}>
                      AKKO
                    </NavLink>
                    <NavLink
                      href="/products?brand=Corsair"
                      onClick={onNavigate}
                    >
                      Corsair
                    </NavLink>
                    <NavLink href="/products?brand=Pulsar" onClick={onNavigate}>
                      Pulsar
                    </NavLink>
                    <NavLink href="/products?brand=HyperX" onClick={onNavigate}>
                      HyperX
                    </NavLink>
                  </div>
                </div>
                {/* References */}
                <div>
                  <h3 className="mb-2 font-semibold text-primary-700">
                    {t("navigation.reference.title")}
                  </h3>{" "}
                  <div className="flex flex-col gap-2">
                    <NavLink href="/products?sort=-sold" onClick={onNavigate}>
                      {t("navigation.reference.bestSellers")}
                    </NavLink>
                    <NavLink
                      href="/products?specs=%7B%22sound%22%3A%22Apple+Spacial+Sound%22%7D"
                      onClick={onNavigate}
                    >
                      {t("navigation.reference.spatialAudio")}
                    </NavLink>
                    <NavLink
                      href="/products?specs=%7B%22material%22%3A%22Steel%2FFabric%22%7D"
                      onClick={onNavigate}
                    >
                      {t("navigation.reference.durability")}
                    </NavLink>
                    <NavLink
                      href="/products?brand=Sennheiser"
                      onClick={onNavigate}
                    >
                      {t("navigation.reference.sennheiserPartner")}
                    </NavLink>
                    <NavLink
                      href="/products?specs=%7B%22connection%22%3A%22Wireless%22%7D"
                      onClick={onNavigate}
                    >
                      {t("navigation.reference.wireless")}
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </li>
        )}
        <li onClick={onNavigate}>
          <NavLink href="/contact">{t("header.contact")}</NavLink>
        </li>
        <li onClick={onNavigate}>
          <NavLink href="/blogs">{t("header.blogs")}</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;

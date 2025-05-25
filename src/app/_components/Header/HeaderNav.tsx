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
                  <div className="flex flex-col gap-2" onClick={onNavigate}>
                    <NavLink href="/products?category=chuot">
                      Chuột Gaming
                    </NavLink>
                    <NavLink href="/products?category=ban-phim">
                      Bàn phím
                    </NavLink>
                    <NavLink href="/products?category=tai-nghe">
                      Tai nghe
                    </NavLink>
                    <NavLink href="/products?category=ban">Bàn Gaming</NavLink>
                    <NavLink href="/products?category=ghe">Ghế Gaming</NavLink>
                    <NavLink href="/products?category=phu-kien">
                      Phụ kiện
                    </NavLink>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="mb-2 font-semibold text-primary-700">
                    Thương hiệu
                  </h3>
                  <div className="flex flex-col gap-2">
                    <NavLink href="/products?brand=logitech">Logitech</NavLink>
                    <NavLink href="/products?brand=razer">Razer</NavLink>
                    <NavLink href="/products?brand=Steelseries">
                      SteelSeries
                    </NavLink>
                    <NavLink href="/products?brand=ASUS">ASUS</NavLink>
                    <NavLink href="/products?brand=HyperWork">
                      HyperWork
                    </NavLink>
                    <NavLink href="/products?brand=AKKO">AKKO</NavLink>
                    <NavLink href="/products?brand=Corsair">Corsair</NavLink>
                    <NavLink href="/products?brand=Pulsar">Pulsar</NavLink>
                    <NavLink href="/products?brand=HyperX">HyperX</NavLink>
                  </div>
                </div>

                {/* References */}
                <div>
                  <h3 className="mb-2 font-semibold text-primary-700">
                    Tham khảo
                  </h3>
                  <div className="flex flex-col gap-2" onClick={onNavigate}>
                    <NavLink href="/products?sort=-sold">
                      Sản phẩm bán chạy
                    </NavLink>
                    <NavLink href="/products?specs=%7B%22sound%22%3A%22Apple+Spacial+Sound%22%7D">
                      Apple Spacial Sound
                    </NavLink>
                    <NavLink href="/products?specs=%7B%22material%22%3A%22Steel%2FFabric%22%7D">
                      Bền bỉ tuyệt đối
                    </NavLink>
                    <NavLink href="/products?brand=Sennheiser">
                      Sennheiser Chính hãng
                    </NavLink>
                    <NavLink href="/products?specs=%7B%22connection%22%3A%22Wireless%22%7D">
                      Không dây
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
        </li>{" "}
        <li onClick={onNavigate}>
          <NavLink href="/about-us">{t("header.aboutUs")}</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;

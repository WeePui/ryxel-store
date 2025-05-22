"use client";

import NavLink from "@/app/_components/UI/NavLink";
import { useEffect, useRef, useState } from "react";
import HeaderCategory from "./HeaderCategory";

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
      <ul className="flex lg:flex-col gap-8 xl:gap-5 text-primary-500">
        <li onClick={onNavigate}>
          <NavLink href="/products" onClick={onNavigate}>
            Cửa hàng
          </NavLink>
        </li>
        {!isMobile && !isTouchDevice && (
          <li className="xl:hidden">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink href="#">Danh mục</NavLink>
              {isModalVisible && (
                <div className="absolute left-0 top-full w-screen z-50">
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
              className="flex justify-between items-center py-2"
            >
              <span>Danh mục</span>
              <span className="text-lg">{openCategory ? "−" : "+"}</span>
            </button>

            {openCategory && (
              <div className="pl-4 flex flex-col gap-4">
                {/* Product Categories */}
                <div>
                  <h3 className="font-semibold mb-2 text-primary-700">
                    Sản phẩm
                  </h3>
                  <div className="flex flex-col gap-2" onClick={onNavigate}>
                    <NavLink href="/products?category=Mouse">
                      Chuột Gaming
                    </NavLink>
                    <NavLink href="/products?category=Keyboard">
                      Bàn phím
                    </NavLink>
                    <NavLink href="/products?category=Headset">
                      Tai nghe
                    </NavLink>
                    <NavLink href="/products?category=Table">
                      Bàn Gaming
                    </NavLink>
                    <NavLink href="/products?category=Chair">
                      Ghế Gaming
                    </NavLink>
                    <NavLink href="/products?category=Accessory">
                      Phụ kiện
                    </NavLink>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-semibold mb-2 text-primary-700">
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
                  <h3 className="font-semibold mb-2 text-primary-700">
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
          <NavLink href="/contact">Liên hệ</NavLink>
        </li>
        <li onClick={onNavigate}>
          <NavLink href="/blogs">Blog</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;

"use client";

import { FaCartShopping } from "react-icons/fa6";
import NavLink from "../UI/NavLink";
import { useEffect, useRef, useState } from "react";
import HeaderCartModal from "./HeaderCartModal";
import { Cart } from "@/app/_types/cart";

interface LoggedCartProps {
  cart: Cart;
}

function LoggedCart({ cart }: LoggedCartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;

    clearTimeout(timeoutRef.current!);
    setIsModalVisible(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;

    timeoutRef.current = setTimeout(() => {
      setIsModalVisible(false);
    }, 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink hoverUnderline={false} href="/cart">
        <div className="relative">
          <FaCartShopping className="text-xl" />
          {cart.lineItems && cart.lineItems.length > 0 && (
            <span className="absolute -right-3 -top-3 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cart.lineItems.length > 99 ? "99+" : cart.lineItems.length}
            </span>
          )}
        </div>
      </NavLink>
      {!isTouchDevice && isModalVisible && <HeaderCartModal cart={cart} />}
    </div>
  );
}

export default LoggedCart;

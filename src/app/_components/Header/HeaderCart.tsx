"use client";

import { FaCartShopping } from "react-icons/fa6";
import NavLink from "../UI/NavLink";
import LoggedCart from "./LoggedCart";
import { Cart } from "@/app/_types/cart";

interface HeaderCartProps {
  cart?: Cart;
}

function HeaderCart({ cart }: HeaderCartProps) {
  if (!cart || !cart.lineItems) {
    return (
      <NavLink href="/cart" hoverUnderline={false}>
        <div className="relative">
          <FaCartShopping className="text-xl" />
          <span className="absolute -right-3 -top-3 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">
            0
          </span>
        </div>
      </NavLink>
    );
  }

  return <>{cart.lineItems && <LoggedCart cart={cart} />}</>;
}

export default HeaderCart;

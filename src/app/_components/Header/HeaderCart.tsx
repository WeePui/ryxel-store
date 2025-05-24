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
        <FaCartShopping className="text-xl" />
      </NavLink>
    );
  }

  return <>{cart.lineItems && <LoggedCart cart={cart} />}</>;
}

export default HeaderCart;

import { cookies } from "next/headers";
import { getCart, getProfile } from "@/app/_libs/apiServices";
import HeaderClient from "./HeaderClient";

async function Header() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    return <HeaderClient />;
  }

  const { data: cart } = await getCart({ value: token.value });
  const { data: user } = await getProfile({ value: token.value });

  return <HeaderClient cart={cart} user={user.user} />;
}

export default Header;

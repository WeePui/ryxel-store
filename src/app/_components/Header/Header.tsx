import { cookies } from "next/headers";
import HeaderTranslated from "./HeaderTranslated";
import { getCart, getProfile } from "@/app/_libs/apiServices";

async function Header() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    return <HeaderTranslated />;
  }

  const { data: cart } = await getCart({ value: token.value });
  const { data: user } = await getProfile({ value: token.value });

  return <HeaderTranslated cart={cart} user={user.user} />;
}

export default Header;

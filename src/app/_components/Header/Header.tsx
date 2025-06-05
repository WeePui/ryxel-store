import { cookies } from "next/headers";
import { getCart, getProfile } from "@/app/_libs/apiServices";
import HeaderClient from "./HeaderClient";

async function Header() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    return <HeaderClient />;
  }

  try {
    const [cartResponse, userResponse] = await Promise.all([
      getCart({ value: token.value }),
      getProfile({ value: token.value })
    ]);

    // Handle cart response
    let cart = null;
    if (cartResponse.status === "success" && cartResponse.data) {
      cart = cartResponse.data.cart;
    }

    // Handle user response  
    let user = null;
    if (userResponse.status === "success" && userResponse.data) {
      user = userResponse.data.user;
    }

    // If both failed due to authentication, render without user data
    if (cartResponse.status === "error" && userResponse.status === "error" &&
        (cartResponse.statusCode === 401 || userResponse.statusCode === 401)) {
      console.warn("Authentication failed, rendering header without user data");
      return <HeaderClient />;
    }

    return <HeaderClient cart={cart} user={user} />;
  } catch (error) {
    console.error("Error in Header component:", error);
    // Fallback to rendering header without user data
    return <HeaderClient />;
  }
}

export default Header;

import { cookies } from "next/headers";
import { checkToken, getCart } from "../../_libs/apiServices";
import { Metadata } from "next";
import CartPageClient from "../../_components/Cart/CartPageClient";

export const metadata: Metadata = {
  title: "Cart Page",
  description: "This is the cart page",
};

interface PageProps {
  searchParams: Promise<{
    error: string | null;
  }>;
}

async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error || null;
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");
  let items = [];

  if (token) {
    const { valid } = await checkToken(token);
    if (valid) {
      const response = await getCart(token);

      if (response.data && response.data.cart) {
        const { data } = response;
        const { cart } = data;
        items = cart.lineItems;
      }
    }
  }

  return <CartPageClient items={items} error={error} />;
}

export default Page;

import { Suspense } from "react";
import { Metadata } from "next";
import Loader from "../../_components/UI/Loader";

export const metadata: Metadata = {
  title: "Products Page",
  description: "This is the products page",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const filter = await searchParams;
  // const { search, sort, rating, brand, category } = await searchParams;
  // const key = `${search ? search : 'default'}-${sort ? sort : 'default'}-${
  //   rating ? rating : 'default'
  // }-${brand ? brand : 'default'}-${category ? category : 'default'}`;
  // const cacheKey = `products-${key}`;

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      }
      // key={cacheKey}
    >
      {children}
    </Suspense>
  );
}

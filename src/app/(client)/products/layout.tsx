import { Suspense } from 'react';
import { Metadata } from 'next';
import Loader from '../../_components/UI/Loader';

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'This is the products page',
};

async function Layout({
  searchParams,
  children,
}: {
  searchParams: Promise<{ [key: string]: string }>;
  children: React.ReactNode;
}) {
  const filter = await searchParams;
  console.log(filter);
  // const { search, sort, rating, brand, category } = await searchParams;
  // const key = `${search ? search : 'default'}-${sort ? sort : 'default'}-${
  //   rating ? rating : 'default'
  // }-${brand ? brand : 'default'}-${category ? category : 'default'}`;
  // const cacheKey = `products-${key}`;

  return (
    <Suspense
      fallback={<Loader />}
      // key={cacheKey}
    >
      {children}
    </Suspense>
  );
}

export default Layout;

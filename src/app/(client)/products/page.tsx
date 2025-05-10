import { Suspense } from 'react';
import ProductsPage from '../../_components/Products/ProductsPage';
import Loader from '../../_components/UI/Loader';

export const revalidate = 1800;

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

async function Page({ searchParams }: Props) {
  const searchParamsData = await searchParams;
  const key = JSON.stringify(searchParamsData);
  const cacheKey = `products-${key}`;

  return (
    <Suspense
      fallback={
        <div className="flex items-center mx-auto h-screen">
          <Loader />
        </div>
      }
      key={cacheKey}
    >
      <ProductsPage searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;

import Spinner from '@/app/_components/UI/Spinner';
import { getProductById } from '@libs/apiServices';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const { product } = await getProductById(productId);
  return {
    title: product.name,
    description: `${product.name} details page`,
  };
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </div>
  );
}

export default Layout;

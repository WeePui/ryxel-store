import Spinner from '@/app/_components/UI/Spinner';
import { getProductBySlug } from '@libs/apiServices';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getProductBySlug(slug);
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

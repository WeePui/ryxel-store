import Spinner from '@components/Spinner';
import { getProductById } from '@libs/apiServices';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { product } = await getProductById(productId);
  return {
    title: product.name,
    description: `${product.name} details page`,
  };
}

function Layout({ children }) {
  return (
    <div>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </div>
  );
}

export default Layout;

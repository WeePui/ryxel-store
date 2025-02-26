import OverviewSection from '@components/ProductDetails/OverviewSection';
import ProductDescription from '@/app/_components/ProductDetails/ProductDescription';
import { ProductDetailProvider } from '@/app/_contexts/ProductDetailContext';

import { getProductById } from '@/app/_libs/apiServices';

async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { product } = await getProductById(productId);

  return (
    <ProductDetailProvider product={product}>
      <OverviewSection />
      <ProductDescription />
    </ProductDetailProvider>
  );
}

export default ProductDetails;

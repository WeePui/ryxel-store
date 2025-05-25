import { ProductDetailProvider } from "@/app/_contexts/ProductDetailContext";

import {
  getProductBySlug,
  getRecommendedProducts,
  getSimilarProducts,
} from "@/app/_libs/apiServices";
import { Variant } from "@/app/_types/variant";
import ProductDetailsPage from "@/app/_components/ProductDetails/ProductDetailsPage";

async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { product } = await getProductBySlug(slug);

  const reviews = [...product.reviews].map((review) => {
    const variant = product.variants.find(
      (variant: Variant) => variant._id === review.variant,
    );

    return {
      ...review,
      variant: variant?.name,
    };
  });

  const { products: recommendedProducts } = await getRecommendedProducts(
    product._id,
  );
  const { products: similarProducts } = await getSimilarProducts(product._id);

  return (
    <ProductDetailProvider product={product}>
      <ProductDetailsPage
        recommendedProducts={recommendedProducts}
        similarProducts={similarProducts}
        reviews={reviews}
      />
    </ProductDetailProvider>
  );
}

export default ProductDetails;

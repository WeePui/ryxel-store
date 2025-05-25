import OverviewSection from "@components/ProductDetails/OverviewSection";
import ProductDescription from "@/app/_components/ProductDetails/ProductDescription";
import { ProductDetailProvider } from "@/app/_contexts/ProductDetailContext";

import {
  getProductBySlug,
  getRecommendedProducts,
  getSimilarProducts,
} from "@/app/_libs/apiServices";
import ProductReviewsSection from "@/app/_components/ProductDetails/ProductReviewsSection";
import { Variant } from "@/app/_types/variant";
import RecommendedProducts from "@/app/_components/ProductDetails/RecommendedProducts";

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
      <OverviewSection />
      <ProductDescription />
      <RecommendedProducts
        products={recommendedProducts}
        title="products.boughtTogether"
      />
      <ProductReviewsSection reviews={reviews} />
      <RecommendedProducts
        products={similarProducts}
        title="products.similarProducts"
      />
    </ProductDetailProvider>
  );
}

export default ProductDetails;

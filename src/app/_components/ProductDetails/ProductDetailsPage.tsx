"use client";

import { motion } from "framer-motion";
import OverviewSection from "./OverviewSection";
import ProductDescription from "./ProductDescription";
import { Product } from "@/app/_types/product";
import RecommendedProducts from "./RecommendedProducts";
import { Review } from "@/app/_types/review";
import ProductReviewsSection from "./ProductReviewsSection";

interface ProductDetailsPageProps {
  recommendedProducts: Product[];
  similarProducts: Product[];
  reviews: Review[];
}

export default function ProductDetailsPage({
  recommendedProducts,
  similarProducts,
  reviews,
}: ProductDetailsPageProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
      className="w-full"
    >
      <motion.div
        variants={{
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <OverviewSection />
      </motion.div>

      <motion.div
        variants={{
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <ProductDescription />
      </motion.div>

      <motion.div
        variants={{
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <RecommendedProducts
          products={recommendedProducts}
          title="products.boughtTogether"
        />
      </motion.div>

      <motion.div
        variants={{
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <ProductReviewsSection reviews={reviews} />
      </motion.div>

      <motion.div
        variants={{
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <RecommendedProducts
          products={similarProducts}
          title="products.similarProducts"
        />
      </motion.div>
    </motion.div>
  );
}

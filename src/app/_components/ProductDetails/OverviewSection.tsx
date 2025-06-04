"use client";

import Button from "@/app/_components/UI/Button";
import Counter from "@components/UI/Counter";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import ImageCarousel from "./ImageCarousel";
import { useProductDetail } from "@/app/_contexts/ProductDetailContext";
import { useState, useTransition, useEffect } from "react";
import { addOrUpdateCartItemAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Breadcrumb from "../UI/Breadcrumb";
import { motion } from "framer-motion";
import formatMoney from "@/app/_utils/formatMoney";
import { Variant } from "@/app/_types/variant";
import WishlistButton from "../Wistlist/WishlistButton";
import { WishlistProvider } from "@/app/_contexts/WishlistContext";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { categoryNamesMultilingual } from "@/app/_utils/mappingCategoryMultilingual";
import { isSaleOfferActive } from "@/app/_utils/saleValidation";

function OverviewSection() {
  const { currentVariant, setCurrentVariant, product } = useProductDetail();
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [, setIsVisible] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleVariantChange(variant: Variant) {
    setCurrentVariant(variant);
  }

  function handleAddToCart() {
    startTransition(async () => {
      const result = await addOrUpdateCartItemAction(
        product._id,
        currentVariant._id!,
        quantity,
      );
      if (result.success) {
        toast.success(t("products.successAddToCart"));
      }
      if (result.errors) {
        if (result.errors.user) {
          toast.error(t("products.loginRequired"));
          router.push("/login");
        } else toast.error(result.errors.message);
      }
    });
  }

  return (
    <section className="min-h-[36rem] w-full bg-grey-400 xl:h-full">
      <div className="mx-auto grid h-full max-w-[77.5rem] translate-y-12 grid-cols-[65fr_35fr] rounded-3xl bg-white px-12 py-6 shadow-lg xl:translate-y-0 xl:grid-cols-[60fr_40fr] xl:rounded-none lg:max-w-full lg:grid-cols-1 lg:px-8 lg:py-2 md:px-4">
        <div className="flex min-w-0 flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb
              className="mt-4"
              items={[
                { translateKey: "products.home", href: "/" },
                { translateKey: "products.shop", href: "/products" },
                { label: product.name },
              ]}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ImageCarousel
              images={currentVariant.images as string[]}
              alt={currentVariant.name}
            />
          </motion.div>
        </div>
        <div className="min-w-0 py-8 lg:py-4">
          <motion.div
            className="mb-6 lg:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center text-sm text-grey-500">
              <span className="mr-2 text-2xl font-bold text-primary-default">
                &#10072;
              </span>
              {categoryNamesMultilingual[product.category.name]
                ? categoryNamesMultilingual[product.category.name][language]
                : product.category.name}
            </span>
          </motion.div>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="mb-1 font-title text-4xl font-bold lg:text-3xl">
              {product.name}
            </h1>
            <div className="mb-2 flex flex-wrap items-center gap-1">
              <motion.span
                className="flex items-center gap-[0.125rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < product.rating ? "text-yellow-500" : "text-grey-300"
                    }`}
                  />
                ))}
              </motion.span>
              <motion.span
                className="ml-1 text-sm text-grey-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {product.rating} {t("products.reviews.ratings")}
              </motion.span>
              {product.sold > 0 && (
                <motion.span
                  className="ml-2 text-sm text-grey-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  | {product.sold} {t("products.reviews.sold")}
                </motion.span>
              )}
            </div>
          </motion.div>
          <motion.p
            className="mb-6 text-xs text-grey-500 lg:mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {t("products.chooseProduct")}
          </motion.p>
          <motion.div
            className="mb-6 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {product.variants.map((variant, index) => (
              <motion.div
                key={variant._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.9 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="filter"
                  onClick={handleVariantChange.bind(null, variant)}
                  active={currentVariant._id === variant._id}
                  className="relative overflow-hidden font-semibold"
                >
                  {variant.name}
                  {variant.stock <
                    Number(process.env.NEXT_PUBLIC_STOCK_LIMIT) && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="relative h-full w-full">
                        <div className="absolute inset-0 rounded-md bg-white/60" />
                        <div className="absolute left-0 top-1/2 h-[1px] w-full origin-center rotate-45 bg-red-500" />
                      </div>
                    </div>
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>
          <motion.h2
            className="flex items-center text-3xl font-bold text-grey-default"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 1.1,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <motion.span
                  key={currentVariant.finalPrice || currentVariant.price}
                  initial={{ opacity: 0.6, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatMoney(
                    currentVariant.finalPrice || currentVariant.price,
                  )}
                </motion.span>
                {isSaleOfferActive(currentVariant.saleOff) &&
                  currentVariant.saleOff && (
                    <motion.span
                      className="rounded-full bg-red-500 px-2 py-1 text-sm font-bold text-white"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      -{currentVariant.saleOff.percentage}%
                    </motion.span>
                  )}
              </div>
              {currentVariant.finalPrice &&
                currentVariant.finalPrice < currentVariant.price && (
                  <motion.span
                    className="text-sm text-gray-400 line-through"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {formatMoney(currentVariant.price)}
                  </motion.span>
                )}
            </div>
            <motion.div
              className="ml-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <WishlistProvider>
                <WishlistButton productId={product._id} />
              </WishlistProvider>
            </motion.div>
          </motion.h2>
          <motion.div
            className="mt-6 grid grid-cols-[30fr_70fr] items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.3,
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <Counter value={quantity} onSetValue={setQuantity} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="large"
                onClick={handleAddToCart}
                icon={<FaCartShopping />}
                loading={isPending}
                fullWidth
              >
                {t("products.addToCart")}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;

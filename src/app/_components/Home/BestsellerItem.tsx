"use client";

import { Product } from "@/app/_types/product";
import formatMoney from "@/app/_utils/formatMoney";
import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button";
import { FaFire } from "react-icons/fa6";
import { WishlistProvider } from "@/app/_contexts/WishlistContext";
import WishlistButton from "../Wistlist/WishlistButton";
import { useTransition } from "react";
import { addOrUpdateCartItemAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

interface BestsellerItemProps {
  item: Product;
}

export default function BestsellerItem({ item }: BestsellerItemProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { language } = useLanguage();
  const handleAddToCart = () => {
    startTransition(async () => {
      const variantId = item.variants[0]?._id || "";
      const result = await addOrUpdateCartItemAction(item._id, variantId, 1);
      if (result.success) {
        toast.success(
          language === "vi"
            ? "Sản phẩm đã được thêm vào giỏ hàng."
            : "Product has been added to cart.",
        );
      }
      if (result.errors) {
        if (result.errors.user) {
          toast.error(
            language === "vi"
              ? "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng."
              : "You need to log in to add products to your cart.",
          );
          router.push("/login");
        } else toast.error(result.errors.message);
      }
    });
  };
  return (
    <motion.div
      className="relative flex h-full min-w-[300px] flex-col overflow-hidden rounded-xl bg-white/5 shadow"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        type: "spring",
      }}
    >
      <motion.div className="relative h-[300px]">
        <Image
          src={item.imageCover}
          alt={item.name}
          fill
          className="object-contain"
        />
      </motion.div>
      <div className="flex flex-1 flex-col p-4">
        <motion.div whileHover={{ x: 3 }}>
          <Link
            href={`/products/${item.slug}`}
            className="mb-2 line-clamp-2 text-lg font-bold"
          >
            {item.name}
          </Link>
        </motion.div>
        <motion.p
          className="flex items-center gap-2 text-primary-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>{formatMoney(item.lowestPrice)}</span> -
          <span className="text-sm text-gray-400">
            {language === "vi" ? `Đã bán: ${item.sold}` : `Sold: ${item.sold}`}
          </span>
        </motion.p>
        <motion.div
          className="mt-auto flex pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button onClick={handleAddToCart} fullWidth loading={pending}>
            {language === "vi" ? "Thêm vào giỏ hàng" : "Add to Cart"}
          </Button>
          <WishlistProvider>
            <div className="absolute right-2 top-2 z-10">
              <WishlistButton productId={item._id} />
            </div>
          </WishlistProvider>
        </motion.div>
      </div>
      <motion.div
        className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-bold text-white shadow-md shadow-orange-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.1, 1],
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          times: [0, 0.6, 1],
        }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.7 }}
        >
          <FaFire />
        </motion.div>
        <span>{language === "vi" ? "Bán chạy" : "Best Seller"}</span>
      </motion.div>
    </motion.div>
  );
}

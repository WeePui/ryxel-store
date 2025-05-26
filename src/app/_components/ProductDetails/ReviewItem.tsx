"use client";

import { Review } from "@/app/_types/review";
import { calcDatePast } from "@/app/_utils/calcDatePast";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import Modal from "../UI/Modal";
import { useState } from "react";
import ZoomedAssetsList from "../UI/ZoomedAssetsList";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion } from "framer-motion";

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const [isOpen, setIsOpen] = useState<false | number>(false);
  const { t } = useLanguage();
  const reviewAssets = review.images.concat(
    review.video ? [review.video] : [],
  ) as Array<string>;

  return (
    <motion.div
      className="flex gap-4 sm:flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-[2] flex-col items-center gap-2 sm:flex-row"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          className="aspect-w-1 aspect-h-1 border-gray-default relative h-12 w-12 overflow-hidden rounded-full border-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image src={review.user.photo.url} alt={review.user.name} fill />
        </motion.div>{" "}
        <span className="text-sm font-semibold lg:text-center">
          {review.user.name}
        </span>
      </motion.div>
      <motion.div
        className="flex flex-[8] flex-col gap-1"
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex gap-1">
          {Array.from({ length: review.rating }, (_, i) => (
            <motion.span
              key={i}
              className="text-yellow-500"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
            >
              <FaStar />
            </motion.span>
          ))}
        </div>{" "}
        <p className="divide-x divide-gray-200 text-xs text-gray-400">
          <span className="pr-2">
            {t("products.reviews.classification")}: {review.variant}
          </span>
          <span className="pl-2">
            {new Date(review.updatedAt).toLocaleTimeString("vi-vn", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {calcDatePast(review.updatedAt)}
          </span>
        </p>
        <p className="pt-1">{review.review}</p>
        {reviewAssets.length > 0 && (
          <motion.div
            className="mt-2 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {reviewAssets.map((asset, index) => {
              const isVideo = asset.endsWith(".mp4");

              return (
                <motion.div
                  onClick={() => setIsOpen(index)}
                  key={index}
                  className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border-[1px] border-gray-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {isVideo ? (
                    <video className="h-full w-full object-cover" muted>
                      <source src={asset} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={asset}
                      alt="review"
                      fill
                      className="object-cover"
                    />
                  )}
                </motion.div>
              );
            })}

            {isOpen !== false && (
              <Modal onClose={() => setIsOpen(false)}>
                <ZoomedAssetsList assets={reviewAssets} initialIndex={isOpen} />
              </Modal>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

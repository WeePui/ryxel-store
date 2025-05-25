"use client";

import { Review } from "@/app/_types/review";
import { calcDatePast } from "@/app/_utils/calcDatePast";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import Modal from "../UI/Modal";
import { useState } from "react";
import ZoomedAssetsList from "../UI/ZoomedAssetsList";
import { useLanguage } from "@/app/_contexts/LanguageContext";

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
    <div className="flex gap-4 sm:flex-col">
      <div className="flex flex-[2] flex-col items-center gap-2 sm:flex-row">
        <div className="aspect-w-1 aspect-h-1 border-gray-default relative h-12 w-12 overflow-hidden rounded-full border-2">
          <Image src={review.user.photo.url} alt={review.user.name} fill />
        </div>{" "}
        <span className="text-sm font-semibold lg:text-center">
          {review.user.name}
        </span>
      </div>
      <div className="flex flex-[8] flex-col gap-1">
        <div className="flex gap-1">
          {Array.from({ length: review.rating }, (_, i) => (
            <span key={i} className="text-yellow-500">
              <FaStar />
            </span>
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
        <p className="my-2">{review.review}</p>
        {review.images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {review.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square h-16 w-16 overflow-hidden rounded-md"
                onClick={() => setIsOpen(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsOpen(index);
                  }
                }}
                role="button"
              >
                <Image src={image} alt={`review-image-${index}`} fill />
              </div>
            ))}
            {typeof isOpen === "number" && (
              <Modal onClose={() => setIsOpen(false)}>
                <ZoomedAssetsList assets={reviewAssets} initialIndex={isOpen} />
              </Modal>
            )}
            {review.video && (
              <div
                className="relative aspect-video h-16 w-40 overflow-hidden rounded-md"
                onClick={() => setIsOpen(review.images.length)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsOpen(review.images.length);
                  }
                }}
                role="button"
              >
                <video src={review.video} className="h-full w-full" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

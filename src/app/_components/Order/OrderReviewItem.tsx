import Image from "next/image";
import { FaCamera, FaRegStar, FaStar, FaXmark } from "react-icons/fa6";
import Input from "../UI/Input";
import { LineItem } from "@/app/_types/lineItem";
import { useEffect, useMemo, useState } from "react";
import { ReviewInput, ReviewUpdateInput } from "@/app/_types/validateInput";
import { toast } from "react-toastify";
import { Review } from "@/app/_types/review";
import Button from "../UI/Button";
import { Product } from "@/app/_types/product";

interface OrderReviewItemProps {
  lineItem: LineItem;
  reviewItem?: Review;
  updatable?: boolean;
  onReviewUpdate: (review: ReviewInput | ReviewUpdateInput) => void;
  setIsUpdating?: (isUpdating: boolean) => void;
}

export default function OrderReviewItem({
  lineItem,
  reviewItem,
  updatable = false,
  onReviewUpdate,
  setIsUpdating,
}: OrderReviewItemProps) {
  const [rating, setRating] = useState(() => {
    if (reviewItem) {
      return reviewItem.rating;
    }
    return 5;
  });
  const [review, setReview] = useState(() => {
    if (reviewItem) {
      return reviewItem.review;
    }
    return "";
  });
  const [images, setImages] = useState<Array<File | string>>(() => {
    if (reviewItem) {
      return reviewItem.images || [];
    }
    return [];
  });
  const [video, setVideo] = useState<File | string | null>(() => {
    if (reviewItem) {
      return reviewItem.video || null;
    }
    return null;
  });
  const [isAllowedToUpdate, setIsAllowedToUpdate] = useState(() => {
    if (reviewItem) {
      return false;
    }
    return true;
  });

  const variant = useMemo(
    () =>
      (lineItem.product as Product).variants.find(
        (variant) => variant._id === lineItem.variant
      ),
    [lineItem]
  );

  const productId = (lineItem.product as Product)._id;
  const variantId = variant?._id;

  useEffect(() => {
    if (reviewItem) {
      onReviewUpdate({
        rating,
        review,
        images,
        video,
      } as ReviewUpdateInput);

      return;
    }

    onReviewUpdate({
      rating,
      review,
      images,
      video,
      productId,
      variantId: variant!._id,
    } as ReviewInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, review, images, video, productId, variantId, reviewItem]);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > 1024 * 1024 * 5) {
        toast.error("Kích thước ảnh/video tối đa 5MB");
        return;
      }

      if (video && file.type.includes("video")) {
        toast.error("Chỉ được tải lên tối đa 1 video");
        return;
      }

      if (images.length + files.length > 2) {
        toast.error("Chỉ được tải lên tối đa 2 ảnh và video");
        return;
      }

      if (file.type.includes("video")) {
        setVideo(() => file);
        return;
      }

      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-50 shadow-md p-6 rounded-lg">
      <div className="flex items-center gap-1">
        <div className="w-16 h-16 relative aspect-square">
          <Image
            src={(lineItem.product as Product).imageCover}
            alt={(lineItem.product as Product).name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="ml-4">
          <h2 className="font-title text-lg">
            {(lineItem.product as Product).name}
          </h2>
          <p className="text-sm text-gray-400">Phân loại: {variant!.name}</p>
        </div>
        {updatable && !isAllowedToUpdate && (
          <div className="ml-auto flex items-center gap-2">
            <Button
              size="small"
              onClick={() => {
                setIsAllowedToUpdate(true);
                setIsUpdating?.(true);
              }}
            >
              Sửa
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-2">
        <p>Chất lượng sản phẩm: </p>
        <StarRating
          rating={rating}
          onChangeRating={setRating}
          disabled={!isAllowedToUpdate}
        />
        {isAllowedToUpdate && (
          <p className="text-xs text-gray-500">(bấm chọn để đánh giá)</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Input
          type="textarea"
          id="review"
          label={reviewItem ? "Nội dung" : "Viết đánh giá (tối đa 500 ký tự)"}
          name="review"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          maxLength={500}
          disabled={!isAllowedToUpdate}
        />
        <span className="text-[10px] text-gray-400 ml-auto">
          {review.length}/500
        </span>
      </div>
      {images.length > 0 || video ? (
        <div className="flex items-center gap-6">
          {images.map((image, index) => (
            <div key={index} className={`relative aspect-square w-16 h-16`}>
              <div
                className={`absolute right-0 border-2 translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-white p-[2px] ${
                  !isAllowedToUpdate ? "hidden" : ""
                } `}
              >
                <FaXmark
                  className="text-red-500 text-xs cursor-pointer"
                  onClick={() =>
                    setImages(
                      (prev) => prev.filter((_, i) => i !== index) as File[]
                    )
                  }
                />
              </div>
              <Image
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="review"
                layout="fill"
                objectFit="cover"
                className="z-10 rounded-md"
              />
            </div>
          ))}
          {video && (
            <div className="relative aspect-square w-16 h-16">
              <div
                className={`absolute right-0 border-2 translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-white p-[2px] ${
                  !isAllowedToUpdate ? "hidden" : ""
                } `}
              >
                <FaXmark
                  className="text-red-500 text-xs cursor-pointer"
                  onClick={() => setVideo(null)}
                />
              </div>
              <video
                src={
                  video
                    ? typeof video === "string"
                      ? video
                      : URL.createObjectURL(video)
                    : ""
                }
                className="z-10 rounded-md object-cover w-full h-full"
                controls={false}
                muted
              />
            </div>
          )}
          {images.length < 2 || !video ? (
            <div
              className={`flex flex-col items-center justify-center gap-1 border-2 p-4 rounded-lg border-dashed cursor-pointer ${
                !isAllowedToUpdate ? "hidden" : ""
              }`}
              role="button"
              onClick={() =>
                document
                  .getElementById(
                    `file-input-${(lineItem.product as Product)._id}-${
                      lineItem.variant
                    }`
                  )
                  ?.click()
              }
            >
              <FaCamera className="text-xl text-gray-500 hover:scale-110 transform transition-transform" />
              <p className="text-sm text-gray-400">
                {images.length < 2 && !video
                  ? "Thêm ảnh hoặc video"
                  : images.length < 2
                  ? "Thêm ảnh"
                  : "Thêm video"}
              </p>
              <input
                id={`file-input-${(lineItem.product as Product)._id}-${
                  lineItem.variant
                }`}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleUploadFile(e)}
              />
            </div>
          ) : null}
        </div>
      ) : (
        isAllowedToUpdate && (
          <div className="flex flex-col gap-2">
            <p>Thêm ảnh hoặc video</p>
            <div
              className="flex flex-col items-center justify-center gap-1 border-2 p-4 rounded-lg border-dashed cursor-pointer"
              role="button"
              onClick={() =>
                document
                  .getElementById(
                    `file-input-${(lineItem.product as Product)._id}-${
                      lineItem.variant
                    }`
                  )
                  ?.click()
              }
            >
              <FaCamera className="text-xl text-gray-500 hover:scale-110 transform transition-transform" />
              <p className="text-sm text-gray-400">Thêm ảnh hoặc video</p>
              <input
                id={`file-input-${(lineItem.product as Product)._id}-${
                  lineItem.variant
                }`}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleUploadFile(e)}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

interface StarRatingProps {
  rating: number;
  disabled?: boolean;
  onChangeRating: (rating: number) => void;
}

function StarRating({
  rating,
  onChangeRating,
  disabled = false,
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      onClick={() => !disabled && onChangeRating(index + 1)}
      className={`${!disabled ? "cursor-pointer" : ""}`}
    >
      {index < rating ? <FaStar /> : <FaRegStar />}
    </div>
  ));
  return (
    <div className="flex gap-2 text-yellow-500 text-3xl md:text-2xl">
      {stars}
    </div>
  );
}

'use client';

import { useWishlist } from '@/app/_contexts/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import Spinner from '../UI/Spinner';
import { useEffect, useState } from 'react';

interface WishlistButtonProps {
  productId: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'w-5 h-5',
  medium: 'w-7 h-7',
  large: 'w-8 h-8',
};

export default function WishlistButton({
  productId,
  size = 'medium',
}: WishlistButtonProps) {
  const {
    wishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    isPending,
    checkProductInWishlist,
  } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false); // Trạng thái kiểm tra wishlist đã được load chưa

  useEffect(() => {
    if (!wishlist) {
      setIsWishlistLoaded(true); // Nếu wishlist chưa được load, không cần kiểm tra
      return;
    }
    if (wishlist.products.length === 0) {
      setIsInWishlist(false); // Nếu wishlist rỗng, không có sản phẩm nào
      setIsWishlistLoaded(true); // Đánh dấu là wishlist đã được load
      return;
    }

    // Đánh dấu là wishlist đã được load
    setIsWishlistLoaded(true);
    setIsInWishlist(() => checkProductInWishlist(productId, wishlist));
  }, [wishlist, productId, checkProductInWishlist]);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    if (isInWishlist) {
      removeProductFromWishlist(productId);
    } else {
      addProductToWishlist(productId);
    }
  }

  if (!isWishlistLoaded) {
    return (
      <div className="mr-auto">
        <Spinner />
      </div>
    ); // Hiển thị Spinner khi wishlist đang được load
  }

  return (
    <button
      onClick={handleClick}
      className="relative group focus:outline-none w-fit"
    >
      <span
        className={`absolute inset-0 rounded-full bg-red-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
      ></span>
      {isPending ? (
        <Spinner />
      ) : isInWishlist ? (
        <FaHeart
          className={`stroke-[14px] ${sizeClasses[size]} text-red-500 transition-transform duration-300 group-hover:scale-110`}
        />
      ) : (
        <FaRegHeart
          className={`stroke-[14px] ${sizeClasses[size]} text-red-500 transition-transform duration-300 group-hover:scale-110`}
        />
      )}
    </button>
  );
}

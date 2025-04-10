import React, { useTransition } from 'react';
import Button from '../UI/Button';
import { FaCartPlus, FaShare } from 'react-icons/fa6';
import { LineItem } from '@/app/_types/lineItem';
import { addMultipleItemsToCartAction } from '@/app/_libs/actions';
import { toast } from 'react-toastify';
import Spinner from '../UI/Spinner';

interface WishlistCTAProps {
  cartItems: LineItem[];
}

interface CartItem {
  product: string;
  variant: string;
  quantity: number;
}

export default function WishlistCTA({ cartItems }: WishlistCTAProps) {
  const [isPending, startTransition] = useTransition();

  const handleAddAllToCart = async () => {
    startTransition(async () => {
      const result = await addMultipleItemsToCartAction(
        cartItems as CartItem[]
      );

      if (result.success) {
        toast.success('Tất cả sản phẩm đã được thêm vào giỏ hàng.', {
          icon: <FaCartPlus className="text-primary-500" />,
        });
      } else {
        toast.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.', {
          icon: <FaCartPlus className="text-red-500" />,
        });
      }
    });
  };

  const handleShareToFacebook = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const appId = '8346725152102719';
    const fbShareUrl = `https://www.facebook.com/dialog/share?app_id=${appId}&display=popup&href=${currentUrl}&redirect_uri=${currentUrl}`; // TODO: CAN'T SHARE LOCALHOSTING URL

    window.open(fbShareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-4 justify-end mt-4">
      <Button size="small" onClick={handleAddAllToCart} disabled={isPending}>
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <FaCartPlus /> Thêm tất cả vào giỏ hàng
          </>
        )}
      </Button>
      <Button size="small" onClick={handleShareToFacebook}>
        <FaShare />
        Chia sẻ
      </Button>
    </div>
  );
}

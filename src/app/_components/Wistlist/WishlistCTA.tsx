import { useTransition } from "react";
import Button from "../UI/Button";
import { FaCartPlus, FaShare } from "react-icons/fa6";
import { LineItem } from "@/app/_types/lineItem";
import { addMultipleItemsToCartAction } from "@/app/_libs/actions";
import { toast } from "react-toastify";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface WishlistCTAProps {
  cartItems: LineItem[];
}

interface CartItem {
  product: string;
  variant: string;
  quantity: number;
}

export default function WishlistCTA({ cartItems }: WishlistCTAProps) {
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();

  const handleAddAllToCart = async () => {
    startTransition(async () => {
      const result = await addMultipleItemsToCartAction(
        cartItems as CartItem[],
      );

      if (result.success) {
        toast.success(t("account.wishlist.addAllToCartSuccess"), {
          icon: <FaCartPlus className="text-primary-500" />,
        });
      } else {
        toast.error(t("account.wishlist.addAllToCartError"), {
          icon: <FaCartPlus className="text-red-500" />,
        });
      }
    });
  };

  const handleShareToFacebook = () => {
    const currentUrl = encodeURIComponent(window.location.href);
    const appId = "8346725152102719";
    const fbShareUrl = `https://www.facebook.com/dialog/share?app_id=${appId}&display=popup&href=${currentUrl}&redirect_uri=${currentUrl}`; // TODO: CAN'T SHARE LOCALHOSTING URL

    window.open(fbShareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="mt-4 flex items-center justify-end gap-4">
      <Button
        size="small"
        onClick={handleAddAllToCart}
        loading={isPending}
        icon={<FaCartPlus />}
      >
        {t("account.wishlist.addAllToCart")}
      </Button>
      <Button size="small" onClick={handleShareToFacebook} icon={<FaShare />}>
        {t("account.wishlist.share")}
      </Button>
    </div>
  );
}

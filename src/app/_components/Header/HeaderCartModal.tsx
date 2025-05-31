import Image from "next/image";
import NavLink from "../UI/NavLink";
import Button from "../UI/Button";
import formatMoney from "@/app/_utils/formatMoney";
import { Cart } from "@/app/_types/cart";
import { Product } from "@/app/_types/product";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface HeaderCartModalProps {
  cart: Cart;
}

function HeaderCartModal({ cart }: HeaderCartModalProps) {
  const { lineItems } = cart;
  const { t } = useLanguage();

  return (
    <div className="absolute right-0 z-[100] mt-2 w-96 rounded-lg bg-white p-4 shadow-lg">
      <h3 className="mb-2 text-lg font-semibold">{t("cart.modal.title")}</h3>
      {lineItems.length > 0 ? (
        <div className="relative max-h-48 overflow-hidden">
          <ul className="space-y-2">
            {lineItems.slice(0, 4).map((item, index: number) => (
              <li
                key={item.variant as string}
                className={`flex items-center ${
                  index === 3 ? "blurred-item" : ""
                }`}
              >
                <NavLink href={`/products/${(item.product as Product).slug}`}>
                  <Image
                    src={(item.product as Product).imageCover}
                    alt={(item.product as Product).name}
                    width={40}
                    height={40}
                    className="mr-2 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {(item.product as Product).name}
                    </p>{" "}
                    <p className="text-sm text-gray-500">
                      {item.quantity} ({t("cart.modal.productsCount")}) x{" "}
                      {formatMoney((item.product as Product).lowestPrice)}
                    </p>
                  </div>
                </NavLink>
              </li>
            ))}
            {lineItems.length > 3 && (
              <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent"></div>
            )}
          </ul>{" "}
        </div>
      ) : (
        <p className="text-sm text-gray-500">{t("cart.modal.empty")}</p>
      )}
      <div className="mt-4 flex justify-end">
        <Button href="/cart">
          <span className="text-xs">{t("cart.modal.viewCart")}</span>
        </Button>
      </div>
    </div>
  );
}

export default HeaderCartModal;

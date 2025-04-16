import Image from 'next/image';
import NavLink from '../UI/NavLink';
import Button from '../UI/Button';
import formatCurrency from '@/app/_utils/formatCurrency';
import { Cart } from '@/app/_types/cart';
import { Product } from '@/app/_types/product';

interface HeaderCartModalProps {
  cart: Cart;
}

function HeaderCartModal({ cart }: HeaderCartModalProps) {
  const { lineItems } = cart;

  return (
    <div className="absolute right-0 z-[100] mt-2 w-96 rounded-lg bg-white p-4 shadow-lg">
      <h3 className="mb-2 text-lg font-semibold">Sản phẩm đã thêm</h3>
      {lineItems.length > 0 ? (
        <div className="relative max-h-48 overflow-hidden">
          <ul className="space-y-2">
            {lineItems.slice(0, 4).map((item, index: number) => (
              <li
                key={item.variant as string}
                className={`flex items-center ${
                  index === 3 ? 'blurred-item' : ''
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
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} (sản phẩm) x{' '}
                      {formatCurrency((item.product as Product).lowestPrice)}
                    </p>
                  </div>
                </NavLink>
              </li>
            ))}
            {lineItems.length > 3 && (
              <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white to-transparent"></div>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Giỏ hàng của bạn đang trống.</p>
      )}
      <div className="mt-4 flex justify-end">
        <Button type="primary" href="/cart">
          <span className="text-xs">Xem giỏ hàng</span>
        </Button>
      </div>
    </div>
  );
}

export default HeaderCartModal;

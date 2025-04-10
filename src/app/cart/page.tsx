import { FaCartShopping, FaChevronRight } from 'react-icons/fa6';
import NavLink from '@components/UI/NavLink';
import { cookies } from 'next/headers';
import { checkToken, getCart } from '../_libs/apiServices';
import CartItemsList from '../_components/Cart/CartItemsList';
import OrderSummary from '../_components/Cart/OrderSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'This is the cart page',
};

interface PageProps {
  searchParams: Promise<{
    error: string | null;
  }>;
}

async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error || null;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  let items = [];
  let subtotal = 0;

  if (token) {
    const { valid } = await checkToken(token);
    if (valid) {
      const response = await getCart(token);

      if (response.data && response.data.cart) {
        const { data } = response;
        const { cart } = data;
        subtotal = cart.subtotal;
        items = cart.lineItems;
      }
    }
  }

  return (
    <div className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-[70fr_30fr] gap-10">
      <div className="col-span-full">
        <h1 className="font-title text-3xl font-semibold text-primary-500">
          Giỏ hàng
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">Trang chủ</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <NavLink href="/products">
            <span className="text-grey-400">Cửa hàng</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">Giỏ hàng</span>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="col-span-full flex flex-col items-center gap-8">
          <FaCartShopping className="text-7xl" />
          <p className="flex flex-col items-center text-xl font-semibold text-grey-400">
            Vẫn chưa có gì trong giỏ hàng của bạn.
            <NavLink href="/products">
              Cửa hàng của chúng tôi đang có những điều tuyệt vời đang chờ đợi
              bạn.
            </NavLink>
          </p>
        </div>
      ) : (
        <>
          <CartItemsList items={items} error={error} />
          <div className="h-auto">
            <OrderSummary subtotal={subtotal} />
          </div>
        </>
      )}
    </div>
  );
}

export default Page;

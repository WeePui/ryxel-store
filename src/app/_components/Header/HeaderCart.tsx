import { FaCartShopping } from 'react-icons/fa6';
import NavLink from '../UI/NavLink';
import { checkToken, getCart } from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';
import LoggedCart from './LoggedCart';

async function HeaderCart() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token)
    return (
      <NavLink href="/cart" hoverUnderline={false}>
        <FaCartShopping className="text-xl" />
      </NavLink>
    );

  const { valid } = await checkToken(token);
  if (!valid) {
    return (
      <NavLink href="/cart" hoverUnderline={false}>
        <FaCartShopping className="text-xl" />
      </NavLink>
    );
  }

  try {
    const { data } = await getCart(token);

    if (!data) throw new Error('Failed to fetch cart');

    const { cart } = data;

    if (cart) return <>{cart.products && <LoggedCart cart={cart} />}</>;
    return null;
  } catch (error) {
    console.error('Failed to fetch cart:', error);

    return (
      <NavLink href="/cart" hoverUnderline={false}>
        <FaCartShopping className="text-xl" />
      </NavLink>
    );
  }
}

export default HeaderCart;

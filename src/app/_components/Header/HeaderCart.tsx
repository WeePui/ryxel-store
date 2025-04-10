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

  const { data } = await getCart(token);

  if (!data)
    return (
      <NavLink href="/cart" hoverUnderline={false}>
        <FaCartShopping className="text-xl" />
      </NavLink>
    );

  const { cart } = data;

  if (cart) return <>{cart.lineItems && <LoggedCart cart={cart} />}</>;
  return null;
}

export default HeaderCart;

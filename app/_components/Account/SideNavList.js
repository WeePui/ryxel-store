'use client';

import {
  FaAddressCard,
  FaBagShopping,
  FaTruckFast,
  FaLock,
  FaCreditCard,
  FaTicket,
  FaDoorOpen,
} from 'react-icons/fa6';
import NavLink from '../UI/NavLink';
import SignoutButton from '../UI/SignoutButton';
import { usePathname } from 'next/navigation';

function SideNavList() {
  const pathName = usePathname();

  return (
    <ul className="mt-10 flex flex-col gap-4 text-lg text-primary-500">
      <li>
        <NavLink
          type="sideNav"
          href="/account/profile"
          active={pathName.includes('/profile')}
        >
          <FaAddressCard className="text" />
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          type="sideNav"
          href="/account/orders"
          active={pathName.includes('/orders')}
        >
          <FaBagShopping />
          Orders
        </NavLink>
      </li>
      <li className="">
        <NavLink
          type="sideNav"
          href="/account/addresses"
          active={pathName.includes('/addresses')}
        >
          <FaTruckFast />
          Shipping Address
        </NavLink>
      </li>
      <li>
        <NavLink
          type="sideNav"
          href="/account/updatePassword"
          active={pathName.includes('/updatePassword')}
        >
          <FaLock />
          Change Password
        </NavLink>
      </li>
      <li>
        <NavLink
          type="sideNav"
          href="/account/payments"
          active={pathName.includes('/payments')}
        >
          <FaCreditCard />
          Payment Methods
        </NavLink>
      </li>
      <li className="---mt-8">
        <NavLink
          type="sideNav"
          href="/account/vouchers"
          active={pathName === '/vouchers'}
        >
          <FaTicket />
          Vouchers
        </NavLink>
      </li>
      <li className="---mt-8">
        <SignoutButton>
          <button
            className="group flex items-center gap-8 px-4 py-2 font-normal text-red-500 transition-colors duration-300 hover:text-red-600"
            type="submit"
          >
            <FaDoorOpen />
            Sign Out
          </button>
        </SignoutButton>
      </li>
    </ul>
  );
}

export default SideNavList;

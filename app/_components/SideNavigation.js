'use client';

import Image from 'next/image';
import {
  FaAddressCard,
  FaBagShopping,
  FaTruckFast,
  FaLock,
  FaCreditCard,
  FaTicket,
  FaDoorOpen,
} from 'react-icons/fa6';
import NavLink from './NavLink';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@libs/actions';
import { useActionState } from 'react';
import Loader from '@components/Loader';

function SideNavigation() {
  const pathName = usePathname();
  const [, action, isPending] = useActionState(logoutAction, undefined);

  if (isPending) return <Loader />;

  return (
    <div className="py-10 pl-2">
      <div className="flex items-center gap-6">
        <div className="relative aspect-square w-1/4 rounded-full ring-2 ring-primary-default">
          <Image src="/default-profile.png" alt="Profile's avatar" fill />
        </div>
        <span className="text-lg font-bold text-grey-300">Wee Pùi</span>
      </div>

      <ul className="mt-10 flex flex-col gap-4 text-lg text-primary-500">
        <li>
          <NavLink type="sideNav" href="/" active={pathName === '/profile'}>
            <FaAddressCard className="text" />
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink type="sideNav" href="/" active={pathName === '/orders'}>
            <FaBagShopping />
            Orders
          </NavLink>
        </li>
        <li className="">
          <NavLink type="sideNav" href="/" active={pathName === '/addresses'}>
            <FaTruckFast />
            Shipping Address
          </NavLink>
        </li>
        <li>
          <NavLink
            type="sideNav"
            href="/"
            active={pathName === '/updatePassword'}
          >
            <FaLock />
            Change Password
          </NavLink>
        </li>
        <li>
          <NavLink type="sideNav" href="/" active={pathName === '/payment'}>
            <FaCreditCard />
            Payment Methods
          </NavLink>
        </li>
        <li className="---mt-8">
          <NavLink type="sideNav" href="/" active={pathName === '/vouchers'}>
            <FaTicket />
            Vouchers
          </NavLink>
        </li>
        <li className="---mt-8">
          <form action={action}>
            <button
              className="group flex items-center gap-8 px-4 py-2 font-normal text-red-500 transition-colors duration-300 hover:text-red-600"
              type="submit"
            >
              <FaDoorOpen />
              Sign Out
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}

export default SideNavigation;

'use client';

import {
  FaAddressCard,
  FaBagShopping,
  FaTruckFast,
  FaLock,
  FaDoorOpen,
  FaHeart,
} from 'react-icons/fa6';
import NavLink from '../UI/NavLink';
import SignoutButton from '../UI/SignoutButton';
import { usePathname } from 'next/navigation';

function SideNavList() {
  const pathName = usePathname();

  return (
    <ul className="mt-10 lg:mt-6 flex flex-col gap-4 lg:gap-2 text-lg lg:text-base lg:font-semibold text-primary-500">
      <li>
        <NavLink
          type="sideNav"
          href="/account/profile"
          active={pathName.includes('/profile')}
        >
          <FaAddressCard className="text" />
          Hồ sơ
        </NavLink>
      </li>
      <li>
        <NavLink
          type="sideNav"
          href="/account/orders"
          active={pathName.includes('/orders')}
        >
          <FaBagShopping />
          Đơn hàng
        </NavLink>
      </li>
      <li className="">
        <NavLink
          type="sideNav"
          href="/account/addresses"
          active={pathName.includes('/addresses')}
        >
          <FaTruckFast />
          Địa chỉ giao hàng
        </NavLink>
      </li>
      <li>
        <NavLink
          type="sideNav"
          href="/account/updatePassword"
          active={pathName.includes('/updatePassword')}
        >
          <FaLock />
          Đổi mật khẩu
        </NavLink>
      </li>
      <li className="---mt-8">
        <NavLink
          type="sideNav"
          href="/account/wishlist"
          active={pathName.includes('/wishlist')}
        >
          <FaHeart className="text" />
          Danh sách yêu thích
        </NavLink>
      </li>
      <li className="---mt-8">
        <SignoutButton>
          <button
            className="group flex items-center gap-8 px-4 py-2 font-normal text-red-500 transition-colors duration-300 hover:text-red-600"
            type="submit"
          >
            <FaDoorOpen />
            Đăng xuất
          </button>
        </SignoutButton>
      </li>
    </ul>
  );
}

export default SideNavList;

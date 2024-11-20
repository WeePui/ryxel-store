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

function SideNavigation() {
  return (
    <div className="p-10">
      <div className="flex items-center gap-6">
        <div className="relative aspect-square w-1/4 ring-2 ring-primary-default rounded-full">
          <Image src="/default-profile.png" alt="Profile's avatar" fill />
        </div>
        <span className="text-lg font-bold text-grey-300">Wee Pùi</span>
      </div>

      <ul className="text-lg text-primary-500 flex flex-col gap-4 mt-10">
        <li className="flex gap-8 items-center">
          <FaAddressCard className="text" />
          <NavLink type="sideNav" href="/">
            Profile
          </NavLink>
        </li>
        <li className="flex gap-8 items-center">
          <FaBagShopping />
          <NavLink type="sideNav" href="/">
            Orders
          </NavLink>
        </li>
        <li className="mt-8 flex gap-8 items-center">
          <FaTruckFast />
          <NavLink type="sideNav" href="/">
            Shipping Address
          </NavLink>
        </li>
        <li className="flex gap-8 items-center">
          <FaLock />
          <NavLink type="sideNav" href="/">
            Change Password
          </NavLink>
        </li>
        <li className="flex gap-8 items-center">
          <FaCreditCard />
          <NavLink type="sideNav" href="/">
            Payment Methods
          </NavLink>
        </li>
        <li className="mt-8 flex gap-8 items-center">
          <FaTicket />
          <NavLink type="sideNav" href="/">
            Vouchers
          </NavLink>
        </li>
        <li className="mt-8 flex gap-8 items-center text-red-600">
          <FaDoorOpen />
          <NavLink type="danger" href="/">
            Sign Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNavigation;

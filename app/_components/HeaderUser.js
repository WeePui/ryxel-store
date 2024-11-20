'use client';

import { useRef, useState } from 'react';
import NavLink from './NavLink';
import { FaCircleUser } from 'react-icons/fa6';

function HeaderUser() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsModalVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsModalVisible(false);
    }, 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink hoverUnderline={false} href="/account/login">
        <div className="flex gap-2 items-center">
          <FaCircleUser className="text-xl" />
          <span>Login</span>
        </div>
      </NavLink>
      {isModalVisible && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <ul className="py-4 px-6">
            <li>
              <NavLink href="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink href="/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink type="danger" href="/signout">
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HeaderUser;

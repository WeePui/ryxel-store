'use client';

import NavLink from '@components/NavLink';
import { useRef, useState, useActionState } from 'react';
import { logoutAction } from '@libs/actions';
import Image from 'next/image';
import Spinner from './Spinner';

function LoggedUser({ user }) {
  const [, action, isPending] = useActionState(logoutAction, undefined);

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

  if (isPending) return <Spinner />;

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink hoverUnderline={false} href="/account/profile">
          <div className="flex items-center gap-2">
            <Image
              src={user.photo}
              alt={user.name}
              width={35}
              height={35}
              className="rounded-full"
            />
            <span>{user.name}</span>
          </div>
        </NavLink>
        {isModalVisible && (
          <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
            <ul className="px-6 py-4">
              <li>
                <NavLink href="/account/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink href="/account/orders">Orders</NavLink>
              </li>
              <li>
                <form action={action}>
                  <button
                    className="text-red-500 hover:text-red-300"
                    type="submit"
                  >
                    Sign out
                  </button>
                </form>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default LoggedUser;

'use client';

import NavLink from '@/app/_components/UI/NavLink';
import { useRef, useState } from 'react';
import Image from 'next/image';
import SignoutButton from '@components/UI/SignoutButton';
import { User } from '@/app/_types/user';

interface LoggedUserProps {
  user: User;
}

function LoggedUser({ user }: LoggedUserProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
    setIsModalVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsModalVisible(false);
    }, 200);
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink hoverUnderline={false} href="/account/profile">
          <div className="flex items-center gap-2 rounded-full">
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <Image
                src={user.photo.url}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="xl:hidden max-w-[8rem] truncate">{user.name}</span>
          </div>
        </NavLink>
        {isModalVisible && (
          <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
            <ul className="px-6 py-4">
              <li>
                <NavLink href="/account/profile">Hồ sơ</NavLink>
              </li>
              <li>
                <NavLink href="/account/orders">Đơn hàng</NavLink>
              </li>
              <li>
                <SignoutButton>
                  <button
                    className="text-red-500 hover:text-red-300"
                    type="submit"
                  >
                    Đăng xuất
                  </button>
                </SignoutButton>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default LoggedUser;

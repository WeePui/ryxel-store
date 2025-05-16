'use client';

import { useToggleAdminSidebar } from '@/app/_contexts/ToggleAdminSidebarContext';
import LoggedUser from '../Header/LoggedUser';
import { User } from '@/app/_types/user';
import { FaBars } from 'react-icons/fa6';

interface AdminHeaderProps {
  user: User;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const { toggle, isOpen } = useToggleAdminSidebar();

  return (
    <div className="sticky top-0 z-30 h-16 border-b border-primary-500 px-4 py-6 flex items-center bg-grey-50 no-print">
      <button
        className={`text-primary-500 hover:text-primary-600 focus:outline-none p-3 rounded-full hover:bg-primary-200 transition-all duration-300 ease-in-out ${
          isOpen ? 'bg-primary-200' : 'bg-primary-100'
        }`}
        onClick={toggle}
      >
        {<FaBars className="text-xl" />}
      </button>
      <div className="ml-auto font-title">
        <LoggedUser user={user} />
      </div>
    </div>
  );
}

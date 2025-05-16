'use client';

import { useToggleAdminSidebar } from '@/app/_contexts/ToggleAdminSidebarContext';
import Logo from '../UI/Logo';
import AdminNav from './AdminNav';
import { FaXmark } from 'react-icons/fa6';

export default function AdminSidebar() {
  const { isOpen, setIsOpen } = useToggleAdminSidebar();

  return (
    <div
      className={`h-screen overflow-y-auto bg-primary-default text-grey-50 pb-6 flex flex-col transition-all animate-slide-in duration-300 ${
        isOpen ? 'w-64 sm:w-screen' : 'w-16 sm:hidden'
      } no-print`}
    >
      <div
        className={`text-center border-b border-grey-200 h-16 mb-6 overflow-hidden transition-all duration-300 ease-in-out sm:flex sm:justify-between px-8`}
      >
        {isOpen && (
          <>
            <Logo />
            <button
              className="text-xl hidden sm:block"
              onClick={() => setIsOpen(false)}
            >
              <FaXmark className="stroke-[1rem]" />
            </button>
          </>
        )}
      </div>
      <AdminNav />
    </div>
  );
}

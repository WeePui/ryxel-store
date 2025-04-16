'use client';

import { useEffect, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import Navigation from '@components/Header/HeaderNav';
import SearchBar from './SearchBar';

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <button
        className="text-2xl hidden lg:block text-primary-500 hover:text-primary-600 transition-all duration-200 ease-in-out"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <FaBars />
      </button>
      {menuOpen && (
        <div className="fixed top-0 md:left-0 lg:right-0 z-40 md:w-full lg:w-7/12 h-full bg-white shadow-lg p-6 md:animate-slide-in animate-slide-in-reverse flex flex-col gap-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl self-end text-primary"
            aria-label="Đóng menu"
          >
            <FaXmark />
          </button>
          <SearchBar />
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Navigation isMobile={true} onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

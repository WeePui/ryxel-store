import Logo from '@components/UI/Logo';
import Navigation from '@components/Header/HeaderNav';
import SearchBar from '@components/Header/SearchBar';
import HeaderUser from '@components/Header/HeaderUser';
import Spinner from '@components/UI/Spinner';
import { Suspense } from 'react';
import HeaderCart from './HeaderCart';
import MobileMenu from './MobileMenu';

async function Header() {
  return (
    <header className="h-16 w-full border-b border-primary-700 font-title z-50 relative bg-white px-6 lg:px-0 xl:px-6">
      <div className="flex items-center justify-between h-full ">
        <div className="flex items-center gap-6">
          <Logo />
          <div className="lg:hidden">
            <Navigation />
          </div>
        </div>
        <div className="flex items-center gap-8 lg:gap-4 lg:pr-4">
          <div className="lg:hidden">
            <SearchBar />
          </div>
          <Suspense fallback={<Spinner />}>
            <HeaderCart />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <HeaderUser />
          </Suspense>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;

import Logo from '@components/UI/Logo';
import Navigation from '@components/Header/HeaderNav';
import { FaCartShopping } from 'react-icons/fa6';
import NavLink from '@components/UI/NavLink';
import SearchBar from '@components/Header/SearchBar';
import HeaderUser from '@components/Header/HeaderUser';
import Spinner from '@components/UI/Spinner';
import { Suspense } from 'react';

async function Header() {
  return (
    <header className="h-16 w-full border-b border-primary-700 px-8 font-title">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <Navigation />
        </div>
        <div className="flex items-center gap-8">
          <SearchBar />
          <NavLink href="/cart" hoverUnderline={false}>
            <FaCartShopping className="text-xl" />
          </NavLink>
          <Suspense fallback={<Spinner />}>
            <HeaderUser />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default Header;

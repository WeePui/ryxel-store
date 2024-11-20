import Logo from '@components/Logo';
import Navigation from '@components/Navigation';
import { FaCircleUser, FaCartShopping } from 'react-icons/fa6';
import NavLink from '@components/NavLink';
import SearchBar from '@components/SearchBar';
import HeaderUser from './HeaderUser';

function Header() {
  return (
    <header className="h-16 w-full px-8 border-b border-primary-700 font-title">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-10">
          <Logo />
          <Navigation />
        </div>
        <div className="flex items-center gap-8">
          <SearchBar />
          <NavLink href="/cart" hoverUnderline={false}>
            <FaCartShopping className="text-xl" />
          </NavLink>
          <HeaderUser />
        </div>
      </div>
    </header>
  );
}

export default Header;

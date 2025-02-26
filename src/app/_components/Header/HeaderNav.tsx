'use client';

import NavLink from '@/app/_components/UI/NavLink';

function HeaderNav() {
  return (
    <nav className="z-10 text-lg">
      <ul className="flex gap-8 text-primary-500">
        <li>
          <NavLink href="/products">Cửa hàng</NavLink>
        </li>
        <li>
          <NavLink href="/products">Category</NavLink>
        </li>
        <li>
          <NavLink href="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;

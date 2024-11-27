'use client';

import NavLink from '@components/NavLink';

function Navigation() {
  return (
    <nav className="z-10 text-lg">
      <ul className="flex gap-8 text-primary-500">
        <li>
          <NavLink href="/products">Store</NavLink>
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

export default Navigation;

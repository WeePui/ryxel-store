"use client";

import NavLink from "./NavLink";

function Navigation() {
  return (
    <nav className="text-lg z-10">
      <ul className="text-primary-500 flex gap-8">
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

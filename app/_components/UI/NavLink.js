import Link from 'next/link';

const base =
  'relative transition-colors duration-300 font-normal group flex items-center gap-2';

const variant = {
  mainNav: `${base} text-primary-default hover:text-grey-300`,
  sideNav: `${base} text-grey-300 hover:text-primary-default gap-8 px-4 py-2`,
  footerNav: `${base} text-grey-300 hover:text-primary-default gap-8 border-gray-300`,
  danger: `${base} text-red-500 hover:text-red-600 gap-8 px-4 py-2`,
  filterNav: `${base} text-primary-default font-extrabold`,
};

const currentlyActive = {
  sideNav: 'text-primary-default bg-secondary-300',
};

function NavLink({
  children,
  href,
  type = 'mainNav',
  hoverUnderline = true,
  active = false,
}) {
  return (
    <Link
      href={href}
      className={`${variant[type]} ${active && currentlyActive[type]} `}
    >
      {children}
      {type === 'mainNav' && hoverUnderline && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full origin-bottom-left scale-y-0 bg-primary-500 transition-transform duration-500 group-hover:scale-y-100"></span>
      )}
    </Link>
  );
}

export default NavLink;

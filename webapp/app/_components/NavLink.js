import Link from 'next/link';

const base = 'relative transition-colors duration-300 font-normal group';

const variant = {
  mainNav: `${base} text-primary-default hover:text-grey-300`,
  sideNav: `${base} text-grey-300 hover:text-primary-default`,
  danger: `${base} text-red-500 hover:text-red-600`,
};

function NavLink({ children, href, type = 'mainNav', hoverUnderline = true }) {
  return (
    <Link href={href} className={`${variant[type]}`}>
      {children}
      {type === 'mainNav' && hoverUnderline && (
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 scale-y-0 transition-transform duration-500 origin-bottom-left group-hover:scale-y-100"></span>
      )}
    </Link>
  );
}

export default NavLink;

import Link from 'next/link';

const base =
  'relative transition-colors duration-300 group  items-center gap-2';

const variant = {
  mainNav: `${base} flex text-primary-default hover:text-grey-300`,
  sideNav: `${base} flex text-grey-300 hover:text-primary-default gap-8 px-4 py-2`,
  footerNav: `${base} flex text-white hover:text-primary-50 gap-8 border-gray-300 hover:border-b-[1px]`,
  danger: `${base} flex text-red-500 hover:text-red-600 gap-8 px-4 py-2`,
  filterNav: `${base} flex text-primary-default font-extrabold`,
  mainNavInline: `${base} inline text-primary-default hover:text-grey-300`,
  secondaryNavInline: `${base} inline text-grey-300 hover:text-primary-default`,
};

const currentlyActive = {
  mainNav: 'text-primary-default',
  sideNav: 'text-primary-default bg-secondary-300',
  footerNav: 'text-white',
  danger: 'text-red-500',
  filterNav: 'text-secondary-50 bg-primary-500',
  mainNavInline: 'text-primary-default',
  secondaryNavInline: 'text-grey-300',
};

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  type?: keyof typeof variant;
  hoverUnderline?: boolean;
  active?: boolean;
  isInline?: boolean;
  className?: string;
}

function NavLink({
  children,
  href,
  type = 'mainNav',
  hoverUnderline = true,
  active = false,
  isInline = false,
  className = '',
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${variant[type]} ${active && currentlyActive[type]} ${
        isInline ? 'inline' : ''
      } ${className}`}
    >
      {children}
      {type === 'mainNav' && hoverUnderline && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full origin-bottom-left scale-y-0 bg-primary-500 transition-transform duration-500 group-hover:scale-y-100"></span>
      )}
    </Link>
  );
}

export default NavLink;

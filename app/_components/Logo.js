import Image from 'next/image';
import Link from 'next/link';
import logo from '@public/logo.png';

function Logo() {
  return (
    <Link
      href="/"
      className="z-10 inline-flex h-16 w-44 items-center justify-center gap-4 overflow-hidden bg-primary-500 pr-3"
    >
      <Image
        src={logo}
        height="100"
        width="100"
        alt="Ryxel Store logo"
        className="object-contain"
      />
    </Link>
  );
}

export default Logo;

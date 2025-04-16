import Image from 'next/image';
import Link from 'next/link';
import logo from '@public/logo.png';

interface LogoProps {
  width?: number;
  height?: number;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

function Logo({ width = 100, height = 100, rounded }: LogoProps) {
  return (
    <Link
      href="/"
      className={
        'z-10 inline-flex h-16 w-44 sm:w-32 items-center justify-center gap-4 overflow-hidden bg-primary-500 pr-3 ' +
        (rounded ? `rounded-${rounded}` : '')
      }
    >
      <Image
        src={logo}
        height={height}
        width={width}
        alt="Ryxel Store logo"
        className="object-contain"
      />
    </Link>
  );
}

export default Logo;

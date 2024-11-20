import Image from "next/image";
import Link from "next/link";
import logo from "@public/logo.png";

function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex justify-center items-center gap-4 z-10 bg-primary-500 w-44 pr-3 overflow-hidden h-16"
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

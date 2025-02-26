'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

const base =
  'inline-flex outline outline-2 outline-transparent justify-center items-center gap-2 duration-300 focus:ring-2 focus:ring-tertiary-300 focus:ring-tertiary-300 focus:outline-none shadow-lg transition-all px-8 py-3 hover:shadow-none hover:outline-2 hover:outline-secondary-300 font-bold';

const variant = {
  primary: `${base} rounded-lg text-primary-50 bg-primary-default hover:bg-tertiary-default hover:text-secondary-100`,
  primaryOnTheDark: `${base} rounded-lg text-primary-50 bg-primary-default hover:bg-transparent hover:text-secondary-100`,
  primaryLarge: `${base} gap-4 text-xl rounded-lg text-primary-50 bg-primary-default py-4 px-6 hover:animate-[jitter_0.5s_ease-in-out_forwards]`,
  secondary: `${base} rounded-lg text-primary-400 bg-secondary-200 hover:bg-grey-20- hover:text-primary-300`,
  secondaryOnTheDark: `${base} rounded-lg text-primary-400 bg-secondary-200 hover:bg-transparent hover:text-secondary-100`,
  filter: `${base} rounded-3xl text-primary-default font-normal shadow-none bg-secondary-50 py-2 px-4 border-2 border-primary-default hover:bg-grey-50 transition-colors duration-300`,
  tertiary: `${base} shadow-none rounded-lg text-primary-400 bg-transparent border-[1px] hover:outline-none border-primary-default hover:text-primary-300 !px-3 !py-1 disabled:cursor-not-allowed disabled:text-grey-300 disabled:border-grey-300`,
};

const currentlyActive = {
  primary: '',
  primaryOnTheDark: '',
  primaryLarge: '',
  secondary: '',
  secondaryOnTheDark: '',
  filter: `!bg-primary-500 text-secondary-50`,
  tertiary: '',
};

interface ButtonProps {
  type?: keyof typeof variant;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  role?: 'button' | 'submit' | 'reset';
}

function Button({
  type = 'primary',
  children,
  href,
  onClick,
  active = false,
  disabled = false,
  role = 'button',
}: ButtonProps) {
  if (href) {
    return (
      <Link
        className={`${variant[type]} ${active && currentlyActive[type]}`}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${variant[type]} ${active && currentlyActive[type]}`}
      onClick={onClick}
      disabled={disabled}
      type={role}
    >
      {children}
    </button>
  );
}

export default Button;

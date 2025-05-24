"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import Spinner from "./Spinner";
import { cn } from "@/app/_utils/cn";
import { VariantProps, cva } from "class-variance-authority";

/**
 * Button variants using class-variance-authority
 */
const buttonVariants = cva(
  // Base styles shared by all variants
  [
    "inline-flex justify-center items-center gap-2",
    "font-bold transition-all duration-300",
    "focus:ring-2 focus:ring-tertiary-300 focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-70",
  ],
  {
    variants: {
      variant: {
        // Primary - Default solid button with brand color
        primary: [
          "bg-primary-default text-primary-50 shadow-lg",
          "hover:bg-tertiary-default hover:text-secondary-100 hover:shadow-none",
          "active:bg-primary-600",
        ],
        // Primary on Dark - For dark backgrounds
        primaryOnDark: [
          "bg-primary-default text-primary-50 shadow-lg",
          "hover:bg-transparent hover:text-secondary-100 hover:shadow-none",
          "active:bg-primary-600/80",
        ],
        // Secondary - More subtle option
        secondary: [
          "bg-secondary-200 text-primary-400 shadow-lg",
          "hover:bg-secondary-300 hover:text-primary-300 hover:shadow-none",
          "active:bg-secondary-400",
        ],
        // Secondary on Dark
        secondaryOnDark: [
          "bg-secondary-200 text-primary-400 shadow-lg",
          "hover:bg-transparent hover:text-secondary-100 hover:shadow-none",
          "active:bg-secondary-400/80",
        ],
        // Filter - Pill-shaped button for filters
        filter: [
          "bg-secondary-50 text-primary-default font-normal shadow-none",
          "border-2 border-primary-default",
          "hover:bg-grey-50",
        ],
        // Tertiary - Outlined button
        tertiary: [
          "bg-transparent text-primary-400 shadow-none",
          "border border-primary-default",
          "hover:text-primary-300",
          "disabled:text-grey-300 disabled:border-grey-300",
        ],
        // Danger - For destructive actions
        danger: [
          "bg-red-600 text-red-50 shadow-lg",
          "hover:bg-red-700 hover:shadow-none",
          "active:bg-red-800",
        ],
        // Ghost - Minimal visual presence
        ghost: [
          "bg-transparent text-primary-400 shadow-none",
          "hover:bg-primary-50",
          "active:bg-primary-100",
        ],
        // Success - For confirmations and success actions
        success: [
          "bg-green-600 text-white shadow-lg",
          "hover:bg-green-700 hover:shadow-none",
          "active:bg-green-800",
        ],
        // Warning - For warning actions
        warning: [
          "bg-amber-500 text-white shadow-lg",
          "hover:bg-amber-600 hover:shadow-none",
          "active:bg-amber-700",
        ],
      },
      size: {
        small: "px-4 py-2 text-sm rounded-md",
        medium: "px-6 py-3 text-base sm:px-4 sm:py-2 sm:text-sm rounded-lg",
        large: "px-8 py-4 text-lg sm:px-6 sm:py-3 sm:text-base rounded-lg",
        xl: "px-10 py-5 text-xl gap-3 rounded-xl",
      },
      rounded: {
        default: "", // Use size-defined rounding
        full: "rounded-full",
        pill: "rounded-3xl",
        none: "rounded-none",
        square: "rounded-md", // For square icon-only buttons
      },
      active: {
        true: "ring-2 ring-tertiary-300",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      iconOnly: {
        true: "!p-0 aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      rounded: "default",
      active: false,
      fullWidth: false,
      iconOnly: false,
    },
    compoundVariants: [
      // Special styles for active filter buttons
      {
        variant: "filter",
        active: true,
        className: "bg-primary-500 text-secondary-50",
      },
      // Icon-only size variants
      {
        iconOnly: true,
        size: "small",
        className: "w-8 h-8 !text-base",
      },
      {
        iconOnly: true,
        size: "medium",
        className: "w-10 h-10 !text-lg",
      },
      {
        iconOnly: true,
        size: "large",
        className: "w-12 h-12 !text-xl",
      },
      {
        iconOnly: true,
        size: "xl",
        className: "w-14 h-14 !text-2xl",
      },
    ],
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  loading?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  iconOnly?: boolean;
  role?: "button" | "submit" | "reset";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "medium",
      rounded,
      active = false,
      fullWidth,
      disabled = false,
      loading = false,
      href,
      onClick,
      role = "button",
      icon,
      iconOnly = false,
      ...props
    },
    ref,
  ) => {
    const buttonClasses = cn(
      buttonVariants({ variant, size, rounded, active, fullWidth, iconOnly }),
      className,
    );

    if (href) {
      return (
        <Link className={buttonClasses} href={href}>
          {icon && <span className="btn-icon">{icon}</span>}
          {!iconOnly && children && children}
        </Link>
      );
    }

    return (
      <button
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
        type={role}
        ref={ref}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {icon && <span className="btn-icon">{icon}</span>}
            {!iconOnly && children && children}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;

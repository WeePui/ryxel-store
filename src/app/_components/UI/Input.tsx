"use client";

import { cn } from "@/app/_utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef, useEffect, useRef, useState } from "react";
import "./input.css";
import AssistiveText from "./AssistiveText";
import { FaInfoCircle } from "react-icons/fa";

/**
 * Input component variants using class-variance-authority
 */
const inputVariants = cva(
  // Base styles shared by all inputs
  [
    "peer block w-full appearance-none rounded-lg border-2 bg-transparent",
    "focus:outline-none focus:ring-0",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        // Standard input with border
        standard: ["border-grey-300 text-gray-900", "focus:border-primary-400"],
        // Input with error state
        error: ["!border-red-500 !text-red-500", "focus:border-red-500"],
        // Successful validation
        success: ["border-green-500 text-gray-900", "focus:border-green-600"],
        // Disabled state
        disabled: [
          "cursor-not-allowed !border-grey-300 text-grey-300",
          "bg-gray-100",
        ],
      },
      size: {
        small: "text-sm px-2.5 pt-3 pb-2 lg:px-2 lg:pt-2 lg:pb-1",
        medium: "text-base px-2.5 pt-4 pb-2.5 lg:px-2 lg:pt-3 lg:pb-2",
        large: "text-lg px-2.5 pt-4 pb-2.5 lg:px-2 lg:pt-3 lg:pb-2",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      animated: {
        true: "animate-shake",
        false: "",
      },
      bgColor: {
        white: "bg-white",
        transparent: "bg-transparent",
        gray: "bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "standard",
      size: "medium",
      fullWidth: true,
      animated: false,
      bgColor: "white",
    },
  },
);

const labelVariants = cva(
  [
    "absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform truncate px-2 duration-300",
    "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
    "peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2",
    "rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
  ],
  {
    variants: {
      variant: {
        standard: ["text-gray-500 peer-focus:text-primary-500"],
        error: ["text-red-500 peer-focus:text-red-500"],
        success: ["text-green-600 peer-focus:text-green-700"],
        disabled: ["text-grey-300"],
      },
      bgColor: {
        white: "bg-white",
        transparent: "bg-transparent",
        gray: "bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "standard",
      bgColor: "white",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  id: string;
  label: string;
  type?: string;
  name?: string;
  options?: { value: string | number; label: string }[];
  error?: boolean;
  errorMessage?: string;
  optionPlaceholder?: string;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  assistiveText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = "text",
      name,
      disabled = false,
      options = [],
      error = false,
      errorMessage,
      defaultValue,
      defaultChecked,
      onChange,
      checked,
      value,
      optionPlaceholder = "- - Select an option - -",
      className = "",
      variant: customVariant,
      size = "medium",
      fullWidth = true,
      bgColor = "white",
      onBlur,
      min,
      max,
      step,
      placeholder = "",
      required = false,
      maxLength,
      assistiveText,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >(null);
    const [errorState, setError] = useState(error);
    const [animateError, setAnimateError] = useState(false);
    const [displayedPlaceholder, setDisplayedPlaceholder] =
      useState(placeholder);

    // Update displayed placeholder when the placeholder prop changes (language switching)
    useEffect(() => {
      setDisplayedPlaceholder(placeholder);
    }, [placeholder]);

    // Determine the proper variant based on current state
    const variant = disabled
      ? "disabled"
      : error || errorState
        ? "error"
        : customVariant || "standard";

    // Handle input changes - Clear error state as soon as user starts typing
    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      // Clear the error state immediately when user starts typing
      setError(false);

      if (onChange) {
        // Type assertion to match the expected change event for the parent component
        onChange(e as React.ChangeEvent<HTMLInputElement>);
      }
    };

    useEffect(() => {
      if (inputRef.current) {
        if (
          (value !== undefined && value !== "") ||
          (defaultValue !== undefined && inputRef.current.value !== "")
        ) {
          inputRef.current.classList.add("border-primary-500");
        } else {
          inputRef.current.classList.remove("border-primary-500");
        }
      }
    }, [value, defaultValue]);

    // Handle error animation
    useEffect(() => {
      if (error) {
        setError(true);
        setAnimateError(true);
        const timer = setTimeout(() => setAnimateError(false), 400);
        return () => clearTimeout(timer);
      }
    }, [error]);

    const handleFocus = () => {
      setDisplayedPlaceholder(label);
    };

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      if (inputRef.current) {
        // If the input is empty, show the placeholder
        if (inputRef.current.value.trim() === "") {
          setDisplayedPlaceholder(placeholder);
        } else {
          setDisplayedPlaceholder(label);
        }
      }

      if (onBlur) {
        onBlur(e);
      }
    };

    // Handle special props for number inputs
    const numericProps: Record<string, number | undefined> = {};
    if (type === "number") {
      if (min !== undefined) numericProps.min = min;
      if (max !== undefined) numericProps.max = max;
      if (step !== undefined) numericProps.step = step;
    }

    if (type === "select") {
      return (
        <div className={cn("relative", { "w-full": fullWidth }, className)}>
          {(errorMessage || assistiveText) && (
            <AssistiveText
              text={errorMessage || assistiveText || ""}
              icon={<FaInfoCircle />}
              error={!!errorMessage}
              className="mb-1"
            />
          )}
          <div className="relative rounded-lg">
            <select
              name={name}
              id={id}
              ref={inputRef as React.RefObject<HTMLSelectElement>}
              className={cn(
                inputVariants({
                  variant,
                  size,
                  fullWidth,
                  animated: animateError,
                  bgColor,
                }),
                "capitalize",
              )}
              disabled={disabled}
              onChange={handleChange}
              value={value as string | number | readonly string[] | undefined}
              onBlur={onBlur as React.FocusEventHandler<HTMLSelectElement>}
              defaultValue={defaultValue}
              required={required}
            >
              <option value="" disabled>
                {optionPlaceholder}
              </option>
              {options &&
                options.map((option, index) => (
                  <option
                    className="capitalize"
                    value={option.value}
                    key={index}
                  >
                    {option.label}
                  </option>
                ))}
            </select>
            <label
              htmlFor={id}
              className={cn(labelVariants({ variant, bgColor }))}
            >
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </label>
          </div>
        </div>
      );
    }
    if (type === "textarea")
      return (
        <div className={cn("relative", { "w-full": fullWidth }, className)}>
          {(errorMessage || assistiveText) && (
            <AssistiveText
              text={errorMessage || assistiveText || ""}
              icon={<FaInfoCircle />}
              error={!!errorMessage}
              className="mb-1"
            />
          )}
          <div className="relative min-w-0 rounded-lg">
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              name={name}
              id={id}
              className={cn(
                inputVariants({
                  variant,
                  size,
                  fullWidth,
                  animated: animateError,
                  bgColor,
                }),
                "min-h-28 resize-none",
              )}
              placeholder=""
              disabled={disabled}
              defaultValue={defaultValue}
              onChange={handleChange}
              maxLength={(maxLength as number) || 524288}
              value={value as string | number | readonly string[] | undefined}
              onBlur={
                handleBlur as React.FocusEventHandler<HTMLTextAreaElement>
              }
              onFocus={handleFocus}
              required={required}
            />
            <label
              htmlFor={id}
              className={cn(labelVariants({ variant, bgColor }))}
            >
              {placeholder ? displayedPlaceholder : label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </label>
          </div>
        </div>
      );
    if (type === "checkbox")
      return (
        <div className={cn("flex items-center", className)}>
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            ref={ref || (inputRef as React.RefObject<HTMLInputElement>)}
            defaultChecked={defaultChecked as boolean | undefined}
            onChange={(e) =>
              onChange?.(e as React.ChangeEvent<HTMLInputElement>)
            }
            className={cn(
              "h-4 w-4 rounded-xl border-gray-300",
              "text-primary-600 focus:ring-2 focus:ring-primary-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              {
                "bg-white": bgColor === "white",
                "bg-transparent": bgColor === "transparent",
                "bg-gray-100": bgColor === "gray",
              },
            )}
            disabled={disabled}
            onBlur={onBlur as React.FocusEventHandler<HTMLInputElement>}
            required={required}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn("ms-2 text-sm font-medium", {
              "cursor-not-allowed text-grey-300": disabled,
              "text-grey-400": !disabled,
            })}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {(errorMessage || assistiveText) && (
            <AssistiveText
              text={errorMessage || assistiveText || ""}
              icon={<FaInfoCircle />}
              error={!!errorMessage}
              className="ml-2"
            />
          )}
        </div>
      );
    return (
      <div className={cn("relative", { "w-full": fullWidth }, className)}>
        {(errorMessage || assistiveText) && (
          <AssistiveText
            text={errorMessage || assistiveText || ""}
            icon={<FaInfoCircle />}
            error={!!errorMessage}
            className="mb-1"
          />
        )}
        <div className="relative rounded-lg">
          <input
            type={type}
            name={name}
            id={id}
            ref={ref || (inputRef as React.RefObject<HTMLInputElement>)}
            className={cn(
              inputVariants({
                variant,
                size,
                fullWidth,
                animated: animateError,
                bgColor,
              }),
              { "spinner-none": type === "number" },
            )}
            placeholder=""
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={handleChange}
            value={value}
            onBlur={handleBlur}
            required={required}
            maxLength={type !== "number" ? maxLength || 524288 : undefined}
            onFocus={handleFocus}
            {...numericProps}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(labelVariants({ variant, bgColor }))}
          >
            {placeholder !== "" ? displayedPlaceholder : label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        </div>
      </div>
    );
  },
);

// Set display name for better debugging in React DevTools
Input.displayName = "Input";

export default Input;

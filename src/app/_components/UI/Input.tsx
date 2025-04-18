'use client';

import { useEffect, useRef, useState } from 'react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  disabled?: boolean;
  options?: { value: string | number; label: string }[];
  error?: boolean;
  defaultValue?: string;
  defaultChecked?: boolean;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  checked?: boolean;
  value?: string | number;
  optionPlaceholder?: string;
  bgColor?: string;
  maxLength?: number;
}

function Input({
  id,
  label,
  type,
  name,
  disabled = false,
  options = [],
  error = false,
  defaultValue,
  defaultChecked,
  onChange,
  checked,
  value,
  optionPlaceholder = '- - Select an option - -',
  bgColor = 'bg-white',
  maxLength,
}: InputProps) {
  const inputRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(null);
  const [errorState, setError] = useState(error);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (onChange) {
      onChange?.(e);
    }
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      if (value !== '') {
        inputRef.current.classList.add('border-primary-500');
        inputRef.current.classList.remove('border-red-500', 'text-red-500');
        setError(false);
      } else {
        setError(error);
        inputRef.current.classList.remove('border-primary-500');
      }
    }
  };

  useEffect(() => {
    if (error) {
      setError(true); // Đảm bảo errorState được cập nhật khi có lỗi từ props
    }
  }, [error]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== '') {
      inputRef.current.classList.add('border-primary-500');
    } else {
      inputRef.current?.classList.remove('border-primary-500');
    }
  }, [defaultValue]);

  if (type === 'select') {
    return (
      <div className="relative w-full rounded-lg">
        <select
          name={name}
          id={id}
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          className={`peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-2.5 pt-4 capitalize ${
            error
              ? 'border-red-500 text-red-500'
              : 'border-grey-300 text-gray-900'
          } focus:border-primary-500 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500`}
          disabled={disabled}
          onChange={handleChange}
          value={value}
        >
          <option value="" disabled>
            {optionPlaceholder}
          </option>
          {options &&
            options.map((option, index) => (
              <option className="capitalize" value={option.value} key={index}>
                {option.label}
              </option>
            ))}
        </select>
        <label
          htmlFor={id}
          className={`absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-300 ${
            error
              ? 'text-red-500 peer-focus:text-red-500'
              : 'text-gray-500 peer-focus:text-primary-500'
          }`}
        >
          {label}
        </label>
      </div>
    );
  }
  if (type === 'textarea')
    return (
      <div className="relative w-full rounded-lg">
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          name={name}
          id={id}
          className={`${
            error
              ? 'border-red-500 text-red-500'
              : 'border-grey-300 text-gray-900'
          } peer block w-full resize-none appearance-none rounded-lg border-2 border-grey-300 bg-transparent px-2.5 pb-2.5 pt-4 focus:border-primary-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500 ${bgColor}`}
          placeholder=" "
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength || 524288}
          value={value}
        />
        <label
          htmlFor={id}
          className={`${
            error
              ? 'border-red-500 text-red-500 peer-focus:text-red-500'
              : 'border-grey-300 text-gray-500 peer-focus:text-primary-500'
          } absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-300`}
        >
          {label}
        </label>
      </div>
    );

  if (type === 'checkbox')
    return (
      <div className="flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          defaultChecked={defaultChecked}
          onChange={(e) => onChange?.(e)}
          className={`h-4 w-4 rounded-xl border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:text-grey-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 !${bgColor}`}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`ms-2 text-sm font-medium text-grey-400 ${
            disabled && 'cursor-not-allowed text-grey-300'
          } dark:text-gray-300`}
        >
          {label}
        </label>
      </div>
    );

  return (
    <div className="relative w-full rounded-lg">
      <input
        type={type}
        name={name}
        ref={inputRef as React.RefObject<HTMLInputElement>}
        id={id}
        className={`${
          errorState
            ? 'border-red-500 text-red-500'
            : 'border-grey-300 text-gray-900'
        } 
        peer block w-full appearance-none rounded-lg border-2 border-grey-300 bg-transparent px-2.5 pb-2.5  lg:pt-3 lg:pb-1 pt-4 focus:border-primary-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500 ${
          disabled && 'cursor-not-allowed text-grey-300 !border-grey-300'
        } !${bgColor}`}
        placeholder=" "
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleChange}
        value={value}
        maxLength={maxLength || 524288}
      />
      <label
        htmlFor={id}
        className={`${
          errorState
            ? 'border-red-500 text-red-500 peer-focus:text-red-500'
            : 'border-grey-300 text-gray-500 peer-focus:text-primary-500'
        } !${bgColor} absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-300`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;

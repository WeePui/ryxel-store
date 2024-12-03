'use client';

import { useEffect, useRef } from 'react';

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
  ...props
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (onChange) {
      onChange?.(e);
    }
    if (inputRef.current && inputRef.current.value !== '') {
      inputRef.current.classList.add('border-primary-500');
    } else {
      inputRef.current.classList.remove('border-primary-500');
    }
  };

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== '') {
      inputRef.current.classList.add('border-primary-500');
    } else {
      inputRef.current.classList.remove('border-primary-500');
    }
  }, [defaultValue]);

  if (type === 'select') {
    return (
      <div className="relative w-full rounded-lg">
        <select
          name={name}
          id={id}
          ref={inputRef}
          className={`peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-2.5 pt-4 capitalize ${
            error
              ? 'border-red-500 text-red-500'
              : 'border-grey-300 text-gray-900'
          } focus:border-primary-500 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500`}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          {...props}
        >
          <option value="" disabled>
            {optionPlaceholder}
          </option>
          {options &&
            options.map((option, index) => (
              <option
                className="capitalize"
                value={option.value || option}
                key={index}
              >
                {option.label || option}
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
          type={type}
          ref={inputRef}
          name={name}
          id={id}
          className={`${error ? 'border-red-500 text-red-500' : 'border-grey-300 text-gray-900'} peer block w-full resize-none appearance-none rounded-lg border-2 border-grey-300 bg-transparent px-2.5 pb-2.5 pt-4 focus:border-primary-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500`}
          placeholder=" "
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
        <label
          htmlFor={id}
          className={`${error ? 'border-red-500 text-red-500 peer-focus:text-red-500' : 'border-grey-300 text-gray-500 peer-focus:text-primary-500'} absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-300`}
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
          ref={inputRef}
          defaultChecked={defaultChecked}
          onChange={(e) => onChange?.(e)}
          className="h-4 w-4 rounded-xl border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:text-grey-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={`ms-2 text-sm font-medium text-grey-400 ${disabled && 'cursor-not-allowed text-grey-300'} dark:text-gray-300`}
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
        ref={inputRef}
        id={id}
        className={`${error ? 'border-red-500 text-red-500' : 'border-grey-300 text-gray-900'} peer block w-full appearance-none rounded-lg border-2 border-grey-300 bg-transparent px-2.5 pb-2.5 pt-4 focus:border-primary-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500`}
        placeholder=" "
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`${error ? 'border-red-500 text-red-500 peer-focus:text-red-500' : 'border-grey-300 text-gray-500 peer-focus:text-primary-500'} absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-300`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;

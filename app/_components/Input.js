function Input({ id, label, type, name, disabled = false }) {
  return (
    <div className="relative w-full rounded-lg">
      <input
        type={type}
        name={name}
        id={id}
        className="peer block w-full appearance-none rounded-lg border-2 border-grey-300 bg-transparent px-2.5 pb-2.5 pt-4 text-gray-900 focus:border-primary-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500"
        placeholder=" "
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-300"
      >
        {label}
      </label>
    </div>
  );
}

export default Input;

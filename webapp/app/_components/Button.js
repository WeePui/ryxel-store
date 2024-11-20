import Link from "next/link";

const base =
  "inline-flex outline outline-2 outline-transparent rounded-lg flex justify-center items-center duration-300 focus:ring focus:ring-tertiary-300 rounded-lg flex justify-center items-center duration-300 focus:ring focus:ring-tertiary-300 focus:outline-none shadow-lg transition-all px-4 py-3 ";

const variant = {
  primary: `${base} text-primary-50 bg-primary-default hover:bg-transparent hover:text-secondary-100 font-bold hover:shadow-none hover:outline-2 hover:outline-secondary-300`,
  secondary: `${base} text-primary-400 bg-secondary-200 hover:bg-transparent hover:text-secondary-100 font-bold shadow-lg hover:shadow-none hover:outline-2 hover:outline-secondary-300`,
};

function Button({ type = "primary", children, href, onClick }) {
  if (href) {
    return (
      <Link className={variant[type]} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={variant[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

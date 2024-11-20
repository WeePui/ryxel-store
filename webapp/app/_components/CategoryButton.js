import NavLink from './NavLink';

function CategoryButton({ children }) {
  return (
    <div className="rounded-3xl flex items-center gap-2 bg-secondary-50 py-2 px-4 border-2 border-primary-default hover:bg-grey-50 transition-colors duration-300">
      <NavLink type="filterNav" href="/products?category=mouse">
        {children}
      </NavLink>
    </div>
  );
}

export default CategoryButton;

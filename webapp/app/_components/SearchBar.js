import { FaSistrix } from "react-icons/fa6";

function SearchBar() {
  return (
    <div className="relative">
      <FaSistrix className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
      <input
        type="text"
        className="border-gray-200 border-2 rounded-full pl-10 pr-8 py-2 w-56 focus:w-96 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-tertiary-400"
        placeholder="Search for products, categories & more ..."
      />
    </div>
  );
}

export default SearchBar;

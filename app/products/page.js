import CategoryFilter from '@components/CategoryFilter';
import SideFilter from '@components/SideFilter';
import { getProducts } from '@libs/apiServices';
import ProductList from '@components/ProductList';

export const metadata = {
  title: 'Products Page',
  description: 'This is the products page',
};

async function Page({ children }) {
  const { results, products } = await getProducts();
  console.log(results);

  return (
    <main className="mb-16">
      <div className="max-w-7xl w-[90rem] mx-auto">
        <p className="py-6 text-xs text-grey-400">
          {/* Showing {results} results of 3498035 */}
        </p>
        <CategoryFilter />
        <div className="flex justify-end items-center  gap-4">
          <span className="font-thin">Sort by: </span>
          <select className="rounded-lg border-2 border-grey-300 py-3 pl-3 pr-12 font-bold text-primary-default hover:bg-grey-50 hover:ring-[1px] hover:ring-grey-300 focus:bg-grey-50 focus:ring-[1px] focus:ring-grey-300">
            <option value="createdAt">Release Date</option>
            <option value="titleAZ">Title (A - Z)</option>
            <option value="ratingHighToLow">Rating (high to low)</option>
            <option value="priceHighToLow">Price (high to low)</option>
            <option value="priceLowToHigh">Price (low to high)</option>
          </select>
        </div>
        <div className="grid grid-cols-[20fr_80fr] py-7">
          <SideFilter />
          <ProductList products={products} />
        </div>
      </div>
    </main>
  );
}

export default Page;

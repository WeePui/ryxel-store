import ProductsByCategory from '@/app/_components/Admin/Products/ProductsByCategory';
import ProductsOverview from '@/app/_components/Admin/Products/ProductsOverview';
import ProductsSold from '@/app/_components/Admin/Products/ProductsSold';
import ProductsTable from '@/app/_components/Admin/Products/ProductsTable';
import StockChart from '@/app/_components/Admin/Products/StockChart';
import CategoryFilter from '@/app/_components/Products/CategoryFilter';
import FilterButton from '@/app/_components/Products/FilterButton';
import SideFilter from '@/app/_components/Products/SideFilter';
import SortSelector from '@/app/_components/Products/SortSelector';
import { generatePriceRanges } from '@/app/_helpers/generatePriceRanges';
import {
  getCategories,
  getFilterData,
  getProducts,
  getProductsSummary,
  getStockData,
} from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';

// const brands = [
//   { value: 'brand-1', count: 10 },
//   { value: 'brand-2', count: 20 },
//   { value: 'brand-3', count: 30 },
// ];
// const priceRanges = [
//   { min: 0, max: 100 },
//   { min: 100, max: 200 },
// ];
// const specifications = {
//   color: [
//     { value: 'red', count: 10 },
//     { value: 'blue', count: 20 },
//     { value: 'green', count: 30 },
//   ],
//   size: [
//     { value: 'S', count: 10 },
//     { value: 'M', count: 20 },
//     { value: 'L', count: 30 },
//   ],
// };

interface PageProps {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value || '';
  const filter = await searchParams;

  const [
    productsData,
    filterData,
    stockData,
    productSummary,
    clientCategories,
  ] = await Promise.all([
    getProducts(filter),
    getFilterData(filter),
    getStockData({ value: token }),
    getProductsSummary({ value: token }),
    getCategories({ value: token }),
  ]);

  const { categories } = clientCategories;
  const {
    data: { products, totalProducts, resultsPerPage },
  } = productsData;
  const { data: filtersData } = filterData;
  const { brands, minPrice, maxPrice, specs } = filtersData;
  const priceRange = products.reduce(
    (acc: { min: number; max: number }) => {
      acc.min = Math.min(acc.min, minPrice);
      acc.max = Math.max(acc.max, maxPrice);
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );
  const priceRanges = generatePriceRanges(priceRange.min, priceRange.max);

  const {
    totalStock,
    totalOutStock,
    totalInStock,
    prediction: { predictions },
  } = productSummary;

  console.log('totalProducts', totalProducts);
  console.log('resultsPerPage', resultsPerPage);

  return (
    <div className="grid grid-cols-4 xl:grid-cols-2 md:grid-cols-1 p-6 gap-6">
      <div className="col-span-full">
        <ProductsOverview
          totalStock={totalStock}
          totalOutStock={totalOutStock}
          totalInStock={totalInStock}
          predictions={predictions}
        />
      </div>
      <div className="col-span-1">
        <ProductsByCategory categories={categories} />
      </div>
      <div className="col-span-2 xl:col-span-full">
        <ProductsSold cookies={token} />
      </div>
      <div className="col-span-1">
        <StockChart data={stockData.data} />
      </div>
      <div className="overflow-x-hidden max-w-full col-span-full mt-14">
        <CategoryFilter categories={categories} />
      </div>
      <div className="hidden lg:block py-4 cols-span-full">
        <div className="hidden lg:flex gap-2 items-center">
          <div className="flex-[6]">
            <SortSelector />
          </div>
          <div className="md:flex-[4] whitespace-nowrap">
            <FilterButton>
              <SideFilter
                brands={brands}
                priceRanges={priceRanges}
                specifications={specs}
                isMobile
              />
            </FilterButton>
          </div>
        </div>
      </div>
      <div className="lg:hidden col-span-full items-end">
        <SortSelector />
      </div>
      <div className="grid grid-cols-[20fr_80fr] xl:grid-cols-[25fr_75fr] lg:grid-cols-1 gap-x-6 col-span-full">
        <div className="lg:hidden sticky top-4 max-h-[calc(100vh-2rem)] h-fit shadow-md rounded-xl overflow-auto scrollbar-hide">
          <SideFilter
            brands={brands}
            priceRanges={priceRanges}
            specifications={specs}
          />
        </div>
        <ProductsTable
          products={products}
          totalProducts={totalProducts}
          resultsPerPage={resultsPerPage}
        />
      </div>
    </div>
  );
}

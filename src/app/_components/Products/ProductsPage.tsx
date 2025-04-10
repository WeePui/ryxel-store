import CategoryFilter from '@components/Products/CategoryFilter';
import SideFilter from '@components/Products/SideFilter';
import { getFilterData, getProducts } from '@libs/apiServices';
import ProductList from '@components/Products/ProductList';
import NumResults from '@components/Products/NumResults';
import { generatePriceRanges } from '@helpers/generatePriceRanges';
import SortSelector from '@components/Products/SortSelector';
import { Product } from '../../_types/product';

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  let products: Product[] = [];
  let brands: Array<{ value: string; count: number }> = [];
  let priceRange = { min: Infinity, max: -Infinity };
  let priceRanges: Array<{ min: number; max?: number }> = [];
  let displayResults = 0;
  let displayTotalProducts = 0;
  let resultsPerPage = 0;
  let specs: {
    [key: string]: Array<{
      value: string;
      count: number;
    }>;
  } = {}; // Changed from [] to {} to match the new structure
  const filters = await searchParams;

  try {
    const productsData = await getProducts(filters);
    const filtersData = await getFilterData(filters);

    const { data } = productsData;
    displayResults = data.results;
    displayTotalProducts = data.totalProducts;
    resultsPerPage = data.resultsPerPage;
    const {
      brands: fetchedBrands,
      minPrice,
      maxPrice,
      specs: fetchedSpecs,
    } = filtersData.data;

    specs = fetchedSpecs;
    brands = fetchedBrands;
    products = data.products;
    priceRange = products.reduce(
      (acc) => {
        acc.min = Math.min(acc.min, minPrice);
        acc.max = Math.max(acc.max, maxPrice);
        return acc;
      },
      { min: Infinity, max: -Infinity }
    );
    priceRanges = generatePriceRanges(priceRange.min, priceRange.max);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="mx-auto max-w-7xl flex-1">
      <main className="mb-16">
        <NumResults
          results={displayResults}
          totalResults={displayTotalProducts}
        />
        <CategoryFilter />
        <SortSelector />
        <div className="grid grid-cols-[20fr_80fr] gap-x-6 py-7">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] h-fit shadow-md rounded-xl overflow-auto scrollbar-hide">
            <SideFilter
              brands={brands}
              priceRanges={priceRanges}
              specifications={specs}
            />
          </div>
          <ProductList
            products={products}
            totalResults={displayResults}
            resultsPerPage={resultsPerPage}
          />
        </div>
      </main>
    </div>
  );
}

import CategoryFilter from '@components/Products/CategoryFilter';
import SideFilter from '@components/Products/SideFilter';
import { getProducts } from '@libs/apiServices';
import ProductList from '@components/Products/ProductList';
import NumResults from '@components/Products/NumResults';
import { generatePriceRanges } from '@helpers/generatePriceRanges';
import SortSelector from '@components/Products/SortSelector';
import { Product } from '../_types/product';

export const revalidate = 1800;

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

async function Page({ searchParams }: Props) {
  let products: Product[] = [];
  let brands: string[] = [];
  let priceRange = { min: Infinity, max: -Infinity };
  let priceRanges: Array<{ min: number; max?: number }> = [];
  let displayResults = 0;
  let displayTotalResults = 0;

  try {
    const filters = await searchParams;
    console.log('filters', filters);

    const response = await getProducts(filters);
    const { data, results, totalResults } = response;
    displayResults = results;
    displayTotalResults = totalResults;

    products = data.products;
    brands = Array.from(new Set(products.map((product) => product.brand)));
    priceRange = products.reduce(
      (acc, product) => {
        acc.min = Math.min(acc.min, product.lowestPrice);
        acc.max = Math.max(acc.max, product.lowestPrice);
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
          totalResults={displayTotalResults}
        />
        <CategoryFilter />
        <SortSelector />
        <div className="grid grid-cols-[20fr_80fr] gap-x-6 py-7">
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] shadow-md">
            <SideFilter brands={brands} priceRanges={priceRanges} />
          </div>
          <ProductList products={products} totalResults={displayTotalResults} />
        </div>
      </main>
    </div>
  );
}

export default Page;

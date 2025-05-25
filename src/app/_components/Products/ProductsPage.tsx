import CategoryFilter from "@components/Products/CategoryFilter";
import SideFilter from "@components/Products/SideFilter";
import {
  getClientCategories,
  getFilterData,
  getProducts,
} from "@libs/apiServices";
import ProductList from "@components/Products/ProductList";
import NumResults from "@components/Products/NumResults";
import { generatePriceRanges } from "@helpers/generatePriceRanges";
import SortSelector from "@components/Products/SortSelector";
import { Product } from "../../_types/product";
import FilterButton from "./FilterButton";

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
  } = {};
  const filters = await searchParams;

  const { categories } = await getClientCategories();

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
      { min: Infinity, max: -Infinity },
    );
    priceRanges = generatePriceRanges(priceRange.min, priceRange.max);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="mx-auto max-w-7xl flex-1 xl:max-w-full xl:px-6 lg:px-3 sm:px-0">
      <main className="mb-16">
        <NumResults
          results={displayResults}
          totalResults={displayTotalProducts}
        />

        <div className="mb-14 max-w-full overflow-x-hidden lg:mb-4">
          <CategoryFilter categories={categories} />
        </div>
        <div className="hidden flex-col justify-between py-4 lg:flex sm:px-3">
          <p className="mb-2 hidden pl-2 font-thin md:block">
            {/* This will be rendered with client component */}
          </p>
          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex-[6]">
              <SortSelector />
            </div>
            <div className="md:flex-[4]">
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
        <div className="lg:hidden">
          <SortSelector />
        </div>
        <div className="grid grid-cols-[20fr_80fr] gap-x-6 py-7 xl:grid-cols-[25fr_75fr] lg:grid-cols-1 sm:px-3">
          <div className="sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-auto rounded-xl shadow-md scrollbar-hide lg:hidden">
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

import ProductsByCategory from "@/app/_components/Admin/Products/ProductsByCategory";
import ProductsOverview from "@/app/_components/Admin/Products/ProductsOverview";
import ProductsSold from "@/app/_components/Admin/Products/ProductsSold";
import ProductsTable from "@/app/_components/Admin/Products/ProductsTable";
import StockChart from "@/app/_components/Admin/Products/StockChart";
import CategoryFilter from "@/app/_components/Products/CategoryFilter";
import FilterButton from "@/app/_components/Products/FilterButton";
import SideFilter from "@/app/_components/Products/SideFilter";
import SortSelector from "@/app/_components/Products/SortSelector";
import { generatePriceRanges } from "@/app/_helpers/generatePriceRanges";
import {
  getCategories,
  getFilterData,
  getProducts,
  getProductsSummary,
  getStockData,
} from "@/app/_libs/apiServices";
import { cookies } from "next/headers";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";

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
  const token = cookiesStore.get("jwt")?.value || "";
  const filter = await searchParams;

  const [
    productsResponse,
    filterResponse,
    stockResponse,
    productSummaryResponse,
    categoriesResponse,
  ] = await Promise.all([
    getProducts(filter),
    getFilterData(filter),
    getStockData({ value: token }),
    getProductsSummary({ value: token }),
    getCategories({ value: token }),
  ]);

  // Check for errors in any of the API responses
  if (productsResponse.status === "error") {
    return (
      <ApiErrorDisplay
        error={productsResponse}
        title="Failed to Load Products"
      />
    );
  }

  if (filterResponse.status === "error") {
    return (
      <ApiErrorDisplay
        error={filterResponse}
        title="Failed to Load Filter Data"
      />
    );
  }

  if (stockResponse.status === "error") {
    return (
      <ApiErrorDisplay
        error={stockResponse}
        title="Failed to Load Stock Data"
      />
    );
  }

  if (productSummaryResponse.status === "error") {
    return (
      <ApiErrorDisplay
        error={productSummaryResponse}
        title="Failed to Load Product Summary"
      />
    );
  }
  if (categoriesResponse.status === "error") {
    return (
      <ApiErrorDisplay
        error={categoriesResponse}
        title="Failed to Load Categories"
      />
    );
  }

  const { categories } = categoriesResponse.data;
  const {
    data: { products, totalProducts, resultsPerPage },
  } = productsResponse;
  const { data: filtersData } = filterResponse;
  const { brands, minPrice, maxPrice, specs } = filtersData;
  const priceRange = products.reduce(
    (acc: { min: number; max: number }) => {
      acc.min = Math.min(acc.min, minPrice);
      acc.max = Math.max(acc.max, maxPrice);
      return acc;
    },
    { min: Infinity, max: -Infinity },
  );
  const priceRanges = generatePriceRanges(priceRange.min, priceRange.max);
  const {
    totalStock,
    totalOutStock,
    totalInStock,
    prediction: { predictions },
  } = productSummaryResponse;

  return (
    <div className="grid grid-cols-4 gap-6 p-6 xl:grid-cols-2 md:grid-cols-1">
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
      <div className="col-span-2 xl:col-span-1">
        <ProductsSold cookies={token} />
      </div>
      <div className="col-span-1">
        <StockChart data={stockResponse.data} />
      </div>
      <div className="col-span-full mt-14 max-w-full overflow-x-hidden">
        <CategoryFilter categories={categories} />
      </div>
      <div className="cols-span-full hidden py-4 lg:block">
        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex-[6]">
            <SortSelector />
          </div>
          <div className="whitespace-nowrap md:flex-[4]">
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
      <div className="col-span-full items-end lg:hidden">
        <SortSelector />
      </div>
      <div className="col-span-full grid grid-cols-[20fr_80fr] gap-x-6 xl:grid-cols-[25fr_75fr] lg:grid-cols-1">
        <div className="sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-auto rounded-xl shadow-md scrollbar-hide lg:hidden">
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

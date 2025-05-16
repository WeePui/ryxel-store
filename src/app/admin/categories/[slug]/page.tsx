import AddCategoryForm from '@/app/_components/Admin/Categories/AddCategoryForm';
import CategoryProducts from '@/app/_components/Admin/Categories/CategoryProducts';
import CategoryRevenue from '@/app/_components/Admin/Categories/CategoryRevenue';
import FilterButton from '@/app/_components/Products/FilterButton';
import SideFilter from '@/app/_components/Products/SideFilter';
import SortSelector from '@/app/_components/Products/SortSelector';
import Card from '@/app/_components/UI/Card';
import { generatePriceRanges } from '@/app/_helpers/generatePriceRanges';
import {
  getCategoryBySlug,
  getFilterData,
  getProducts,
} from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';

// const category = {
//   _id: '1',
//   name: 'Category 1',
//   description: 'Description for Category 1',
//   createdAt: '2023-01-01',
//   updatedAt: '2023-01-01',
//   slug: 'category-1',
//   image: '/anya-so-cute.jpg',
//   changeRate: -0.44,
//   revenue: -888888,
//   totalProducts: 0,
// };

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
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;

  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value || '';
  const filter = await searchParams;

  const { category } = await getCategoryBySlug(slug, { value: token });
  const {
    data: { products },
  } = await getProducts({
    ...filter,
    category: category.name,
  });
  const { data: filtersData } = await getFilterData({
    ...filter,
    category: category.name,
  });

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

  return (
    <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-1">
      <Card title="Chỉnh sửa danh mục" className="w-full h-fit">
        <AddCategoryForm category={category} />
      </Card>
      <CategoryRevenue cookies={token} />
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
        <CategoryProducts products={products} />
      </div>
    </div>
  );
}

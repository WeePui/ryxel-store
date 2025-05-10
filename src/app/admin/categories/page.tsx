import CategoryOverview from '@/app/_components/Admin/Categories/CategoryOverview';
import CategoryTable from '@/app/_components/Admin/Categories/CategoryTable';
import { getCategories } from '@/app/_libs/apiServices';
import { Category } from '@/app/_types/category';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value || '';
  if (!token) {
    throw new Error('No token found');
  }

  const { categories } = await getCategories({ value: token });
  const overviewData = categories.map(
    (category: Category & { sales: number }) => ({
      name: category.name,
      sales: category.sales,
    })
  );

  return (
    <div className="flex flex-col p-6 gap-6">
      <CategoryOverview data={overviewData} />
      <CategoryTable data={categories} />
    </div>
  );
}

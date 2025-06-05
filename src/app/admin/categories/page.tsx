import CategoryOverview from "@/app/_components/Admin/Categories/CategoryOverview";
import CategoryTable from "@/app/_components/Admin/Categories/CategoryTable";
import { getCategories } from "@/app/_libs/apiServices";
import { Category } from "@/app/_types/category";
import { cookies } from "next/headers";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";

export default async function Page() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt")?.value || "";
  if (!token) {
    throw new Error("No token found");
  }

  const categoriesData = await getCategories({ value: token });

  if (categoriesData.status === "error") {
    return <ApiErrorDisplay error={categoriesData} title="Categories Error" />;
  }

  const { categories } = categoriesData.data;
  const overviewData = categories.map(
    (category: Category & { sales: number }) => ({
      name: category.name,
      sales: category.sales,
    }),
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <CategoryOverview data={overviewData} />
      <CategoryTable data={categories} />
    </div>
  );
}

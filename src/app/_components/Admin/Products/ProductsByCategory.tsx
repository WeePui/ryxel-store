'use client';

import Card from '../../UI/Card';
import PieChart from '../../UI/PieChart';

interface ProductsByCategoryProps {
  categories: {
    name: string;
    totalProducts: number;
  }[];
}

export default function ProductsByCategory({
  categories,
}: ProductsByCategoryProps) {
  const categoriesData = categories.map((category) => ({
    name: category.name,
    value: category.totalProducts,
  }));

  return (
    <Card
      title="Sản phẩm theo danh mục"
      className="flex flex-col gap-6 flex-grow pb-10"
    >
      <PieChart data={categoriesData} isMoney={false} />
    </Card>
  );
}

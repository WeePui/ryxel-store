import React from 'react';
import Card from '../../UI/Card';
import CategoryStat from './CategoryStat';
import { Category } from '@/app/_types/category';

interface CategoryOverviewProps {
  data: Array<
    Category & { revenue: number; changeRate: number; totalProducts?: number }
  >;
}

export default function CategoryOverview({ data }: CategoryOverviewProps) {
  return (
    <Card title="Tổng quan" className="w-full">
      <ul className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-4">
        {data.map((category) => (
          <CategoryStat key={category._id} category={category} />
        ))}
      </ul>
    </Card>
  );
}

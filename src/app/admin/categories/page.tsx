import CategoryOverview from '@/app/_components/Admin/Categories/CategoryOverview';
import CategoryTable from '@/app/_components/Admin/Categories/CategoryTable';
import { Category } from '@/app/_types/category';
import React from 'react';

const data = [
  {
    _id: '1',
    name: 'Category 1',
    description: 'Description for Category 1',
    createdAt: '2023-01-01',
    slug: 'category-1',
    image: '/anya-so-cute.jpg',
    changeRate: -0.44,
    revenue: -888888,
    totalProducts: 0,
  },
  {
    _id: '2',
    name: 'Category 2',
    description: 'Description for Category 2',
    createdAt: '2023-01-03',
    slug: 'category-2',
    image: '/anya-so-cute.jpg',
    changeRate: -0.98,
    revenue: 12345678900,
    totalProducts: 12345,
  },
  {
    _id: '3',
    name: 'Category 3',
    description: 'Description for Category 3',
    createdAt: '2023-01-03',
    slug: 'category-3',
    image: '/anya-so-cute.jpg',
    changeRate: 0.1408,
    revenue: 9999999,
    totalProducts: 379,
  },
  {
    _id: '4',
    name: 'Category 4',
    description: 'Description for Category 4',
    createdAt: '2023-01-03',
    slug: 'category-4',
    image: '/anya-so-cute.jpg',
    changeRate: 0.67,
    revenue: 54654668,
    totalProducts: 2534,
  },
  {
    _id: '5',
    name: 'Category 5',
    description: 'Description for Category 5',
    createdAt: '2023-01-03',
    slug: 'category-5',
    image: '/anya-so-cute.jpg',
    changeRate: 0.5,
    revenue: 3654646,
    totalProducts: 8,
  },
] as Array<
  Category & { revenue: number; changeRate: number; totalProducts: number }
>;

export default function Page() {
  return (
    <div className="flex flex-col p-6 gap-6">
      <CategoryOverview data={data} />
      <CategoryTable data={data} />
    </div>
  );
}

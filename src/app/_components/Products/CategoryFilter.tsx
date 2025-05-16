'use client';

import Button from '../UI/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdCategory } from 'react-icons/md';
import { categoryIcons, categoryNames } from '@/app/_utils/mappingCategory';

interface CategoryFilterProps {
  categories: {
    name: string;
    slug: string;
    image: string;
  }[];
}

function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const router = useRouter();

  const handleFilter = function (category: string) {
    if (!category) return router.replace('products');

    const params = new URLSearchParams();
    params.set('category', category);
    router.replace(`products?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex h-20 items-center rounded-lg bg-grey-100 overflow-x-auto w-full lg:scrollbar-hide sm:rounded-none">
        <div className={`flex gap-2 px-5 md:px-2 flex-shrink-0`}>
          <Button
            type="filter"
            onClick={() => handleFilter('')}
            active={!currentCategory}
          >
            <span>Tất cả</span>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.slug}
              type="filter"
              onClick={() => handleFilter(category.slug)}
              active={category.slug === currentCategory}
            >
              {categoryIcons[category.slug] || <MdCategory />}
              <span>{categoryNames[category.slug]}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;

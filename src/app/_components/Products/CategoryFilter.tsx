'use client';

import {
  FaComputerMouse,
  FaKeyboard,
  FaHeadset,
  FaChair,
} from 'react-icons/fa6';
import { PiDeskBold } from 'react-icons/pi';
import Button from '../UI/Button';
import { useRouter, useSearchParams } from 'next/navigation';

function CategoryFilter() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const router = useRouter();

  const handleFilter = function (category: string) {
    if (!category) return router.replace('products');

    const params = new URLSearchParams();
    params.set('category', category);
    router.replace(`products?${params.toString()}`);
  };

  return (
    <div className="mb-14 flex h-20 items-center rounded-lg bg-grey-50">
      <div className="flex gap-2 px-5">
        <Button
          type="filter"
          onClick={() => handleFilter('')}
          active={!category}
        >
          <span>Tất cả</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('mouse')}
          active={category === 'mouse'}
        >
          <FaComputerMouse />
          <span>Chuột</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('keyboard')}
          active={category === 'keyboard'}
        >
          <FaKeyboard />
          <span>Bàn phím</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('headphone')}
          active={category === 'headphone'}
        >
          <FaHeadset />
          <span>Tai nghe</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('chair')}
          active={category === 'chair'}
        >
          <FaChair />
          <span>Ghế gaming</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('table')}
          active={category === 'table'}
        >
          <PiDeskBold className="text-xl" />
          <span>Bàn gaming</span>
        </Button>
      </div>
    </div>
  );
}

export default CategoryFilter;

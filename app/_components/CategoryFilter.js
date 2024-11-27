'use client';

import {
  FaComputerMouse,
  FaKeyboard,
  FaHeadset,
  FaChair,
} from 'react-icons/fa6';
import { PiDeskBold } from 'react-icons/pi';
import Button from './Button';
import { useRouter, useSearchParams } from 'next/navigation';

function CategoryFilter() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const router = useRouter();

  const handleFilter = function (category) {
    if (!category)
      return router.replace('products', undefined, { shallow: true });
    const params = new URLSearchParams();
    params.set('category', category);
    router.replace(`products?${params.toString()}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="mb-14 flex h-20 items-center rounded-lg bg-grey-50">
      <div className="flex gap-2 px-5">
        <Button
          type="filter"
          onClick={() => handleFilter('')}
          active={!category}
        >
          <span>All</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('mouse')}
          active={category === 'mouse'}
        >
          <FaComputerMouse />
          <span>Mouse</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('keyboard')}
          active={category === 'keyboard'}
        >
          <FaKeyboard />
          <span>Keyboard</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('headphone')}
          active={category === 'headphone'}
        >
          <FaHeadset />
          <span>Headphone</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('chair')}
          active={category === 'chair'}
        >
          <FaChair />
          <span>Gaming Chair</span>
        </Button>
        <Button
          type="filter"
          onClick={() => handleFilter('table')}
          active={category === 'table'}
        >
          <PiDeskBold className="text-xl" />
          <span>Gaming Table</span>
        </Button>
      </div>
    </div>
  );
}

export default CategoryFilter;

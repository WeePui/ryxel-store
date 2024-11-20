import {
  FaComputerMouse,
  FaKeyboard,
  FaHeadset,
  FaChair,
} from 'react-icons/fa6';
import { PiDeskBold } from 'react-icons/pi';

import CategoryButton from './CategoryButton';

function CategoryFilter() {
  return (
    <div className="h-20 bg-grey-50 rounded-lg flex items-center mb-14">
      <div className="px-5 flex gap-2">
        <CategoryButton>
          <FaComputerMouse />
          <span>Mouse</span>
        </CategoryButton>
        <CategoryButton>
          <FaKeyboard />
          <span>Keyboard</span>
        </CategoryButton>
        <CategoryButton>
          <FaHeadset />
          <span>Headphone</span>
        </CategoryButton>
        <CategoryButton>
          <FaChair />
          <span>Gaming Chair</span>
        </CategoryButton>
        <CategoryButton>
          <PiDeskBold className="text-xl" />
          <span>Gaming Table</span>
        </CategoryButton>
      </div>
    </div>
  );
}

export default CategoryFilter;

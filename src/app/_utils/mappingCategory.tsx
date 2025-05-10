import { JSX } from 'react';
import {
  FaChair,
  FaComputerMouse,
  FaGears,
  FaHeadset,
  FaKeyboard,
} from 'react-icons/fa6';
import { PiDeskBold } from 'react-icons/pi';

export const categoryIcons: Record<string, JSX.Element> = {
  mouse: <FaComputerMouse />,
  keyboard: <FaKeyboard />,
  headphone: <FaHeadset />,
  chair: <FaChair />,
  table: <PiDeskBold className="text-xl" />,
  accessory: <FaGears />,
};

export const categoryNames: Record<string, string> = {
  mouse: 'Chuột',
  keyboard: 'Bàn phím',
  headphone: 'Tai nghe',
  chair: 'Ghế',
  table: 'Bàn',
  accessory: 'Phụ kiện',
};

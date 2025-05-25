import { JSX } from "react";
import {
  FaChair,
  FaComputerMouse,
  FaGears,
  FaHeadset,
  FaKeyboard,
} from "react-icons/fa6";
import { PiDeskBold } from "react-icons/pi";

export const categoryIcons: Record<string, JSX.Element> = {
  Chuột: <FaComputerMouse />,
  "Bàn phím": <FaKeyboard />,
  "Tai nghe": <FaHeadset />,
  Ghế: <FaChair />,
  Bàn: <PiDeskBold className="text-xl" />,
  "Phụ kiện": <FaGears />,
};

export const categoryNames: Record<string, string> = {
  mouse: "Chuột",
  keyboard: "Bàn phím",
  headphone: "Tai nghe",
  chair: "Ghế",
  table: "Bàn",
  accessory: "Phụ kiện",
};

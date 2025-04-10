'use client';

import { useRouter } from 'next/navigation';
import { FaMouse } from 'react-icons/fa';
import { FaChair, FaGears, FaHeadphones, FaKeyboard } from 'react-icons/fa6';
import { PiDeskBold } from 'react-icons/pi';

export default function HotCategoriesSection() {
  const router = useRouter();

  return (
    <section className="max-w-7xl w-full mx-auto bg-[#fefefe] py-14 mt-14 rounded-2xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] px-10 bg-gradient-to-b from-slate-100 to-white">
      <p className="text-center font-title text-3xl font-semibold">
        Danh mục nổi bật
      </p>
      <div className="grid grid-cols-6 gap-4 mt-10 content-center">
        <div
          className="flex flex-col items-center justify-center p-4 gap-4 bg-white/5 rounded-xl shadow hover:scale-105 transition-transform"
          role="button"
          onClick={() => router.push('/products?category=mouse')}
        >
          <FaMouse className="text-7xl" />
          <p className="text-lg font-semibold">Chuột Gaming</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-4 gap-4 bg-white/5 rounded-xl shadow hover:scale-105 transition-transform"
          role="button"
          onClick={() => router.push('/products?category=keyboard')}
        >
          <FaKeyboard className="text-7xl" />
          <p className="text-lg font-semibold">Bàn phím cơ</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-4 gap-4 bg-white/5 rounded-xl shadow hover:scale-105 transition-transform"
          role="button"
          onClick={() => router.push('/products?category=headphone')}
        >
          <FaHeadphones className="text-7xl" />
          <p className="text-lg font-semibold">Tai nghe</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-4 gap-4 bg-white/5 rounded-xl shadow hover:scale-105 transition-transform"
          role="button"
          onClick={() => router.push('/products?category=desk')}
        >
          <PiDeskBold className="text-7xl" />
          <p className="text-lg font-semibold">Bàn</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-4 gap-4 bg-white/5 rounded-xl shadow hover:scale-105 transition-transform"
          role="button"
          onClick={() => router.push('/products?category=chair')}
        >
          <FaChair className="text-7xl" />
          <p className="text-lg font-semibold">Ghế</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-4 gap-4 bg-white/5 rounded-xl shadow hover:scale-105 transition-transform"
          role="button"
          onClick={() => router.push('/products?category=accessory')}
        >
          <FaGears className="text-7xl" />
          <p className="text-lg font-semibold">Phụ kiện</p>
        </div>
      </div>
    </section>
  );
}

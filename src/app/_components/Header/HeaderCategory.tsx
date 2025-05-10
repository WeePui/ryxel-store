'use client';

import Image from 'next/image';
import NavLink from '../UI/NavLink';
import { useRouter } from 'next/navigation';

export default function HeaderCategory() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = target.id;
    if (id) {
      router.push(`/products?category=${id}`);
    }
  };

  return (
    <div className="fixed left-0 p-4 bg-grey-50 w-full mx-auto z-10 shadow-md border-b border-primary-200 ">
      <div className="grid grid-cols-[60fr_40fr] divide-x divide-primary-200 max-w-7xl mx-auto">
        <div className="p-6" onClick={handleClick}>
          <h1 className="mb-4 text-xl">Mua sắm theo danh mục</h1>
          <div className="flex">
            <div className="grid grid-cols-3 gap-x-12 gap-y-6 justify-start w-fit">
              <div
                className="flex flex-col gap-2 items-center w-fit group"
                id="mouse"
                role="button"
              >
                <div className="relative w-32 aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
                  <Image
                    src={'/categories/mouse-category.jpg'}
                    alt="Chuột Gaming"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">Chuột Gaming</p>
              </div>
              <div
                className="flex flex-col gap-2 items-center w-fit group"
                id="keyboard"
                role="button"
              >
                <div className="relative w-32 aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
                  <Image
                    src={'/categories/keyboard-category.jpg'}
                    alt="Bàn phím"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">Bàn phím</p>
              </div>
              <div
                className="flex flex-col gap-2 items-center w-fit group"
                role="button"
                id="headphone"
              >
                <div className="relative w-32 aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
                  <Image
                    src={'/categories/headset-category.jpg'}
                    alt="Tai nghe"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">Tai nghe</p>
              </div>
              <div
                className="flex flex-col gap-2 items-center w-fit group"
                role="button"
                id="table"
              >
                <div className="relative w-32 aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
                  <Image
                    src={'/categories/table-category.jpg'}
                    alt="Bàn Gaming"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">Bàn Gaming</p>
              </div>
              <div
                className="flex flex-col gap-2 items-center w-fit group"
                role="button"
                id="chair"
              >
                <div className="relative w-32 aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
                  <Image
                    src={'/categories/chair-category.jpg'}
                    alt="Ghế Gaming"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">Ghế Gaming</p>
              </div>
              <div
                className="flex flex-col gap-2 items-center w-fit group"
                role="button"
                id="accessory"
              >
                <div className="relative w-32 aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
                  <Image
                    src={'/categories/accessory-category.jpg'}
                    alt="Phụ kiện"
                    className="object-cover"
                    fill
                  />
                </div>
                <p className="text-base group-hover:underline">Phụ kiện</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-fit ml-12">
              <NavLink href="/products?brand=Logitech">
                <span className="text-base">Logitech</span>
              </NavLink>
              <NavLink href="/products?brand=Razer">
                <span className="text-base">Razer</span>
              </NavLink>
              <NavLink href="/products?brand=Steelseries">
                <span className="text-base">SteelSeries</span>
              </NavLink>
              <NavLink href="/products?brand=ASUS">
                <span className="text-base">ASUS</span>
              </NavLink>
              <NavLink href="/products?brand=HyperWork">
                <span className="text-base">HyperWork</span>
              </NavLink>
              <NavLink href="/products?brand=AKKO">
                <span className="text-base">AKKO</span>
              </NavLink>
              <NavLink href="/products?brand=Corsair">
                <span className="text-base">Corsair</span>
              </NavLink>
              <NavLink href="/products?brand=Pulsar">
                <span className="text-base">Pulsar</span>
              </NavLink>
              <NavLink href="/products?brand=HyperX">
                <span className="text-base">HyperX</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="p-6 pl-12">
          <h1 className="text-xl">Tham khảo</h1>
          <div className="flex flex-col gap-2 mt-4">
            <NavLink href="/products?sort=-sold" type="mainNavInline">
              <span className="text-base">Sản phẩm bán chạy</span>
            </NavLink>
            <NavLink
              href={`/products?specs=%7B"sound"%3A"Apple+Spacial+Sound"%7D`}
              type="mainNavInline"
            >
              <span className="text-base">Apple Spacial Sound</span>
            </NavLink>
            <NavLink
              href={`/products?specs=%7B"material"%3A"Steel%2FFabric"%7D`}
              type="mainNavInline"
            >
              <span className="text-base">Bền bỉ tuyệt đối</span>
            </NavLink>
            <NavLink href="/products?brand=Sennheiser" type="mainNavInline">
              <span className="text-base">Đối tác chính hãng Sennheiser</span>
            </NavLink>
            <NavLink
              href={`/products?specs=%7B"connection"%3A"Wireless"%7D`}
              type="mainNavInline"
            >
              <span className="text-base">Trải nghiệm không dây</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

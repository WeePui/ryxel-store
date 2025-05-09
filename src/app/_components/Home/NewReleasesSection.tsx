'use client';

import formatMoney from '@/app/_utils/formatMoney';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCircleChevronRight } from 'react-icons/fa6';

export default function NewReleasesSection() {
  const router = useRouter();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20 lg:py-16 md:py-12 sm:py-10">
      <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl h-[20rem] flex items-center lg:h-[18rem] md:h-[16rem] sm:h-auto">
        <Image
          src="/steelseries-new-release.jpg"
          alt="Chuột Ryxel Aether RGB"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 px-10 md:px-6 sm:px-4 text-white max-w-xl sm:max-w-full">
          <span className="uppercase text-sm tracking-wider text-primary font-semibold">
            Mới cập bến
          </span>
          <h2 className="text-3xl font-bold mt-6">
            Tai nghe Steelseries Arctis Nova Pro Wireless
          </h2>
          <p
            className="mt-4 text-base text-white/90 md:hidden
          "
          >
            Micro ClearCast Gen 2 mang đến trải nghiệm giao tiếp không gián
            đoạn, Dolby Atmos cho âm thanh vòm 7.1, và công nghệ Active Noise
            Cancellation.
          </p>
          <div
            className="mt-6 flex items-center gap-4 md:justify-between
            "
          >
            <span className="text-xl font-semibold text-primary-light">
              {formatMoney(9490000)}
            </span>
            <button
              className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition flex items-center gap-2"
              onClick={() =>
                router.push(
                  '/products/tai-nghe-steelseries-arctis-nova-pro-wireless'
                )
              }
            >
              Mua ngay <FaCircleChevronRight className="mt-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

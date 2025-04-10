import HeroSlider from '@components/Home/HeroSlider';
import BestsellerSection from './_components/Home/BestsellerSection';
import HotCategoriesSection from './_components/Home/HotCategoriesSection';
import TestimonialSection from './_components/Home/TestimonialSection';
import NewReleasesSection from './_components/Home/NewReleasesSection';
import FeaturesSeciton from './_components/Home/FeaturesSeciton';

const slides = [
  {
    title: 'Chúng tôi ở đây để nâng tầm trải nghiệm của bạn',
    subTitle: 'Không Chỉ Là Gears, Mà Là Phong Cách Của Bạn',
    image: '/hero-1.jpg',
    slideButtonContent: 'Đi tới cửa hàng',
    href: '/products',
  },
  {
    title: 'Bạn cũng là một tuyển thủ tiềm năng',
    subTitle: 'Thử ngay chuột của Wee - Quán quân The Lake Village Tournament',
    image: '/hero-2.jpg',
    slideButtonContent: 'Trở thành nhà vô địch',
    href: '/products/637c7f8a14b63b001c7e9d24',
  },
  {
    title: 'Tạo nên sự khác biệt',
    subTitle: 'Chúng tôi hân hạnh mang đến dịch vụ tốt nhất cho bạn',
    image: '/hero-3.jpg',
    slideButtonContent: 'Sẵn sàng thay đổi',
    href: '/products?category=accessory',
  },
];

export default async function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-gray-800">
        <HeroSlider slides={slides} />
      </section>
      <HotCategoriesSection />
      <NewReleasesSection />
      <BestsellerSection />
      <FeaturesSeciton />
      <TestimonialSection />
    </div>
  );
}

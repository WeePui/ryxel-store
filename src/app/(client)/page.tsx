import HeroSlider from "@components/Home/HeroSlider";
import BestsellerSection from "../_components/Home/BestsellerSection";
import HotCategoriesSection from "../_components/Home/HotCategoriesSection";
import TestimonialSection from "../_components/Home/TestimonialSection";
import NewReleasesSection from "../_components/Home/NewReleasesSection";
import FeaturesSection from "../_components/Home/FeaturesSection";

const slides = [
  {
    title: "Chúng tôi ở đây để nâng tầm trải nghiệm của bạn",
    subTitle: "Không Chỉ Là Gears, Mà Là Phong Cách Của Bạn",
    image: "/hero-1.jpg",
    slideButtonContent: "Đi tới cửa hàng",
    href: "/products",
  },
  {
    title: "Bạn cũng là một tuyển thủ tiềm năng",
    subTitle: "Thử ngay chuột của Wee - Quán quân The Lake Village Tournament",
    image: "/hero-2.jpg",
    slideButtonContent: "Trở thành nhà vô địch",
    href: "/products/chuot-gaming-co-day-hyperx-pulsefire-haste-ii",
  },
  {
    title: "Tạo nên sự khác biệt",
    subTitle: "Chúng tôi hân hạnh mang đến dịch vụ tốt nhất cho bạn",
    image: "/hero-3.jpg",
    slideButtonContent: "Sẵn sàng thay đổi",
    href: "/products?category=Accessory",
  },
];

export default async function Home() {
  return (
    <>
      <section className="relative flex h-[calc(100dvh-4rem)] xl:h-[60vh] sm:h-[70vh] w-full items-center justify-center overflow-hidden bg-gray-800">
        <HeroSlider slides={slides} />
      </section>
      <HotCategoriesSection />
      <NewReleasesSection />
      <BestsellerSection />
      <FeaturesSection />
      <TestimonialSection />
    </>
  );
}

import HeroSlider from '@components/Home/HeroSlider';

const slides = [
  {
    title: 'We are here to level up your gaming experience',
    subTitle: 'Not Only Gears, We Provide Experiences',
    image: '/hero-1.jpg',
    slideButtonContent: 'Go to Store',
  },
  {
    title: 'Super Crazy Fast Gaming Mouse',
    subTitle: "Try out Wee's mouse - Champion of the Lake Village Tournament",
    image: '/hero-2.jpg',
    slideButtonContent: 'Be a Champion',
  },
  {
    title: 'Customize Your Gear, Customize Your Style',
    subTitle: 'We provide the best customization service in the market',
    image: '/hero-3.jpg',
    slideButtonContent: 'Ready to Change',
  },
];

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-gray-800">
        <HeroSlider slides={slides} />
      </section>
    </div>
  );
}

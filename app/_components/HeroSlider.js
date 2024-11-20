'use client';

import Image from 'next/image';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import Button from '@components/Button';

const HeroContext = createContext();

function HeroSlider({ children, slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  });
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const toSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(
    function () {
      const interval = setInterval(nextSlide, 5000);

      return () => clearInterval(interval);
    },
    [nextSlide],
  );

  return (
    <HeroContext.Provider
      value={{ slides, currentSlide, nextSlide, prevSlide, toSlide }}
    >
      <SlideImage />
      <div className="absolute rounded-xl inset-0 bg-grey-600 opacity-40 z-10" />

      <Slider />

      <button
        onClick={prevSlide}
        className="absolute left-5 text-primary-400 bg-secondary-200 w-12 h-12 rounded-full flex justify-center items-center text-xl z-20"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 text-primary-400 bg-secondary-200 w-12 h-12 rounded-full flex justify-center items-center text-xl z-20"
      >
        <FaChevronRight />
      </button>

      <Navigation />
    </HeroContext.Provider>
  );
}

function SlideImage() {
  const { slides, currentSlide } = useContext(HeroContext);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.image}
          alt={slide.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
            currentSlide === index
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-0'
          }`}
          fill
        />
      ))}
    </div>
  );
}

function Slider() {
  const { slides, currentSlide } = useContext(HeroContext);

  return (
    <div className="absolute flex flex-col gap-10 items-center z-20">
      <p className="text-primary-50 text-lg font-semibold font-title">
        {slides[currentSlide].subTitle}
      </p>
      <p className="text-primary-50 text-4xl font-bold font-title">
        {slides[currentSlide].title}
      </p>
      <Button
        type="primary"
        className="bg-secondary-200 px-4 py-2 inline-flex rounded-lg items-center justify-center hover:bg-transparent text-primary-400 font-bold hover:text-secondary-100 shadow-lg transition-shadow"
      >
        {slides[currentSlide].slideButtonContent}
      </Button>
    </div>
  );
}

function Navigation() {
  const { slides, currentSlide, toSlide } = useContext(HeroContext);

  return (
    <div className="absolute bottom-4 flex gap-4 z-20">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => toSlide(index)}
          className={`w-3 h-3 rounded-full ${
            currentSlide === index ? 'bg-primary-100' : 'bg-primary-400'
          }`}
        />
      ))}
    </div>
  );
}

export default HeroSlider;

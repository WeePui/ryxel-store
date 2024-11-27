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
      <div className="absolute inset-0 z-10 rounded-xl bg-grey-600 opacity-40" />

      <Slider />

      <button
        onClick={prevSlide}
        className="absolute left-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-xl text-primary-400"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-xl text-primary-400"
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
    <div className="relative h-full w-full overflow-hidden">
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.image}
          alt={slide.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-in-out ${
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
    <div className="absolute z-20 flex flex-col items-center gap-10">
      <p className="font-title text-lg font-semibold text-primary-50">
        {slides[currentSlide].subTitle}
      </p>
      <p className="font-title text-4xl font-bold text-primary-50">
        {slides[currentSlide].title}
      </p>
      <Button
        type="primaryOnTheDark"
        className="inline-flex items-center justify-center rounded-lg bg-secondary-200 px-4 py-2 font-bold text-primary-400 shadow-lg transition-shadow hover:bg-transparent hover:text-secondary-100"
      >
        {slides[currentSlide].slideButtonContent}
      </Button>
    </div>
  );
}

function Navigation() {
  const { slides, currentSlide, toSlide } = useContext(HeroContext);

  return (
    <div className="absolute bottom-4 z-20 flex gap-4">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => toSlide(index)}
          className={`h-3 w-3 rounded-full ${
            currentSlide === index ? 'bg-primary-100' : 'bg-primary-400'
          }`}
        />
      ))}
    </div>
  );
}

export default HeroSlider;

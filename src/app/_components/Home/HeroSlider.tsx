"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import Button from "@components/UI/Button";

interface Slide {
  image: string;
  title: string;
  subTitle: string;
  href: string;
  slideButtonContent: string;
}

interface HeroContextType {
  slides: Slide[];
  currentSlide: number;
  nextSlide: () => void;
  prevSlide: () => void;
  toSlide: (index: number) => void;
}

interface HeroSliderProps {
  children?: ReactNode;
  slides: Slide[];
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const toSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <HeroContext.Provider
      value={{ slides, currentSlide, nextSlide, prevSlide, toSlide }}
    >
      <SlideImage />
      <div className="absolute inset-0 z-10 rounded-xl bg-grey-600 opacity-40" />

      <Slider />

      <button
        onClick={prevSlide}
        className="absolute left-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-xl text-primary-400 xl:hidden"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-xl text-primary-400 xl:hidden"
      >
        <FaChevronRight />
      </button>

      <Navigation />
    </HeroContext.Provider>
  );
}

function SlideImage() {
  const context = useContext(HeroContext);

  if (!context) {
    throw new Error("SlideImage must be used within a HeroContext.Provider");
  }

  const { slides, currentSlide } = context;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.image}
          alt={slide.title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out ${
            currentSlide === index
              ? "scale-100 opacity-100"
              : "scale-125 opacity-0"
          }`}
          fill
        />
      ))}
    </div>
  );
}

function Slider() {
  const context = useContext(HeroContext);

  if (!context) {
    throw new Error("Slider must be used within a HeroContext.Provider");
  }

  const { slides, currentSlide } = context;

  return (
    <div className="absolute z-20 flex max-w-[90%] flex-col items-center gap-6 px-2 text-center xl:gap-10 sm:max-w-xl sm:gap-8">
      <p className="font-title text-xl font-semibold text-primary-50 xl:text-base">
        {slides[currentSlide].subTitle}
      </p>
      <p className="font-title text-5xl font-bold text-primary-50 xl:text-2xl">
        {slides[currentSlide].title}
      </p>
      <Button
        variant="primaryOnDark"
        href={slides[currentSlide].href}
        size="large"
        // className="px-4 py-2 text-sm xl:px-6 xl:py-3 sm:text-base"
      >
        {slides[currentSlide].slideButtonContent}
      </Button>
    </div>
  );
}

function Navigation() {
  const context = useContext(HeroContext);

  if (!context) {
    throw new Error("Navigation must be used within a HeroContext.Provider");
  }

  const { slides, currentSlide, toSlide } = context;

  return (
    <div className="absolute bottom-2 z-20 flex gap-2 sm:bottom-4 sm:gap-4">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => toSlide(index)}
          className={`h-3 w-3 rounded-full ${
            currentSlide === index ? "bg-primary-100" : "bg-primary-400"
          }`}
        />
      ))}
    </div>
  );
}

export default HeroSlider;

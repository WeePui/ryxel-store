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
import { motion, AnimatePresence } from "framer-motion";

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
      <motion.div
        className="absolute inset-0 z-10 rounded-xl bg-grey-600 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.8 }}
      />

      <Slider />

      <motion.button
        onClick={prevSlide}
        className="absolute left-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-xl text-primary-400 xl:hidden"
        whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaChevronLeft />
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-200 text-xl text-primary-400 xl:hidden"
        whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaChevronRight />
      </motion.button>

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
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            currentSlide === index && (
              <motion.div
                key={`slide-${index}`}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                  fill
                  priority
                />
              </motion.div>
            ),
        )}
      </AnimatePresence>
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
      <AnimatePresence mode="wait">
        <motion.p
          key={`subtitle-${currentSlide}`}
          className="font-title text-xl font-semibold text-primary-50 xl:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {slides[currentSlide].subTitle}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`title-${currentSlide}`}
          className="font-title text-5xl font-bold text-primary-50 xl:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {slides[currentSlide].title}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`button-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant="primaryOnDark"
            href={slides[currentSlide].href}
            size="large"
            className="transition-transform hover:scale-105"
          >
            {slides[currentSlide].slideButtonContent}
          </Button>
        </motion.div>
      </AnimatePresence>
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
    <motion.div
      className="absolute bottom-2 z-20 flex gap-2 sm:bottom-4 sm:gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {slides.map((_, index) => (
        <motion.button
          key={index}
          onClick={() => toSlide(index)}
          className={`h-3 w-3 rounded-full ${
            currentSlide === index ? "bg-primary-100" : "bg-primary-400"
          }`}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          animate={currentSlide === index ? { scale: [1, 1.2, 1] } : {}}
          transition={
            currentSlide === index
              ? {
                  scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }
              : { scale: { duration: 0.2 } }
          }
        />
      ))}
    </motion.div>
  );
}

export default HeroSlider;

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleThumbnailClick = (clickedImage: string) => {
    const newIndex = images.indexOf(clickedImage);
    setSlideDirection("");
    setTimeout(() => {
      setSlideDirection(newIndex > currentIndex ? "right" : "left");
      setCurrentIndex(newIndex);
    }, 0);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSlideDirection("");
    setTimeout(() => {
      setSlideDirection("right");
      setCurrentIndex(newIndex);
    }, 0);
  };

  const handlePrevClick = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSlideDirection("");
    setTimeout(() => {
      setSlideDirection("left");
      setCurrentIndex(newIndex);
    }, 0);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const mainImage = images[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const minSwipeDistance = 100;
    const deltaX = touchStartX - touchEndX;

    // Swipe sang trái (next)
    if (deltaX > minSwipeDistance) {
      handleNextClick();
    }
    // Swipe sang phải (prev)
    else if (deltaX < -minSwipeDistance) {
      handlePrevClick();
    }
  };
  return (
    <motion.div
      className="flex w-full flex-col items-center pr-10 lg:pr-0"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex aspect-video h-96 w-full min-w-0 flex-col overflow-hidden lg:h-64">
        <AnimatePresence mode="wait">
          <motion.div
            className="absolute inset-0 flex"
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`zoom-container relative ${isZoomed ? "zoomed" : ""} ${
                slideDirection === "right" ? "slide-right" : "slide-left"
              } aspect-video h-96 w-full overflow-hidden lg:h-64`}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: isZoomed ? 1 : 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={mainImage}
                alt={alt}
                className="object-contain"
                style={{
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                fill
              />
            </motion.div>
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-full transform rounded-full bg-primary-default p-3 text-white hover:bg-grey-200 hover:text-primary-400 lg:hidden"
              onClick={handlePrevClick}
              aria-label={t("carousel.previous")}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f5f5f5",
                color: "#3a5697",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              className="absolute right-0 top-1/2 -translate-x-full -translate-y-1/2 transform rounded-full bg-primary-default p-3 text-white hover:bg-grey-200 hover:text-primary-400 lg:hidden"
              onClick={handleNextClick}
              aria-label={t("carousel.next")}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#f5f5f5",
                color: "#3a5697",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChevronRight />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        className="mt-4 flex flex-wrap items-center gap-4 sm:justify-center sm:gap-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {images.map((image, index) => (
          <motion.div
            className={`group relative h-16 w-28 overflow-hidden rounded-2xl border-2 border-grey-100 lg:h-12 lg:w-20`}
            key={image}
            onClick={() => handleThumbnailClick(image)}
            aria-label={t("carousel.thumbnail").replace(
              "{index}",
              (index + 1).toString(),
            )}
            role="button"
            tabIndex={0}
            whileHover={{ scale: 1.1, borderColor: "#3a5697" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Image
              src={image}
              alt={`${alt} image ${index + 1}`}
              fill
              className="object-contain"
            />
            {image === mainImage && (
              <motion.span
                className="absolute bottom-0 left-0 h-1 w-full bg-primary-500"
                layoutId="selectedImage"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              ></motion.span>
            )}
            <span className="absolute bottom-0 left-0 h-1 w-full origin-bottom-left scale-y-0 bg-primary-500 transition-transform duration-500 group-hover:scale-y-100"></span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default ImageCarousel;

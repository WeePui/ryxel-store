'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (clickedImage: string) => {
    const newIndex = images.indexOf(clickedImage);
    setSlideDirection('');
    setTimeout(() => {
      setSlideDirection(newIndex > currentIndex ? 'right' : 'left');
      setCurrentIndex(newIndex);
    }, 0);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSlideDirection('');
    setTimeout(() => {
      setSlideDirection('right');
      setCurrentIndex(newIndex);
    }, 0);
  };

  const handlePrevClick = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSlideDirection('');
    setTimeout(() => {
      setSlideDirection('left');
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

  return (
    <div className="flex flex-col items-center pr-10 lg:pr-0 w-full">
      <div className="relative flex aspect-video h-96 lg:h-64 w-full min-w-0 flex-col overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-500">
          <div
            className={`zoom-container relative ${isZoomed ? 'zoomed' : ''} ${
              slideDirection === 'right' ? 'slide-right' : 'slide-left'
            } aspect-video h-96 lg:h-64 w-full overflow-hidden`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
          </div>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-full transform rounded-full bg-primary-default p-3 text-white hover:bg-grey-200 hover:text-primary-400 lg:hidden"
            onClick={handlePrevClick}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-x-full -translate-y-1/2 transform rounded-full bg-primary-default p-3 text-white hover:bg-grey-200 hover:text-primary-400 lg:hidden"
            onClick={handleNextClick}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="items-center flex gap-4">
        {images.map((image, index) => (
          <div
            className={`group relative h-16 w-28 lg:h-12 lg:w-20 overflow-hidden rounded-2xl border-2 border-grey-100 transition-all duration-300 hover:scale-110`}
            key={image}
            onClick={() => handleThumbnailClick(image)}
          >
            <Image
              src={image}
              alt={`${alt} image ${index}`}
              fill
              className="object-contain"
            />
            {image === mainImage && (
              <span className="absolute bottom-0 left-0 h-1 w-full bg-primary-500"></span>
            )}
            <span className="absolute bottom-0 left-0 h-1 w-full origin-bottom-left scale-y-0 bg-primary-500 transition-transform duration-500 group-hover:scale-y-100"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;

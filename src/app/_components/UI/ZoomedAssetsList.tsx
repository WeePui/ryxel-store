import Image from 'next/image';
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface ZoomedAssetsListProps {
  assets: Array<string>;
  initialIndex?: number;
}

export default function ZoomedAssetsList({
  assets,
  initialIndex = 0,
}: ZoomedAssetsListProps) {
  const [assetIndex, setAssetIndex] = useState(initialIndex);

  const handleNext = () => {
    setAssetIndex((prevIndex) => (prevIndex + 1) % assets.length);
  };

  const handlePrev = () => {
    setAssetIndex(
      (prevIndex) => (prevIndex - 1 + assets.length) % assets.length
    );
  };

  const isVideo = (url: string) => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extension = url.split('.').pop()?.toLowerCase();
    return extension ? videoExtensions.includes(extension) : false;
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-[360px] w-[720px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative aspect-video w-full h-full">
        {isVideo(assets[assetIndex]) ? (
          <video
            src={assets[assetIndex]}
            controls
            className="w-full h-full rounded-md"
          />
        ) : (
          <Image
            src={assets[assetIndex]}
            alt={`Zoomed asset ${assetIndex + 1}`}
            fill
            className="w-96 h-44 rounded-md"
          />
        )}
      </div>
      <button
        onClick={handlePrev}
        className="p-4 bg-white rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow-lg text-primary-500 text-lg "
      >
        <FaChevronLeft className="stroke-2" />
      </button>
      <button
        onClick={handleNext}
        className="p-4 bg-white rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 shadow-md text-primary-500 text-lg"
      >
        <FaChevronRight className="stroke-2" />
      </button>
    </div>
  );
}

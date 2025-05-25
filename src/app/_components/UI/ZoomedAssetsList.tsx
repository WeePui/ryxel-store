"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

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
      (prevIndex) => (prevIndex - 1 + assets.length) % assets.length,
    );
  };

  const isVideo = (url: string) => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    const extension = url.split(".").pop()?.toLowerCase();
    return extension ? videoExtensions.includes(extension) : false;
  };
  return (
    <motion.div
      className="relative flex h-[360px] w-[720px] flex-col items-center justify-center"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={assetIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {isVideo(assets[assetIndex]) ? (
              <video
                src={assets[assetIndex]}
                controls
                className="h-full w-full rounded-md"
              />
            ) : (
              <Image
                src={assets[assetIndex]}
                alt={`Zoomed asset ${assetIndex + 1}`}
                fill
                className="h-44 w-96 rounded-md"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {assetIndex > 0 && (
        <motion.button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-4 text-lg text-primary-500 shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronLeft className="stroke-2" />
        </motion.button>
      )}
      {assetIndex < assets.length - 1 && (
        <motion.button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white p-4 text-lg text-primary-500 shadow-md"
          whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {" "}
          <FaChevronRight className="stroke-2" />
        </motion.button>
      )}
    </motion.div>
  );
}

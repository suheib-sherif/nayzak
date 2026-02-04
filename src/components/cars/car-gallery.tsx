"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarGalleryProps {
  images: { url: string; alt?: string | null; isPrimary: boolean }[];
  title: string;
}

export function CarGallery({ images, title }: CarGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-lg bg-gray-100">
        <Car className="h-24 w-24 text-gray-300" />
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt || title}
          className="h-full w-full object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 start-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                currentIndex === index
                  ? "border-primary-500"
                  : "border-transparent hover:border-gray-300"
              )}
            >
              <img
                src={image.url}
                alt={image.alt || `${title} - صورة ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

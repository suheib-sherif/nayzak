"use client";

import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Loader2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedImage {
  url: string;
  isPrimary: boolean;
  order: number;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "فشل رفع الصورة");
        return null;
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      alert("حدث خطأ أثناء رفع الصورة");
      return null;
    }
  };

  const handleFiles = async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      alert(`الحد الأقصى هو ${maxImages} صور`);
      return;
    }

    setIsUploading(true);

    const newImages: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) {
        newImages.push({
          url,
          isPrimary: images.length === 0 && newImages.length === 0,
          order: images.length + newImages.length,
        });
      }
    }

    onChange([...images, ...newImages]);
    setIsUploading(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [images, onChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);

    // If we removed the primary image, set the first remaining as primary
    if (images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }

    // Reorder
    newImages.forEach((img, i) => {
      img.order = i;
    });

    onChange(newImages);
  };

  const setPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
          dragOver
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100",
          isUploading && "pointer-events-none opacity-50"
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={isUploading}
        />

        {isUploading ? (
          <>
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary-500" />
            <p className="text-sm text-gray-600">جاري رفع الصور...</p>
          </>
        ) : (
          <>
            <Upload className="mb-4 h-12 w-12 text-gray-400" />
            <p className="mb-1 text-sm font-medium text-gray-700">
              اسحب الصور هنا أو انقر للاختيار
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, WebP (الحد الأقصى 5 ميجابايت لكل صورة)
            </p>
          </>
        )}
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={image.url}
              className={cn(
                "group relative aspect-[4/3] overflow-hidden rounded-lg border-2",
                image.isPrimary ? "border-primary-500" : "border-gray-200"
              )}
            >
              <img
                src={image.url}
                alt={`صورة ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {/* Primary Badge */}
              {image.isPrimary && (
                <div className="absolute start-2 top-2 rounded bg-primary-600 px-2 py-1 text-xs font-medium text-white">
                  رئيسية
                </div>
              )}

              {/* Actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                {!image.isPrimary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(index)}
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                  >
                    تعيين كرئيسية
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-lg bg-red-600 p-1.5 text-white hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">
        {images.length} من {maxImages} صور مرفوعة
      </p>
    </div>
  );
}

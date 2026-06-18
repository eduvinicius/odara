"use client";

import { useState } from "react";
import type { ImageGalleryProps } from "./imageGallery.types";

export function ImageGallery({ images, productName }: Readonly<ImageGalleryProps>) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Empty state: no images provided
  if (images.length === 0) {
    return (
      <div
        className="w-full rounded-lg"
        style={{
          aspectRatio: "4/3",
          background: "linear-gradient(150deg, var(--cream-100), var(--cream-300))",
          borderRadius: "var(--radius-lg)",
        }}
        role="img"
        aria-label={`Imagem de ${productName}`}
      />
    );
  }

  // Single image: no thumbnail strip
  if (images.length === 1) {
    return (
      <div
        className="w-full overflow-hidden"
        style={{
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          background: "var(--cream-100)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- product images are dynamically hosted on Supabase Storage with unknown domains; next/image requires domains to be whitelisted in next.config */}
        <img
          src={images[0]}
          alt={productName}
          className="w-full"
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        />
      </div>
    );
  }

  // Multiple images: gallery with thumbnail strip
  const uniqueImages = [...new Set(images)];
  const activeImage = uniqueImages[activeIndex];

  function handleThumbnailHover(index: number): void {
    setActiveIndex(index);
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Desktop layout: thumbnail strip left + main image right */}
      <div className="hidden md:flex gap-3 items-start">
        {/* Thumbnail strip */}
        <div className="flex flex-col gap-2 flex-shrink-0" style={{ width: "88px" }}>
          {uniqueImages.map((url, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={url}
                type="button"
                onMouseEnter={() => handleThumbnailHover(index)}
                aria-label={`Ver imagem ${index + 1} de ${productName}`}
                aria-pressed={isActive}
                className="block w-full overflow-hidden p-0 bg-transparent border-0 cursor-pointer"
                style={{
                  borderRadius: "var(--radius-md)",
                  outline: isActive
                    ? "2px solid var(--gold-400)"
                    : "2px solid transparent",
                  outlineOffset: "0px",
                  boxShadow: isActive ? "var(--shadow-sm)" : "none",
                  transition: `outline-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- product images are dynamically hosted on Supabase Storage with unknown domains; next/image requires domains to be whitelisted in next.config */}
                <img
                  src={url}
                  alt={`Miniatura ${index + 1} de ${productName}`}
                  style={{
                    width: "88px",
                    height: "88px",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "var(--radius-md)",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Main image */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-md)",
            background: "var(--cream-100)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- product images are dynamically hosted on Supabase Storage with unknown domains; next/image requires domains to be whitelisted in next.config */}
          <img
            key={activeImage}
            src={activeImage}
            alt={productName}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              transition: `opacity var(--dur-fast) var(--ease-out)`,
            }}
          />
        </div>
      </div>

      {/* Mobile layout: main image on top, horizontal scrollable thumbnails below */}
      <div className="flex flex-col gap-3 md:hidden">
        {/* Main image */}
        <div
          className="w-full overflow-hidden"
          style={{
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-md)",
            background: "var(--cream-100)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- product images are dynamically hosted on Supabase Storage with unknown domains; next/image requires domains to be whitelisted in next.config */}
          <img
            key={activeImage}
            src={activeImage}
            alt={productName}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              transition: `opacity var(--dur-fast) var(--ease-out)`,
            }}
          />
        </div>

        {/* Horizontal thumbnail row */}
        <div
          className="flex gap-2"
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
          aria-label="Miniaturas do produto"
        >
          {uniqueImages.map((url, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={url}
                type="button"
                onMouseEnter={() => handleThumbnailHover(index)}
                onClick={() => handleThumbnailHover(index)}
                aria-label={`Ver imagem ${index + 1} de ${productName}`}
                aria-pressed={isActive}
                className="flex-shrink-0 p-0 bg-transparent border-0 cursor-pointer"
                style={{
                  borderRadius: "var(--radius-md)",
                  outline: isActive
                    ? "2px solid var(--gold-400)"
                    : "2px solid transparent",
                  outlineOffset: "0px",
                  boxShadow: isActive ? "var(--shadow-sm)" : "none",
                  transition: `outline-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- product images are dynamically hosted on Supabase Storage with unknown domains; next/image requires domains to be whitelisted in next.config */}
                <img
                  src={url}
                  alt={`Miniatura ${index + 1} de ${productName}`}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "var(--radius-md)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

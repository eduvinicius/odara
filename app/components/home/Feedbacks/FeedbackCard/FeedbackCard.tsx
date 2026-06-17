"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Lightbox } from "@/app/components/ui/Lightbox";
import type { FeedbackCardProps } from "./feedbackCard.types";

export function FeedbackCard({ feedback }: Readonly<FeedbackCardProps>) {
  const [hover, setHover] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { name, description, image_url } = feedback;

  function handleImageClick() {
    setLightboxOpen(true);
  }

  function handleLightboxClose() {
    setLightboxOpen(false);
  }

  return (
    <>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`flex flex-col h-125 md:h-112.5 bg-surface-card rounded-lg border border-border-soft overflow-hidden transition-[transform,box-shadow] duration-240 ${
          hover ? "-translate-y-0.75 shadow-md" : "shadow-sm"
        }`}
      >
        {/* Feedback image — clickable when image_url is present */}
        <div
          className="relative m-2 rounded-md overflow-hidden aspect-4/3 shrink-0 flex items-center justify-center"
          style={
            image_url
              ? undefined
              : { background: "linear-gradient(150deg, var(--cream-100), var(--cream-300))" }
          }
        >
          {image_url ? (
            <button
              type="button"
              aria-label={`Ampliar imagem do depoimento de ${name}`}
              onClick={handleImageClick}
              className="absolute inset-0 w-full h-full cursor-zoom-in group"
              style={{ padding: 0, border: "none", background: "none" }}
            >
              <Image
                src={image_url}
                alt={`Imagem do depoimento de ${name}`}
                fill
                className="object-cover transition-transform duration-240 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </button>
          ) : (
            <ImageOff
              size={40}
              strokeWidth={1.5}
              style={{ color: "var(--gold-400)", opacity: 0.6 }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Content — scrollable if description overflows */}
        <div className="flex flex-col gap-2 px-4 pt-1 pb-4 flex-1 min-h-0 overflow-y-auto">
          {/* Decorative quotation mark */}
          <span
            className="font-serif font-semibold leading-none select-none shrink-0"
            style={{ fontSize: "3.5rem", color: "var(--gold-200)", lineHeight: "0.85" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Reviewer name */}
          <span className="font-serif text-xl font-semibold text-ink-900 leading-tight shrink-0">
            {name}
          </span>

          {/* Description */}
          <p className="font-sans text-sm text-ink-700 leading-relaxed m-0">
            {description}
          </p>
        </div>
      </article>

      {lightboxOpen && image_url && (
        <Lightbox
          src={image_url}
          alt={`Imagem ampliada do depoimento de ${name}`}
          onClose={handleLightboxClose}
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import type { FeedbackCardProps } from "./feedbackCard.types";

export function FeedbackCard({ feedback }: Readonly<FeedbackCardProps>) {
  const [hover, setHover] = useState(false);
  const { name, description, image_url } = feedback;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex flex-col bg-surface-card rounded-lg border border-border-soft overflow-hidden transition-[transform,box-shadow] duration-240 p-6 gap-4 ${
        hover ? "-translate-y-0.75 shadow-md" : "shadow-sm"
      }`}
    >
      {/* Reviewer identity */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative shrink-0 w-12 h-12 rounded-circle overflow-hidden">
          {image_url != null ? (
            <Image
              src={image_url}
              alt={`Foto de ${name}`}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "linear-gradient(150deg, var(--cream-100), var(--cream-300))",
              }}
              aria-hidden="true"
            >
              <User
                size={22}
                strokeWidth={1.5}
                style={{ color: "var(--gold-400)" }}
              />
            </div>
          )}
        </div>

        {/* Name */}
        <span className="font-serif text-xl font-semibold text-ink-900 leading-tight">
          {name}
        </span>
      </div>

      {/* Testimonial body */}
      <div className="flex flex-col gap-1">
        {/* Decorative quotation mark */}
        <span
          className="font-serif font-semibold leading-none select-none"
          style={{
            fontSize: "4rem",
            color: "var(--gold-200)",
            lineHeight: "0.8",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Description */}
        <p className="font-sans text-sm text-ink-700 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeedbackCard } from "@/app/components/home/Feedbacks/FeedbackCard";
import { IconButton } from "@/app/components/core/IconButton";
import { SimpleRow } from "./SimpleRow";
import { CarouselTrack } from "./CarouselTrack";
import { CARDS_VISIBLE, GAP_PX } from "./feedbackCarousel.data";
import type { Feedback } from "@/lib/data";

type FeedbackCarouselProps = { feedbacks: Feedback[] };

export function FeedbackCarousel({ feedbacks }: Readonly<FeedbackCarouselProps>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateStep = useCallback(() => {
    const el = trackRef.current;
    if (el == null) return;
    const containerWidth = el.offsetWidth;
    const cardWidth = (containerWidth - (CARDS_VISIBLE - 1) * GAP_PX) / CARDS_VISIBLE;
    setStepPx(cardWidth + GAP_PX);
  }, []);

  // Re-run when feedbacks change so the ResizeObserver attaches after
  // the carousel DOM mounts.
  useEffect(() => {
    updateStep();
    const el = trackRef.current;
    if (el == null) return;
    const ro = new ResizeObserver(updateStep);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateStep, feedbacks.length]);

  if (feedbacks.length === 0) return null;

  const isCarousel = feedbacks.length >= CARDS_VISIBLE;
  const lastIndex = feedbacks.length - CARDS_VISIBLE;
  const showPrev = activeIndex > 0;
  const showNext = activeIndex < lastIndex;

  function handlePrev() {
    setActiveIndex((i) => Math.max(0, i - 1));
  }

  function handleNext() {
    setActiveIndex((i) => Math.min(lastIndex, i + 1));
  }

  return (
    <>
      {/* Mobile: always a vertical stack, no carousel controls */}
      <div className="flex flex-col gap-4 md:hidden">
        {feedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>

      {/* Desktop: horizontal carousel (≥4 items) or simple flex row (<4 items) */}
      {isCarousel ? (
        <div className="hidden md:flex items-center gap-2">
          {/* Previous arrow — always occupies space to prevent layout shift */}
          <div style={{ visibility: showPrev ? "visible" : "hidden" }} aria-hidden={!showPrev}>
            <IconButton
              icon={ChevronLeft}
              variant="ghost"
              ariaLabel="Depoimento anterior"
              onClick={handlePrev}
              className="cursor-pointer"
            />
          </div>

          {/* Clipped viewport — overflow-hidden prevents horizontal scrollbar */}
          <div ref={trackRef} className="flex-1 overflow-hidden">
            <CarouselTrack
              feedbacks={feedbacks}
              activeIndex={activeIndex}
              stepPx={stepPx}
            />
          </div>

          {/* Next arrow — always occupies space to prevent layout shift */}
          <div style={{ visibility: showNext ? "visible" : "hidden" }} aria-hidden={!showNext}>
            <IconButton
              icon={ChevronRight}
              variant="ghost"
              ariaLabel="Próximo depoimento"
              onClick={handleNext}
              className="cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="hidden md:flex gap-6">
          <SimpleRow feedbacks={feedbacks} />
        </div>
      )}
    </>
  );
}

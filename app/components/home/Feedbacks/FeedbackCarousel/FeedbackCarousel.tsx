"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFeaturedFeedbacks } from "@/lib/hooks";
import { FeedbackCard } from "@/app/components/home/Feedbacks/FeedbackCard";
import { IconButton } from "@/app/components/core/IconButton";
import type { Feedback } from "@/lib/data";

// Number of cards visible simultaneously in the desktop carousel
const CARDS_VISIBLE = 4;
// Horizontal gap between cards in px
const GAP_PX = 24;

// Card width relative to the clipped track container:
// (100% - 3 * GAP_PX) / 4  =  25% - 18px
const CARD_WIDTH = `calc(25% - ${((CARDS_VISIBLE - 1) * GAP_PX) / CARDS_VISIBLE}px)`;

// One carousel step in px = cardWidth + GAP_PX
// cardWidth (px) = (containerWidth - 3 * GAP_PX) / 4
// step (px)      = (containerWidth + GAP_PX)  / 4
// Computed via ResizeObserver so it stays correct on resize.

const SKELETON_KEYS = ["sk-0", "sk-1", "sk-2", "sk-3"] as const;

function FeedbackSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {SKELETON_KEYS.map((key) => (
        <div
          key={key}
          className="flex-1 min-w-0 rounded-lg animate-pulse"
          style={{ height: "220px", background: "var(--cream-200)" }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

type SimpleRowProps = { feedbacks: Feedback[] };

function SimpleRow({ feedbacks }: Readonly<SimpleRowProps>) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="flex-1 min-w-0">
          <FeedbackCard feedback={feedback} />
        </div>
      ))}
    </div>
  );
}

type CarouselTrackProps = {
  feedbacks: Feedback[];
  activeIndex: number;
  stepPx: number;
};

function CarouselTrack({ feedbacks, activeIndex, stepPx }: Readonly<CarouselTrackProps>) {
  return (
    <div
      className="flex"
      style={{
        gap: `${GAP_PX}px`,
        transform: `translateX(-${activeIndex * stepPx}px)`,
        transition: "transform var(--dur-med) var(--ease-out)",
        willChange: "transform",
      }}
    >
      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="shrink-0"
          style={{ width: CARD_WIDTH }}
        >
          <FeedbackCard feedback={feedback} />
        </div>
      ))}
    </div>
  );
}

export function FeedbackCarousel() {
  const { feedbacks, loading } = useFeaturedFeedbacks();
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

  useEffect(() => {
    updateStep();
    const el = trackRef.current;
    if (el == null) return;
    const ro = new ResizeObserver(updateStep);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateStep]);

  if (loading) return <FeedbackSkeleton />;
  if (feedbacks.length === 0) return null;

  const isCarousel = feedbacks.length >= CARDS_VISIBLE;

  if (!isCarousel) {
    return <SimpleRow feedbacks={feedbacks} />;
  }

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
    <div className="flex items-center gap-2">
      {/* Previous arrow — always occupies space to prevent layout shift */}
      <div style={{ visibility: showPrev ? "visible" : "hidden" }} aria-hidden={!showPrev}>
        <IconButton
          icon={ChevronLeft}
          variant="ghost"
          ariaLabel="Depoimento anterior"
          onClick={handlePrev}
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
        />
      </div>
    </div>
  );
}

import { FeedbackCard } from "@/app/components/home/Feedbacks/FeedbackCard";
import type { Feedback } from "@/lib/data";
import { CARDS_VISIBLE, GAP_PX } from "./feedbackCarousel.data";

const CARD_WIDTH = `calc(25% - ${((CARDS_VISIBLE - 1) * GAP_PX) / CARDS_VISIBLE}px)`;

type CarouselTrackProps = {
  feedbacks: Feedback[];
  activeIndex: number;
  stepPx: number;
};

export function CarouselTrack({ feedbacks, activeIndex, stepPx }: Readonly<CarouselTrackProps>) {
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

import { FeedbackCard } from "@/app/components/home/Feedbacks/FeedbackCard";
import type { Feedback } from "@/lib/data";

type SimpleRowProps = { feedbacks: Feedback[] };

export function SimpleRow({ feedbacks }: Readonly<SimpleRowProps>) {
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

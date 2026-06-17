import { SectionHead } from "@/app/components/home/ProductSections/SectionHead";
import { FeedbackCarousel } from "@/app/components/home/Feedbacks/FeedbackCarousel";

export function DepoimentosSection() {
  return (
    <section className="bg-surface-sunken">
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)",
        }}
      >
        <SectionHead eyebrow="O que dizem por aí" title="Depoimentos" />
        <FeedbackCarousel />
      </div>
    </section>
  );
}

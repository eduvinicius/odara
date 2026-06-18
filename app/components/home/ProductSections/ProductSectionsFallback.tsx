import { SkeletonGrid } from "./SkeletonGrid";

export function ProductSectionsFallback() {
  return (
    <>
      <section style={{ padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SkeletonGrid />
        </div>
      </section>
      <section className="bg-surface-sunken">
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)" }}>
          <SkeletonGrid />
        </div>
      </section>
    </>
  );
}

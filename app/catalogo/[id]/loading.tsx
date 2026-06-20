import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { CardSkeleton } from "./CardSkeleton";
import { wrap } from "../page.data";

// ─── Shared skeleton bone style ────────────────────────────────────────────

const bone = (
  width: string,
  height: string,
  radius: string,
  extraStyle?: React.CSSProperties,
): React.CSSProperties => ({
  width,
  height,
  borderRadius: `var(${radius})`,
  background: "var(--cream-300)",
  flexShrink: 0,
  ...extraStyle,
});

// ─── Loading skeleton ───────────────────────────────────────────────────────

export default function ProductDetailLoading(): React.ReactElement {
  return (
    <>
      <Header />

      <main className="bg-surface-page">
        <div
          style={{
            ...wrap,
            padding:
              "clamp(28px,4vw,44px) clamp(16px,4vw,48px) clamp(48px,6vw,80px)",
          }}
        >
          {/* Breadcrumb skeleton */}
          <div className="mb-6 md:mb-8 animate-pulse">
            <div style={bone("200px", "var(--space-4)", "--radius-pill")} />
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-[55%_1fr] gap-8 md:gap-12 items-start animate-pulse">

            {/* LEFT — image gallery skeleton */}
            <div>
              {/* Desktop layout: thumbnail strip (left) + main image (right) */}
              <div className="hidden md:flex gap-3" style={{ alignItems: "flex-start" }}>
                {/* Thumbnail strip */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                    flexShrink: 0,
                  }}
                >
                  <div style={bone("88px", "88px", "--radius-md")} />
                  <div style={bone("88px", "88px", "--radius-md")} />
                  <div style={bone("88px", "88px", "--radius-md")} />
                </div>

                {/* Main image */}
                <div
                  style={{
                    flex: 1,
                    aspectRatio: "4 / 3",
                    background: "var(--cream-300)",
                    borderRadius: "var(--radius-lg)",
                  }}
                />
              </div>

              {/* Mobile layout: main image + horizontal thumbnail row */}
              <div className="flex md:hidden flex-col gap-3">
                {/* Main image */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    background: "var(--cream-300)",
                    borderRadius: "var(--radius-lg)",
                  }}
                />

                {/* Thumbnail row */}
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <div style={bone("64px", "64px", "--radius-md")} />
                  <div style={bone("64px", "64px", "--radius-md")} />
                  <div style={bone("64px", "64px", "--radius-md")} />
                </div>
              </div>
            </div>

            {/* RIGHT — product info skeleton */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Category label */}
              <div style={bone("80px", "var(--space-3)", "--radius-pill")} />

              {/* h1 (two lines) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={bone("75%", "32px", "--radius-pill")} />
                <div style={bone("50%", "32px", "--radius-pill")} />
              </div>

              {/* Price */}
              <div style={bone("120px", "24px", "--radius-pill")} />

              {/* Divider */}
              <hr style={{ borderColor: "var(--border-soft)", margin: 0 }} />

              {/* Description (4 lines) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <div style={bone("100%", "var(--space-4)", "--radius-pill")} />
                <div style={bone("100%", "var(--space-4)", "--radius-pill")} />
                <div style={bone("100%", "var(--space-4)", "--radius-pill")} />
                <div style={bone("60%", "var(--space-4)", "--radius-pill")} />
              </div>

              {/* Add-to-cart button */}
              <div style={bone("100%", "52px", "--radius-pill")} />

              {/* Share button */}
              <div style={bone("120px", "var(--space-4)", "--radius-pill")} />
            </div>
          </div>

          {/* Related products skeleton */}
          <section
            className="mt-16 md:mt-24"
            style={{
              borderTop: "1px solid var(--border-soft)",
              paddingTop: "clamp(32px,4vw,56px)",
            }}
          >
            {/* Section head skeleton */}
            <div
              className="animate-pulse"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-3)",
                marginBottom: "40px",
              }}
            >
              <div style={bone("100px", "var(--space-3)", "--radius-pill")} />
              <div style={bone("220px", "28px", "--radius-pill")} />
            </div>

            {/* 3-card grid skeleton */}
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              }}
            >
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

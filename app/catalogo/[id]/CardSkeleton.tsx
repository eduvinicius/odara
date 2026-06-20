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

// ─── Card skeleton (used in Related Products grid) ─────────────────────────

export function CardSkeleton(): React.ReactElement {
  return (
    <div
      className="animate-pulse"
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        padding: "0 0 var(--space-4)",
      }}
    >
      {/* Image area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          background: "var(--cream-300)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
        }}
      />

      {/* Text area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          padding: "0 var(--space-4)",
        }}
      >
        {/* Name line 1 */}
        <div style={bone("80%", "var(--space-4)", "--radius-pill")} />
        {/* Name line 2 */}
        <div style={bone("55%", "var(--space-4)", "--radius-pill")} />
        {/* Price */}
        <div style={{ ...bone("60px", "14px", "--radius-pill"), marginTop: "var(--space-1)" }} />
        {/* Button */}
        <div style={{ ...bone("100%", "40px", "--radius-pill"), marginTop: "var(--space-2)" }} />
      </div>
    </div>
  );
}

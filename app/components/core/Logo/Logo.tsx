import type { LogoProps } from "./logo.types";
import { sizes } from "./logo.data";

export function Logo({ size = "md", tagline = false, color, onClick, className }: Readonly<LogoProps>) {
  const px = sizes[size];

  return (
    <span
      onClick={onClick}
      className={`inline-flex flex-col items-center leading-none${onClick ? " cursor-pointer" : ""}${className ? ` ${className}` : ""}`}
    >
      <span
        style={{
          fontFamily: "var(--font-script)",
          fontSize: px,
          lineHeight: 0.9,
          ...(color
            ? { color }
            : {
                background: "var(--gradient-gold)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }),
        }}
      >
        Odara
      </span>
      {tagline && (
        <span
          className="font-sans uppercase tracking-[0.3em] text-gold-500"
          style={{ fontSize: Math.max(8, px * 0.13), marginTop: px * 0.04 }}
        >
          Arte em presentear
        </span>
      )}
    </span>
  );
}

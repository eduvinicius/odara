import { money } from "@/lib/data";

interface PriceTagProps {
  price: number;
  original?: number;
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
  className?: string;
}

const mainSizes = {
  sm: "text-md",
  md: "text-xl",
  lg: "text-2xl",
};

export function PriceTag({ price, original, size = "md", align = "left", className }: PriceTagProps) {
  const onSale = original != null && original > price;

  return (
    <div
      className={`flex items-baseline gap-2 ${align === "right" ? "justify-end" : "justify-start"}${className ? ` ${className}` : ""}`}
    >
      <span
        className={`font-serif font-semibold leading-none ${mainSizes[size]} ${onSale ? "text-rose-400" : "text-ink-900"}`}
      >
        {money(price)}
      </span>
      {onSale && original != null && (
        <span className="font-sans text-sm text-ink-500 line-through decoration-ink-300">
          {money(original)}
        </span>
      )}
    </div>
  );
}

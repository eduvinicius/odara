import { money } from "@/lib/data";
import type { PriceTagProps } from "./priceTag.types";
import { mainSizes } from "./priceTag.data";

export function PriceTag({ price, original, size = "md", align = "left", className }: Readonly<PriceTagProps>) {
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

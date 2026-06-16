import { Trash2 } from "lucide-react";
import { QuantityStepper } from "../QuantityStepper";
import { PlaceholderIcon } from "../PlaceholderIcon";
import { money } from "@/lib/data";
import type { CartLineProps } from "./cartLine.types";

export function CartLine({ item, onQty, onRemove }: Readonly<CartLineProps>) {
  return (
    <div className="flex gap-3 py-3.5 border-b border-border-soft">
      {/* Thumbnail */}
      <div
        className="w-16 h-16 rounded-md flex-none flex items-center justify-center"
        style={
          item.image
            ? { background: `center/cover no-repeat url("${item.image}")` }
            : { background: "linear-gradient(150deg, var(--cream-100), var(--cream-300))" }
        }
      >
        {!item.image && <PlaceholderIcon name={item.icon} size={24} className="text-gold-400 opacity-75" />}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <span className="font-serif text-lg font-semibold text-ink-900 leading-snug">
            {item.name}
          </span>
          <button
            type="button"
            aria-label="Remover"
            onClick={onRemove}
            className="border-none bg-transparent text-ink-300 cursor-pointer flex-none inline-flex p-0.5 hover:text-rose-400 transition-colors duration-140"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <QuantityStepper value={item.qty} size="sm" onChange={onQty} />
          <span className="font-sans text-md font-semibold text-ink-900">
            {money(item.price * item.qty)}
          </span>
        </div>
      </div>
    </div>
  );
}

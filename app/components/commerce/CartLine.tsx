import { Trash2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { QuantityStepper } from "./QuantityStepper";
import { money } from "@/lib/data";
import type { CartItem } from "@/lib/cart";

interface CartLineProps {
  item: CartItem;
  onQty: (qty: number) => void;
  onRemove: () => void;
}

function PlaceholderIcon({ name }: { name?: string }) {
  if (!name) return null;
  const key = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof LucideIcons;
  const Icon = LucideIcons[key] as React.ComponentType<{ size: number; className: string }> | undefined;
  if (!Icon) return null;
  return <Icon size={24} className="text-gold-400 opacity-75" />;
}

export function CartLine({ item, onQty, onRemove }: CartLineProps) {
  return (
    <div className="flex gap-3 py-[14px] border-b border-border-soft">
      {/* Thumbnail */}
      <div
        className="w-16 h-16 rounded-md flex-none flex items-center justify-center"
        style={
          item.image
            ? { background: `center/cover no-repeat url("${item.image}")` }
            : { background: "linear-gradient(150deg, var(--cream-100), var(--cream-300))" }
        }
      >
        {!item.image && <PlaceholderIcon name={item.icon} />}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
        <div className="flex items-start justify-between gap-2">
          <span className="font-serif text-lg font-semibold text-ink-900 leading-snug">
            {item.name}
          </span>
          <button
            type="button"
            aria-label="Remover"
            onClick={onRemove}
            className="border-none bg-transparent text-ink-300 cursor-pointer flex-none inline-flex p-0.5 hover:text-rose-400 transition-colors duration-[140ms]"
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

"use client";

import { Minus, Plus } from "lucide-react";
import type { QuantityStepperProps } from "./quantityStepper.types";
import { dims, iconSize } from "./quantityStepper.data";

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  size = "md",
  onChange,
  className,
}: Readonly<QuantityStepperProps>) {
  const set = (v: number) => onChange(Math.max(min, Math.min(max, v)));

  const btnBase = `${dims[size]} rounded-circle border border-border-std bg-surface-card inline-flex items-center justify-center flex-none transition-colors duration-[140ms] disabled:cursor-not-allowed`;

  return (
    <div className={`inline-flex items-center gap-[10px]${className ? ` ${className}` : ""}`}>
      <button
        type="button"
        aria-label="Diminuir"
        disabled={value <= min}
        onClick={() => set(value - 1)}
        className={`${btnBase} text-ink-700 disabled:text-ink-300`}
      >
        <Minus size={iconSize[size]} />
      </button>

      <span className="font-sans text-md font-medium text-ink-900 min-w-5 text-center">
        {value}
      </span>

      <button
        type="button"
        aria-label="Aumentar"
        disabled={value >= max}
        onClick={() => set(value + 1)}
        className={`${btnBase} text-ink-700 disabled:text-ink-300`}
      >
        <Plus size={iconSize[size]} />
      </button>
    </div>
  );
}

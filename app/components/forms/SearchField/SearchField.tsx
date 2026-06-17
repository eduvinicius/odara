"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import type { SearchFieldProps } from "./searchField.types";
import { heights } from "./searchField.data";

export function SearchField({
  value,
  onChange,
  onClear,
  onKeyDown,
  placeholder = "Buscar presentes...",
  size = "lg",
  className,
}: Readonly<SearchFieldProps>) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex items-center gap-2.5 px-4.5 pr-2 ${heights[size]} bg-surface-card rounded-pill border transition-[border-color,box-shadow] duration-[140ms]${className ? ` ${className}` : ""}`}
      style={{
        borderColor: focused ? "var(--gold-400)" : "var(--border)",
        boxShadow: focused
          ? "0 0 0 3px var(--focus-ring)"
          : "var(--shadow-sm)",
      }}
    >
      <Search size={19} className="flex-none text-gold-500" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 min-w-0 border-none outline-none bg-transparent font-sans text-md text-ink-900 placeholder:text-ink-300"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpar busca"
          className="flex-none w-8.5 h-8.5 rounded-circle border-none bg-cream-100 text-ink-700 cursor-pointer inline-flex items-center justify-center hover:bg-cream-200 transition-colors duration-140"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

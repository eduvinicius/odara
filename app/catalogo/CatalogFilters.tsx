"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SearchField } from "@/app/components/forms/SearchField";
import { Tag } from "@/app/components/core/Tag";
import { type Category } from "@/lib/data";

type CatalogFiltersProps = {
  q: string;
  cat: Category;
  categories: string[];
};

export function CatalogFilters({ q, cat, categories }: Readonly<CatalogFiltersProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(q);

  function navigate(nextQ: string, nextCat: Category) {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set("q", nextQ);
    if (nextCat !== "Todos") params.set("cat", nextCat);
    // Reset to page 1 whenever filters change
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function commit() {
    navigate(inputValue, cat);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") commit();
  }

  function handleClear() {
    setInputValue("");
    navigate("", cat);
  }

  function handleCategoryClick(c: Category) {
    navigate(inputValue, c);
  }

  return (
    <>
      <div className="flex items-center gap-2 w-full max-w-130 mt-2">
        <div className="flex-1">
          <SearchField
            value={inputValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
            placeholder="Buscar pelo nome do presente..."
          />
        </div>
        <button
          type="button"
          onClick={commit}
          style={{
            backgroundColor: "var(--gold-400)",
            color: "var(--cream-50)",
            borderRadius: "var(--radius-pill)",
            padding: "var(--space-1) var(--space-2)",
            fontFamily: "var(--font-jost)",
            fontWeight: 500,
            fontSize: "0.875rem",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "opacity var(--dur-fast) var(--ease-out)",
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
        >
          Buscar
        </button>
      </div>

      <div className="flex gap-2.5 flex-wrap justify-center mb-6 mt-6">
        {categories.map((c) => (
          <Tag key={c} selected={cat === c} onClick={() => handleCategoryClick(c)}>
            {c}
          </Tag>
        ))}
      </div>
    </>
  );
}

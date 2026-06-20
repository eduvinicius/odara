"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SearchField } from "@/app/components/forms/SearchField";
import { Tag } from "@/app/components/core/Tag";
import { Button } from "@/app/components/core/Button";

type CatalogFiltersProps = {
  q: string;
  cat: string;
  categories: string[];
};

export function CatalogFilters({ q, cat, categories }: Readonly<CatalogFiltersProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(q);

  function navigate(nextQ: string, nextCat: string) {
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

  function handleCategoryClick(c: string) {
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
        <Button variant="primary" size="sm" onClick={commit}>
          Buscar
        </Button>
      </div>

      <fieldset className="flex gap-2.5 flex-wrap justify-center mb-6 mt-6 border-0 p-0 m-0">
        <legend className="sr-only">Filtrar por categoria</legend>
        {categories.map((c) => (
          <Tag key={c} selected={cat === c} onClick={() => handleCategoryClick(c)}>
            {c}
          </Tag>
        ))}
      </fieldset>
    </>
  );
}

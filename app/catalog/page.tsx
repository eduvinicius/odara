"use client";

import { useState } from "react";
import { SearchX } from "lucide-react";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Eyebrow } from "@/app/components/core/Eyebrow";
import { Button } from "@/app/components/core/Button";
import { Tag } from "@/app/components/core/Tag";
import { SearchField } from "@/app/components/forms/SearchField";
import { ProductCard } from "@/app/components/commerce/ProductCard";
import { useCart } from "@/app/context/CartContext";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/data";

const wrap = {
  maxWidth: "var(--container-max)",
  margin: "0 auto",
};

export default function CatalogPage() {
  const { addItem } = useCart();
  const [q, setQ]         = useState("");
  const [cat, setCat]     = useState<Category>("Todos");
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  function toggleFav(id: number) {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const results = PRODUCTS.filter((p) => {
    const byName = p.name.toLowerCase().includes(q.trim().toLowerCase());
    const byCat  = cat === "Todos" || p.category === cat;
    return byName && byCat;
  });

  const count = results.length;
  const countLabel = count === 1 ? "presente encontrado" : "presentes encontrados";

  return (
    <>
      <Header />

      <main className="bg-surface-page">
        {/* Page header */}
        <section
          className="border-b border-border-soft"
          style={{ background: "var(--gradient-page)" }}
        >
          <div
            className="flex flex-col items-center gap-3 text-center"
            style={{
              ...wrap,
              padding: "clamp(36px,4vw,56px) clamp(16px,4vw,48px)",
            }}
          >
            <Eyebrow align="center">Catálogo</Eyebrow>
            <h1 className="font-serif font-semibold text-ink-900" style={{ fontSize: "var(--text-4xl)" }}>
              Nossos presentes
            </h1>
            <p className="text-ink-500 max-w-115">
              Encontre o presente perfeito — busque pelo nome ou explore por categoria.
            </p>
            <div className="w-full max-w-[520px] mt-2">
              <SearchField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onClear={() => setQ("")}
                placeholder="Buscar pelo nome do presente..."
              />
            </div>
          </div>
        </section>

        {/* Filters + grid */}
        <section
          style={{
            ...wrap,
            padding: "clamp(28px,4vw,44px) clamp(16px,4vw,48px) clamp(48px,6vw,80px)",
          }}
        >
          {/* Category chips */}
          <div className="flex gap-[10px] flex-wrap justify-center mb-6">
            {CATEGORIES.map((c) => (
              <Tag key={c} selected={cat === c} onClick={() => setCat(c)}>
                {c}
              </Tag>
            ))}
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mb-[18px] text-ink-500 text-sm">
            <span>
              {count} {countLabel}
              {q && <span> para &ldquo;{q}&rdquo;</span>}
            </span>
          </div>

          {/* Grid or empty state */}
          {results.length > 0 ? (
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
            >
              {results.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  favorite={!!favorites[p.id]}
                  onFavorite={() => toggleFav(p.id)}
                  onAdd={addItem}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-[14px] text-center py-16 text-ink-500">
              <SearchX size={40} className="text-gold-400" />
              <p className="font-serif text-xl text-ink-700">Nenhum presente encontrado</p>
              <p>Tente outro nome ou veja todas as categorias.</p>
              <Button
                variant="outline"
                onClick={() => { setQ(""); setCat("Todos"); }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

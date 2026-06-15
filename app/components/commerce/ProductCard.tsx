"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Badge } from "@/app/components/core/Badge";
import { Button } from "@/app/components/core/Button";
import { PriceTag } from "./PriceTag";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  favorite?: boolean;
  onFavorite?: () => void;
  onAdd?: (product: Product) => void;
  onClick?: () => void;
}

function PlaceholderIcon({ name }: { name?: string }) {
  if (!name) return null;
  const key = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof LucideIcons;
  const Icon = LucideIcons[key] as React.ComponentType<{ size: number; className: string }> | undefined;
  if (!Icon) return null;
  return <Icon size={46} className="text-gold-400 opacity-70" />;
}

export function ProductCard({ product, favorite = false, onFavorite, onAdd, onClick }: ProductCardProps) {
  const [hover, setHover] = useState(false);
  const { name, price, original, category, image, icon, badge } = product;
  const onSale = original != null && original > price;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex flex-col bg-surface-card rounded-lg border border-border-soft overflow-hidden transition-[transform,box-shadow] duration-[240ms] ${
        hover ? "-translate-y-[3px] shadow-md" : "shadow-sm"
      }`}
    >
      {/* Image / placeholder */}
      <div
        onClick={onClick}
        className={`relative m-2 rounded-md overflow-hidden aspect-[4/3] flex items-center justify-center${onClick ? " cursor-pointer" : ""}`}
        style={
          image
            ? { background: `center/cover no-repeat url("${image}")` }
            : { background: "linear-gradient(150deg, var(--cream-100), var(--cream-300))" }
        }
      >
        {!image && <PlaceholderIcon name={icon} />}

        {/* Badges top-left */}
        <div className="absolute top-[10px] left-[10px] flex gap-[6px]">
          {onSale && !badge && (
            <Badge tone="sale">
              -{Math.round((1 - price / original!) * 100)}%
            </Badge>
          )}
          {badge && <Badge tone={badge.tone}>{badge.label}</Badge>}
        </div>

        {/* Favorite button top-right */}
        <button
          type="button"
          aria-label="Favoritar"
          onClick={(e) => { e.stopPropagation(); onFavorite?.(); }}
          className="absolute top-[10px] right-[10px] w-9 h-9 rounded-circle border-none flex items-center justify-center backdrop-blur-sm shadow-xs transition-colors duration-[140ms]"
          style={{ background: "rgba(255,252,248,0.86)", color: favorite ? "var(--rose-400)" : "var(--ink-500)" }}
        >
          <Heart
            size={17}
            fill={favorite ? "var(--rose-400)" : "transparent"}
            stroke={favorite ? "var(--rose-400)" : "currentColor"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[10px] px-4 pt-2 pb-4">
        {category && (
          <span className="font-sans text-2xs font-medium uppercase tracking-[0.16em] text-gold-500">
            {category}
          </span>
        )}
        <h3
          onClick={onClick}
          className={`font-serif text-xl font-semibold text-ink-900 leading-[1.15] m-0${onClick ? " cursor-pointer" : ""}`}
        >
          {name}
        </h3>
        <div className="flex items-center justify-between gap-[10px] mt-0.5">
          <PriceTag price={price} original={original} size="md" />
          <Button variant="primary" size="sm" iconLeft="plus" onClick={() => onAdd?.(product)}>
            Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}

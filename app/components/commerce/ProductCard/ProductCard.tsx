"use client";

import { useState } from "react";
import { Badge } from "@/app/components/core/Badge";
import { Button } from "@/app/components/core/Button";
import { PriceTag } from "../PriceTag";
import { PlaceholderIcon } from "../PlaceholderIcon";
import type { ProductCardProps } from "./productCard.types";

export function ProductCard({ product, onAdd, onClick }: Readonly<ProductCardProps>) {
  const [hover, setHover] = useState(false);
  const { name, price, original, category, image, icon, badge } = product;
  const onSale = original != null && original > price;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex flex-col bg-surface-card rounded-lg border border-border-soft overflow-hidden transition-[transform,box-shadow] duration-240 ${
        hover ? "-translate-y-0.75 shadow-md" : "shadow-sm"
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
        {!image && <PlaceholderIcon name={icon} size={46} className="text-gold-400 opacity-70" />}

        {/* Badges top-left */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {onSale && !badge && (
            <Badge tone="sale">
              -{Math.round((1 - price / original!) * 100)}%
            </Badge>
          )}
          {badge && <Badge tone={badge.tone}>{badge.label}</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 px-4 pt-2 pb-4">
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
        <div className="flex items-center justify-between gap-2.5 mt-0.5">
          <PriceTag price={price} original={original} size="md" />
          <Button variant="primary" size="sm" iconLeft="plus" onClick={() => onAdd?.(product)}>
            Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/app/components/core/Badge";
import { Button } from "@/app/components/core/Button";
import { PriceTag } from "../PriceTag";
import { PlaceholderIcon } from "../PlaceholderIcon";
import type { ProductCardProps } from "./productCard.types";

const IMAGE_AREA_CLASS =
  "relative m-2 rounded-md overflow-hidden aspect-4/3 flex items-center justify-center";

type ImageWrapperProps = {
  href: string | undefined;
  onClick: (() => void) | undefined;
  imageBg: React.CSSProperties;
  children: React.ReactNode;
};

function ImageWrapper({ href, onClick, imageBg, children }: Readonly<ImageWrapperProps>) {
  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={IMAGE_AREA_CLASS}
        style={imageBg}
        tabIndex={-1}
        aria-hidden="true"
      >
        {children}
      </Link>
    );
  }
  if (onClick !== undefined) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full cursor-pointer border-0 p-0 bg-transparent ${IMAGE_AREA_CLASS}`}
        style={imageBg}
      >
        {children}
      </button>
    );
  }
  return (
    <div className={IMAGE_AREA_CLASS} style={imageBg}>
      {children}
    </div>
  );
}

type TitleProps = {
  href: string | undefined;
  onClick: (() => void) | undefined;
  name: string;
};

function Title({ href, onClick, name }: Readonly<TitleProps>) {
  const titleClass = "font-serif text-xl font-semibold text-ink-900 leading-[1.15]";

  if (href !== undefined) {
    return (
      <Link href={href} className="block m-0 hover:underline">
        <span className={titleClass}>{name}</span>
      </Link>
    );
  }
  if (onClick !== undefined) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`block text-left m-0 p-0 bg-transparent border-0 cursor-pointer w-full ${titleClass}`}
      >
        {name}
      </button>
    );
  }
  return <h3 className={`${titleClass} m-0`}>{name}</h3>;
}

export function ProductCard({ product, onAdd, onClick, href }: Readonly<ProductCardProps>) {
  const [hover, setHover] = useState(false);
  const { name, price, original, category, image, icon, badge } = product;

  const onSale = original !== undefined && original > price;
  const discount = onSale ? Math.round((1 - price / original) * 100) : 0;

  const imageBg: React.CSSProperties = image
    ? { background: `center/cover no-repeat url("${image}")` }
    : { background: "linear-gradient(150deg, var(--cream-100), var(--cream-300))" };

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex flex-col bg-surface-card rounded-lg border border-border-soft overflow-hidden transition-[transform,box-shadow] duration-240 ${
        hover ? "-translate-y-0.75 shadow-md" : "shadow-sm"
      }`}
    >
      <ImageWrapper href={href} onClick={onClick} imageBg={imageBg}>
        {image === undefined && (
          <PlaceholderIcon name={icon} size={46} className="text-gold-400 opacity-70" />
        )}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {onSale && badge === undefined && <Badge tone="sale">-{discount}%</Badge>}
          {badge !== undefined && <Badge tone={badge.tone}>{badge.label}</Badge>}
        </div>
      </ImageWrapper>

      <div className="flex flex-col gap-2.5 px-4 pt-2 pb-4">
        {category !== undefined && (
          <span className="font-sans text-2xs font-medium uppercase tracking-[0.16em] text-gold-500">
            {category}
          </span>
        )}
        <Title href={href} onClick={onClick} name={name} />
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

import Link from "next/link";
import type { FooterColItem } from "./footer.data";

export function FooterCol({ title, items }: Readonly<{ title: string; items: FooterColItem[] }>) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-sans text-2xs uppercase tracking-[0.28em] text-gold-300">
        {title}
      </span>
      {items.map(({ label, href }) =>
        href ? (
          <Link
            key={label}
            href={href}
            className="font-sans text-sm text-left flex items-center min-h-11 sm:min-h-0"
            style={{ color: "rgba(247,237,225,0.78)" }}
          >
            {label}
          </Link>
        ) : (
          <span
            key={label}
            className="font-sans text-sm flex items-center min-h-11 sm:min-h-0"
            style={{ color: "rgba(247,237,225,0.78)" }}
          >
            {label}
          </span>
        )
      )}
    </div>
  );
}

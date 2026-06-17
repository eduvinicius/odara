import { money } from "./data";
import type { CartItem } from "./cart";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5519998952599";

export function buildWhatsAppLink(items: CartItem[]): string {
  let total = 0;
  const lines = items.map((it) => {
    const sub = it.price * it.qty;
    total += sub;
    return `• ${it.qty}x ${it.name} — ${money(sub)}`;
  });

  const msg =
    "Olá, Odara! Gostaria de fazer este pedido:\n\n" +
    lines.join("\n") +
    `\n\nTotal: ${money(total)}\n\nMeu nome: `;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

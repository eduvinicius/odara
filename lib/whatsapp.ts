import { WHATSAPP, money } from "./data";
import type { CartItem } from "./cart";

export function buildWhatsAppLink(items: CartItem[]): string {
  let total = 0;
  const lines = items.map((it) => {
    const sub = it.price * it.qty;
    total += sub;
    return `• ${it.qty}x ${it.name} — ${money(sub)}`;
  });

  const msg =
    "Olá, Odara! 🤍 Gostaria de fazer este pedido:\n\n" +
    lines.join("\n") +
    `\n\nTotal: ${money(total)}\n\nMeu nome: `;

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

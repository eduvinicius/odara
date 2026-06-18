"use server";

import { money } from "./data";
import type { CartItem } from "./cart";

export async function buildWhatsAppLink(items: CartItem[]): Promise<string> {
  const number = process.env.WHATSAPP_NUMBER;

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

  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

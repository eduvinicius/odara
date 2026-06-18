"use client";

import { useEffect } from "react";
import { X, ShoppingBag, Info } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { IconButton } from "@/app/components/core/IconButton";
import { Button } from "@/app/components/core/Button";
import { CartLine } from "@/app/components/commerce/CartLine";
import { buildWhatsAppLink } from "@/lib/whatsapp-actions";
import { money } from "@/lib/data";

export function CartDrawer() {
  const { items, removeItem, updateQty, count, total, isOpen, closeCart } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden
        onClick={closeCart}
        className="fixed inset-0 z-40 transition-opacity duration-240"
        style={{
          background: "rgba(56,41,27,0.42)",
          backdropFilter: "blur(2px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      {/* Panel */}
      <aside
        aria-label="Carrinho"
        aria-hidden={!isOpen}
        className="fixed top-0 right-0 z-41 h-full bg-surface-card shadow-lg flex flex-col transition-transform duration-420"
        style={{
          width: "min(var(--cart-w), 92vw)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transitionTimingFunction: "var(--ease-out)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5.5 py-5 border-b border-border-soft">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-2xl font-semibold text-ink-900">Seu carrinho</h2>
            <span className="font-sans text-sm text-ink-500">
              {count} {count === 1 ? "item" : "itens"}
            </span>
          </div>
          <IconButton icon={X} ariaLabel="Fechar carrinho" onClick={closeCart} />
        </div>

        {/* Body */}
        {items.length > 0 ? (
          <div className="flex-1 overflow-y-auto px-5.5 py-1">
            {items.map((it) => (
              <CartLine
                key={it.id}
                item={it}
                onQty={(qty) => updateQty(it.id, qty)}
                onRemove={() => removeItem(it.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center">
            <span className="w-16 h-16 rounded-circle bg-cream-100 inline-flex items-center justify-center text-gold-400">
              <ShoppingBag size={28} />
            </span>
            <p className="font-serif text-xl text-ink-700">Seu carrinho está vazio</p>
            <p className="text-ink-500 max-w-60">
              Que tal escolher um presente especial para alguém?
            </p>
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border-soft px-5.5 pt-4.5 pb-5.5 flex flex-col gap-3.5 bg-surface-card">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-md text-ink-500">Subtotal</span>
              <span className="font-serif text-2xl font-semibold text-ink-900">
                {money(total)}
              </span>
            </div>

            <Button
              variant="whatsapp"
              size="lg"
              fullWidth
              iconLeft="message-circle"
              onClick={async () => {
                const url = await buildWhatsAppLink(items);
                window.open(url, "_blank", "noopener,noreferrer");
              }}
            >
              Finalizar no WhatsApp
            </Button>

            <p className="font-sans text-xs text-ink-500 text-center leading-normal flex items-center justify-center gap-1">
              <Info size={12} className="flex-none" />
              Você será levado ao WhatsApp com o pedido pronto. Frete e pagamento combinados por lá.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

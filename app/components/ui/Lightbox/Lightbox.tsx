"use client";

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { IconButton } from "@/app/components/core/IconButton";
import type { LightboxProps } from "./lightbox.types";

export function Lightbox({ src, alt, onClose }: Readonly<LightboxProps>) {
  const closeButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move focus to the close button on mount
    const button = closeButtonContainerRef.current?.querySelector("button");
    button?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Imagem ampliada"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.85)",
        animation: `lightbox-fade-in var(--dur-med) var(--ease-out) both`,
      }}
    >
      {/* Close button — top-right corner */}
      <div
        ref={closeButtonContainerRef}
        style={{
          position: "absolute",
          top: "var(--space-4)",
          right: "var(--space-4)",
        }}
      >
        <IconButton
          icon={X}
          variant="ghost"
          size="lg"
          ariaLabel="Fechar imagem"
          onClick={onClose}
          className="!text-white hover:!bg-white/20"
        />
      </div>

      {/* Image — constrained to 90vw/90vh, scale-in on entry */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          objectFit: "contain",
          display: "block",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          animation: `lightbox-scale-in var(--dur-med) var(--ease-out) both`,
        }}
      />
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}

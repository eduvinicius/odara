"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import type { SocialShareButtonProps } from "./socialShareButton.types";

/**
 * SocialShareButton
 *
 * Triggers the browser's native Web Share API when available.
 * Falls back to writing the URL to the clipboard on unsupported browsers.
 * Displays a brief "Link copiado!" confirmation after a successful clipboard write.
 *
 * Security: the `url` prop is passed directly to browser APIs (navigator.share /
 * navigator.clipboard.writeText) — these APIs treat the value as plain text /
 * a URL string and do not inject it into the DOM, so no sanitisation is needed
 * beyond ensuring the prop carries only a URL (enforced by the caller).
 */
export function SocialShareButton({ url, title }: Readonly<SocialShareButtonProps>) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    // Resolve relative URLs to absolute so Web Share API and clipboard receive a full URL.
    const absoluteUrl =
      url.startsWith("/") && globalThis.window !== undefined
        ? `${globalThis.location.origin}${url}`
        : url;

    // Prefer the native Web Share API when it is available.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url: absoluteUrl });
      } catch {
        // User cancelled or share was aborted — fail silently.
      }
      return;
    }

    // Clipboard fallback for browsers that do not support the Web Share API.
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(absoluteUrl);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch {
      // Clipboard write failed (e.g. permissions denied) — fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? "Link copiado!" : "Compartilhar este produto"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: copied ? "var(--emerald-500)" : "var(--ink-500)",
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
        transition: `color var(--dur-fast) var(--ease-out)`,
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--gold-500)";
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-500)";
        }
      }}
    >
      {copied ? (
        <Check size={16} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Share2 size={16} strokeWidth={1.75} aria-hidden="true" />
      )}
      <span>{copied ? "Link copiado!" : "Compartilhar"}</span>
    </button>
  );
}

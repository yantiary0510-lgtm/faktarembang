"use client";

import { useState } from "react";
import { IconFB, IconLink, IconWA, IconX } from "./Icons";

export default function ShareBar({ title, path, vertical = false }: { title: string; path: string; vertical?: boolean }) {
  const [copied, setCopied] = useState(false);

  const url = () => (typeof window !== "undefined" ? window.location.origin + path : path);
  const open = (u: string) => window.open(u, "_blank", "noopener,noreferrer,width=600,height=520");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
    } catch {
      /* clipboard bisa ditolak browser; tetap tampilkan status */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={`share ${vertical ? "share--vertical" : ""}`}>
      <span className="share__label">Bagikan</span>
      <button
        className="share__btn share__btn--wa"
        aria-label="Bagikan ke WhatsApp"
        onClick={() => open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`)}
      >
        <IconWA />
      </button>
      <button
        className="share__btn"
        aria-label="Bagikan ke X"
        onClick={() =>
          open(`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url())}`)
        }
      >
        <IconX />
      </button>
      <button
        className="share__btn"
        aria-label="Bagikan ke Facebook"
        onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`)}
      >
        <IconFB />
      </button>
      <button className={`share__btn ${copied ? "is-done" : ""}`} aria-label="Salin tautan" onClick={copy}>
        <IconLink />
      </button>
      <span className={`share__toast ${copied ? "is-on" : ""}`} role="status">
        {copied ? "Tautan disalin" : ""}
      </span>
    </div>
  );
}

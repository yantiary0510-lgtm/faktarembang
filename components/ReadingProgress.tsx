"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress({ target = "article-body" }: { target?: string }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-r.top + window.innerHeight * 0.2, 0), Math.max(total, 1));
      setP(done / Math.max(total, 1));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <div className="progress" aria-hidden>
      <div className="progress__bar" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

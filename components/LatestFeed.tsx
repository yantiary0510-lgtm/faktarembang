"use client";

import { useState } from "react";
import type { Article } from "@/lib/data";
import { StoryRow } from "./Story";

export default function LatestFeed({ items, step = 6 }: { items: Article[]; step?: number }) {
  const [count, setCount] = useState(step);
  const shown = items.slice(0, count);
  const rest = items.length - count;

  return (
    <div className="feed">
      {shown.map((a) => (
        <StoryRow key={a.slug} article={a} excerpt />
      ))}
      {rest > 0 && (
        <button className="btn btn--outline feed__more" onClick={() => setCount((c) => c + step)}>
          Muat {Math.min(rest, step)} berita lagi
        </button>
      )}
    </div>
  );
}

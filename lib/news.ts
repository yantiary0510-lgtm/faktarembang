// Satu pintu untuk semua data berita yang dipakai halaman.
// Pakai berita asli dari media sumber; kalau belum ada satu pun
// yang berhasil diambil, pakai konten demo supaya web tidak kosong.
import { cache } from "react";
import type { Article } from "./data";
import { demoArticles, demoTrendingTags } from "./data";
import { fetchAllSources } from "./sources";

export type NewsData = {
  articles: Article[]; // urut terbaru dulu
  isDemo: boolean;
};

export const getNews = cache(async (): Promise<NewsData> => {
  const live = await fetchAllSources();
  const seen = new Set<string>();
  const unique = live.filter((a) => (seen.has(a.slug) ? false : (seen.add(a.slug), true)));
  const isDemo = unique.length === 0;
  const list = isDemo ? demoArticles : unique;
  return {
    articles: [...list].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    isDemo,
  };
});

export async function getArticle(slug: string) {
  const { articles } = await getNews();
  return articles.find((a) => a.slug === slug);
}

export const byCategory = (list: Article[], slug: string) => list.filter((a) => a.category === slug);

/** Terpopuler: pakai jumlah pembaca kalau ada, kalau tidak pakai yang terbaru. */
export const mostRead = (list: Article[], n = 5, exclude?: string) => {
  const pool = list.filter((a) => a.slug !== exclude);
  const hasViews = pool.some((a) => a.views > 0);
  return (hasViews ? [...pool].sort((a, b) => b.views - a.views) : pool).slice(0, n);
};

export const related = (list: Article[], article: Article, n = 3) => {
  const sameTag = list.filter((a) => a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t)));
  const sameCat = list.filter(
    (a) => a.slug !== article.slug && a.category === article.category && !sameTag.includes(a)
  );
  return [...sameTag, ...sameCat].slice(0, n);
};

/** Topik hangat: tag yang paling sering muncul di berita terbaru. */
export function trendingTags(list: Article[], isDemo: boolean, n = 7) {
  if (isDemo) return demoTrendingTags;
  const count = new Map<string, number>();
  for (const a of list.slice(0, 60)) for (const t of a.tags) count.set(t, (count.get(t) ?? 0) + 1);
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([t]) => t);
}

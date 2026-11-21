import type { Metadata } from "next";
import { getNews, trendingTags } from "@/lib/news";
import { StoryRow } from "@/components/Story";
import Link from "next/link";

export const metadata: Metadata = { title: "Cari Berita" };

type Props = { searchParams: Promise<{ q?: string }> };

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = norm(q);
  const words = query.split(" ").filter(Boolean);
  const { articles, isDemo } = await getNews();
  const tags = trendingTags(articles, isDemo);
  const results = words.length
    ? articles.filter((a) => {
        const hay = norm([a.title, a.excerpt, a.tags.join(" "), a.location].join(" "));
        return words.every((w) => hay.includes(w));
      })
    : [];

  return (
    <div className="container search-page">
      <form className="search-page__form" action="/cari" role="search">
        <label htmlFor="q" className="sr-only">
          Kata kunci
        </label>
        <input id="q" name="q" type="search" defaultValue={q} placeholder="Cari berita…" />
        <button className="btn btn--red" type="submit">
          Cari
        </button>
      </form>

      {query ? (
        <p className="search-page__count">
          <strong>{results.length}</strong> hasil untuk “{q}”
        </p>
      ) : (
        <p className="search-page__count">Ketik kata kunci, misalnya nama desa, topik, atau nama rubrik.</p>
      )}

      {results.length > 0 ? (
        <div className="feed">
          {results.map((a) => (
            <StoryRow key={a.slug} article={a} excerpt />
          ))}
        </div>
      ) : (
        <div className="search-page__empty">
          {query && <p>Belum ada berita yang cocok. Coba kata kunci lain:</p>}
          <ul className="chips">
            {tags.map((t) => (
              <li key={t}>
                <Link href={`/cari?q=${encodeURIComponent(t)}`}>{t}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

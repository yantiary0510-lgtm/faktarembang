import type { Article } from "@/lib/data";
import { getCategory } from "@/lib/data";
import { byCategory, getNews, mostRead, trendingTags } from "@/lib/news";
import { SOURCES } from "@/lib/sources";
import { StoryCard, StoryLead, StoryLine, StoryRow } from "@/components/Story";
import { AdSlot, FoodPrices, MostRead, OpinionList, SectionHead, SourceList, TrendingBar } from "@/components/Blocks";
import LatestFeed from "@/components/LatestFeed";
import Newsletter from "@/components/Newsletter";

// Perbarui beranda tiap 10 menit (samakan dengan REFRESH_SECONDS di lib/sources.ts).
export const revalidate = 600;

/** Ambil n berita dari pool yang belum dipakai di bagian lain beranda. */
function taker(all: Article[]) {
  const used = new Set<string>();
  return (pool: Article[], n: number, needImage = false) => {
    const out: Article[] = [];
    for (const a of pool) {
      if (out.length >= n) break;
      if (used.has(a.slug)) continue;
      if (needImage && !a.imageUrl && !a.image) continue;
      used.add(a.slug);
      out.push(a);
    }
    return out;
  };
}

export default async function HomePage() {
  const { articles: all, isDemo } = await getNews();
  const take = taker(all);
  const news = all.filter((a) => a.category !== "opini");
  const withImg = news.filter((a) => a.imageUrl || isDemo);

  const [lead] = take(withImg, 1);
  const second = take(withImg, 2);

  // Blok Rembang & Jateng diisi dulu supaya tidak kehabisan berita.
  const localCat = getCategory("rembang")!;
  const local = take(byCategory(news, "rembang"), 5);
  const [localLead, ...localList] = local;

  const editors = take(withImg, 4);
  const leadRelated = take(news, 2);

  const rubrics = (["ekonomi", "olahraga", "tekno"] as const)
    .map((slug) => ({ cat: getCategory(slug)!, items: take(byCategory(news, slug), 4) }))
    .filter((r) => r.items.length > 0);

  const weekend = take(
    news.filter((a) => a.category === "gaya-hidup" || a.category === "olahraga" || a.category === "internasional"),
    4,
    true
  );

  const popular = mostRead(all, 5);
  const latest = news.filter((a) => a.slug !== lead?.slug && !second.includes(a));
  const opinions = byCategory(all, "opini");

  const sourceStats = isDemo
    ? []
    : SOURCES.filter((s) => s.enabled)
        .map((s) => ({ name: s.name, home: s.home, count: all.filter((a) => a.source?.id === s.id).length }))
        .filter((s) => s.count > 0);


  if (!lead) return <p className="container empty">Belum ada berita.</p>;

  return (
    <>
      <TrendingBar tags={trendingTags(all, isDemo)} />

      {/* 1. Headline */}
      <section className="container hero">
        <div className="hero__lead">
          <StoryLead article={lead} related={leadRelated} />
        </div>
        <div className="hero__side">
          {second.map((a) => (
            <StoryCard key={a.slug} article={a} excerpt />
          ))}
        </div>
        <aside className="hero__rail">
          <MostRead items={popular} title={isDemo ? "Terpopuler" : "Pilihan Hari Ini"} />
        </aside>
      </section>

      {/* 2. Pilihan redaksi */}
      {editors.length > 0 && (
        <section className="container block">
          <SectionHead title="Pilihan Redaksi" />
          <div className="grid-4">
            {editors.map((a) => (
              <StoryCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Rembang & Jateng */}
      {localLead && (
        <section className="local">
          <div className="container">
            <SectionHead title={localCat.name} color={localCat.color} href="/kanal/rembang">
              <ul className="section-head__tabs" aria-label="Sub-topik">
                {localCat.topics.slice(0, 4).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </SectionHead>
            <div className={`local__grid ${isDemo ? "" : "local__grid--no-aside"}`}>
              <div className="local__lead">
                <StoryCard article={localLead} excerpt ratio="16/9" />
              </div>
              <div className="local__list">
                {localList.map((a) => (
                  <StoryRow key={a.slug} article={a} />
                ))}
              </div>
              {isDemo && (
                <aside className="local__aside">
                  <FoodPrices />
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <AdSlot />
      </div>

      {/* 4. Terbaru + sidebar */}
      <section className="container with-rail">
        <div>
          <SectionHead title="Berita Terbaru" color="var(--red)" />
          <LatestFeed items={latest} />
        </div>
        <aside className="rail">
          <SourceList sources={sourceStats} />
          <OpinionList items={opinions} />
          <Newsletter />
          <AdSlot size="box" />
        </aside>
      </section>

      {/* 5. Rubrik */}
      {rubrics.length > 0 && (
        <section className="container block">
          <div className={`grid-3 rubrics rubrics--${rubrics.length}`}>
            {rubrics.map(({ cat, items }) => (
              <div key={cat.slug} className="rubric">
                <SectionHead title={cat.name} color={cat.color} href={`/kanal/${cat.slug}`} />
                <StoryCard article={items[0]} excerpt />
                <div className="rubric__lines">
                  {items.slice(1, 4).map((a) => (
                    <StoryLine key={a.slug} article={a} showKicker={false} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Akhir pekan */}
      {weekend.length >= 4 && (
        <section className="weekend">
          <div className="container">
            <SectionHead title="Bekal Akhir Pekan" color="var(--ochre-light)" />
            <div className="grid-4">
              {weekend.map((a) => (
                <StoryCard key={a.slug} article={a} ratio="4/5" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

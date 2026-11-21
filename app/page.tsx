import { articles, byCategory, getArticle, getCategory, mostRead, sortedArticles } from "@/lib/data";
import { StoryCard, StoryLead, StoryLine, StoryRow } from "@/components/Story";
import { AdSlot, FoodPrices, MostRead, OpinionList, SectionHead, TrendingBar } from "@/components/Blocks";
import LatestFeed from "@/components/LatestFeed";
import Newsletter from "@/components/Newsletter";

const pick = (slugs: string[]) => slugs.map((s) => getArticle(s)!).filter(Boolean);

export default function HomePage() {
  const lead = getArticle("data-tunggal-bansos-verifikasi-ulang-penerima")!;
  const second = pick(["pengerukan-pelabuhan-tasikagung-dimulai", "phishing-undangan-pernikahan-digital-marak"]);
  const heroSlugs = [lead, ...second].map((a) => a.slug);

  const editors = pick([
    "harga-garam-rakyat-anjlok-petambak-kaliori",
    "seleksi-cpns-2026-dibuka-akhir-november",
    "bmkg-pesisir-utara-jawa-siaga-rob",
    "asean-sepakati-pembayaran-qr-lintas-negara",
  ]);

  const local = sortedArticles().filter(
    (a) =>
      ["REMBANG", "LASEM", "SARANG", "SULANG"].includes(a.location) &&
      !heroSlugs.includes(a.slug) &&
      !editors.includes(a) &&
      a.category !== "opini"
  );
  const localLead = getArticle("festival-batik-lasem-2026")!;
  const localList = local.filter((a) => a.slug !== localLead.slug).slice(0, 4);

  const latest = sortedArticles().filter(
    (a) => !heroSlugs.includes(a.slug) && !editors.includes(a) && a.category !== "opini"
  );

  const rubrics = (["ekonomi", "olahraga", "tekno"] as const).map((slug) => ({
    cat: getCategory(slug)!,
    items: byCategory(slug).filter((a) => !heroSlugs.includes(a.slug) && !localList.includes(a)),
  }));

  const weekend = pick([
    "pantai-rembang-libur-akhir-tahun",
    "lontong-tuyuhan-kuliner-pancur",
    "lari-10k-pesisir-rembang",
    "jepang-longgarkan-visa-pekerja-terampil",
  ]);

  return (
    <>
      <TrendingBar />

      {/* 1. Headline */}
      <section className="container hero">
        <div className="hero__lead">
          <StoryLead article={lead} related={pick(["seleksi-cpns-2026-dibuka-akhir-november", "mudik-nataru-tol-trans-jawa"])} />
        </div>
        <div className="hero__side">
          {second.map((a) => (
            <StoryCard key={a.slug} article={a} excerpt />
          ))}
        </div>
        <aside className="hero__rail">
          <MostRead items={mostRead(5)} />
        </aside>
      </section>

      {/* 2. Pilihan redaksi */}
      <section className="container block">
        <SectionHead title="Pilihan Redaksi" />
        <div className="grid-4">
          {editors.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* 3. Rembang & Jateng */}
      <section className="local">
        <div className="container">
          <SectionHead
            title="Rembang & Jateng"
            color={getCategory("rembang")!.color}
            href="/kanal/rembang"
          >
            <ul className="section-head__tabs" aria-label="Sub-topik">
              {getCategory("rembang")!.topics.slice(0, 4).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </SectionHead>
          <div className="local__grid">
            <div className="local__lead">
              <StoryCard article={localLead} excerpt ratio="16/9" />
            </div>
            <div className="local__list">
              {localList.map((a) => (
                <StoryRow key={a.slug} article={a} />
              ))}
            </div>
            <aside className="local__aside">
              <FoodPrices />
            </aside>
          </div>
        </div>
      </section>

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
          <OpinionList />
          <Newsletter />
          <AdSlot size="box" />
        </aside>
      </section>

      {/* 5. Rubrik */}
      <section className="container block">
        <div className="grid-3 rubrics">
          {rubrics.map(({ cat, items }) => (
            <div key={cat.slug} className="rubric">
              <SectionHead title={cat.name} color={cat.color} href={`/kanal/${cat.slug}`} />
              {items[0] && <StoryCard article={items[0]} excerpt />}
              <div className="rubric__lines">
                {items.slice(1, 4).map((a) => (
                  <StoryLine key={a.slug} article={a} showKicker={false} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Akhir pekan */}
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

      <p className="sr-only">Total {articles.length} berita.</p>
    </>
  );
}

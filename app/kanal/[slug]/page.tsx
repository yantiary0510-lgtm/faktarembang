import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data";
import { byCategory, getNews, mostRead } from "@/lib/news";
import { StoryCard, StoryLead, StoryLine, StoryRow } from "@/components/Story";
import { AdSlot, MostRead, SectionHead } from "@/components/Blocks";
import Newsletter from "@/components/Newsletter";

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return { title: `${cat.name} – Berita ${cat.name} Terbaru Hari Ini`, description: cat.description };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const { articles: all } = await getNews();
  const list = byCategory(all, cat.slug);
  const [lead, ...rest] = list;
  const side = rest.slice(0, 2);
  const more = rest.slice(2, 40);
  const elsewhere = all.filter((a) => a.category !== cat.slug).slice(0, 6);
  const popular = mostRead(list, 5);

  return (
    <div style={{ "--cat": cat.color } as React.CSSProperties}>
      <header className="cat-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Beranda</Link> <span>/</span> <span aria-current="page">{cat.name}</span>
          </nav>
          <div className="cat-head__row">
            <h1 className="cat-head__title">{cat.name}</h1>
            <p className="cat-head__desc">{cat.description}</p>
          </div>
          <ul className="chips" aria-label="Sub-topik">
            <li className="is-active">Semua</li>
            {cat.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </header>

      {lead ? (
        <>
          <section className={`container cat-top ${side.length === 0 ? "cat-top--solo" : ""}`}>
            <div className="cat-top__lead">
              <StoryLead article={lead} />
            </div>
            {side.length > 0 && (
              <div className="cat-top__side">
                {side.map((a) => (
                  <StoryCard key={a.slug} article={a} excerpt />
                ))}
              </div>
            )}
          </section>

          <section className="container with-rail">
            <div>
              {more.length > 0 && (
                <>
                  <SectionHead title={`Terbaru di ${cat.name}`} color={cat.color} />
                  <div className="feed">
                    {more.map((a) => (
                      <StoryRow key={a.slug} article={a} excerpt />
                    ))}
                  </div>
                </>
              )}

              {elsewhere.length > 0 && (
                <div className={`also ${more.length === 0 ? "also--first" : ""}`}>
                  <SectionHead title="Dari Rubrik Lain" />
                  <div className="also__grid">
                    {elsewhere.map((a) => (
                      <StoryLine key={a.slug} article={a} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <aside className="rail">
              <MostRead items={popular} title={`Terpopuler di ${cat.short}`} />
              <Newsletter />
              <AdSlot size="box" />
            </aside>
          </section>
        </>
      ) : (
        <section className="container with-rail">
          <div>
            <p className="empty">Belum ada berita di rubrik ini. Simak berita terbaru dari rubrik lain:</p>
            <div className="also__grid">
              {elsewhere.map((a) => (
                <StoryLine key={a.slug} article={a} />
              ))}
            </div>
          </div>
          <aside className="rail">
            <Newsletter />
          </aside>
        </section>
      )}
    </div>
  );
}

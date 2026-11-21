import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/data";
import { getArticle, getNews, mostRead, related } from "@/lib/news";
import { stripTags } from "@/lib/sources";
import { img, initials, longDateTime, views } from "@/lib/format";
import { StoryCard, StoryLine } from "@/components/Story";
import { MostRead, SectionHead } from "@/components/Blocks";
import ShareBar from "@/components/ShareBar";
import ReadingProgress from "@/components/ReadingProgress";
import Newsletter from "@/components/Newsletter";
import { IconClock, IconEye } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 600;

export async function generateStaticParams() {
  const { articles } = await getNews();
  return articles.slice(0, 60).map((a) => ({ slug: a.slug }));
}

/** Pecah HTML setelah paragraf ke-n, untuk menyisipkan "Baca Juga". */
function splitAfterParagraph(html: string, n: number): [string, string] {
  let idx = -1;
  for (let i = 0; i < n; i++) {
    idx = html.indexOf("</p>", idx + 1);
    if (idx === -1) return [html, ""];
  }
  return [html.slice(0, idx + 4), html.slice(idx + 4)];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  const image = a.imageUrl || img(a.image);
  return {
    title: a.title,
    description: a.excerpt,
    // Tulisan asli di media sumber ditandai sebagai versi utama untuk mesin pencari.
    alternates: a.source ? { canonical: a.source.link } : undefined,
    openGraph: { title: a.title, description: a.excerpt, images: [image], type: "article" },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();

  const { articles: all } = await getNews();
  const cat = getCategory(a.category)!;
  const relAll = related(all, a, 4);
  const alsoRead = relAll[0];
  const rel = relAll.slice(1, 4);
  const popular = mostRead(all, 5, a.slug);
  const latest = all.filter((x) => x.slug !== a.slug).slice(0, 5);
  const photo = a.imageUrl || (a.source ? "" : img(a.image, 1600, 1000));
  const [htmlTop, htmlRest] = a.html ? splitAfterParagraph(a.html, 2) : ["", ""];
  // Ringkasan dari WordPress sering sama dengan paragraf pertama; jangan tampilkan dua kali.
  const showDeck = !a.html || !stripTags(a.html).slice(0, 500).includes(a.excerpt.replace(/…$/, "").slice(0, 50));
  const path = `/berita/${a.slug}`;
  const isOpinion = a.category === "opini";

  // Sisipkan "Baca Juga" setelah paragraf kedua.
  let pCount = 0;

  return (
    <div style={{ "--cat": cat.color } as React.CSSProperties}>
      <ReadingProgress />

      <article className="container article">

        <div className="article__layout">
          <div className="article__share">
            <ShareBar title={a.title} path={path} vertical />
          </div>

          <div className="article__main">
            <header className="article__head">
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/">Beranda</Link> <span>/</span>{" "}
                <Link href={`/kanal/${cat.slug}`}>{cat.name}</Link>
              </nav>
              <Link href={`/kanal/${cat.slug}`} className="kicker">
                {isOpinion ? "Kolom" : cat.short}
              </Link>
              <h1 className="article__title">{a.title}</h1>
              {showDeck && <p className="article__deck">{a.excerpt}</p>}

              <div className="byline">
                <span className="avatar avatar--lg" aria-hidden>
                  {initials(a.author)}
                </span>
                <div className="byline__text">
                  <span className="byline__name">
                    {isOpinion ? "Kolom oleh" : "Oleh"} <strong>{a.author}</strong>
                  </span>
                  <span className="byline__meta">
                    <time dateTime={a.date}>{longDateTime(a.date)}</time>
                  </span>
                </div>
                <div className="byline__stats">
                  <span>
                    <IconClock /> {a.readMin} menit baca
                  </span>
                  {a.views > 0 && (
                    <span>
                      <IconEye /> {views(a.views)}
                    </span>
                  )}
                </div>
              </div>
            </header>

            {photo && (
              <figure className="article__figure">
                <div className="article__img">
                  <Image src={photo} alt={a.caption} fill priority sizes="(max-width: 1024px) 100vw, 860px" />
                </div>
                <figcaption>
                  {a.caption}{" "}
                  <span>({a.source ? `Foto: ${a.source.name}` : `faktarembang/${a.author.split(" ")[0]}`})</span>
                </figcaption>
              </figure>
            )}

            {a.html ? (
              <div id="article-body" className="prose">
                <div dangerouslySetInnerHTML={{ __html: htmlTop }} />
                {alsoRead && htmlRest && (
                  <aside className="alsoread">
                    <span>Baca Juga</span>
                    <Link href={`/berita/${alsoRead.slug}`}>{alsoRead.title}</Link>
                  </aside>
                )}
                {htmlRest && <div dangerouslySetInnerHTML={{ __html: htmlRest }} />}
              </div>
            ) : (
            <div id="article-body" className="prose">
              {a.body.map((b, i) => {
                if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
                if (b.type === "quote")
                  return (
                    <blockquote key={i}>
                      <p>“{b.text}”</p>
                      <cite>{b.by}</cite>
                    </blockquote>
                  );
                pCount++;
                const isFirst = pCount === 1;
                return (
                  <Fragment key={i}>
                    <p>
                      {isFirst && !isOpinion && (
                        <strong className="dateline">{a.location}, faktarembang – </strong>
                      )}
                      {b.text}
                    </p>
                    {pCount === 2 && alsoRead && (
                      <aside className="alsoread">
                        <span>Baca Juga</span>
                        <Link href={`/berita/${alsoRead.slug}`}>{alsoRead.title}</Link>
                      </aside>
                    )}
                  </Fragment>
                );
              })}
              <p className="prose__sign">
                ({initials(a.author).toLowerCase()}/{initials(a.editor).toLowerCase()})
              </p>
            </div>
            )}

            {a.source && (
              <p className="source-note">
                <strong>Sumber</strong>
                <span>
                  Berita ini pertama kali terbit di <b>{a.source.name}</b>.
                </span>
                <a href={a.source.link} target="_blank" rel="noopener">
                  Baca di {a.source.name}
                </a>
              </p>
            )}

            {a.tags.length > 0 && (
              <div className="article__tags">
                <span>Topik</span>
                <ul>
                  {a.tags.map((t) => (
                    <li key={t}>
                      <Link href={`/cari?q=${encodeURIComponent(t)}`}>{t}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="article__share-inline">
              <ShareBar title={a.title} path={path} />
            </div>

            <div className="article__credit">
              <div>
                <span>Penulis</span>
                <strong>{a.author}</strong>
              </div>
              {a.editor && (
                <div>
                  <span>Editor</span>
                  <strong>{a.editor}</strong>
                </div>
              )}
              <a href="#koreksi" className="article__report">
                Laporkan kesalahan
              </a>
            </div>

            {rel.length > 0 && (
              <section className="article__related">
                <SectionHead title="Berita Terkait" color={cat.color} />
                <div className="grid-3">
                  {rel.map((r) => (
                    <StoryCard key={r.slug} article={r} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="rail article__rail">
            <MostRead items={popular} />
            <section>
              <SectionHead title="Terbaru" />
              <div className="rail__lines">
                {latest.map((x) => (
                  <StoryLine key={x.slug} article={x} />
                ))}
              </div>
            </section>
            <Newsletter />
          </aside>
        </div>
      </article>
    </div>
  );
}

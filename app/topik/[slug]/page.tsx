import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews } from "@/lib/news";
import { TOPICS, articlesForTopic, getTopic } from "@/lib/topics";
import { StoryLead, StoryRow, StoryLine } from "@/components/Story";
import { AdSlot, SectionHead } from "@/components/Blocks";
import Newsletter from "@/components/Newsletter";

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: `${topic.name} – Berita Terbaru`, description: topic.description };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const { articles: all } = await getNews();
  const list = articlesForTopic(all, topic);
  const [lead, ...rest] = list;
  const latest = all.filter((a) => !list.includes(a)).slice(0, 6);
  const color = topic.color ?? "var(--red)";

  return (
    <div style={{ "--cat": color } as React.CSSProperties}>
      <header className="cat-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Beranda</Link> <span>/</span> <span>Topik</span> <span>/</span>{" "}
            <span aria-current="page">{topic.name}</span>
          </nav>
          <div className="cat-head__row">
            <h1 className="cat-head__title">{topic.name}</h1>
            <p className="cat-head__desc">{topic.description}</p>
          </div>
          <p className="topic-count">
            <strong>{list.length}</strong> berita
            {topic.disclosure && <span className="topic-disclosure">{topic.disclosure}</span>}
          </p>
        </div>
      </header>

      <section className="container with-rail">
        <div>
          {lead ? (
            <>
              <div className="topic-lead">
                <StoryLead article={lead} />
              </div>
              {rest.length > 0 && (
                <>
                  <SectionHead title={`Berita ${topic.name} Lainnya`} color={color} />
                  <div className="feed">
                    {rest.map((a) => (
                      <StoryRow key={a.slug} article={a} excerpt />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="topic-empty">
              <h2>Belum ada berita tentang {topic.name}.</h2>
              <p>
                Halaman ini terisi otomatis begitu media di jaringan faktarembang menerbitkan berita yang menyebut{" "}
                {topic.keywords.map((k, i) => (
                  <span key={k}>
                    {i > 0 && " atau "}“{k}”
                  </span>
                ))}
                .
              </p>
            </div>
          )}
        </div>
        <aside className="rail">
          {latest.length > 0 && (
            <section>
              <SectionHead title="Berita Terbaru" />
              <div className="rail__lines">
                {latest.map((a) => (
                  <StoryLine key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}
          <Newsletter />
          <AdSlot size="box" />
        </aside>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/data";
import { getCategory } from "@/lib/data";
import { img, shortStamp, TODAY } from "@/lib/format";
import { IconClock } from "./Icons";

const href = (a: Article) => `/berita/${a.slug}`;

export function Kicker({ article, plain = false }: { article: Article; plain?: boolean }) {
  const cat = getCategory(article.category)!;
  return (
    <Link
      href={`/kanal/${cat.slug}`}
      className={`kicker ${plain ? "kicker--plain" : ""}`}
      style={{ "--cat": cat.color } as React.CSSProperties}
    >
      {cat.short}
    </Link>
  );
}

export function Meta({ article, author = false }: { article: Article; author?: boolean }) {
  return (
    <div className="meta">
      {author && <span className="meta__author">{article.author}</span>}
      <time dateTime={article.date}>
        <IconClock /> {shortStamp(article.date, TODAY)}
      </time>
    </div>
  );
}

export function Thumb({
  article,
  ratio = "16/10",
  sizes = "(max-width: 720px) 100vw, 33vw",
  priority = false,
}: {
  article: Article;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href(article)} className="thumb" style={{ aspectRatio: ratio }} tabIndex={-1} aria-hidden>
      <Image src={img(article.image)} alt="" fill sizes={sizes} priority={priority} />
    </Link>
  );
}

/** Berita utama: foto besar + judul besar + ringkasan. */
export function StoryLead({ article, related = [] }: { article: Article; related?: Article[] }) {
  return (
    <article className="story story--lead">
      <Thumb article={article} ratio="3/2" sizes="(max-width: 1024px) 100vw, 50vw" priority />
      <div className="story__body">
        <Kicker article={article} />
        <h2 className="story__title">
          <Link href={href(article)}>{article.title}</Link>
        </h2>
        <p className="story__excerpt">{article.excerpt}</p>
        <Meta article={article} author />
        {related.length > 0 && (
          <ul className="story__related" aria-label="Berita terkait">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={href(r)}>{r.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/** Kartu foto di atas, judul di bawah. */
export function StoryCard({
  article,
  excerpt = false,
  ratio = "16/10",
}: {
  article: Article;
  excerpt?: boolean;
  ratio?: string;
}) {
  return (
    <article className="story story--card">
      <Thumb article={article} ratio={ratio} />
      <div className="story__body">
        <Kicker article={article} plain />
        <h3 className="story__title">
          <Link href={href(article)}>{article.title}</Link>
        </h3>
        {excerpt && <p className="story__excerpt">{article.excerpt}</p>}
        <Meta article={article} />
      </div>
    </article>
  );
}

/** Baris: thumbnail kecil di kiri. */
export function StoryRow({ article, excerpt = false }: { article: Article; excerpt?: boolean }) {
  return (
    <article className="story story--row">
      <div className="story__body">
        <Kicker article={article} plain />
        <h3 className="story__title">
          <Link href={href(article)}>{article.title}</Link>
        </h3>
        {excerpt && <p className="story__excerpt">{article.excerpt}</p>}
        <Meta article={article} author={excerpt} />
      </div>
      <Thumb article={article} ratio="4/3" sizes="160px" />
    </article>
  );
}

/** Judul saja, untuk daftar padat. */
export function StoryLine({ article, showKicker = true }: { article: Article; showKicker?: boolean }) {
  return (
    <article className="story story--line">
      {showKicker && <Kicker article={article} plain />}
      <h3 className="story__title">
        <Link href={href(article)}>{article.title}</Link>
      </h3>
      <Meta article={article} />
    </article>
  );
}

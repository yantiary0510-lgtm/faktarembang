import Link from "next/link";
import type { Article } from "@/lib/data";
import { foodPrices, getCategory } from "@/lib/data";
import { rupiah, time, views, initials } from "@/lib/format";
import { IconArrow, IconEye } from "./Icons";

export function SectionHead({
  title,
  color = "var(--ink)",
  href,
  children,
}: {
  title: string;
  color?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-head" style={{ "--cat": color } as React.CSSProperties}>
      <h2 className="section-head__title">
        {href ? <Link href={href}>{title}</Link> : title}
      </h2>
      {children}
      {href && (
        <Link href={href} className="section-head__more">
          Selengkapnya <IconArrow size={14} />
        </Link>
      )}
    </div>
  );
}

export function MostRead({ items, title = "Terpopuler" }: { items: Article[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="mostread" aria-label={title}>
      <SectionHead title={title} color="var(--red)" />
      <ol className="mostread__list">
        {items.map((a, i) => (
          <li key={a.slug} className="mostread__item">
            <span className="mostread__num">{i + 1}</span>
            <div>
              <Link href={`/berita/${a.slug}`} className="mostread__title">
                {a.title}
              </Link>
              <span className="mostread__views">
                {a.views > 0 ? (
                  <>
                    <IconEye /> {views(a.views)} pembaca
                  </>
                ) : (
                  a.source?.name ?? ""
                )}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Ticker({ items }: { items: Article[] }) {
  if (items.length === 0) return null;
  // Diduplikasi supaya animasi berjalan tanpa jeda.
  const loop = [...items, ...items];
  return (
    <div className="ticker" role="region" aria-label="Berita terkini">
      <div className="container ticker__inner">
        <span className="ticker__label">
          <span className="ticker__dot" /> Terkini
        </span>
        <div className="ticker__track">
          <ul className="ticker__list">
            {loop.map((a, i) => (
              <li key={i} aria-hidden={i >= items.length}>
                <time>{time(a.date)}</time>
                <Link href={`/berita/${a.slug}`} tabIndex={i >= items.length ? -1 : undefined}>
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TrendingBar({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="trending">
      <div className="container trending__inner">
        <span className="trending__label">Topik hangat</span>
        <ul>
          {tags.map((t) => (
            <li key={t}>
              <Link href={`/cari?q=${encodeURIComponent(t)}`}>#{t.replace(/\s+/g, "")}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Widget contoh. Hanya tampil di mode demo (angkanya bukan data asli). */
export function FoodPrices() {
  return (
    <section className="prices" aria-label="Harga pangan">
      <div className="prices__head">
        <h3>Harga Pangan Hari Ini</h3>
        <span>Pasar Kota Rembang · per 9 Nov, 07.00 WIB</span>
      </div>
      <table className="prices__table">
        <tbody>
          {foodPrices.map((p) => (
            <tr key={p.item}>
              <th scope="row">{p.item}</th>
              <td className="prices__val">
                {rupiah(p.price)}
                <small>/{p.unit}</small>
              </td>
              <td
                className={`prices__chg ${p.change > 0 ? "is-up" : p.change < 0 ? "is-down" : "is-flat"}`}
                aria-label={p.change === 0 ? "stabil" : `${p.change > 0 ? "naik" : "turun"} ${Math.abs(p.change)} persen`}
              >
                {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "–"} {p.change === 0 ? "stabil" : `${Math.abs(p.change)}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="prices__note">Dibanding pekan lalu. Sumber: pantauan reporter di lapak pedagang.</p>
    </section>
  );
}

export function OpinionList({ items }: { items: Article[] }) {
  if (items.length === 0) return null;
  const cat = getCategory("opini")!;
  return (
    <section className="opinion">
      <SectionHead title="Opini" color={cat.color} href="/kanal/opini" />
      {items.slice(0, 4).map((a) => (
        <article key={a.slug} className="opinion__item">
          <span className="avatar" aria-hidden>
            {initials(a.author)}
          </span>
          <div>
            <span className="opinion__author">{a.author}</span>
            <Link href={`/berita/${a.slug}`} className="opinion__title">
              {a.title}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}

/** Daftar media sumber, untuk sidebar. */
export function SourceList({ sources }: { sources: { name: string; home: string; count: number }[] }) {
  if (sources.length === 0) return null;
  return (
    <section className="sources">
      <SectionHead title="Jaringan Media" />
      <ul>
        {sources.map((s) => (
          <li key={s.name}>
            <a href={s.home} target="_blank" rel="noopener">
              {s.name}
            </a>
            <span>{s.count} berita</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AdSlot({ size = "wide" }: { size?: "wide" | "box" }) {
  return (
    <div className={`adslot adslot--${size}`} aria-hidden>
      <span>Ruang iklan</span>
    </div>
  );
}

// ==========================================================
// Media sumber berita faktarembang.
// Berita dari media-media ini diambil otomatis dan dibaca
// langsung di faktarembang, dengan kredit + link ke tulisan asli.
// ==========================================================
import type { Article, CategorySlug, Source } from "./data";

type SourceConfig = Source & {
  /** "wordpress" = lewat /wp-json, "rss" = lewat feed RSS. */
  type: "wordpress" | "rss";
  /** Untuk RSS: alamat feed-nya. */
  feed?: string;
  /** Rubrik kalau kategori di media sumber tidak cocok dengan rubrik mana pun. */
  defaultCategory: CategorySlug;
  /** false = belum aktif (misalnya feed belum tersedia). */
  enabled: boolean;
};

export const SOURCES: SourceConfig[] = [
  {
    id: "linikata",
    name: "Linikata",
    home: "https://linikata.com",
    type: "wordpress",
    defaultCategory: "rembang",
    enabled: true,
  },
  {
    id: "gemadika",
    name: "Gemadika",
    home: "https://gemadika.com",
    type: "wordpress",
    defaultCategory: "rembang",
    enabled: true,
  },
  {
    id: "kawaljateng",
    name: "Kawal Jateng",
    home: "https://kawaljateng.com",
    type: "rss",
    // Aktifkan setelah tim IT Kawal Jateng menyediakan feed RSS,
    // lalu isi alamatnya di sini, misalnya "https://kawaljateng.com/rss.php".
    feed: "",
    defaultCategory: "rembang",
    enabled: false,
  },
];

/** Berapa detik sekali berita diperbarui. */
export const REFRESH_SECONDS = 600;
const PER_SOURCE = 30;

// ---------- pemetaan kategori ----------
const CATEGORY_RULES: [CategorySlug, string[]][] = [
  ["opini", ["opini", "kolom", "tajuk", "artikel"]],
  ["olahraga", ["olahraga", "sport", "sepak bola", "sepakbola", "bola"]],
  ["tekno", ["tekno", "teknologi", "digital", "gadget"]],
  ["ekonomi", ["ekonomi", "bisnis", "umkm", "keuangan"]],
  ["internasional", ["internasional", "dunia", "global", "mancanegara"]],
  ["gaya-hidup", ["gaya hidup", "lifestyle", "wisata", "kuliner", "hiburan", "ragam", "budaya", "kesehatan"]],
  [
    "rembang",
    ["rembang", "pati", "jateng", "jawa tengah", "muria", "grobogan", "kudus", "jepara", "demak", "blora", "lasem", "daerah", "regional"],
  ],
  ["nasional", ["nasional", "politik", "hukum", "pendidikan", "pemerintahan", "peristiwa"]],
];

function mapCategory(names: string[], fallback: CategorySlug): CategorySlug {
  const hay = names.map((n) => n.toLowerCase());
  for (const [slug, words] of CATEGORY_RULES) {
    if (hay.some((h) => words.some((w) => h.includes(w)))) return slug;
  }
  return fallback;
}

// ---------- utilitas teks ----------
const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

export function decode(s: string) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

export const stripTags = (html: string) =>
  decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

/** Buang bagian berbahaya/berat dari HTML berita sumber. */
export function cleanHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/href="javascript:[^"]*"/gi, 'href="#"')
    // iframe hanya boleh dari YouTube
    .replace(/<iframe(?![^>]*youtube(?:-nocookie)?\.com)[\s\S]*?<\/iframe>/gi, "")
    .replace(/<img /gi, '<img loading="lazy" ');
}

/** Ambil kota dari dateline, misalnya "LINIKATA.COM, PATI –" → "PATI". */
function dateline(text: string) {
  const m = text.slice(0, 120).match(/^[A-Za-z0-9.\s]+?,\s*([A-Z][A-Z\s]{2,30}?)\s*[–—-]/);
  return m ? m[1].trim() : "";
}

/** Buang dateline di awal ringkasan, misalnya "LINIKATA.COM, PATI – ". */
const dropDateline = (text: string) => text.replace(/^[A-Z0-9 .,/]{3,60}\s[–—-]\s*/, "");

/** Rapikan ringkasan: buang dateline dan penanda [...] di akhir. */
const tidyExcerpt = (text: string, max = 240) => {
  let t = dropDateline(text).replace(/\s*\[(…|\.\.\.)\]\s*$/, "").trim();
  if (t.length > max) t = t.slice(0, max).replace(/\s+\S*$/, "") + "…";
  else if (!/[.!?…"”]$/.test(t)) t += "…";
  return t;
};

const readMinutes = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 200));

const uniqueSlug = (src: string, slug: string) =>
  `${src}-${slug}`.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 120);

async function getJson(url: string) {
  const res = await fetch(url, {
    next: { revalidate: REFRESH_SECONDS },
    signal: AbortSignal.timeout(8000),
    headers: { Accept: "application/json", "User-Agent": "faktarembang/1.0" },
  } as RequestInit);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

async function getText(url: string) {
  const res = await fetch(url, {
    next: { revalidate: REFRESH_SECONDS },
    signal: AbortSignal.timeout(8000),
    headers: { "User-Agent": "faktarembang/1.0" },
  } as RequestInit);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

// ---------- WordPress ----------
type WPPost = {
  slug: string;
  link: string;
  date_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: { name?: string }[];
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string; caption?: { rendered?: string } }[];
    "wp:term"?: { name: string; taxonomy: string }[][];
  };
};

async function fromWordPress(src: SourceConfig): Promise<Article[]> {
  const posts: WPPost[] = await getJson(`${src.home}/wp-json/wp/v2/posts?per_page=${PER_SOURCE}&_embed=1`);
  return posts.map((p) => {
    const terms = (p._embedded?.["wp:term"] ?? []).flat();
    const cats = terms.filter((t) => t.taxonomy === "category").map((t) => decode(t.name));
    const tags = terms.filter((t) => t.taxonomy === "post_tag").map((t) => decode(t.name));
    const media = p._embedded?.["wp:featuredmedia"]?.[0];
    const html = cleanHtml(p.content.rendered);
    const text = stripTags(html);
    const title = stripTags(p.title.rendered);
    return {
      slug: uniqueSlug(src.id, p.slug),
      title,
      excerpt: tidyExcerpt(stripTags(p.excerpt.rendered) || text),
      category: mapCategory(cats, src.defaultCategory),
      author: p._embedded?.author?.[0]?.name || `Redaksi ${src.name}`,
      editor: "",
      date: p.date_gmt.endsWith("Z") ? p.date_gmt : p.date_gmt + "Z",
      location: dateline(text),
      image: uniqueSlug(src.id, p.slug),
      imageUrl: media?.source_url,
      caption: stripTags(media?.caption?.rendered || media?.alt_text || title),
      readMin: readMinutes(text),
      views: 0,
      tags: tags.slice(0, 6),
      body: [],
      html,
      source: { id: src.id, name: src.name, home: src.home, link: p.link },
    } satisfies Article;
  });
}

// ---------- RSS ----------
const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? m[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1").trim() : "";
};

async function fromRss(src: SourceConfig): Promise<Article[]> {
  if (!src.feed) return [];
  const xml = await getText(src.feed);
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  return items.slice(0, PER_SOURCE).map((it) => {
    const link = stripTags(tag(it, "link"));
    const title = stripTags(tag(it, "title"));
    const rawHtml = tag(it, "content:encoded") || tag(it, "description");
    const html = cleanHtml(decode(rawHtml).includes("<") ? decode(rawHtml) : rawHtml);
    const text = stripTags(html);
    const cats = (it.match(/<category[^>]*>[\s\S]*?<\/category>/gi) ?? []).map((c) => stripTags(c));
    const img =
      it.match(/<media:content[^>]+url="([^"]+)"/i)?.[1] ||
      it.match(/<enclosure[^>]+url="([^"]+)"[^>]*type="image/i)?.[1] ||
      html.match(/<img[^>]+src="([^"]+)"/i)?.[1];
    const slugPart = link.replace(/\/$/, "").split("/").pop() || title;
    const pub = tag(it, "pubDate");
    return {
      slug: uniqueSlug(src.id, slugPart),
      title,
      excerpt: tidyExcerpt(text),
      category: mapCategory(cats, src.defaultCategory),
      author: stripTags(tag(it, "dc:creator") || tag(it, "author")) || `Redaksi ${src.name}`,
      editor: "",
      date: pub ? new Date(pub).toISOString() : new Date().toISOString(),
      location: dateline(text),
      image: uniqueSlug(src.id, slugPart),
      imageUrl: img,
      caption: title,
      readMin: readMinutes(text),
      views: 0,
      tags: cats.slice(0, 6),
      body: [],
      html,
      source: { id: src.id, name: src.name, home: src.home, link },
    } satisfies Article;
  });
}

/** Ambil berita dari semua media sumber yang aktif. Media yang gagal dilewati. */
export async function fetchAllSources(): Promise<Article[]> {
  const jobs = SOURCES.filter((s) => s.enabled).map(async (s) => {
    try {
      return s.type === "wordpress" ? await fromWordPress(s) : await fromRss(s);
    } catch (err) {
      console.warn(`[faktarembang] Gagal mengambil berita ${s.name}:`, (err as Error).message);
      return [];
    }
  });
  return (await Promise.all(jobs)).flat();
}

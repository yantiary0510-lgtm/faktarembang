// Halaman topik: kumpulan otomatis berita yang menyebut kata kunci tertentu.
// Tambah topik baru cukup dengan menambah item di daftar ini.
import type { Article } from "./data";
import { decode, REFRESH_SECONDS, SOURCES, stripTags } from "./sources";

export type Topic = {
  slug: string; // alamat: /topik/<slug>
  name: string;
  description: string;
  /** Berita masuk topik ini kalau judul/isi/tag menyebut salah satu kata kunci. */
  keywords: string[];
  /** Catatan keterbukaan (opsional). Hapus baris ini kalau tidak diperlukan. */
  disclosure?: string;
  color?: string;
  /** Tampilkan di bilah "Topik hangat" beranda. */
  pinned?: boolean;
};

export const TOPICS: Topic[] = [
  {
    slug: "brandal-alif",
    name: "Brandal Alif",
    description:
      "Kumpulan berita tentang Organisasi Masyarakat Brandal Alif dari jaringan media faktarembang dan media lain, diperbarui otomatis.",
    keywords: ["brandal alif", "berandal alif"],
    disclosure: "faktarembang terafiliasi dengan Ormas Brandal Alif.",
    color: "#7E0F13",
    pinned: true,
  },
];

export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug);

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ");

export function articlesForTopic(list: Article[], topic: Topic) {
  const words = topic.keywords.map(norm);
  return list.filter((a) => {
    const hay = norm(
      [a.title, a.excerpt, a.tags.join(" "), a.html ? stripTags(a.html) : a.body.map((b) => b.text).join(" ")].join(" ")
    );
    return words.some((w) => hay.includes(w));
  });
}

// ---------- berita dari media lain (Google News) ----------
// Hanya judul, nama media, tanggal, dan link ke berita aslinya.
// Isi berita media lain TIDAK disalin (hak cipta milik media tersebut).
export type ExternalItem = { title: string; source: string; link: string; date: string };

export async function externalForTopic(topic: Topic, limit = 30): Promise<ExternalItem[]> {
  const q = topic.keywords.map((k) => `"${k}"`).join(" OR ");
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=id&gl=ID&ceid=ID:id`;
  const ownHosts = SOURCES.map((s) => new URL(s.home).hostname.replace(/^www\./, ""));
  try {
    const res = await fetch(url, {
      next: { revalidate: REFRESH_SECONDS * 3 },
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; faktarembang/1.0)" },
    } as RequestInit);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
    const pick = (it: string, tag: string) => {
      const m = it.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
      return m ? decode(m[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1")).trim() : "";
    };
    const seen = new Set<string>();
    return items
      .map((it) => {
        const source = stripTags(pick(it, "source"));
        const sourceUrl = it.match(/<source[^>]+url="([^"]+)"/i)?.[1] ?? "";
        let title = stripTags(pick(it, "title"));
        if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3));
        const pub = pick(it, "pubDate");
        return {
          title,
          source,
          sourceHost: sourceUrl ? new URL(sourceUrl).hostname.replace(/^www\./, "") : "",
          link: pick(it, "link"),
          date: pub ? new Date(pub).toISOString() : "",
        };
      })
      .filter((x) => x.title && x.link && !ownHosts.includes(x.sourceHost))
      .filter((x) => {
        const key = x.title.toLowerCase().slice(0, 60);
        return seen.has(key) ? false : (seen.add(key), true);
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, limit)
      .map(({ sourceHost: _h, ...rest }) => rest);
  } catch (err) {
    console.warn(`[faktarembang] Gagal mengambil berita media lain untuk ${topic.name}:`, (err as Error).message);
    return [];
  }
}

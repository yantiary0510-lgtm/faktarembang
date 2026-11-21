// Halaman topik: kumpulan otomatis berita yang menyebut kata kunci tertentu.
// Tambah topik baru cukup dengan menambah item di daftar ini.
import type { Article } from "./data";
import { stripTags } from "./sources";

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
      "Kumpulan berita tentang Organisasi Masyarakat Brandal Alif dari jaringan media faktarembang, diperbarui otomatis.",
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

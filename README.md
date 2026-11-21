# faktarembang

Purwarupa UI portal berita **faktarembang** — Next.js (App Router) + TypeScript + CSS murni.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Butuh Node.js 20 atau lebih baru. Font (Source Serif 4, IBM Plex Sans) diunduh otomatis oleh `next/font` saat dev/build, jadi perlu koneksi internet.

## Halaman

| Rute | Isi |
|---|---|
| `/` | Beranda: ticker Terkini, headline, Terpopuler, Pilihan Redaksi, blok Rembang & Jateng + harga pangan, feed Terbaru, Opini, blok rubrik, Bekal Akhir Pekan |
| `/kanal/[rubrik]` | Halaman rubrik, contoh `/kanal/rembang`, `/kanal/tekno` |
| `/berita/[slug]` | Detail artikel dengan progress baca, tombol bagikan, Baca Juga, berita terkait |
| `/cari?q=...` | Hasil pencarian sederhana (judul, ringkasan, tag) |

## Struktur

```
app/                  rute halaman + globals.css (seluruh gaya & token desain)
components/           Header, Footer, kartu berita (Story), blok (Blocks), komponen interaktif
lib/data.ts           konten dummy: rubrik & artikel — ganti dengan API/CMS nanti
lib/format.ts         format tanggal WIB, rupiah, dan URL foto
```

## Mengganti konten

- **Artikel & rubrik**: edit `lib/data.ts`. Semua nama dan kejadian di sana fiktif.
- **Foto**: sementara pakai foto acak dari picsum.photos (fungsi `img()` di `lib/format.ts`). Saat sudah ada foto sendiri, ubah fungsi itu dan tambahkan domain foto di `next.config.ts`.
- **Warna rubrik**: properti `color` tiap rubrik di `lib/data.ts`.
- **Warna & font utama**: blok `:root` di atas `app/globals.css`.

## Berita otomatis dari jaringan media

Berita diambil otomatis dari media sumber dan dibaca langsung di faktarembang
(diperbarui tiap 10 menit). Pengaturannya ada di `lib/sources.ts`.

| Media | Cara ambil | Status |
|---|---|---|
| Linikata (linikata.com) | WordPress `/wp-json/wp/v2/posts` | aktif |
| Gemadika (gemadika.com) | WordPress `/wp-json/wp/v2/posts` | aktif |
| Kawal Jateng (kawaljateng.com) | RSS | belum aktif, menunggu feed RSS dari tim IT |

- Setiap berita mencantumkan media asal + link "Baca di …", dan tag canonical ke tulisan asli (aman untuk SEO media sumber).
- Kategori di media sumber dipetakan otomatis ke rubrik faktarembang (`CATEGORY_RULES` di `lib/sources.ts`).
- Kalau semua sumber gagal diambil, web menampilkan konten demo (`lib/data.ts`) supaya tidak kosong.
- Untuk mengaktifkan Kawal Jateng: isi `feed` dengan alamat RSS-nya dan ubah `enabled` menjadi `true`.

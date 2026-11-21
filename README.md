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

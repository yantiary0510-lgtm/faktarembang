# Plan UI/UX faktarembang

## Arah desain
Portal berita umum yang **padat dan dinamis**, berakar di Rembang. Merah tua batik Lasem jadi warna brand, dipadu tinta hitam dan krem hangat.

## Referensi
| Media | Yang diambil |
|---|---|
| Detik / Kompas | Kepadatan beranda, ticker "Terkini", feed terbaru yang cepat dipindai, dateline "KOTA, media –" |
| The Guardian | Warna per rubrik hanya di garis atas & label (bukan latar), navigasi berbasis rubrik utama |
| BBC News | Grid modular, hierarki jelas dari headline ke berita pendukung |
| New York Times | Judul serif tegas, daftar Terpopuler bernomor |

## Sistem desain
- **Warna**: merah Lasem `#A3161B`, tinta `#151412`, krem `#F6F2EA`, malam `#121110`
- **Rubrik**: Nasional merah · Rembang oker `#B0601A` · Ekonomi hijau `#1E6B52` · Internasional biru laut `#245C7A` · Olahraga biru `#1F4E99` · Tekno ungu `#5B3A8C` · Gaya Hidup magenta `#A33A6B` · Opini abu `#3D3A36`
- **Tipografi**: Source Serif 4 (judul, isi artikel), IBM Plex Sans (teks UI), IBM Plex Sans Condensed (navigasi, label, judul seksi)
- **Kepala seksi**: garis tipis hitam + potongan tebal berwarna rubrik di kiri atas
- **Breakpoint**: 1180px, 1024px, 860px, 720px

## Halaman
1. **Beranda**: topbar → masthead → nav rubrik (sticky) → ticker → topik hangat → headline (utama + 2 pendukung + Terpopuler) → Pilihan Redaksi → Rembang & Jateng + Harga Pangan → iklan → Berita Terbaru (muat lebih banyak) + Opini/Newsletter → Ekonomi/Olahraga/Tekno → Bekal Akhir Pekan (latar gelap) → footer
2. **Kanal**: strip warna rubrik, judul besar, deskripsi, sub-topik → headline kanal → daftar terbaru → dari rubrik lain; sidebar Terpopuler kanal
3. **Artikel**: progress baca → breadcrumb, label, judul, lead, byline → foto + keterangan → isi (dateline, kutipan, subjudul, Baca Juga) → tag, bagikan, kredit penulis/editor → berita terkait; tombol bagikan melayang di kiri (desktop)
4. **Cari** dan **404**

## Langkah berikutnya (saran)
- Sambungkan ke CMS/API (misal Strapi, WordPress headless, atau Supabase)
- Foto asli dan kredit fotografer
- Halaman penulis, indeks berita per tanggal, mode gelap

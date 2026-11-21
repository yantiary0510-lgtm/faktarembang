import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Foto berita datang dari banyak media sumber, jadi ditampilkan apa adanya
    // (tanpa optimasi Vercel, yang kuotanya terbatas di paket gratis).
    unoptimized: true,
  },
};

export default nextConfig;

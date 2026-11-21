import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Foto placeholder. Tambahkan domain CDN foto redaksi di sini nanti.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }, { protocol: "https", hostname: "fastly.picsum.photos" }],
  },
};

export default nextConfig;

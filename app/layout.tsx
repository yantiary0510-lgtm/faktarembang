import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed, Source_Serif_4 } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const condensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cond",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "faktarembang – Fakta dan terukur",
    template: "%s | faktarembang",
  },
  description:
    "Berita terkini Rembang, Jawa Tengah, dan nasional. Politik, ekonomi, olahraga, teknologi, dan gaya hidup.",
};

export const viewport: Viewport = {
  themeColor: "#A3161B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable} ${condensed.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

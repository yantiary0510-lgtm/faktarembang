import Header from "./Header";
import Footer from "./Footer";
import { Ticker } from "./Blocks";
import { getNews, trendingTags } from "@/lib/news";

export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const { articles, isDemo } = await getNews();
  return (
    <>
      <a href="#konten" className="skip-link">
        Langsung ke konten
      </a>
      <Header tags={trendingTags(articles, isDemo).slice(0, 5)} />
      <Ticker items={articles.slice(0, 8)} />
      <main id="konten">{children}</main>
      <Footer isDemo={isDemo} />
    </>
  );
}

import Header from "./Header";
import Footer from "./Footer";
import { Ticker } from "./Blocks";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#konten" className="skip-link">
        Langsung ke konten
      </a>
      <Header />
      <Ticker />
      <main id="konten">{children}</main>
      <Footer />
    </>
  );
}

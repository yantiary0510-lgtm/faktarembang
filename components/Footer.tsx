import Link from "next/link";
import Logo from "./Logo";
import { categories } from "@/lib/data";

export default function Footer({ isDemo = false }: { isDemo?: boolean }) {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Logo size="md" invert />
          <p>
            Media siber dari pesisir utara Jawa. Kami memberitakan Rembang, Jawa Tengah, dan Indonesia
            dengan satu prinsip: cek dulu, baru tulis.
          </p>
          <address>
            Jl. Pemuda No. 12, Rembang, Jawa Tengah 59211
            <br />
            redaksi@faktarembang.id · (0295) 000 000
          </address>
        </div>

        <div className="footer__col">
          <h4>Rubrik</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/kanal/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Tentang</h4>
          <ul>
            <li id="redaksi"><a href="#redaksi">Susunan Redaksi</a></li>
            <li id="pedoman"><a href="#pedoman">Pedoman Media Siber</a></li>
            <li><a href="#koreksi">Kebijakan Koreksi</a></li>
            <li><a href="#privasi">Kebijakan Privasi</a></li>
            <li id="iklan"><a href="#iklan">Pasang Iklan</a></li>
            <li><a href="#karier">Karier</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Kirim Kabar</h4>
          <p className="footer__tip">
            Lihat kejadian di sekitarmu? Kirim foto dan keterangan singkat ke WhatsApp redaksi. Identitas
            pengirim kami lindungi.
          </p>
          <a className="btn btn--red btn--sm" href="#kirim">
            Kirim ke Redaksi
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© 2026 faktarembang. Hak cipta dilindungi.</span>
          {isDemo ? (
            <span>Konten yang tampil saat ini adalah contoh (fiktif), untuk kebutuhan desain.</span>
          ) : (
            <span>Berita dari jaringan media faktarembang. Setiap berita mencantumkan media asalnya.</span>
          )}
        </div>
      </div>
    </footer>
  );
}

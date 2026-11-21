"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { IconClose, IconMenu, IconSearch } from "./Icons";
import { categories, trendingTags } from "@/lib/data";
import { longDate, TODAY } from "@/lib/format";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    if (q) router.push(`/cari?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__date">{longDate(TODAY)}</span>
          <nav className="topbar__links" aria-label="Tautan cepat">
            <Link href="/kanal/nasional">Indeks Berita</Link>
            <a href="#redaksi">Redaksi</a>
            <a href="#pedoman">Pedoman Media Siber</a>
            <a href="#iklan">Pasang Iklan</a>
          </nav>
        </div>
      </div>

      <div className="masthead">
        <div className="container masthead__inner">
          <button
            className="icon-btn masthead__menu"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu size={24} />
          </button>

          <div className="masthead__brand">
            <Logo size="lg" />
            <span className="masthead__tagline">Fakta dan terukur</span>
          </div>

          <div className="masthead__actions">
            <button
              className={`icon-btn ${searchOpen ? "is-on" : ""}`}
              aria-label="Cari berita"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <IconClose size={22} /> : <IconSearch size={22} />}
            </button>
            <a href="#newsletter" className="btn btn--red masthead__cta">
              Langganan
            </a>
          </div>
        </div>
      </div>

      <nav className="mainnav" aria-label="Rubrik">
        <div className="container mainnav__inner">
          <Link href="/" className={`mainnav__item ${isActive("/") ? "is-active" : ""}`}>
            Beranda
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/kanal/${c.slug}`}
              className={`mainnav__item ${isActive(`/kanal/${c.slug}`) ? "is-active" : ""}`}
              style={{ "--cat": c.color } as React.CSSProperties}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </nav>

      {searchOpen && (
        <div className="searchbar">
          <form className="container searchbar__form" onSubmit={onSearch} role="search">
            <IconSearch size={20} />
            <input ref={inputRef} name="q" type="search" placeholder="Cari berita, topik, atau nama tempat…" />
            <button className="btn btn--ink" type="submit">
              Cari
            </button>
          </form>
          <div className="container searchbar__hints">
            <span>Sedang dicari:</span>
            {trendingTags.slice(0, 5).map((t) => (
              <Link key={t} href={`/cari?q=${encodeURIComponent(t)}`}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className={`drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer__backdrop" onClick={() => setMenuOpen(false)} />
        <div className="drawer__panel" role="dialog" aria-label="Menu">
          <div className="drawer__head">
            <Logo size="sm" />
            <button className="icon-btn" aria-label="Tutup menu" onClick={() => setMenuOpen(false)}>
              <IconClose size={24} />
            </button>
          </div>
          <form className="drawer__search" onSubmit={onSearch} role="search">
            <IconSearch size={18} />
            <input name="q" type="search" placeholder="Cari berita…" />
          </form>
          <ul className="drawer__list">
            <li>
              <Link href="/">Beranda</Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug} style={{ "--cat": c.color } as React.CSSProperties}>
                <Link href={`/kanal/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
          <div className="drawer__foot">
            <a href="#redaksi">Redaksi</a>
            <a href="#pedoman">Pedoman Media Siber</a>
            <a href="#iklan">Pasang Iklan</a>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";

export default function Newsletter({ dark = false }: { dark?: boolean }) {
  const [sent, setSent] = useState<string | null>(null);

  return (
    <section id="newsletter" className={`newsletter ${dark ? "newsletter--dark" : ""}`}>
      <span className="newsletter__eyebrow">Kabar Pagi</span>
      <h3 className="newsletter__title">Lima berita penting, dikirim tiap pukul 06.00.</h3>
      {sent ? (
        <p className="newsletter__ok">
          Terima kasih. Cek kotak masuk <strong>{sent}</strong> untuk konfirmasi.
        </p>
      ) : (
        <form
          className="newsletter__form"
          onSubmit={(e) => {
            e.preventDefault();
            const email = new FormData(e.currentTarget).get("email")?.toString() ?? "";
            setSent(email);
          }}
        >
          <label className="sr-only" htmlFor={`nl-${dark ? "d" : "l"}`}>
            Alamat email
          </label>
          <input id={`nl-${dark ? "d" : "l"}`} name="email" type="email" required placeholder="nama@email.com" />
          <button className="btn btn--red" type="submit">
            Daftar
          </button>
        </form>
      )}
      <p className="newsletter__fine">Gratis. Berhenti kapan saja.</p>
    </section>
  );
}

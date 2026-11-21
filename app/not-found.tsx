import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container notfound">
      <span className="notfound__code">404</span>
      <h1>Halaman ini tidak ada, atau sudah dipindah.</h1>
      <p>Mungkin tautannya salah ketik. Coba mulai lagi dari beranda.</p>
      <Link href="/" className="btn btn--red">
        Kembali ke beranda
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function Logo({ size = "md", invert = false }: { size?: "sm" | "md" | "lg"; invert?: boolean }) {
  return (
    <Link href="/" className={`logo logo--${size} ${invert ? "logo--invert" : ""}`} aria-label="faktarembang, ke beranda">
      <span className="logo__fakta">fakta</span>
      <span className="logo__rembang">rembang</span>
    </Link>
  );
}

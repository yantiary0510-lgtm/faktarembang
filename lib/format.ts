const TZ = "Asia/Jakarta";

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const BULAN_PANJANG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// Ambil komponen tanggal di zona WIB tanpa bergantung pada locale ICU
// (hasilnya identik di server dan browser).
function parts(iso: string) {
  const d = new Date(iso);
  const wib = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  return {
    day: wib.getUTCDay(),
    date: wib.getUTCDate(),
    month: wib.getUTCMonth(),
    year: wib.getUTCFullYear(),
    hh: String(wib.getUTCHours()).padStart(2, "0"),
    mm: String(wib.getUTCMinutes()).padStart(2, "0"),
  };
}

/** 14.20 WIB */
export const time = (iso: string) => {
  const p = parts(iso);
  return `${p.hh}.${p.mm} WIB`;
};

/** 9 Nov 2026, 14.20 WIB */
export const dateTime = (iso: string) => {
  const p = parts(iso);
  return `${p.date} ${BULAN[p.month]} ${p.year}, ${p.hh}.${p.mm} WIB`;
};

/** Senin, 9 November 2026 | 14.20 WIB */
export const longDateTime = (iso: string) => {
  const p = parts(iso);
  return `${HARI[p.day]}, ${p.date} ${BULAN_PANJANG[p.month]} ${p.year} | ${p.hh}.${p.mm} WIB`;
};

/** Senin, 9 November 2026 */
export const longDate = (iso: string) => {
  const p = parts(iso);
  return `${HARI[p.day]}, ${p.date} ${BULAN_PANJANG[p.month]} ${p.year}`;
};

/** Label singkat: jam kalau hari ini, tanggal kalau sebelumnya. */
export const shortStamp = (iso: string, todayIso: string) => {
  const a = parts(iso);
  const b = parts(todayIso);
  if (a.date === b.date && a.month === b.month && a.year === b.year) return time(iso);
  return `${a.date} ${BULAN[a.month]}, ${a.hh}.${a.mm}`;
};

export const rupiah = (n: number) => "Rp" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const views = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(".", ",")} rb` : String(n);

export const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

/** Foto placeholder. Ganti dengan URL foto asli saat sudah ada CMS. */
export const img = (seed: string, w = 1200, h = 750) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** Waktu sekarang (dipakai untuk tanggal di topbar dan label jam). */
export const now = () => new Date().toISOString();

// Konten dummy untuk keperluan desain UI.
// Semua nama orang dan kejadian di bawah ini fiktif.

export type CategorySlug =
  | "nasional"
  | "rembang"
  | "ekonomi"
  | "internasional"
  | "olahraga"
  | "tekno"
  | "gaya-hidup"
  | "opini";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  color: string;
  description: string;
  topics: string[];
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; by: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  author: string;
  editor: string;
  date: string; // ISO, WIB
  location: string;
  image: string; // seed foto
  caption: string;
  readMin: number;
  views: number;
  tags: string[];
  body: Block[];
};

export const categories: Category[] = [
  {
    slug: "nasional",
    name: "Nasional",
    short: "Nasional",
    color: "#A3161B",
    description: "Kebijakan, politik, hukum, dan peristiwa yang berdampak ke seluruh negeri.",
    topics: ["Politik", "Hukum", "Pendidikan", "Kesehatan", "Mudik"],
  },
  {
    slug: "rembang",
    name: "Rembang & Jateng",
    short: "Rembang",
    color: "#B0601A",
    description: "Kabar dari Rembang, Lasem, pesisir utara, dan kabupaten tetangga di Jawa Tengah.",
    topics: ["Lasem", "Pesisir", "Pemerintahan", "Infrastruktur", "Pertanian"],
  },
  {
    slug: "ekonomi",
    name: "Ekonomi",
    short: "Ekonomi",
    color: "#1E6B52",
    description: "Harga, pasar, UMKM, dan uang di saku warga.",
    topics: ["Harga Pangan", "UMKM", "Pasar Modal", "Energi"],
  },
  {
    slug: "internasional",
    name: "Internasional",
    short: "Dunia",
    color: "#245C7A",
    description: "Peristiwa dunia dan kaitannya dengan Indonesia.",
    topics: ["Asia Tenggara", "Asia Timur", "Pekerja Migran"],
  },
  {
    slug: "olahraga",
    name: "Olahraga",
    short: "Olahraga",
    color: "#1F4E99",
    description: "Sepak bola lokal sampai timnas, lari, dan olahraga warga.",
    topics: ["Sepak Bola", "Timnas", "Lari", "Bulu Tangkis"],
  },
  {
    slug: "tekno",
    name: "Tekno",
    short: "Tekno",
    color: "#5B3A8C",
    description: "Teknologi, keamanan siber, dan dunia digital sehari-hari.",
    topics: ["Keamanan Siber", "Gawai", "Layanan Digital", "Startup"],
  },
  {
    slug: "gaya-hidup",
    name: "Gaya Hidup",
    short: "Gaya Hidup",
    color: "#A33A6B",
    description: "Kuliner, wisata, budaya, dan keseharian.",
    topics: ["Kuliner", "Wisata", "Budaya", "Keluarga"],
  },
  {
    slug: "opini",
    name: "Opini",
    short: "Opini",
    color: "#3D3A36",
    description: "Kolom dan gagasan dari penulis tamu dan redaksi.",
    topics: ["Kolom", "Tajuk"],
  },
];

const P = (text: string): Block => ({ type: "p", text });
const H = (text: string): Block => ({ type: "h2", text });
const Q = (text: string, by: string): Block => ({ type: "quote", text, by });

export const articles: Article[] = [
  {
    slug: "data-tunggal-bansos-verifikasi-ulang-penerima",
    title: "Pemerintah Pangkas Antrean Bansos Lewat Data Tunggal, 4,2 Juta Penerima Diverifikasi Ulang",
    excerpt:
      "Verifikasi dilakukan bertahap mulai Desember. Warga yang datanya ganda atau sudah meninggal akan dicoret, sementara keluarga miskin baru bisa diusulkan lewat desa.",
    category: "nasional",
    author: "Laras Wening",
    editor: "Hanif Rahmadi",
    date: "2026-11-09T13:40:00+07:00",
    location: "JAKARTA",
    image: "bansos-data",
    caption: "Petugas mencocokkan data penerima bantuan di kantor kelurahan.",
    readMin: 5,
    views: 48210,
    tags: ["Bansos", "Data Tunggal", "Kemiskinan"],
    body: [
      P("Pemerintah mulai memverifikasi ulang 4,2 juta data penerima bantuan sosial yang selama ini tercatat ganda di beberapa basis data kementerian. Langkah ini disebut sebagai bagian dari peralihan ke satu data tunggal kesejahteraan yang ditargetkan rampung pertengahan 2027."),
      P("Menurut keterangan tim pelaksana, pencocokan akan memakai nomor induk kependudukan sebagai kunci. Data yang tidak cocok dengan catatan kependudukan, termasuk penerima yang sudah meninggal atau pindah domisili, akan ditandai dan dikirim kembali ke pemerintah desa untuk dikonfirmasi."),
      H("Desa jadi pintu usulan"),
      P("Keluarga yang merasa layak tetapi belum tercatat bisa mengajukan diri melalui musyawarah desa. Usulan itu kemudian diverifikasi oleh pendamping sosial di tingkat kecamatan sebelum masuk ke sistem pusat."),
      Q("Kami tidak ingin ada orang yang berhak tapi tertinggal hanya karena datanya salah ketik.", "Sri Handayani, koordinator pendamping sosial"),
      P("Sejumlah pemerhati kebijakan sosial menyambut baik langkah ini, tetapi mengingatkan agar proses pencoretan tidak dilakukan terburu-buru. Mereka meminta ada masa sanggah yang cukup bagi warga yang namanya dicoret."),
      P("Tahap pertama verifikasi akan dimulai di 120 kabupaten pada Desember, termasuk sejumlah daerah di pesisir utara Jawa Tengah."),
    ],
  },
  {
    slug: "pengerukan-pelabuhan-tasikagung-dimulai",
    title: "Pelabuhan Tasikagung Mulai Dikeruk, Nelayan Berharap Kapal Tak Lagi Kandas Saat Surut",
    excerpt:
      "Pendangkalan alur membuat kapal di atas 30 GT harus menunggu pasang untuk bersandar. Pengerukan ditargetkan selesai sebelum musim baratan.",
    category: "rembang",
    author: "Dimas Prasetyo",
    editor: "Retno Kusumawati",
    date: "2026-11-09T12:15:00+07:00",
    location: "REMBANG",
    image: "pelabuhan-nelayan",
    caption: "Kapal nelayan bersandar di Pelabuhan Perikanan Tasikagung, Rembang.",
    readMin: 4,
    views: 39870,
    tags: ["Tasikagung", "Nelayan", "Pelabuhan"],
    body: [
      P("Alat berat mulai mengeruk alur masuk Pelabuhan Perikanan Tasikagung sejak Senin pagi. Pendangkalan yang terjadi dalam dua tahun terakhir membuat kapal berukuran besar kerap kandas ketika air laut surut."),
      P("Kasno (52), nakhoda kapal cantrang yang sudah 30 tahun melaut, mengatakan kapalnya pernah tertahan hampir enam jam di mulut alur. Ikan hasil tangkapan yang seharusnya langsung dilelang terpaksa menunggu."),
      Q("Kalau surut, kami cuma bisa menunggu. Es di palka habis, harga ikan ikut turun.", "Kasno, nelayan Tasikagung"),
      H("Target sebelum musim baratan"),
      P("Pengelola pelabuhan menyebut pengerukan dilakukan sepanjang 1,2 kilometer dengan kedalaman target empat meter. Pekerjaan diupayakan selesai sebelum angin baratan yang biasanya datang akhir Desember."),
      P("Lumpur hasil kerukan akan dipakai untuk menimbun lahan di sisi timur pelabuhan yang rencananya dijadikan area parkir truk pengangkut ikan."),
    ],
  },
  {
    slug: "harga-garam-rakyat-anjlok-petambak-kaliori",
    title: "Harga Garam Rakyat Anjlok ke Rp600 per Kilo, Petambak Kaliori Pilih Tahan Stok di Gudang",
    excerpt:
      "Panen melimpah di akhir kemarau membuat harga jatuh. Petambak berharap ada serapan dari industri sebelum hujan merusak garam yang ditimbun.",
    category: "ekonomi",
    author: "Nur Aini Safitri",
    editor: "Hanif Rahmadi",
    date: "2026-11-09T11:05:00+07:00",
    location: "REMBANG",
    image: "tambak-garam",
    caption: "Petambak memanen garam di Kecamatan Kaliori.",
    readMin: 4,
    views: 35102,
    tags: ["Garam", "Kaliori", "Harga Pangan"],
    body: [
      P("Harga garam rakyat di tingkat petambak Kecamatan Kaliori turun menjadi Rp600 per kilogram, separuh dari harga pada awal musim. Panen yang melimpah di ujung kemarau membuat pasokan menumpuk, sementara pembeli dari industri belum banyak masuk."),
      P("Sebagian petambak memilih menahan garam di gudang sambil menunggu harga membaik. Namun pilihan itu berisiko karena hujan yang mulai turun bisa membuat garam yang disimpan di gudang sederhana menyusut."),
      Q("Disimpan takut hujan, dijual rugi. Serba salah.", "Ruslan, petambak Desa Dresi Wetan"),
      P("Kelompok petambak berharap pemerintah daerah memfasilitasi pertemuan dengan pembeli industri agar garam bisa terserap dengan harga yang lebih wajar."),
    ],
  },
  {
    slug: "phishing-undangan-pernikahan-digital-marak",
    title: "Penipuan Berkedok Undangan Pernikahan Digital Kembali Marak, Kenali Ciri Berkasnya",
    excerpt:
      "Berkas yang dikirim lewat aplikasi pesan ternyata aplikasi berbahaya. Begitu dipasang, pelaku bisa membaca SMS termasuk kode OTP perbankan.",
    category: "tekno",
    author: "Bagus Wicaksono",
    editor: "Retno Kusumawati",
    date: "2026-11-09T10:20:00+07:00",
    location: "SEMARANG",
    image: "ponsel-keamanan",
    caption: "Ilustrasi pesan berisi berkas aplikasi mencurigakan di ponsel.",
    readMin: 6,
    views: 52440,
    tags: ["Keamanan Siber", "Phishing", "APK"],
    body: [
      P("Modus penipuan lewat berkas undangan pernikahan digital kembali beredar di grup-grup percakapan warga. Berkas yang tampak seperti undangan itu sebenarnya adalah aplikasi Android berformat APK yang meminta izin membaca SMS."),
      P("Begitu izin diberikan, aplikasi tersebut meneruskan semua pesan masuk ke pelaku, termasuk kode OTP dari bank dan dompet digital. Dari situ pelaku bisa mengambil alih akun korban."),
      H("Ciri yang perlu diwaspadai"),
      P("Undangan asli biasanya berupa tautan situs web atau gambar, bukan berkas yang harus dipasang. Nama berkas yang berakhiran .apk, ukuran berkas beberapa megabita, dan permintaan izin yang tidak masuk akal adalah tanda paling jelas."),
      Q("Aturannya sederhana: undangan tidak pernah perlu di-install. Kalau diminta install, hapus.", "Andika Saputra, peneliti keamanan siber"),
      P("Bagi yang telanjur memasang, segera putuskan koneksi internet, hapus aplikasi lewat menu pengaturan, lalu hubungi bank untuk memblokir akses sementara. Mengganti kata sandi akun penting dari perangkat lain juga disarankan."),
    ],
  },
  {
    slug: "festival-batik-lasem-2026",
    title: "Festival Batik Lasem 2026 Digelar Pekan Depan, 120 Perajin Pamerkan Motif Lama",
    excerpt:
      "Selain pameran, festival menghadirkan tur rumah-rumah tua di kawasan Pecinan dan kelas membatik untuk pengunjung.",
    category: "rembang",
    author: "Retno Kusumawati",
    editor: "Hanif Rahmadi",
    date: "2026-11-09T09:30:00+07:00",
    location: "LASEM",
    image: "batik-lasem",
    caption: "Perajin menyelesaikan kain batik tulis bermotif latohan di Lasem.",
    readMin: 3,
    views: 21980,
    tags: ["Batik Lasem", "Budaya", "Wisata"],
    body: [
      P("Sebanyak 120 perajin batik tulis akan ambil bagian dalam Festival Batik Lasem yang digelar 16 hingga 22 November. Panitia menyebut tahun ini festival menonjolkan motif-motif lama yang mulai jarang dibuat."),
      P("Pengunjung juga bisa mengikuti tur jalan kaki menyusuri rumah-rumah tua di kawasan Pecinan, serta kelas membatik singkat bersama perajin."),
      P("Panitia berharap festival ini ikut mendongkrak penjualan perajin kecil yang omzetnya turun sejak dua tahun terakhir."),
    ],
  },
  {
    slug: "bmkg-pesisir-utara-jawa-siaga-rob",
    title: "Musim Hujan Datang Lebih Awal, Daerah Pesisir Utara Jawa Diminta Siaga Banjir Rob",
    excerpt:
      "Pasang tinggi diperkirakan bertepatan dengan curah hujan lebat pada pekan ketiga November. Warga di bantaran sungai diminta mengamankan barang berharga.",
    category: "nasional",
    author: "Hanif Rahmadi",
    editor: "Retno Kusumawati",
    date: "2026-11-09T08:45:00+07:00",
    location: "SEMARANG",
    image: "rob-pesisir",
    caption: "Jalan di kawasan pesisir tergenang air pasang.",
    readMin: 3,
    views: 30115,
    tags: ["Cuaca", "Rob", "Pantura"],
    body: [
      P("Prakirawan cuaca memperkirakan musim hujan di sebagian pesisir utara Jawa datang lebih awal dari biasanya. Kondisi ini berpotensi bertepatan dengan fase pasang tinggi pada pekan ketiga November."),
      P("Pemerintah daerah di sepanjang pantura diminta menyiapkan pompa air dan jalur evakuasi, terutama di permukiman yang berada di bawah permukaan laut pasang."),
      P("Warga diimbau memantau informasi cuaca resmi dan tidak mudah percaya pada pesan berantai yang belum jelas sumbernya."),
    ],
  },
  {
    slug: "psir-rembang-menang-dramatis",
    title: "PSIR Tekuk Tamunya 2-1, Gol Penentu Lahir di Menit Tambahan Waktu",
    excerpt:
      "Sundulan bek tengah di menit 90+3 memecah kebuntuan. Kemenangan ini membawa Laskar Dampo Awang naik ke posisi tiga klasemen grup.",
    category: "olahraga",
    author: "Bagus Wicaksono",
    editor: "Hanif Rahmadi",
    date: "2026-11-08T21:10:00+07:00",
    location: "REMBANG",
    image: "stadion-malam",
    caption: "Suasana pertandingan di Stadion Krida, Rembang.",
    readMin: 3,
    views: 27650,
    tags: ["PSIR", "Liga 3", "Sepak Bola"],
    body: [
      P("PSIR Rembang memastikan kemenangan 2-1 atas tamunya di Stadion Krida, Minggu malam. Gol penentu dicetak lewat sundulan bek tengah memanfaatkan sepak pojok di menit 90+3."),
      P("Sempat unggul lebih dulu di babak pertama, tuan rumah kebobolan lewat serangan balik cepat sepuluh menit setelah jeda. Tekanan bertubi-tubi di akhir laga akhirnya membuahkan hasil."),
      P("Dengan tambahan tiga poin, PSIR naik ke posisi tiga klasemen sementara grup dan menjaga peluang lolos ke babak berikutnya."),
    ],
  },
  {
    slug: "rupiah-menguat-tipis-awal-pekan",
    title: "Rupiah Menguat Tipis di Awal Pekan, Pasar Menanti Data Inflasi",
    excerpt:
      "Penguatan terjadi seiring masuknya dana asing ke pasar obligasi. Analis memperkirakan pergerakan masih terbatas hingga data inflasi dirilis.",
    category: "ekonomi",
    author: "Nur Aini Safitri",
    editor: "Hanif Rahmadi",
    date: "2026-11-09T10:55:00+07:00",
    location: "JAKARTA",
    image: "pasar-uang",
    caption: "Layar pergerakan kurs di sebuah gerai penukaran uang.",
    readMin: 2,
    views: 12400,
    tags: ["Rupiah", "Kurs", "Inflasi"],
    body: [
      P("Nilai tukar rupiah dibuka menguat tipis pada perdagangan Senin pagi. Penguatan ditopang masuknya dana asing ke pasar surat utang negara."),
      P("Analis menilai pergerakan rupiah masih akan terbatas sampai data inflasi bulanan dirilis. Pelaku pasar juga mencermati arah suku bunga di negara-negara maju."),
    ],
  },
  {
    slug: "asean-sepakati-pembayaran-qr-lintas-negara",
    title: "ASEAN Sepakati Peta Jalan Pembayaran QR Lintas Negara, Turis Tak Perlu Tukar Uang Tunai",
    excerpt:
      "Integrasi ditargetkan menjangkau sepuluh negara anggota pada 2028. Pelaku UMKM di daerah wisata disebut paling diuntungkan.",
    category: "internasional",
    author: "Laras Wening",
    editor: "Retno Kusumawati",
    date: "2026-11-09T07:50:00+07:00",
    location: "KUALA LUMPUR",
    image: "pembayaran-qr",
    caption: "Pembeli memindai kode QR untuk membayar di pasar.",
    readMin: 4,
    views: 18320,
    tags: ["ASEAN", "QRIS", "Pembayaran Digital"],
    body: [
      P("Negara-negara anggota ASEAN menyepakati peta jalan integrasi pembayaran berbasis kode QR. Dengan sistem ini, wisatawan dari negara tetangga bisa membayar memakai aplikasi dari negaranya sendiri."),
      P("Integrasi ditargetkan mencakup seluruh negara anggota pada 2028. Pelaku usaha kecil di kawasan wisata disebut akan paling merasakan manfaatnya karena tidak perlu menyiapkan mesin pembayaran khusus."),
    ],
  },
  {
    slug: "lontong-tuyuhan-kuliner-pancur",
    title: "Lontong Tuyuhan, Pedasnya Kuliner Khas Pancur yang Selalu Diburu Pemudik",
    excerpt:
      "Lontong berbentuk segitiga dengan kuah opor ayam kampung yang pedas. Warung-warung di Desa Tuyuhan mulai ramai sejak subuh.",
    category: "gaya-hidup",
    author: "Retno Kusumawati",
    editor: "Hanif Rahmadi",
    date: "2026-11-08T16:00:00+07:00",
    location: "REMBANG",
    image: "kuliner-opor",
    caption: "Sepiring lontong tuyuhan dengan kuah opor ayam kampung.",
    readMin: 3,
    views: 15600,
    tags: ["Kuliner", "Lontong Tuyuhan", "Pancur"],
    body: [
      P("Lontong tuyuhan dikenal dari bentuknya yang segitiga dan kuah opor ayam kampung bercita rasa pedas. Hidangan ini berasal dari Desa Tuyuhan, Kecamatan Pancur, sekitar 20 menit dari pusat kota Rembang."),
      P("Deretan warung di desa itu mulai buka sejak subuh. Pada musim libur, antrean pembeli bisa mengular hingga ke tepi jalan."),
    ],
  },
  {
    slug: "seleksi-cpns-2026-dibuka-akhir-november",
    title: "Seleksi CPNS Dibuka Akhir November, Formasi Guru dan Tenaga Kesehatan Mendominasi",
    excerpt:
      "Pelamar diminta menyiapkan dokumen sejak sekarang. Panitia mengingatkan seluruh proses pendaftaran gratis dan hanya melalui laman resmi.",
    category: "nasional",
    author: "Laras Wening",
    editor: "Hanif Rahmadi",
    date: "2026-11-08T19:30:00+07:00",
    location: "JAKARTA",
    image: "pendaftaran-online",
    caption: "Pelamar mengisi formulir pendaftaran secara daring.",
    readMin: 4,
    views: 44100,
    tags: ["CPNS", "Lowongan", "ASN"],
    body: [
      P("Pendaftaran seleksi calon pegawai negeri sipil dijadwalkan dibuka akhir November. Formasi guru dan tenaga kesehatan disebut mengisi porsi terbesar dari kuota yang tersedia."),
      P("Panitia mengingatkan bahwa pendaftaran tidak dipungut biaya dan hanya dilakukan melalui laman resmi. Warga diminta waspada terhadap tawaran jalur khusus yang meminta imbalan."),
    ],
  },
  {
    slug: "lomba-capture-the-flag-kampus-semarang",
    title: "Kampus di Semarang Gelar Lomba Capture The Flag, 300 Mahasiswa Adu Retas Secara Legal",
    excerpt:
      "Peserta ditantang menemukan celah di sistem tiruan yang sengaja dibuat rentan. Panitia ingin menjaring bibit talenta keamanan siber dari Jawa Tengah.",
    category: "tekno",
    author: "Bagus Wicaksono",
    editor: "Retno Kusumawati",
    date: "2026-11-08T14:10:00+07:00",
    location: "SEMARANG",
    image: "kompetisi-ctf",
    caption: "Peserta lomba keamanan siber berkonsentrasi di depan laptop.",
    readMin: 3,
    views: 9800,
    tags: ["Keamanan Siber", "CTF", "Mahasiswa"],
    body: [
      P("Sebanyak 300 mahasiswa dari berbagai kampus di Jawa Tengah mengikuti lomba Capture The Flag di Semarang. Peserta ditantang menemukan celah keamanan di sistem tiruan yang memang sengaja dibuat rentan."),
      P("Panitia menyebut lomba semacam ini menjadi cara aman untuk melatih kemampuan peretasan etis sekaligus menjaring talenta keamanan siber dari daerah."),
    ],
  },
  {
    slug: "timnas-u23-tiba-lini-belakang-disorot",
    title: "Timnas U-23 Tiba di Jakarta, Pelatih Soroti Lini Belakang yang Mudah Goyah",
    excerpt:
      "Kebobolan lima gol dalam tiga laga uji coba jadi bahan evaluasi utama sebelum turnamen bulan depan.",
    category: "olahraga",
    author: "Bagus Wicaksono",
    editor: "Hanif Rahmadi",
    date: "2026-11-08T11:40:00+07:00",
    location: "JAKARTA",
    image: "latihan-sepakbola",
    caption: "Pemain timnas menjalani sesi latihan.",
    readMin: 3,
    views: 23300,
    tags: ["Timnas", "U-23", "Sepak Bola"],
    body: [
      P("Skuad timnas U-23 tiba di Jakarta setelah menjalani pemusatan latihan di luar negeri. Lini belakang yang kebobolan lima gol dalam tiga laga uji coba menjadi sorotan utama tim pelatih."),
      P("Tim pelatih akan memanggil dua pemain bertahan tambahan untuk mengikuti latihan pekan ini sebelum daftar final diumumkan."),
    ],
  },
  {
    slug: "jalan-rembang-lasem-rusak-warga-tanam-pisang",
    title: "Jalan Rembang–Lasem Rusak Parah, Warga Tanam Pohon Pisang di Lubang Jalan",
    excerpt:
      "Aksi itu jadi penanda bahaya bagi pengendara. Dua kecelakaan tunggal tercatat dalam sepekan terakhir di ruas yang sama.",
    category: "rembang",
    author: "Dimas Prasetyo",
    editor: "Retno Kusumawati",
    date: "2026-11-08T17:25:00+07:00",
    location: "REMBANG",
    image: "jalan-rusak",
    caption: "Pohon pisang ditanam warga di lubang jalan sebagai penanda.",
    readMin: 3,
    views: 31200,
    tags: ["Infrastruktur", "Jalan Rusak", "Lasem"],
    body: [
      P("Warga di sekitar ruas jalan Rembang–Lasem menanam pohon pisang di lubang-lubang jalan yang makin lebar. Aksi itu dimaksudkan sebagai penanda agar pengendara, terutama pada malam hari, tidak terperosok."),
      P("Dalam sepekan terakhir tercatat dua kecelakaan tunggal pengendara sepeda motor di ruas tersebut. Warga berharap perbaikan bisa dilakukan sebelum hujan makin sering turun."),
    ],
  },
  {
    slug: "umkm-terasi-sarang-tembus-malaysia",
    title: "UMKM Terasi Sarang Tembus Pasar Malaysia Lewat Platform Ekspor Daring",
    excerpt:
      "Pengiriman perdana sebanyak 800 kilogram. Kemasan ulang dan sertifikasi halal jadi kunci produk bisa diterima pembeli luar negeri.",
    category: "ekonomi",
    author: "Nur Aini Safitri",
    editor: "Hanif Rahmadi",
    date: "2026-11-08T09:15:00+07:00",
    location: "SARANG",
    image: "produk-umkm",
    caption: "Pekerja mengemas terasi untuk dikirim ke luar negeri.",
    readMin: 3,
    views: 11250,
    tags: ["UMKM", "Ekspor", "Sarang"],
    body: [
      P("Kelompok usaha terasi di Kecamatan Sarang mengirim 800 kilogram produknya ke Malaysia melalui platform ekspor daring. Pengiriman ini menjadi yang pertama bagi kelompok tersebut."),
      P("Ketua kelompok menyebut kemasan ulang dan sertifikasi halal menjadi kunci agar produk bisa diterima pembeli di luar negeri."),
    ],
  },
  {
    slug: "kolom-jurnalisme-lokal-masih-penting",
    title: "Kota Kecil, Berita Besar: Mengapa Jurnalisme Lokal Masih Kita Butuhkan",
    excerpt:
      "Ketika jalan berlubang, harga garam jatuh, atau sungai meluap, yang pertama datang bukan media nasional. Yang datang adalah tetangga yang kebetulan wartawan.",
    category: "opini",
    author: "Ahmad Zuhdi",
    editor: "Hanif Rahmadi",
    date: "2026-11-08T07:00:00+07:00",
    location: "REMBANG",
    image: "koran-pagi",
    caption: "Ilustrasi koran pagi di warung kopi.",
    readMin: 5,
    views: 8700,
    tags: ["Kolom", "Media", "Jurnalisme"],
    body: [
      P("Di kota kecil, berita jarang datang dengan sirene. Ia datang dari obrolan di warung kopi, dari keluhan nelayan di dermaga, dari ibu-ibu yang menghitung ulang belanja dapur."),
      P("Jurnalisme lokal bekerja di ruang itu. Ia mungkin tidak masuk tajuk utama nasional, tetapi justru di situlah kebijakan diuji: apakah bantuan benar-benar sampai, apakah jalan benar-benar diperbaiki."),
      P("Tantangannya nyata. Iklan menyusut, pembaca terbiasa gratis, dan kabar bohong menyebar lebih cepat dari ralat. Tetapi selama warga masih butuh tahu apa yang terjadi di sekitarnya, kerja ini tetap penting."),
    ],
  },
  {
    slug: "pantai-rembang-libur-akhir-tahun",
    title: "Lima Pantai di Rembang untuk Libur Akhir Tahun, dari Karang Jahe sampai Caruban",
    excerpt:
      "Pasir putih, cemara laut, dan warung ikan bakar. Datang pagi hari agar tidak kepanasan dan kebagian tempat parkir.",
    category: "gaya-hidup",
    author: "Retno Kusumawati",
    editor: "Hanif Rahmadi",
    date: "2026-11-07T15:30:00+07:00",
    location: "REMBANG",
    image: "pantai-cemara",
    caption: "Deretan cemara laut di tepi pantai.",
    readMin: 4,
    views: 19800,
    tags: ["Wisata", "Pantai", "Libur Akhir Tahun"],
    body: [
      P("Rembang punya garis pantai panjang yang cocok untuk libur akhir tahun bersama keluarga. Pantai Karang Jahe dengan deretan cemara lautnya masih jadi favorit."),
      P("Bagi yang ingin suasana lebih tenang, pantai di sisi timur seperti Caruban bisa jadi pilihan. Datanglah pagi hari agar tidak kepanasan dan masih kebagian tempat parkir."),
    ],
  },
  {
    slug: "jepang-longgarkan-visa-pekerja-terampil",
    title: "Jepang Longgarkan Visa Pekerja Terampil, Peluang Terbuka bagi Lulusan SMK",
    excerpt:
      "Bidang perawatan lansia, konstruksi, dan pengolahan makanan paling banyak membuka lowongan. Calon pekerja diminta memakai jalur resmi.",
    category: "internasional",
    author: "Laras Wening",
    editor: "Retno Kusumawati",
    date: "2026-11-07T12:20:00+07:00",
    location: "TOKYO",
    image: "kota-tokyo",
    caption: "Suasana jalan di pusat kota.",
    readMin: 3,
    views: 16700,
    tags: ["Pekerja Migran", "Jepang", "Lowongan"],
    body: [
      P("Pemerintah Jepang melonggarkan sejumlah syarat visa bagi pekerja terampil asing. Bidang perawatan lansia, konstruksi, dan pengolahan makanan menjadi sektor yang paling banyak membuka lowongan."),
      P("Calon pekerja diingatkan untuk hanya memakai jalur penempatan resmi dan tidak tergiur tawaran calo yang menjanjikan keberangkatan cepat."),
    ],
  },
  {
    slug: "mudik-nataru-tol-trans-jawa",
    title: "Perjalanan Libur Natal dan Tahun Baru Diprediksi Naik, Tol Trans Jawa Jadi Tumpuan",
    excerpt:
      "Rekayasa lalu lintas satu arah disiapkan untuk puncak arus. Rest area di jalur pantura juga ditambah kapasitasnya.",
    category: "nasional",
    author: "Hanif Rahmadi",
    editor: "Retno Kusumawati",
    date: "2026-11-07T10:00:00+07:00",
    location: "JAKARTA",
    image: "jalan-tol",
    caption: "Kendaraan melintas di jalan tol.",
    readMin: 3,
    views: 14200,
    tags: ["Nataru", "Mudik", "Tol"],
    body: [
      P("Jumlah perjalanan pada libur Natal dan Tahun Baru diperkirakan naik dibanding tahun lalu. Tol Trans Jawa kembali menjadi tumpuan utama pergerakan kendaraan pribadi."),
      P("Rekayasa lalu lintas satu arah disiapkan untuk mengantisipasi puncak arus, disertai penambahan kapasitas rest area di jalur pantura."),
    ],
  },
  {
    slug: "uji-coba-ktp-digital-50-kabupaten",
    title: "KTP Digital Diuji Coba di 50 Kabupaten, Rembang Masuk Daftar Gelombang Pertama",
    excerpt:
      "Warga cukup memindai kode QR di kantor kecamatan untuk aktivasi. Petugas mengingatkan agar kode aktivasi tidak dibagikan ke siapa pun.",
    category: "tekno",
    author: "Bagus Wicaksono",
    editor: "Hanif Rahmadi",
    date: "2026-11-07T09:10:00+07:00",
    location: "REMBANG",
    image: "identitas-digital",
    caption: "Petugas membantu warga mengaktifkan identitas digital.",
    readMin: 3,
    views: 13900,
    tags: ["Identitas Digital", "Layanan Publik"],
    body: [
      P("Rembang masuk dalam gelombang pertama uji coba kartu identitas digital di 50 kabupaten. Warga dapat melakukan aktivasi dengan memindai kode QR di kantor kecamatan."),
      P("Petugas mengingatkan agar kode aktivasi tidak dibagikan kepada siapa pun, termasuk orang yang mengaku sebagai petugas melalui telepon."),
    ],
  },
  {
    slug: "lari-10k-pesisir-rembang",
    title: "Lari 10K Pesisir Rembang Diikuti 2.000 Pelari, Rute Lewati Kampung Pecinan Lasem",
    excerpt:
      "Panitia menutup sebagian ruas jalan sejak pukul 05.00. Warga yang hendak bepergian diminta memakai jalur alternatif.",
    category: "olahraga",
    author: "Dimas Prasetyo",
    editor: "Retno Kusumawati",
    date: "2026-11-07T08:00:00+07:00",
    location: "LASEM",
    image: "lomba-lari",
    caption: "Pelari melintasi jalan kota pada pagi hari.",
    readMin: 2,
    views: 7600,
    tags: ["Lari", "Event", "Lasem"],
    body: [
      P("Sekitar 2.000 pelari ambil bagian dalam lomba lari 10 kilometer di pesisir Rembang. Rute melewati kawasan Pecinan Lasem yang dipenuhi rumah-rumah tua."),
      P("Sebagian ruas jalan ditutup sejak pukul 05.00 WIB. Warga diminta memakai jalur alternatif selama lomba berlangsung."),
    ],
  },
  {
    slug: "kolom-garam-hujan-nasib-petambak",
    title: "Garam, Hujan, dan Nasib Petambak yang Selalu Kalah oleh Cuaca",
    excerpt:
      "Setiap tahun cerita yang sama berulang: harga jatuh saat panen, gudang bocor saat hujan. Sudah waktunya kita berhenti menyebutnya takdir.",
    category: "opini",
    author: "Siti Mardiyah",
    editor: "Hanif Rahmadi",
    date: "2026-11-06T07:00:00+07:00",
    location: "REMBANG",
    image: "langit-mendung",
    caption: "Langit mendung di atas tambak garam.",
    readMin: 5,
    views: 6200,
    tags: ["Kolom", "Garam", "Petambak"],
    body: [
      P("Setiap akhir kemarau, cerita yang sama berulang di tambak-tambak garam pesisir utara. Harga jatuh ketika panen melimpah, lalu garam yang ditahan di gudang ikut larut ketika hujan datang."),
      P("Masalah ini bukan semata soal cuaca. Gudang yang layak, informasi harga yang terbuka, dan kepastian serapan bisa membuat petambak tidak selalu berada di posisi kalah."),
    ],
  },
  {
    slug: "embung-desa-selesai-sawah-tak-andalkan-hujan",
    title: "Embung Desa Selesai Dibangun, 300 Hektare Sawah Tak Lagi Hanya Andalkan Hujan",
    excerpt:
      "Embung berkapasitas 40 ribu meter kubik itu dibangun lewat dana desa dan swadaya warga. Petani berharap bisa tanam tiga kali setahun.",
    category: "rembang",
    author: "Dimas Prasetyo",
    editor: "Hanif Rahmadi",
    date: "2026-11-06T13:45:00+07:00",
    location: "SULANG",
    image: "sawah-hijau",
    caption: "Hamparan sawah di sekitar embung desa.",
    readMin: 3,
    views: 9100,
    tags: ["Pertanian", "Embung", "Dana Desa"],
    body: [
      P("Embung berkapasitas 40 ribu meter kubik di sebuah desa di Kecamatan Sulang rampung dibangun. Air dari embung akan mengairi sekitar 300 hektare sawah yang selama ini hanya mengandalkan hujan."),
      P("Pembangunan memakai dana desa yang ditambah swadaya warga berupa tenaga dan material. Petani berharap bisa menanam tiga kali dalam setahun."),
    ],
  },
  {
    slug: "harga-cabai-rawit-pasar-rembang",
    title: "Harga Cabai Rawit di Pasar Kota Rembang Tembus Rp70 Ribu per Kilogram",
    excerpt:
      "Pasokan dari sentra di Jawa Timur berkurang akibat hujan. Pedagang memperkirakan harga belum turun hingga pertengahan Desember.",
    category: "ekonomi",
    author: "Nur Aini Safitri",
    editor: "Retno Kusumawati",
    date: "2026-11-07T07:40:00+07:00",
    location: "REMBANG",
    image: "pasar-cabai",
    caption: "Pedagang menata cabai rawit di lapak pasar.",
    readMin: 2,
    views: 20400,
    tags: ["Harga Pangan", "Cabai", "Pasar"],
    body: [
      P("Harga cabai rawit merah di Pasar Kota Rembang menembus Rp70 ribu per kilogram. Pedagang menyebut pasokan dari sentra produksi di Jawa Timur berkurang karena hujan."),
      P("Kenaikan harga diperkirakan bertahan hingga pertengahan Desember. Sejumlah pedagang makanan mulai mengurangi takaran sambal."),
    ],
  },
];

// ---------- helper ----------

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const sortedArticles = () =>
  [...articles].sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const byCategory = (slug: string) => sortedArticles().filter((a) => a.category === slug);

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const mostRead = (n = 5, slug?: string) =>
  [...articles]
    .filter((a) => (slug ? a.category === slug : true))
    .sort((a, b) => b.views - a.views)
    .slice(0, n);

export const related = (article: Article, n = 3) => {
  const sameTag = sortedArticles().filter(
    (a) => a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t))
  );
  const sameCat = byCategory(article.category).filter(
    (a) => a.slug !== article.slug && !sameTag.includes(a)
  );
  return [...sameTag, ...sameCat].slice(0, n);
};

export const trendingTags = [
  "Garam Rembang",
  "Batik Lasem",
  "Keamanan Siber",
  "CPNS",
  "Banjir Rob",
  "PSIR",
  "Harga Cabai",
];

export const foodPrices = [
  { item: "Beras medium", unit: "kg", price: 13200, change: 0 },
  { item: "Cabai rawit merah", unit: "kg", price: 70000, change: 12 },
  { item: "Bawang merah", unit: "kg", price: 38000, change: -4 },
  { item: "Telur ayam ras", unit: "kg", price: 28500, change: 2 },
  { item: "Ikan tongkol", unit: "kg", price: 32000, change: -6 },
  { item: "Minyak goreng curah", unit: "liter", price: 17000, change: 0 },
];

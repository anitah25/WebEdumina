"use client";

import Image from "next/image";

const features = [
  {
    img: "/tentangKami1.png",
    icon: (
      // Edukasi icon: book/screen with fish
      <svg
        className="w-7 h-7 text-[var(--color-accent-darkgreen)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 10c1-2 3-2 4 0s3 2 4 0" />
      </svg>
    ),
    title: "Edukasi dan Pelatihan",
    desc: "Program pelatihan untuk semua kalangan yang tertarik dengan budidaya ikan lele.",
  },
  {
    img: "/tentangKami2.png",
    icon: (
      // Teknologi icon: wifi/iot signal
      <svg
        className="w-7 h-7 text-[var(--color-accent-darkgreen)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Teknologi Modern",
    desc: "Monitoring kolam berbasis IoT dan data real-time.",
  },
  {
    img: "/tentangKami3.png",
    icon: (
      // Pemberdayaan icon: handshake
      <svg
        className="w-7 h-7 text-[var(--color-accent-darkgreen)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Pemberdayaan",
    desc: "Mendukung ekonomi lokal dan wirausaha.",
  },
];

export default function TentangKamiSection() {
  return (
    <section
      id="tentang-kami"
      className="w-full bg-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left: Text Content ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Label */}
            <span className="text-sm font-bold text-[var(--color-accent-darkgreen)] uppercase tracking-widest">
              Tentang Kami
            </span>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight">
              Mengenal{" "}
              <span className="text-[var(--color-accent-darkgreen)]">
                Study Center Edumina
              </span>{" "}
              Kampung Siroto
            </h2>

            {/* Description */}
            <p className="text-base text-gray-600 leading-relaxed max-w-sm">
              Study Center Edumina, Kampung Siroto adalah pusat edukasi budidaya
              lele yang berfokus pada pembelajaran masyarakat untuk kemandirian
              pangan.
            </p>
          </div>

          {/* ── Right: Modern Feature Cards ── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0 bg-slate-50">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>

                {/* Card Content info */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {/* Icon bubble */}
                    <div className="w-9 h-9 rounded-xl bg-[var(--color-accent-lightgreen)]/20 flex items-center justify-center shrink-0">
                      {f.icon}
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-sm tracking-tight group-hover:text-[var(--color-accent-darkgreen)] transition-colors duration-200">
                      {f.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* end grid cols-12 */}

        {/* ── Visi & Misi ── */}
        <div className="mt-20 lg:mt-28">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <span className="inline-block bg-[var(--color-accent-lightgreen)]/20 text-[var(--color-accent-darkgreen)] font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">
              Kelompok Budidaya Mina Lancar
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              Visi &amp; Misi Kami
            </h3>
            <p className="text-gray-500 max-w-lg text-sm leading-relaxed">
              Landasan semangat kami dalam membangun ekosistem budidaya lele
              yang berdaya, berkelanjutan, dan bermanfaat bagi masyarakat luas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ── Visi Card ── */}
            <div className="lg:col-span-4">
              <div
                className="relative rounded-3xl overflow-hidden p-8 flex flex-col gap-6 h-full min-h-[280px]"
                style={{
                  background:
                    "linear-gradient(145deg, #1D2A62 0%, #263580 60%, #1a4a7a 100%)",
                }}
              >
                {/* Decorative circle */}
                <div
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
                  style={{
                    background: "radial-gradient(circle, #AFD06E, transparent)",
                  }}
                />
                <div
                  className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10"
                  style={{
                    background: "radial-gradient(circle, #87ADEC, transparent)",
                  }}
                />

                {/* Header: Icon + Visi Title */}
                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(175,208,110,0.2)" }}
                  >
                    <svg
                      className="w-6 h-6 text-[#AFD06E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon
                        points="10,8 16,12 10,16 10,8"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </div>
                  <p className="text-[#AFD06E] font-bold uppercase tracking-widest text-md">
                    Visi
                  </p>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <p className="text-white font-semibold text-base leading-relaxed">
                    Menjadikan lele sebagai suatu produk perikanan yang dapat
                    memberi nilai tambah bagi pembudidaya dan masyarakat.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Misi Grid ── */}
            <div className="lg:col-span-8">
              <div className="bg-gray-50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-dark)] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <p className="text-[var(--color-primary-dark)] font-bold uppercase tracking-widest text-md">
                    Misi
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    "Meningkatkan pendapatan dan kesejahteraan anggota",
                    "Mendukung program pemerintah untuk mengurangi angka pengangguran",
                    "Mendukung program pemerintah dalam upaya membentuk MINAPOLITAN",
                    "Menjadikan Kecamatan Gunungpati sebagai sentral lele di Kota Semarang",
                    "Memasyarakatkan ikan lele sebagai makanan yang bergizi tinggi",
                    "Mencetak pengusaha-pengusaha baru di bidang usaha lele",
                    "Memberdayakan masyarakat sekitar kolam untuk bekerja pada saat panen",
                    "Meningkatkan hasil lele (pembesaran dan pembibitan)",
                    "Memperluas pasar pemasaran",
                    "Memaksimalkan lahan budidaya",
                    "Mengolah hasil budidaya menjadi bahan makanan (abon, keripik kulit)",
                    "Meminimalisasi gangguan hama penyakit pada ikan",
                    "Mencegah terjadinya fluktuasi harga pasar",
                  ].map((misi, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {/* Numbered bubble */}
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                        style={{
                          backgroundColor: "var(--color-accent-darkgreen)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-snug">
                        {misi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

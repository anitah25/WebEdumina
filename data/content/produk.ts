// ============================================================
// Data statis Produk — PLACEHOLDER
// Nanti akan digantikan dengan fetch dari API/database
// oleh admin melalui fitur CRUD
// ============================================================

import type { Produk } from "@/types/produk";

export const produkList: Produk[] = [
  {
    id: "1",
    nama: "Larva Lele",
    gambar: "/produk_larva_lele.png",
    deskripsi: "Larva lele umur 3-5 hari hasil pemijahan induk unggul.",
    harga: "Rp 25.000 / 100 ekor",
    tersedia: true,
    linkWa: "6281234567890",
    deskripsiLengkap: "Larva lele umur 3-5 hari ini hasil pemijahan dari induk lele unggul yang produktif. Cocok untuk memulai budidaya lele skala kecil. Dibeli minimal 100 ekor."
  },
  {
    id: "2",
    nama: "Benih Lele",
    gambar: "/produk_benih_lele.png",
    deskripsi: "Benih lele ukuran 2-3 cm siap untuk pembesaran.",
    harga: "Rp 50.000 / 100 ekor",
    tersedia: true,
    linkWa: "6281234567890",
    deskripsiLengkap: "Benih lele ukuran 2-3 cm telah melewati tahap krusial, sehingga memiliki tingkat kelangsungan hidup yang tinggi. Cocok untuk ditempatkan di kolam pembesaran."
  },
  {
    id: "3",
    nama: "Lele Siap Tebar",
    gambar: "/produk_lele_siap_tebar.png",
    deskripsi: "Lele ukuran 5-7 cm siap tebar ke kolam budidaya.",
    harga: "Rp 100.000 / 100 ekor",
    tersedia: true,
    linkWa: "6281234567890",
    deskripsiLengkap: "Lele siap tebar ukuran 5-7 cm dapat langsung ditempatkan di kolam utama. Tingkat kelangsungan hidup sangat tinggi karena telah melewati tahap adaptasi."
  },
  {
    id: "4",
    nama: "Induk Lele",
    gambar: "/produk_induk_lele.png",
    deskripsi: "Induk lele unggul siap pijah, produktivitas tinggi.",
    harga: "Rp 200.000 / ekor",
    tersedia: true,
    linkWa: "6281234567890",
    deskripsiLengkap: "Induk lele unggul yang telah melalui seleksi ketat, memiliki produktivitas tinggi dan tahan terhadap penyakit. Cocok untuk usaha pembibitan lele."
  },
  {
    id: "5",
    nama: "Probiotik",
    gambar: "/produk_probiotik.png",
    deskripsi: "Probiotik cair untuk menjaga kualitas air dan kesehatan ikan.",
    harga: "Rp 30.000 / botol",
    tersedia: true,
    linkWa: "6281234567890",
    deskripsiLengkap: "Probiotik cair berkualitas tinggi yang membantu menjaga kualitas air dan sistem pencernaan lele. Tersedia dalam kemasan botol 500 ml."
  },
];

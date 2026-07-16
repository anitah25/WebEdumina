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
    tersedia: true,
  },
  {
    id: "2",
    nama: "Benih Lele",
    gambar: "/produk_benih_lele.png",
    deskripsi: "Benih lele ukuran 2-3 cm siap untuk pembesaran.",
    tersedia: true,
  },
  {
    id: "3",
    nama: "Lele Siap Tebar",
    gambar: "/produk_lele_siap_tebar.png",
    deskripsi: "Lele ukuran 5-7 cm siap tebar ke kolam budidaya.",
    tersedia: true,
  },
  {
    id: "4",
    nama: "Induk Lele",
    gambar: "/produk_induk_lele.png",
    deskripsi: "Induk lele unggul siap pijah, produktivitas tinggi.",
    tersedia: true,
  },
  {
    id: "5",
    nama: "Probiotik",
    gambar: "/produk_probiotik.png",
    deskripsi: "Probiotik cair untuk menjaga kualitas air dan kesehatan ikan.",
    tersedia: true,
  },
];

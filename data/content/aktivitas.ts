// ============================================================
// Data statis Aktivitas — PLACEHOLDER
// Nanti akan digantikan dengan fetch dari API/database
// oleh admin melalui fitur CRUD
// ============================================================

import type { Aktivitas } from "@/types/aktivitas";

export const aktivitasList: Aktivitas[] = [
  {
    id: "1",
    judul: "Pembimbingan bibit baru",
    tanggal: "25 April 2025",
    gambar: "/tentangKami1.png",
    deskripsi: "Kegiatan pembimbingan dan seleksi bibit lele unggul bersama anggota kelompok.",
  },
  {
    id: "2",
    judul: "Monitoring kualitas air",
    tanggal: "10 Mei 2025",
    gambar: "/tentangKami2.png",
    deskripsi: "Monitoring rutin kualitas air kolam menggunakan sensor IoT.",
  },
  {
    id: "3",
    judul: "Pelatihan teknologi modern",
    tanggal: "15 Mei 2025",
    gambar: "/tentangKami3.png",
    deskripsi: "Workshop penggunaan teknologi monitoring berbasis IoT dan data real-time.",
  },
  {
    id: "4",
    judul: "Panen raya lele",
    tanggal: "20 Juni 2025",
    gambar: "/tentangKami1.png",
    deskripsi: "Panen raya lele bersama anggota dan masyarakat sekitar kolam.",
  },
  {
    id: "5",
    judul: "Edukasi warga baru",
    tanggal: "5 Juli 2025",
    gambar: "/tentangKami2.png",
    deskripsi: "Program edukasi budidaya lele bagi warga dan pemula.",
  },
  {
    id: "6",
    judul: "Pengolahan hasil panen",
    tanggal: "12 Juli 2025",
    gambar: "/tentangKami3.png",
    deskripsi: "Pelatihan pengolahan lele menjadi abon dan keripik kulit.",
  },
];

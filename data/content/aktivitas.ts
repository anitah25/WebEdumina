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
    deskripsiLengkap: "Pembimbingan ini bertujuan untuk memastikan setiap anggota kelompok mampu membedakan bibit lele yang berkualitas dan cara perawatan awal. Kegiatan dihadiri oleh 25 anggota kelompok dengan narasumber dari tim Study Center Edumina Kampung Siroto."
  },
  {
    id: "2",
    judul: "Monitoring kualitas air",
    tanggal: "10 Mei 2025",
    gambar: "/tentangKami2.png",
    deskripsi: "Monitoring rutin kualitas air kolam menggunakan sensor IoT.",
    deskripsiLengkap: "Monitoring kualitas air dilakukan secara berkala menggunakan sensor IoT yang mengukur pH, suhu, dan kandungan oksigen terlarut. Data kemudian dianalisis untuk memastikan lingkungan kolam optimal untuk pertumbuhan lele."
  },
  {
    id: "3",
    judul: "Pelatihan teknologi modern",
    tanggal: "15 Mei 2025",
    gambar: "/tentangKami3.png",
    deskripsi: "Workshop penggunaan teknologi monitoring berbasis IoT dan data real-time.",
    deskripsiLengkap: "Pelatihan ini memberikan pengetahuan dan keterampilan tentang cara memasang dan mengoperasikan sensor IoT untuk monitoring kolam lele secara real-time."
  },
  {
    id: "4",
    judul: "Panen raya lele",
    tanggal: "20 Juni 2025",
    gambar: "/tentangKami1.png",
    deskripsi: "Panen raya lele bersama anggota dan masyarakat sekitar kolam.",
    deskripsiLengkap: "Panen raya ini menghasilkan total 500 kg lele konsumsi yang kemudian dijual ke pasar lokal dan mitra."
  },
  {
    id: "5",
    judul: "Edukasi warga baru",
    tanggal: "5 Juli 2025",
    gambar: "/tentangKami2.png",
    deskripsi: "Program edukasi budidaya lele bagi warga dan pemula.",
    deskripsiLengkap: "Program ini diikuti oleh 30 warga sekitar yang ingin memulai budidaya lele. Materi meliputi pemilihan bibit, perawatan kolam, dan manajemen pakan."
  },
  {
    id: "6",
    judul: "Pengolahan hasil panen",
    tanggal: "12 Juli 2025",
    gambar: "/tentangKami3.png",
    deskripsi: "Pelatihan pengolahan lele menjadi abon dan keripik kulit.",
    deskripsiLengkap: "Pelatihan ini bertujuan untuk meningkatkan nilai jual hasil panen dengan memproduksi olahan seperti abon lele dan keripik kulit lele."
  },
];

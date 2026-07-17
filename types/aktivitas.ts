// ============================================================
// Tipe data untuk entitas Aktivitas
// Digunakan oleh: public section, admin CRUD, API
// ============================================================

export interface Aktivitas {
  id: string;
  judul: string;
  tanggal: string; // format: "DD MMMM YYYY", e.g. "25 April 2025"
  gambar: string; // path gambar, e.g. "/aktivitas/kegiatan1.jpg"
  deskripsi?: string;
  deskripsiLengkap?: string; // deskripsi lebih panjang
}

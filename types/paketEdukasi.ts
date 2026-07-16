// ============================================================
// Tipe data untuk entitas Paket Edukasi
// Digunakan oleh: public section, admin CRUD, API
// ============================================================

export interface PaketEdukasi {
  id: string;
  nama: string;        // e.g. "Paket Teknologi Modern"
  deskripsi: string;
  harga: string;       // e.g. "Rp 750.000"
  gambar: string;      // path gambar
  tersedia?: boolean;
}

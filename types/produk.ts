// ============================================================
// Tipe data untuk entitas Produk
// Digunakan oleh: public section, admin CRUD, API
// ============================================================

export interface Produk {
  id: string;
  nama: string;       // Nama produk, e.g. "Larva Lele"
  gambar: string;     // Path gambar, e.g. "/produk_larva_lele.png"
  deskripsi?: string;
  harga?: string;     // e.g. "Rp 50.000 / 100 ekor"
  tersedia?: boolean;
}

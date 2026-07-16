// ============================================================
// Tipe data untuk entitas Berita
// ============================================================

export interface Berita {
  id: string;
  judul: string;
  tanggal: string;   // e.g. "11 Juli 2026"
  gambar: string;
  ringkasan?: string;
  kategori?: string; // e.g. "Budidaya", "Teknologi", "Wirausaha"
  slug: string;      // URL-friendly identifier
}

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

/** Tipe data berita untuk admin CRUD */
export interface AdminBerita {
  id: number;
  judul: string;
  slug: string;
  isi_konten: string;
  tanggal_publish: string; // YYYY-MM-DD
  gambar: string;
  ringkasan?: string;
  kategori?: string;
}

export const BERITA_KATEGORI = [
  "Budidaya",
  "Teknologi",
  "Wirausaha",
  "Produk",
  "Edukasi",
] as const;

export function generateSlug(judul: string): string {
  return judul
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatTanggalBerita(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

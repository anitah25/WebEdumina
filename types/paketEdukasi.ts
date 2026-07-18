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
  durasi?: string;     // durasi paket, e.g. "3 Hari"
  fasilitas?: string;  // fasilitas, e.g. "Modul, Sertifikat, Konsultasi"
  linkWa?: string;     // WhatsApp untuk pendaftaran
  deskripsiLengkap?: string; // deskripsi paket lebih detail
}

/** Tipe data paket edukasi untuk admin CRUD */
export interface AdminPaketEdukasi {
  id: number;
  judul: string;
  deskripsi_singkat: string;
  deskripsi_lengkap: string;
  harga: string; // or number?
  durasi?: string;
  fasilitas?: string;
  gambar: string;
  link_wa?: string;
}

export function formatHarga(harga: string | number): string {
  if (typeof harga === 'number') {
    return `Rp ${harga.toLocaleString('id-ID')}`;
  }
  return harga;
}

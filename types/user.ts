// ============================================================
// Tipe data untuk entitas Pengguna Admin
// ============================================================

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  namaLengkap: string;
  role: "admin" | "operator";
  status: "active" | "inactive";
  createdAt: string;
}

export type UserFormData = Omit<AdminUser, "id" | "createdAt"> & {
  password?: string;
};

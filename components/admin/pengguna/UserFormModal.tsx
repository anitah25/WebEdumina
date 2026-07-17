"use client";

import { useEffect, useState } from "react";
import type { UserFormData, AdminUser } from "@/types/user";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingUser: AdminUser | null;
  onSave: (data: UserFormData) => void;
}

export default function UserFormModal({
  isOpen,
  onClose,
  editingUser,
  onSave,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    namaLengkap: "",
    role: "operator",
    status: "active",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        setFormData({
          username: editingUser.username,
          email: editingUser.email,
          namaLengkap: editingUser.namaLengkap,
          role: editingUser.role,
          status: editingUser.status,
          password: "", // Don't prefill password when editing
        });
      } else {
        setFormData({
          username: "",
          email: "",
          namaLengkap: "",
          role: "operator",
          status: "active",
          password: "",
        });
      }
    }
  }, [isOpen, editingUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim() || !formData.namaLengkap.trim()) return;
    if (!editingUser && !formData.password?.trim()) return; // Require password for new users
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-lg w-full relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#1D2A62] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">
              {editingUser !== null ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            </h3>
            <p className="text-xs text-white/70 mt-0.5 font-normal">
              {editingUser
                ? "Perbarui informasi pengguna"
                : "Tambahkan pengguna baru ke sistem"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition active:scale-90 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.namaLengkap}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, namaLengkap: e.target.value }))
              }
              placeholder="Nama lengkap pengguna"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder="Username untuk login"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="email@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password {!editingUser && <span className="text-red-500">*</span>}
              {editingUser && (
                <span className="text-slate-400 font-normal"> (Opsional)</span>
              )}
            </label>
            <input
              type="password"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder={
                editingUser
                  ? "Kosongkan jika tidak ingin mengubah password"
                  : "Password untuk login"
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: e.target.value as "admin" | "operator",
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              >
                <option value="operator">Operator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as "active" | "inactive",
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 text-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#437118] hover:bg-[#345912] text-white rounded-xl font-bold transition shadow-md shadow-[#437118]/10 active:scale-95 cursor-pointer"
            >
              Simpan Pengguna
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

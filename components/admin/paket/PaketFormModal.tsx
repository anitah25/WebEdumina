"use client";

import { useEffect, useState } from "react";
import type { AdminPaketEdukasi } from "@/types/paketEdukasi";

interface PaketFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPaket: AdminPaketEdukasi | null;
  onSave: (data: Omit<AdminPaketEdukasi, "id">) => void;
}

export default function PaketFormModal({
  isOpen,
  onClose,
  editingPaket,
  onSave,
}: PaketFormModalProps) {
  const [formData, setFormData] = useState<Omit<AdminPaketEdukasi, "id">>({
    judul: "",
    deskripsi_singkat: "",
    deskripsi_lengkap: "",
    harga: "",
    durasi: "",
    fasilitas: "",
    gambar: "",
    link_wa: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (editingPaket) {
        setFormData(editingPaket);
      } else {
        setFormData({
          judul: "",
          deskripsi_singkat: "",
          deskripsi_lengkap: "",
          harga: "",
          durasi: "",
          fasilitas: "",
          gambar: "",
          link_wa: "",
        });
      }
    }
  }, [isOpen, editingPaket]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, gambar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, gambar: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul.trim() || !formData.harga.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-2xl w-full relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="bg-[#1D2A62] text-white px-6 py-5 flex items-center justify-between sticky top-0">
          <div>
            <h3 className="font-extrabold text-lg">
              {editingPaket !== null ? "Edit Paket Edukasi" : "Tambah Paket Edukasi Baru"}
            </h3>
            <p className="text-xs text-white/70 mt-0.5 font-normal">
              Isi data di bawah ini untuk mengelola paket edukasi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition active:scale-90 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Judul Paket <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.judul}
              onChange={(e) => setFormData((prev) => ({ ...prev, judul: e.target.value }))}
              placeholder="Contoh: Paket Teknologi Modern"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Harga <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.harga}
                onChange={(e) => setFormData((prev) => ({ ...prev, harga: e.target.value }))}
                placeholder="Contoh: Rp 750.000"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Durasi <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="text"
                value={formData.durasi || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, durasi: e.target.value }))}
                placeholder="Contoh: 3 Hari"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Deskripsi Singkat <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.deskripsi_singkat}
              onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi_singkat: e.target.value }))}
              placeholder="Deskripsi singkat tentang paket..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Deskripsi Lengkap <span className="text-slate-400 font-normal">(Opsional)</span>
            </label>
            <textarea
              value={formData.deskripsi_lengkap}
              onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi_lengkap: e.target.value }))}
              placeholder="Deskripsi lengkap tentang paket..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Fasilitas <span className="text-slate-400 font-normal">(Opsional, pisahkan dengan koma)</span>
            </label>
            <textarea
              value={formData.fasilitas || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, fasilitas: e.target.value }))}
              placeholder="Contoh: Buku panduan, Sertifikat, Konsultasi"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Link WhatsApp <span className="text-slate-400 font-normal">(Opsional)</span>
            </label>
            <input
              type="text"
              value={formData.link_wa || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, link_wa: e.target.value }))}
              placeholder="Contoh: 6281234567890 atau https://wa.me/..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Upload Gambar <span className="text-slate-400 font-normal">(Opsional)</span>
            </label>
            <div className="flex items-center gap-4">
              {formData.gambar ? (
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                  <img src={formData.gambar} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute inset-0 bg-black/50 hover:bg-black/60 flex items-center justify-center text-white transition duration-200 cursor-pointer"
                    title="Hapus Gambar"
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"
                    />
                  </svg>
                  <span className="text-[8px] font-bold mt-1 text-slate-400 uppercase">
                    No Image
                  </span>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-xs text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-xl file:border-0
                    file:text-xs file:font-bold
                    file:bg-[#E5F1FD] file:text-[#1D2A62]
                    hover:file:bg-[#d0e6fd]
                    file:cursor-pointer cursor-pointer focus:outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Dukungan format JPG, PNG, WebP. Maksimal 5MB.
                </p>
              </div>
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
              Simpan Paket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

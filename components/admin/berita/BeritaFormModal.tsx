"use client";

import { useEffect, useState } from "react";
import {
  BERITA_KATEGORI,
  generateSlug,
  type AdminBerita,
} from "@/types/berita";

export interface BeritaFormData {
  judul: string;
  slug: string;
  isi_konten: string;
  tanggal_publish: string;
  gambar: string;
  ringkasan: string;
  kategori: string;
}

interface BeritaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingBerita: AdminBerita | null;
  onSave: (data: BeritaFormData) => void;
}

export default function BeritaFormModal({
  isOpen,
  onClose,
  editingBerita,
  onSave,
}: BeritaFormModalProps) {
  const [formJudul, setFormJudul] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formIsiKonten, setFormIsiKonten] = useState("");
  const [formTanggal, setFormTanggal] = useState("");
  const [formGambar, setFormGambar] = useState("");
  const [formRingkasan, setFormRingkasan] = useState("");
  const [formKategori, setFormKategori] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingBerita) {
        setFormJudul(editingBerita.judul);
        setFormSlug(editingBerita.slug);
        setFormIsiKonten(editingBerita.isi_konten);
        setFormTanggal(editingBerita.tanggal_publish);
        setFormGambar(editingBerita.gambar);
        setFormRingkasan(editingBerita.ringkasan || "");
        setFormKategori(editingBerita.kategori || "");
        setSlugTouched(true);
      } else {
        setFormJudul("");
        setFormSlug("");
        setFormIsiKonten("");
        setFormTanggal(new Date().toISOString().split("T")[0]);
        setFormGambar("");
        setFormRingkasan("");
        setFormKategori("");
        setSlugTouched(false);
      }
    }
  }, [isOpen, editingBerita]);

  if (!isOpen) return null;

  const handleJudulChange = (value: string) => {
    setFormJudul(value);
    if (!slugTouched) {
      setFormSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    setFormSlug(generateSlug(value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormGambar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormGambar("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudul.trim() || !formTanggal.trim() || !formIsiKonten.trim()) return;

    onSave({
      judul: formJudul.trim(),
      slug: formSlug.trim() || generateSlug(formJudul),
      isi_konten: formIsiKonten.trim(),
      tanggal_publish: formTanggal,
      gambar: formGambar,
      ringkasan: formRingkasan.trim(),
      kategori: formKategori,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-2xl w-full relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        <div className="bg-[#1D2A62] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-extrabold text-lg">
              {editingBerita !== null ? "Edit Berita" : "Tambah Berita Baru"}
            </h3>
            <p className="text-xs text-white/70 mt-0.5 font-normal">
              Isi data artikel yang akan ditampilkan di landing page.
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

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 overflow-y-auto"
        >
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Judul Berita <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formJudul}
              onChange={(e) => handleJudulChange(e.target.value)}
              placeholder="Contoh: Panen Raya Lele Mina Lancar"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Slug URL <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono shrink-0">
                /berita/
              </span>
              <input
                type="text"
                required
                value={formSlug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="panen-raya-lele-mina-lancar"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-mono focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Slug otomatis dibuat dari judul. Anda bisa mengubahnya secara manual.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tanggal Publish <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formTanggal}
                onChange={(e) => setFormTanggal(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Kategori
              </label>
              <select
                value={formKategori}
                onChange={(e) => setFormKategori(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              >
                <option value="">Pilih kategori</option>
                {BERITA_KATEGORI.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Ringkasan{" "}
              <span className="text-slate-400 font-normal">(Opsional)</span>
            </label>
            <textarea
              value={formRingkasan}
              onChange={(e) => setFormRingkasan(e.target.value)}
              placeholder="Ringkasan singkat untuk tampilan di card berita..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Isi Konten <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formIsiKonten}
              onChange={(e) => setFormIsiKonten(e.target.value)}
              placeholder="Tulis konten artikel lengkap di sini..."
              rows={6}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition resize-y min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Upload Gambar Sampul{" "}
              <span className="text-slate-400 font-normal">(Opsional)</span>
            </label>
            <div className="flex items-center gap-4">
              {formGambar ? (
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formGambar}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
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
              {editingBerita !== null ? "Simpan Perubahan" : "Publikasikan Berita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

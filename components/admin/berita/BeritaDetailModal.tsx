"use client";

import Link from "next/link";
import type { AdminBerita } from "@/types/berita";
import { formatTanggalBerita } from "@/types/berita";

interface BeritaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  berita: AdminBerita | null;
}

export default function BeritaDetailModal({
  isOpen,
  onClose,
  berita,
}: BeritaDetailModalProps) {
  if (!isOpen || !berita) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-2xl w-full relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="bg-[#1D2A62] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-extrabold text-lg">Preview Berita</h3>
            <p className="text-xs text-white/70 mt-0.5 font-normal">
              Pratinjau artikel sebelum ditampilkan ke pengunjung.
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

        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="relative aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {berita.gambar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23D0E6FD'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%231D2A62'>No Image Available</text></svg>";
                }}
              />
            ) : (
              <div className="w-full h-full bg-[#D0E6FD]/40 flex flex-col items-center justify-center text-[#1D2A62] p-4">
                <span className="text-xs font-bold tracking-wider uppercase text-[#1D2A62]/60">
                  No Image
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {berita.kategori && (
              <span className="bg-[#E5F1FD] text-[#1D2A62] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                {berita.kategori}
              </span>
            )}
            <span className="text-xs text-slate-400 font-medium">
              {formatTanggalBerita(berita.tanggal_publish)}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-800 leading-tight">
              {berita.judul}
            </h2>
            <p className="text-[11px] text-slate-400 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-block">
              /berita/{berita.slug}
            </p>
          </div>

          {berita.ringkasan && (
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Ringkasan
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {berita.ringkasan}
              </p>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Isi Konten
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 max-h-[200px] overflow-y-auto">
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                {berita.isi_konten || "Tidak ada konten berita."}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <Link
              href={`/berita/${berita.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#E5F1FD] hover:bg-[#d0e6fd] text-[#1D2A62] py-2.5 px-4 rounded-xl font-bold text-xs transition border border-[#1D2A62]/10 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 7.5v10.5A2.25 2.25 0 005.25 20.25h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Buka Halaman Publik
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition active:scale-95 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

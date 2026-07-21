"use client";

import type { AdminPaketEdukasi } from "@/types/paketEdukasi";

interface PaketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  paket: AdminPaketEdukasi | null;
}

export default function PaketDetailModal({
  isOpen,
  onClose,
  paket,
}: PaketDetailModalProps) {
  if (!isOpen || !paket) return null;

  const fasilitasList = paket.fasilitas
    ? paket.fasilitas
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-2xl w-full relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="bg-[#1D2A62] text-white px-6 py-5 flex items-center justify-between sticky top-0">
          <div>
            <h3 className="font-extrabold text-lg">Detail Paket Edukasi</h3>
            <p className="text-xs text-white/70 mt-0.5 font-normal">
              Informasi lengkap tentang paket.
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

        <div className="p-6 space-y-6">
          {paket.gambar && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={paket.gambar}
                alt={paket.judul}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">
                {paket.judul}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl font-bold text-[#437118]">
                  {paket.harga}
                </span>
                {paket.durasi && (
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {paket.durasi}
                  </span>
                )}
              </div>
            </div>

            {paket.deskripsi_singkat && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Deskripsi Singkat
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {paket.deskripsi_singkat}
                </p>
              </div>
            )}

            {paket.deskripsi_lengkap && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Deskripsi Lengkap
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {paket.deskripsi_lengkap}
                </p>
              </div>
            )}

            {fasilitasList.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Fasilitas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {fasilitasList.map((fasilitas, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-[#E5F1FD] text-[#1D2A62] px-3 py-1.5 rounded-full text-xs font-bold"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {fasilitas}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {paket.link_wa && (
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={
                    paket.link_wa.startsWith("http")
                      ? paket.link_wa
                      : `https://wa.me/${paket.link_wa.replace(/\D/g, "")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition active:scale-95"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

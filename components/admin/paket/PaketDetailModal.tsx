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
    ? paket.fasilitas.split(",").map((f) => f.trim()).filter(Boolean)
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
              <h2 className="text-2xl font-extrabold text-slate-800">{paket.judul}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl font-bold text-[#437118]">{paket.harga}</span>
                {paket.durasi && (
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {paket.durasi}
                  </span>
                )}
              </div>
            </div>

            {paket.deskripsi_singkat && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Deskripsi Singkat</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{paket.deskripsi_singkat}</p>
              </div>
            )}

            {paket.deskripsi_lengkap && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Deskripsi Lengkap</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{paket.deskripsi_lengkap}</p>
              </div>
            )}

            {fasilitasList.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Fasilitas</h4>
                <div className="flex flex-wrap gap-2">
                  {fasilitasList.map((fasilitas, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-[#E5F1FD] text-[#1D2A62] px-3 py-1.5 rounded-full text-xs font-bold"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                  href={paket.link_wa.startsWith("http") ? paket.link_wa : `https://wa.me/${paket.link_wa.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition active:scale-95"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.022-.015-.022-.015-.502-.254-.09-.045-.27-.135-.555-.273-.12-.06-.18-.09-.27-.09-.09 0-.18.045-.27.135-.09.09-.36.45-.45.54-.09.09-.18.09-.315.045-.135-.045-.585-.213-1.125-.705-.42-.375-.705-.84-.795-.945-.09-.09-.015-.135.045-.225.075-.075.135-.18.225-.27.09-.09.12-.135.18-.225.06-.09.03-.18-.015-.27-.045-.09-.45-1.08-.615-1.485-.165-.39-.33-.33-.45-.33-.12-.015-.27-.015-.405-.015-.135 0-.36.045-.54.27-.18.18-.72.72-.72 1.755s.765 2.025.87 2.16c.105.135 1.5 2.31 3.6 3.195.5.21 1 .345 1.335.45.51.16.975.135 1.335.075.405-.06 1.245-.51 1.425-1 .18-.51.18-.93.12-1-.06-.075-.18-.12-.3-.135zm-5.462-12.382c-5.52 0-10 4.48-10 10 0 1.77.46 3.48 1.34 5l-1.42 5.19 5.3-.1.14-.07C8.89 22.54 10.4 23 12 23c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2c-1.56 0-3.1-.42-4.44-1.21l-.32-.19-3.29.09.89-3.2-.21-.33C3.84 14.65 3.4 12.87 3.4 11c0-4.75 3.85-8.6 8.6-8.6s8.6 3.85 8.6 8.6-3.85 8.6-8.6 8.6z" />
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

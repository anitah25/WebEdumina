"use client";

import Image from "next/image";
import type { PaketEdukasi } from "@/types/paketEdukasi";
import { getImageUrl } from "@/lib/api";

interface PaketEdukasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PaketEdukasi | null;
}

export default function PaketEdukasiModal({ isOpen, onClose, item }: PaketEdukasiModalProps) {
  if (!isOpen || !item) return null;

  const fasilitasList = item.fasilitas
    ? item.fasilitas.split(",").map((f) => f.trim()).filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full relative z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#1D2A62] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h3 className="font-extrabold text-lg">Paket Edukasi</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition active:scale-95 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 relative">
            <Image
              src={getImageUrl(item.gambar)}
              alt={item.nama}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-800">{item.nama}</h2>
            
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xl font-bold text-[#437118]">{item.harga}</p>
              {item.durasi && (
                <span className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
                  {item.durasi}
                </span>
              )}
              {item.tersedia !== undefined && (
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                  item.tersedia
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {item.tersedia ? "Tersedia" : "Habis"}
                </span>
              )}
            </div>
            
            {item.deskripsiLengkap ? (
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{item.deskripsiLengkap}</p>
            ) : (
              <p className="text-slate-600 leading-relaxed">{item.deskripsi}</p>
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
            
            {item.linkWa && (
              <div className="pt-2">
                <a
                  href={`https://wa.me/${item.linkWa.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 rounded-xl font-bold text-sm transition active:scale-95"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.333.162 11.889c0 2.099.547 4.142 1.588 5.94L0 24l6.309-1.654a11.882 11.882 0 005.702 1.453h.008c6.555 0 11.893-5.333 11.893-11.889 0-3.177-1.24-6.151-3.5-8.404z" />
                  </svg>
                  Daftar Sekarang
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

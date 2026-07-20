"use client";

import Image from "next/image";
import type { Aktivitas } from "@/types/aktivitas";
import { getImageUrl } from "@/lib/api";

interface AktivitasModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Aktivitas | null;
}

function formatDate(dateStr: string) {
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

export default function AktivitasModal({ isOpen, onClose, item }: AktivitasModalProps) {
  if (!isOpen || !item) return null;

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
            <h3 className="font-extrabold text-lg">Aktivitas Kami</h3>
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
              alt={item.judul}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-bold text-slate-500">{formatDate(item.tanggal)}</p>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800">{item.judul}</h2>
            
            {item.deskripsiLengkap ? (
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{item.deskripsiLengkap}</p>
            ) : item.deskripsi ? (
              <p className="text-slate-600 leading-relaxed">{item.deskripsi}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  productName: string;
}

export default function ImageLightboxModal({
  isOpen,
  onClose,
  imageUrl,
  productName,
}: ImageLightboxModalProps) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      {/* Click backdrop to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Top Close Button Controls */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <span className="text-white/60 text-xs font-semibold select-none hidden sm:inline">
          Klik di mana saja untuk menutup
        </span>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition cursor-pointer"
          title="Tutup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image Wrapper Container */}
      <div className="relative max-w-4xl max-h-[75vh] w-full flex items-center justify-center select-none animate-in zoom-in-95 duration-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={productName}
          className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10 pointer-events-none"
        />
      </div>

      {/* Footer Caption */}
      <div className="absolute bottom-8 text-center text-white px-6 space-y-1 pointer-events-none">
        <h4 className="font-extrabold text-lg sm:text-xl tracking-tight text-white/95">
          {productName}
        </h4>
        <p className="text-xs text-white/50">Detail Gambar Katalog Edumina</p>
      </div>
    </div>
  );
}

"use client";

interface Product {
  id: number;
  nama_produk: string;
  deskripsi: string;
  gambar: string;
  link_wa: string;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onImageClick: (imageUrl: string) => void;
}

export default function ProductDetailModal({
  isOpen,
  onClose,
  product,
  onImageClick,
}: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-lg w-full relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#1D2A62] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">Detail Produk</h3>
            <p className="text-xs text-white/70 mt-0.5 font-normal">Informasi katalog lengkap produk Edumina.</p>
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

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Product Image */}
          <div className="relative aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {product.gambar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.gambar}
                alt={product.nama_produk}
                onClick={() => onImageClick(product.gambar)}
                className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] hover:brightness-95 transition-all duration-300"
                title="Klik untuk memperbesar gambar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23D0E6FD'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%231D2A62'>No Image Available</text></svg>";
                }}
              />
            ) : (
              <div className="w-full h-full bg-[#D0E6FD]/40 flex flex-col items-center justify-center text-[#1D2A62] p-4">
                <svg
                  className="w-12 h-12 text-[#1D2A62]/40 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"
                  />
                </svg>
                <span className="text-xs font-bold tracking-wider uppercase text-[#1D2A62]/60">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-800 leading-tight">
              {product.nama_produk}
            </h2>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 max-h-[160px] overflow-y-auto">
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                {product.deskripsi || "Tidak ada deskripsi produk."}
              </p>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <a
              href={product.link_wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5F3D8] hover:bg-[#ebe9cc] text-[#437118] py-2.5 px-4 rounded-xl font-bold text-xs transition border border-[#ADD061]/30 active:scale-95"
            >
              <svg className="w-4 h-4 text-[#437118]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.022-.015-.022-.015-.502-.254-.09-.045-.27-.135-.555-.273-.12-.06-.18-.09-.27-.09-.09 0-.18.045-.27.135-.09.09-.36.45-.45.54-.09.09-.18.09-.315.045-.135-.045-.585-.213-1.125-.705-.42-.375-.705-.84-.795-.945-.09-.09-.015-.135.045-.225.075-.075.135-.18.225-.27.09-.09.12-.135.18-.225.06-.09.03-.18-.015-.27-.045-.09-.45-1.08-.615-1.485-.165-.39-.33-.33-.45-.33-.12-.015-.27-.015-.405-.015-.135 0-.36.045-.54.27-.18.18-.72.72-.72 1.755s.765 2.025.87 2.16c.105.135 1.5 2.31 3.6 3.195.5.21 1 .345 1.335.45.51.16.975.135 1.335.075.405-.06 1.245-.51 1.425-1 .18-.51.18-.93.12-1-.06-.075-.18-.12-.3-.135zm-5.462-12.382c-5.52 0-10 4.48-10 10 0 1.77.46 3.48 1.34 5l-1.42 5.19 5.3-.1.14-.07C8.89 22.54 10.4 23 12 23c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2c-1.56 0-3.1-.42-4.44-1.21l-.32-.19-3.29.09.89-3.2-.21-.33C3.84 14.65 3.4 12.87 3.4 11c0-4.75 3.85-8.6 8.6-8.6s8.6 3.85 8.6 8.6-3.85 8.6-8.6 8.6z" />
              </svg>
              Pesan via WhatsApp
            </a>

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

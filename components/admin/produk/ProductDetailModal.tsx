"use client";

interface Product {
  id: number;
  nama_produk: string;
  harga?: string | null;
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
            <p className="text-xs text-white/70 mt-0.5 font-normal">
              Informasi katalog lengkap produk Edumina.
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
            {product.harga && (
              <p className="text-lg font-bold text-[#437118]">
                {isNaN(Number(product.harga))
                  ? product.harga
                  : new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(Number(product.harga))}
              </p>
            )}
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
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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

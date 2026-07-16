"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductIcon } from "@/components/admin/Icons";
import ProductFormModal from "@/components/admin/produk/ProductFormModal";
import DeleteConfirmModal from "@/components/admin/produk/DeleteConfirmModal";
import ProductDetailModal from "@/components/admin/produk/ProductDetailModal";
import ImageLightboxModal from "@/components/admin/produk/ImageLightboxModal";

interface Product {
  id: number;
  nama_produk: string;
  deskripsi: string;
  gambar: string;
  link_wa: string;
}

// Initial mock products from PRD specification
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    nama_produk: "Benih Lele Grade A",
    deskripsi:
      "Benih lele Sangkuriang pilihan ukuran 5-7 cm. Tahan penyakit, pertumbuhan cepat, dan FCR rendah. Sangat cocok untuk budidaya kolam terpal maupun bioflok.",
    gambar:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=600&q=80",
    link_wa:
      "https://wa.me/62815639225?text=Halo%20Admin%20Edumina,%20saya%20tertarik%20dengan%20produk%20Benih%20Lele%20Grade%20A.",
  },
  {
    id: 2,
    nama_produk: "Lele Konsumsi Segar",
    deskripsi:
      "Lele konsumsi ukuran isi 6-8 ekor per kg. Dipanen langsung dari kolam bersih terawat, jaminan segar, daging padat, tidak bau tanah.",
    gambar:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    link_wa:
      "https://wa.me/62815639225?text=Halo%20Admin%20Edumina,%20saya%20tertarik%20dengan%20produk%20Lele%20Konsumsi%20Segar.",
  },
  {
    id: 3,
    nama_produk: "Pakan Lele Booster-3",
    deskripsi:
      "Pakan pelet apung berkualitas tinggi dengan kandungan protein 32% untuk memaksimalkan pertumbuhan ikan lele pada fase pembesaran.",
    gambar:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    link_wa:
      "https://wa.me/62815639225?text=Halo%20Admin%20Edumina,%20saya%20tertarik%20dengan%20produk%20Pakan%20Lele%20Booster-3.",
  },
  {
    id: 4,
    nama_produk: "Probiotik Air Bioflok",
    deskripsi:
      "Formula bakteri starter khusus untuk menstabilkan kualitas air kolam, menumbuhkan flok protein alami, dan menekan pertumbuhan patogen merugikan.",
    gambar:
      "https://images.unsplash.com/photo-1607619056574-7b8d304b3b86?auto=format&fit=crop&w=600&q=80",
    link_wa:
      "https://wa.me/62815639225?text=Halo%20Admin%20Edumina,%20saya%20tertarik%20dengan%20produk%20Probiotik%20Air%20Bioflok.",
  },
];

export default function ProdukCRUDPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals visibility state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Selection states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [selectedDetailProduct, setSelectedDetailProduct] =
    useState<Product | null>(null);
  const [lightboxImage, setLightboxImage] = useState("");
  const [lightboxTitle, setLightboxTitle] = useState("");

  // Notifications status
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);

  // Auto-clear notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Search filtering
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.nama_produk.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  // Open Form modal for creation
  const handleOpenCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  // Open Form modal for editing
  const handleOpenEdit = (product: Product) => {
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  // Trigger delete warning
  const handleOpenDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteOpen(true);
  };

  // Open detail popup
  const handleOpenDetail = (product: Product) => {
    setSelectedDetailProduct(product);
    setIsDetailOpen(true);
  };

  // Open image lightbox zoom popup
  const handleOpenLightbox = (imageUrl: string, title: string) => {
    setLightboxImage(imageUrl);
    setLightboxTitle(title);
    setIsLightboxOpen(true);
  };

  // Save Product (Create / Update)
  const handleSaveProduct = (
    name: string,
    desc: string,
    image: string,
    wa: string,
  ) => {
    // Standardize WhatsApp URL format
    let cleanWaNum = wa.trim().replace(/[^\d+]/g, "");
    if (!cleanWaNum.startsWith("+")) {
      if (cleanWaNum.startsWith("0")) {
        cleanWaNum = "+62" + cleanWaNum.slice(1);
      } else if (cleanWaNum.startsWith("62") && !cleanWaNum.startsWith("+62")) {
        cleanWaNum = "+" + cleanWaNum;
      }
    }
    const cleanWaLink = `https://wa.me/${cleanWaNum.replace("+", "")}?text=Halo%20Admin%20Edumina,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(name)}.`;

    if (editingId !== null) {
      // Update action
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                nama_produk: name,
                deskripsi: desc,
                gambar: image,
                link_wa: cleanWaLink,
              }
            : p,
        ),
      );
      setNotification({
        message: "Produk berhasil diperbarui!",
        type: "success",
      });
    } else {
      // Create action
      const newProduct: Product = {
        id: Date.now(),
        nama_produk: name,
        deskripsi: desc,
        gambar: image,
        link_wa: cleanWaLink,
      };
      setProducts((prev) => [newProduct, ...prev]);
      setNotification({
        message: "Produk baru berhasil ditambahkan!",
        type: "success",
      });
    }

    setIsFormOpen(false);
  };

  // Delete Action
  const confirmDelete = () => {
    if (!productToDelete) return;
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setNotification({
      message: `Produk "${productToDelete.nama_produk}" telah dihapus.`,
      type: "danger",
    });
    setIsDeleteOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="space-y-6 w-full pb-10">
      {/* Dynamic Success Alert Banner */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-lg border transition-all duration-300 transform translate-y-0 ${
            notification.type === "success"
              ? "bg-[#ADD061]/15 border-[#ADD061]/50 text-[#437118]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-white/60 shrink-0">
            {notification.type === "success" ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <span className="text-sm font-bold">{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-[#1D2A62] to-[#121B40] p-6 rounded-3xl text-white shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#ADD061]">
              <ProductIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Katalog Produk</h1>
          </div>
          <p className="text-sm text-white/70 mt-1">
            Kelola katalog produk, detail deskripsi, dan link WhatsApp
            pemesanan.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-(--color-accent-lightgreen) hover:bg-(--color-accent-lightgreen)/80 active:scale-95 text-(--color-primary-dark) px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#ADD061]/20 self-start sm:self-center"
        >
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Tambah Produk
        </button>
      </div>

      {/* Control Actions (Search & Stats) */}
      <div className="bg-white p-4 rounded-2xl border border-white/40 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
          />
        </div>

        {/* Counter Info */}
        <div className="text-xs text-slate-400 font-semibold flex gap-3">
          <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
            Total Katalog:{" "}
            <b className="text-slate-800 font-bold">{products.length}</b>
          </span>
          {searchQuery && (
            <span className="bg-[#EAF5D6] text-[#437118] px-3 py-1.5 rounded-lg border border-[#ADD061]/20">
              Hasil pencarian: <b>{filteredProducts.length}</b>
            </span>
          )}
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenDetail(product)}
              className="bg-white rounded-3xl overflow-hidden border border-white/50 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              {/* Product Header / Image */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                {product.gambar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.gambar}
                    alt={product.nama_produk}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to standard data SVG image in case of load failure
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23D0E6FD'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%231D2A62'>No Image Available</text></svg>";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#D0E6FD]/40 flex flex-col items-center justify-center text-[#1D2A62] p-4 transition-transform duration-500 group-hover:scale-105">
                    <svg
                      className="w-10 h-10 text-[#1D2A62]/40 mb-2"
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
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#1D2A62]/60">
                      No Image
                    </span>
                  </div>
                )}
                {/* Visual badge top right */}
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-extrabold text-[#1D2A62] border border-white/20 uppercase tracking-wide">
                  Catalog
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-[#1D2A62] transition-colors leading-tight">
                    {product.nama_produk}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {product.deskripsi || "Tidak ada deskripsi produk."}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  {/* WhatsApp click tester */}
                  <a
                    href={product.link_wa}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#F5F3D8] hover:bg-[#ebe9cc] text-[#437118] py-2 px-3 rounded-xl font-bold text-xs transition border border-[#ADD061]/30 active:scale-98"
                  >
                    {/* WhatsApp icon */}
                    <svg
                      className="w-4 h-4 text-[#437118]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.022-.015-.022-.015-.502-.254-.09-.045-.27-.135-.555-.273-.12-.06-.18-.09-.27-.09-.09 0-.18.045-.27.135-.09.09-.36.45-.45.54-.09.09-.18.09-.315.045-.135-.045-.585-.213-1.125-.705-.42-.375-.705-.84-.795-.945-.09-.09-.015-.135.045-.225.075-.075.135-.18.225-.27.09-.09.12-.135.18-.225.06-.09.03-.18-.015-.27-.045-.09-.45-1.08-.615-1.485-.165-.39-.33-.33-.45-.33-.12-.015-.27-.015-.405-.015-.135 0-.36.045-.54.27-.18.18-.72.72-.72 1.755s.765 2.025.87 2.16c.105.135 1.5 2.31 3.6 3.195.5.21 1 .345 1.335.45.51.16.975.135 1.335.075.405-.06 1.245-.51 1.425-1 .18-.51.18-.93.12-1-.06-.075-.18-.12-.3-.135zm-5.462-12.382c-5.52 0-10 4.48-10 10 0 1.77.46 3.48 1.34 5l-1.42 5.19 5.3-.1.14-.07C8.89 22.54 10.4 23 12 23c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2c-1.56 0-3.1-.42-4.44-1.21l-.32-.19-3.29.09.89-3.2-.21-.33C3.84 14.65 3.4 12.87 3.4 11c0-4.75 3.85-8.6 8.6-8.6s8.6 3.85 8.6 8.6-3.85 8.6-8.6 8.6z" />
                    </svg>
                    WhatsApp Tester
                  </a>

                  {/* Actions buttons */}
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(product);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl font-bold transition active:scale-95"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.83 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDelete(product);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 py-2 rounded-xl font-bold transition active:scale-95"
                    >
                      <svg
                        className="w-3.5 h-3.5"
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
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-white/40 shadow-sm space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="font-extrabold text-slate-700 text-lg">
            Tidak ada hasil ditemukan
          </h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Tidak ada produk yang sesuai dengan pencarian Anda. Coba kata kunci
            lain atau buat produk baru.
          </p>
        </div>
      )}

      {/* Modals */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingProduct={
          editingId !== null
            ? products.find((p) => p.id === editingId) || null
            : null
        }
        onSave={handleSaveProduct}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        productName={productToDelete?.nama_produk || ""}
        onConfirm={confirmDelete}
      />

      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedDetailProduct}
        onImageClick={(url) =>
          handleOpenLightbox(url, selectedDetailProduct?.nama_produk || "")
        }
      />

      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={lightboxImage}
        productName={lightboxTitle}
      />
    </div>
  );
}

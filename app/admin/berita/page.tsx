"use client";

import { useState, useMemo, useEffect } from "react";
import { NewsIcon } from "@/components/admin/Icons";
import BeritaFormModal from "@/components/admin/berita/BeritaFormModal";
import BeritaDetailModal from "@/components/admin/berita/BeritaDetailModal";
import DeleteConfirmModal from "@/components/admin/berita/DeleteConfirmModal";
import type { AdminBerita, BeritaFormData } from "@/types/berita";
import { formatTanggalBerita } from "@/types/berita";
import { apiRequest, getImageUrl, dataURLtoFile } from "@/lib/api";

const getMockCategory = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes("bioflok") || lower.includes("lele") || lower.includes("pakan") || lower.includes("panen")) return "Budidaya";
  if (lower.includes("pelatihan") || lower.includes("studi") || lower.includes("edukasi") || lower.includes("workshop") || lower.includes("kunjungan")) return "Edukasi";
  if (lower.includes("umkm") || lower.includes("penghargaan") || lower.includes("wirausaha") || lower.includes("bisnis") || lower.includes("raih")) return "Wirausaha";
  return "Teknologi";
};

const getSummary = (content?: string, maxLength = 100) => {
  if (!content) return "Klik untuk membaca selengkapnya.";
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + "...";
};

export default function BeritaAdminPage() {
  const [beritaList, setBeritaList] = useState<AdminBerita[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [beritaToDelete, setBeritaToDelete] = useState<AdminBerita | null>(
    null,
  );
  const [selectedDetailBerita, setSelectedDetailBerita] =
    useState<AdminBerita | null>(null);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);

  // Fetch news list from API
  const fetchBeritaList = async () => {
    try {
      const response = await apiRequest("/api/berita?limit=100");
      if (response.success && response.data) {
        const mapped = response.data.map((item: any) => ({
          ...item,
          kategori: getMockCategory(item.judul),
          ringkasan: getSummary(item.isi_konten),
        }));
        setBeritaList(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch berita list:", err);
    }
  };

  useEffect(() => {
    fetchBeritaList();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const filteredBerita = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return beritaList
      .filter(
        (b) =>
          b.judul.toLowerCase().includes(query) ||
          b.slug.toLowerCase().includes(query) ||
          (b.kategori?.toLowerCase().includes(query) ?? false) ||
          (b.ringkasan?.toLowerCase().includes(query) ?? false),
      )
      .sort(
        (a, b) =>
          new Date(b.tanggal_publish).getTime() -
          new Date(a.tanggal_publish).getTime(),
      );
  }, [beritaList, searchQuery]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (berita: AdminBerita) => {
    setEditingId(berita.id);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (berita: AdminBerita) => {
    setBeritaToDelete(berita);
    setIsDeleteOpen(true);
  };

  const handleOpenDetail = (berita: AdminBerita) => {
    setSelectedDetailBerita(berita);
    setIsDetailOpen(true);
  };

  const handleSaveBerita = async (data: BeritaFormData) => {
    setIsFormOpen(false);
    try {
      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("slug", data.slug || "");
      formData.append("isi_konten", data.isi_konten || "");
      formData.append("tanggal_publish", data.tanggal_publish || "");

      const file = dataURLtoFile(data.gambar, "berita.png");
      if (file) {
        formData.append("gambar", file);
      }

      if (editingId !== null) {
        // Update action
        const response = await apiRequest(`/api/berita/${editingId}`, {
          method: "PATCH",
          body: formData,
        });
        if (response.success && response.data) {
          setBeritaList((prev) =>
            prev.map((b) =>
              b.id === editingId
                ? {
                    ...response.data,
                    kategori: getMockCategory(response.data.judul),
                    ringkasan: getSummary(response.data.isi_konten),
                  }
                : b
            )
          );
          setNotification({
            message: "Berita berhasil diperbarui!",
            type: "success",
          });
        }
      } else {
        // Create action
        const response = await apiRequest("/api/berita", {
          method: "POST",
          body: formData,
        });
        if (response.success && response.data) {
          const newB = {
            ...response.data,
            kategori: getMockCategory(response.data.judul),
            ringkasan: getSummary(response.data.isi_konten),
          };
          setBeritaList((prev) => [newB, ...prev]);
          setNotification({
            message: "Berita baru berhasil dipublikasikan!",
            type: "success",
          });
        }
      }
    } catch (err: any) {
      setNotification({
        message: err.message || "Gagal menyimpan berita.",
        type: "danger",
      });
    }
  };

  const confirmDelete = async () => {
    if (!beritaToDelete) return;
    try {
      const response = await apiRequest(`/api/berita/${beritaToDelete.id}`, {
        method: "DELETE",
      });
      if (response.success) {
        setBeritaList((prev) => prev.filter((b) => b.id !== beritaToDelete.id));
        setNotification({
          message: `Berita "${beritaToDelete.judul}" telah dihapus.`,
          type: "success",
        });
      }
    } catch (err: any) {
      setNotification({
        message: err.message || "Gagal menghapus berita.",
        type: "danger",
      });
    } finally {
      setIsDeleteOpen(false);
      setBeritaToDelete(null);
    }
  };

  return (
    <div className="space-y-6 w-full pb-10">
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-[#1D2A62] to-[#121B40] p-6 rounded-3xl text-white shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#ADD061]">
              <NewsIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Manajemen Berita</h1>
          </div>
          <p className="text-sm text-white/70 mt-1">
            Publikasikan pengumuman, tips budidaya lele, dan kegiatan edukasi Edumina.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#ADD061] hover:bg-[#ADD061]/80 active:scale-95 text-[#1D2A62] px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#ADD061]/20 self-start sm:self-center cursor-pointer"
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
          Tulis Berita
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-white/40 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
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
            placeholder="Cari berita berdasarkan judul, slug, atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
          />
        </div>

        <div className="text-xs text-slate-400 font-semibold flex gap-3">
          <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
            Total Berita:{" "}
            <b className="text-slate-800 font-bold">{beritaList.length}</b>
          </span>
          {searchQuery && (
            <span className="bg-[#ADD061]/15 text-[#437118] px-3 py-1.5 rounded-lg border border-[#ADD061]/20">
              Hasil pencarian: <b>{filteredBerita.length}</b>
            </span>
          )}
        </div>
      </div>

      {/* Berita Grid */}
      {filteredBerita.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBerita.map((berita) => (
            <div
              key={berita.id}
              className="bg-white rounded-3xl overflow-hidden border border-white/50 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                {berita.gambar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getImageUrl(berita.gambar)}
                    alt={berita.judul}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23D0E6FD'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%231D2A62'>No Image Available</text></svg>";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#D0E6FD]/40 flex flex-col items-center justify-center text-[#1D2A62] p-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#1D2A62]/60">
                      No Image
                    </span>
                  </div>
                )}

                {berita.kategori && (
                  <div className="absolute top-3 left-3 bg-[#E5F1FD]/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-extrabold text-[#1D2A62] border border-white/20 uppercase tracking-wide">
                    {berita.kategori}
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-extrabold text-[#1D2A62] border border-white/20">
                  {formatTanggalBerita(berita.tanggal_publish)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-800 text-[15px] group-hover:text-[#1D2A62] transition-colors leading-snug line-clamp-3">
                    {berita.judul}
                  </h3>
                  {berita.ringkasan && (
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {berita.ringkasan}
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    /berita/{berita.slug}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => handleOpenDetail(berita)}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#E5F1FD] hover:bg-[#d0e6fd] text-[#1D2A62] py-2 rounded-xl font-bold text-xs transition active:scale-95 cursor-pointer"
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Lihat Preview
                  </button>

                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => handleOpenEdit(berita)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-xl font-bold transition active:scale-95 cursor-pointer"
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
                      onClick={() => handleOpenDelete(berita)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 py-2 rounded-xl font-bold transition active:scale-95 cursor-pointer"
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
            Tidak ada berita yang sesuai dengan pencarian Anda. Coba kata kunci
            lain atau tambahkan berita baru.
          </p>
        </div>
      )}

      {/* Modals */}
      <BeritaFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingBerita={
          editingId !== null
            ? (() => {
                const b = beritaList.find((x) => x.id === editingId);
                if (!b) return null;
                return {
                  ...b,
                  gambar: getImageUrl(b.gambar),
                };
              })()
            : null
        }
        onSave={handleSaveBerita}
      />

      <BeritaDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        berita={
          selectedDetailBerita
            ? {
                ...selectedDetailBerita,
                gambar: getImageUrl(selectedDetailBerita.gambar),
              }
            : null
        }
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        beritaTitle={beritaToDelete?.judul || ""}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

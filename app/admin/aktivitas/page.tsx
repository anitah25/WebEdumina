"use client";

import { useState, useMemo, useEffect } from "react";
import { ActivityIcon } from "@/components/admin/Icons";
import ActivityFormModal from "@/components/admin/aktivitas/ActivityFormModal";
import DeleteConfirmModal from "@/components/admin/aktivitas/DeleteConfirmModal";

interface Activity {
  id: number;
  judul: string;
  tanggal: string;
  gambar: string;
}

// Initial mock activities from PRD specification (sorted DESC by date)
const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 1,
    judul: "Penyuluhan Bioflok dengan Warga Kampung Siroto",
    tanggal: "2026-07-15",
    gambar:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    judul: "Panen Perdana Kolam Lele Pembesaran Edumina",
    tanggal: "2026-07-10",
    gambar:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    judul: "Kunjungan Studi Banding Mahasiswa FPIK UNDIP",
    tanggal: "2026-07-05",
    gambar:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    judul: "Pelatihan Pembuatan Pakan Mandiri Protein Tinggi",
    tanggal: "2026-06-28",
    gambar:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AktivitasCRUDPage() {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals visibility state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selection states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(
    null,
  );

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

  // Search filtering & date sorting DESC
  const filteredActivities = useMemo(() => {
    return activities
      .filter((a) => a.judul.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort(
        (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
      );
  }, [activities, searchQuery]);

  // Date formatter (Indonesian locale)
  const formatDate = (dateStr: string) => {
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
  };

  // Open Form modal for creation
  const handleOpenCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  // Open Form modal for editing
  const handleOpenEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setIsFormOpen(true);
  };

  // Trigger delete warning
  const handleOpenDelete = (activity: Activity) => {
    setActivityToDelete(activity);
    setIsDeleteOpen(true);
  };

  // Save Activity (Create / Update)
  const handleSaveActivity = (
    judul: string,
    tanggal: string,
    gambar: string,
  ) => {
    if (editingId !== null) {
      // Update action
      setActivities((prev) =>
        prev.map((a) =>
          a.id === editingId ? { ...a, judul, tanggal, gambar } : a,
        ),
      );
      setNotification({
        message: "Aktivitas berhasil diperbarui!",
        type: "success",
      });
    } else {
      // Create action
      const newActivity: Activity = {
        id: Date.now(),
        judul,
        tanggal,
        gambar,
      };
      setActivities((prev) => [newActivity, ...prev]);
      setNotification({
        message: "Aktivitas baru berhasil didokumentasikan!",
        type: "success",
      });
    }

    setIsFormOpen(false);
  };

  // Delete Action
  const confirmDelete = () => {
    if (!activityToDelete) return;
    setActivities((prev) => prev.filter((a) => a.id !== activityToDelete.id));
    setNotification({
      message: `Aktivitas "${activityToDelete.judul}" telah dihapus.`,
      type: "danger",
    });
    setIsDeleteOpen(false);
    setActivityToDelete(null);
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
              <ActivityIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Dokumentasi Aktivitas
            </h1>
          </div>
          <p className="text-sm text-white/70 mt-1">
            Kelola arsip dokumentasi kegiatan dan penyuluhan budidaya lele
            Kampung Siroto.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-(--color-accent-lightgreen) hover:bg-(--color-accent-lightgreen)/80 active:scale-95 text-(--color-primary-dark) px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#ADD061]/20 self-start sm:self-center cursor-pointer"
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
          Tambah Aktivitas
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
            placeholder="Cari aktivitas berdasarkan judul..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
          />
        </div>

        {/* Counter Info */}
        <div className="text-xs text-slate-400 font-semibold flex gap-3">
          <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
            Total Aktivitas:{" "}
            <b className="text-slate-800 font-bold">{activities.length}</b>
          </span>
          {searchQuery && (
            <span className="bg-[#ADD061]/15 text-[#437118] px-3 py-1.5 rounded-lg border border-[#ADD061]/20">
              Hasil pencarian: <b>{filteredActivities.length}</b>
            </span>
          )}
        </div>
      </div>

      {/* Activities Display */}
      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-3xl overflow-hidden border border-white/50 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Activity Header / Image */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                {activity.gambar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activity.gambar}
                    alt={activity.judul}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
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
                {/* Visual date badge top left */}
                <div className="absolute top-3 left-3 bg-[#E5F1FD]/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-extrabold text-[#1D2A62] border border-white/20">
                  {formatDate(activity.tanggal)}
                </div>
              </div>

              {/* Activity Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <h3 className="font-extrabold text-slate-800 text-[15px] group-hover:text-[#1D2A62] transition-colors leading-snug line-clamp-3">
                  {activity.judul}
                </h3>

                <div className="pt-2 border-t border-slate-100 flex gap-2 text-xs">
                  <button
                    onClick={() => handleOpenEdit(activity)}
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
                    onClick={() => handleOpenDelete(activity)}
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
            Tidak ada aktivitas yang sesuai dengan pencarian Anda. Coba kata
            kunci lain atau unggah aktivitas baru.
          </p>
        </div>
      )}

      {/* Modals */}
      <ActivityFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingActivity={
          editingId !== null
            ? activities.find((a) => a.id === editingId) || null
            : null
        }
        onSave={handleSaveActivity}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        activityTitle={activityToDelete?.judul || ""}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

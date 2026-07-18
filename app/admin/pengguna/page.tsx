"use client";

import { useState, useMemo, useEffect } from "react";
import { UserIcon } from "@/components/admin/Icons";
import UserFormModal from "@/components/admin/pengguna/UserFormModal";
import DeleteConfirmModal from "@/components/admin/pengguna/DeleteConfirmModal";
import type { AdminUser, UserFormData } from "@/types/user";

// Initial mock users
const INITIAL_USERS: AdminUser[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@studycenteredumina.com",
    namaLengkap: "Administrator Utama",
    role: "admin",
    status: "active",
    createdAt: "2026-01-01",
  },
  {
    id: 2,
    username: "operator1",
    email: "operator1@studycenteredumina.com",
    namaLengkap: "Operator Satu",
    role: "operator",
    status: "active",
    createdAt: "2026-02-15",
  },
  {
    id: 3,
    username: "operator2",
    email: "operator2@studycenteredumina.com",
    namaLengkap: "Operator Dua",
    role: "operator",
    status: "inactive",
    createdAt: "2026-03-20",
  },
];

export default function PenggunaPage() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Selection states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  // Notification state
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

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        [user.namaLengkap, user.username, user.email]
          .some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
      .sort((a, b) => a.namaLengkap.localeCompare(b.namaLengkap));
  }, [users, searchQuery]);

  // Handlers
  const handleOpenCreate = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingId(user.id);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (user: AdminUser) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const handleSaveUser = (data: UserFormData) => {
    if (editingId !== null) {
      // Update existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingId
            ? {
                ...user,
                ...data,
              }
            : user
        )
      );
      setNotification({
        message: "Pengguna berhasil diperbarui!",
        type: "success",
      });
    } else {
      // Create new user
      const newUser: AdminUser = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [newUser, ...prev]);
      setNotification({
        message: "Pengguna baru berhasil ditambahkan!",
        type: "success",
      });
    }

    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
    setNotification({
      message: `Pengguna "${userToDelete.namaLengkap}" telah dihapus.`,
      type: "danger",
    });
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  // Format date for display
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

  // Get status badge color
  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return "bg-green-100 text-green-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  // Get role badge color
  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return "bg-[#1D2A62]/10 text-[#1D2A62]";
    }
    return "bg-[#AFD06E]/20 text-[#437118]";
  };

  return (
    <div className="space-y-6 w-full pb-10">
      {/* Notification toast */}
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
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Manajemen Pengguna
            </h1>
          </div>
          <p className="text-sm text-white/70 mt-1">
            Kelola pengguna dan akses sistem
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
          Tambah Pengguna
        </button>
      </div>

      {/* Search and Stats */}
      <div className="bg-white p-4 rounded-2xl border border-white/40 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
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
            placeholder="Cari pengguna berdasarkan nama, username, atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
          />
        </div>

        {/* Stats */}
        <div className="text-xs text-slate-400 font-semibold flex gap-3">
          <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
            Total Pengguna:{" "}
            <b className="text-slate-800 font-bold">{users.length}</b>
          </span>
          {searchQuery && (
            <span className="bg-[#ADD061]/15 text-[#437118] px-3 py-1.5 rounded-lg border border-[#ADD061]/20">
              Hasil pencarian: <b>{filteredUsers.length}</b>
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-white/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Nama Pengguna
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tanggal Dibuat
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1D2A62] text-white flex items-center justify-center font-bold text-sm">
                          {user.namaLengkap.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {user.namaLengkap}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${getRoleBadge(
                          user.role
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                          user.status
                        )}`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-2 text-slate-500 hover:text-[#1D2A62] hover:bg-[#1D2A62]/10 rounded-lg transition active:scale-95 cursor-pointer"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4"
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
                        </button>
                        <button
                          onClick={() => handleOpenDelete(user)}
                          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition active:scale-95 cursor-pointer"
                          title="Delete"
                        >
                          <svg
                            className="w-4 h-4"
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
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                        <svg
                          className="w-8 h-8 text-slate-400"
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
                        Tidak ada pengguna ditemukan
                      </h3>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        Tidak ada pengguna yang sesuai dengan pencarian Anda.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingUser={
          editingId !== null
            ? users.find((u) => u.id === editingId) || null
            : null
        }
        onSave={handleSaveUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        userToDelete={userToDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

"use client";

import { useState } from "react";

export default function ProfilePage() {
  // Mock administrative profile state
  const [profileName, setProfileName] = useState("Administrator");
  const [profileEmail] = useState(
    "admin@studycenteredumina.com",
  );
  const [profilePhone, setProfilePhone] = useState("0815639225");
  const [profileRole] = useState("Super Admin");

  // Password modification state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification state
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "danger" | "warning";
  } | null>(null);

  const showNotification = (
    message: string,
    type: "success" | "danger" | "warning",
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim() || !profileEmail.trim() || !profilePhone.trim()) {
      showNotification("Semua field wajib diisi!", "warning");
      return;
    }
    // Simulate updating DB
    showNotification("Informasi profil Anda berhasil diperbarui!", "success");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showNotification("Semua field kata sandi wajib diisi!", "warning");
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification("Konfirmasi kata sandi baru tidak cocok!", "danger");
      return;
    }
    if (newPassword.length < 6) {
      showNotification("Kata sandi baru minimal harus 6 karakter!", "warning");
      return;
    }
    // Simulate updating password
    showNotification("Kata sandi Anda berhasil diperbarui!", "success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6 w-full pb-10">
      {/* Success/Error Alert banner */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-lg border transition-all duration-300 transform translate-y-0 ${
            notification.type === "success"
              ? "bg-[#ADD061]/15 border-[#ADD061]/50 text-[#437118]"
              : notification.type === "warning"
                ? "bg-amber-50 border-amber-200 text-amber-700"
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
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                />
              </svg>
            )}
          </div>
          <span className="text-xs font-bold">{notification.message}</span>
        </div>
      )}

      {/* Main header block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-[#1D2A62] to-[#121B40] p-6 rounded-3xl text-white shadow-md relative overflow-hidden">
        {/* Glow effect overlays */}
        <div className="absolute top-[-50%] right-[-10%] w-[250px] h-[250px] bg-gradient-to-br from-[#87ADEC]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50%] left-[20%] w-[150px] h-[150px] bg-gradient-to-br from-[#ADD061]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-2xl font-black tracking-tight">Detail Profil</h1>
          <p className="text-xs text-white/70 mt-1 font-normal">
            Kelola detail login dan pengaturan profil administrator Anda.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2 bg-[#ADD061]/15 px-3 py-1.5 rounded-xl border border-[#ADD061]/20 self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-[#10AA2B] animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase text-[#ADD061] tracking-wider">
            {profileRole}
          </span>
        </div>
      </div>

      {/* Two-column details settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Account Info Card */}
        <div className="bg-white p-6 rounded-3xl border border-white/50 shadow-sm space-y-5">
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">
              Informasi Akun
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Perbarui nama administrator, alamat email, dan nomor WhatsApp
              utama Anda.
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Display Role (read-only) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Hak Akses / Role
              </label>
              <input
                type="text"
                disabled
                value={profileRole}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 text-sm font-semibold select-none cursor-not-allowed"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Alamat Email
              </label>
              <input
                type="email"
                disabled
                value={profileEmail}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 text-sm font-semibold select-none cursor-not-allowed"
              />
            </div>

            {/* Admin Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>

            {/* Phone/WA Contact */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
                  WA
                </span>
                <input
                  type="text"
                  required
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  placeholder="Contoh: +62815639225 atau 0815639225"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
                />
              </div>
              <p className="text-[10px] text-slate-400 font-normal mt-1 leading-normal">
                Format: <b>081234567890</b> atau <b>+6281234567890</b>.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#437118] hover:bg-[#345912] text-white rounded-xl font-bold text-sm transition shadow-md shadow-[#437118]/15 active:scale-98 cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white p-6 rounded-3xl border border-white/50 shadow-sm space-y-5">
          <div>
            <h3 className="font-extrabold text-slate-800 text-base">
              Ubah Kata Sandi
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Untuk mengamankan akun, pastikan menggunakan kombinasi password
              yang kuat.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Kata Sandi Saat Ini <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Masukkan kata sandi lama"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Kata Sandi Baru <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Konfirmasi Kata Sandi Baru{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi baru"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-[#1D2A62] focus:ring-1 focus:ring-[#1D2A62] transition"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#1D2A62] hover:bg-[#121B40] text-white rounded-xl font-bold text-sm transition shadow-md shadow-[#1D2A62]/10 active:scale-98 cursor-pointer"
              >
                Perbarui Kata Sandi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

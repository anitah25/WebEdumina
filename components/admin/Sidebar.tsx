"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ActivityIcon,
  DashboardIcon,
  LogoutIcon,
  NewsIcon,
  PackageIcon,
  ProductIcon,
  UserIcon,
} from "@/components/admin/Icons";

const navigationItems = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/produk", label: "Produk", icon: ProductIcon },
  { href: "/admin/aktivitas", label: "Aktivitas", icon: ActivityIcon },
  { href: "/admin/paket", label: "Paket Edukasi", icon: PackageIcon },
  { href: "/admin/berita", label: "Berita", icon: NewsIcon },
  { href: "/admin/pengguna", label: "Pengguna", icon: UserIcon },
];

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("admin");
  const [userName, setUserName] = useState<string>("Administrator");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.role) setUserRole(parsed.role);
        if (parsed.nama_lengkap) setUserName(parsed.nama_lengkap);
      } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const filteredNavItems = navigationItems.filter(
    (item) => item.href !== "/admin/pengguna" || userRole !== "operator"
  );

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`w-64 bg-[#1D2A62] text-white h-dvh max-h-screen flex flex-col justify-between fixed lg:static top-0 left-0 z-50 transition-transform duration-300 ease-in-out shrink-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Scrollable Navigation Section */}
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          {/* Header Brand */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M0 12.75C0 5.70837 5.70837 0 12.75 0H18.75C25.7916 0 31.5 5.70837 31.5 12.75V18.75C31.5 25.7916 25.7916 31.5 18.75 31.5H12.75C5.70837 31.5 0 25.7916 0 18.75V12.75Z"
                  fill="#437118"
                />
                <path
                  d="M11.396 15.75C12.1402 13.0108 15.3068 11 18.1252 11C20.9435 11 22.9227 13.0108 23.6668 15.75C22.9227 18.4971 20.9435 20.5 18.1252 20.5C15.3068 20.5 12.1402 18.4971 11.396 15.75Z"
                  stroke="white"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5 15.75V16.1458"
                  stroke="white"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.9168 20.4446C17.887 19.0962 17.3291 17.4466 17.3291 15.75C17.3291 14.0534 17.887 12.4038 18.9168 11.0554"
                  stroke="white"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.7916 14.6971C11.7916 12.5833 10.6674 10.9762 8.41119 10.6042C7.61953 11.7917 7.61953 14.5625 8.59328 15.75C7.61161 16.9375 7.61161 19.7083 8.41119 20.8958C10.6674 20.5237 11.7916 18.9167 11.7916 16.8029"
                  stroke="white"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.531 11.9975C14.3252 10.905 13.5097 9.60668 12.5835 8.62501H17.1752C17.5508 8.62362 17.9147 8.75583 18.2019 8.99802C18.489 9.24021 18.6807 9.5766 18.7427 9.94709L18.9247 11.0554"
                  stroke="white"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.9247 20.4446L18.7427 21.5529C18.6807 21.9234 18.489 22.2598 18.2019 22.502C17.9147 22.7442 17.5508 22.8764 17.1752 22.875H13.771C14.538 22.0054 14.9579 20.8837 14.9506 19.7242"
                  stroke="white"
                  strokeWidth="1.58333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h2 className="text-xl font-black text-[#ADD061] leading-tight">
                Edumina
                <br />
                <span className="text-sm text-[#87ADEC] font-medium">
                  Kampung Siroto
                </span>
              </h2>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 lg:hidden focus:outline-none"
              aria-label="Tutup sidebar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-sm px-3 py-3 flex-1">
            <span className="font-bold text-white/50 text-xs uppercase tracking-wider px-3 block mb-2">
              Menu Utama
            </span>
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 font-medium rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out ${
                    isActive
                      ? "bg-white/15 text-white font-semibold border-l-4 border-[#ADD061]"
                      : "hover:bg-white/10 text-white/80 hover:text-white"
                  }`}
                >
                  <IconComponent className="w-5 h-5 shrink-0 text-white" />
                  <span className="text-white">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout — Fixed at Bottom with Safe Padding */}
        <div className="p-4 pb-8 sm:pb-5 border-t border-white/10 space-y-2 shrink-0 bg-[#1D2A62]">
          {/* Card Info User */}
          <Link
            href="/admin/profil"
            onClick={onClose}
            className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/20 transition active:scale-98 block group"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center font-bold text-white text-base shrink-0 border border-white/20">
              {userName ? userName.charAt(0).toUpperCase() : "A"}
            </div>
            {/* Detail Teks */}
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-white truncate text-sm">
                {userName}
              </span>
              <span className="text-xs text-white/60 truncate capitalize">
                {userRole === "admin" ? "Administrator" : "Operator"}
              </span>
            </div>
          </Link>

          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/15 rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
          >
            <LogoutIcon className="w-5 h-5 text-red-400" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

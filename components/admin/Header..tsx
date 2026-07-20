"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { apiRequest } from "@/lib/api";

const pageLabels: Record<string, string> = {
  aktivitas: "Aktivitas",
  produk: "Produk",
  "paket-edukasi": "Paket Edukasi",
  berita: "Berita",
  pengguna: "Pengguna",
  profil: "Profil Saya",
  settings: "Settings",
};

function getCurrentPageLabel(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length < 2 || segments[0] !== "admin") {
    return "Dashboard";
  }

  return pageLabels[segments[1]] ?? segments[1].replace(/-/g, " ");
}

export default function Header() {
  const pathname = usePathname();
  const currentPageLabel = getCurrentPageLabel(pathname);
  const isDashboard = currentPageLabel === "Dashboard";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{ nama_lengkap: string; role: string } | null>(null);

  // Load user profile details on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-17 border-b border-slate-200 bg-white px-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] relative z-30">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <h1
            className={`truncate text-[15px] font-semibold tracking-tight ${
              isDashboard ? "text-slate-900" : "text-slate-400"
            }`}
          >
            Dashboard
          </h1>

          {!isDashboard ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 flex-none text-slate-300"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 5.23a.75.75 0 0 1 1.06.02l4.54 4.25a.75.75 0 0 1 0 1.08l-4.54 4.25a.75.75 0 1 1-1.04-1.08L10.807 10 7.23 6.29a.75.75 0 0 1-.02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>

              <h2 className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
                {currentPageLabel}
              </h2>
            </>
          ) : null}
        </div>

        {/* User profile with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 text-left focus:outline-none hover:bg-slate-50 px-3 py-1.5 rounded-2xl transition duration-150 cursor-pointer active:scale-98"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1D2A62] text-sm font-bold text-white uppercase">
              {user?.nama_lengkap ? user.nama_lengkap.charAt(0) : "A"}
            </div>

            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-slate-900 capitalize">
                {user?.nama_lengkap || "Admin"}
              </p>
              <p className="text-sm text-slate-500 capitalize">
                {user?.role || "Operator"}
              </p>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.193l3.71-3.963a.75.75 0 1 1 1.08 1.04l-4.25 4.54a.75.75 0 0 1-1.08 0l-4.25-4.54a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
              <Link
                href="/admin/profil"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-bold transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Profil Saya
              </Link>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={async () => {
                  setIsDropdownOpen(false);
                  try {
                    await apiRequest("/api/auth/logout", { method: "POST" });
                  } catch (e) {
                    // Ignore network error on logout
                  }
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("token");
                  localStorage.removeItem("userRole");
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold text-left transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

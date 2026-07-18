"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ActivityIcon,
  NewsIcon,
  ProductIcon,
} from "@/components/admin/Icons";

export default function AdminDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  let currentDate = "Sabtu, 11 Juli 2026";
  if (isMounted) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    try {
      const today = new Date();
      currentDate = today.toLocaleDateString("id-ID", options);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="space-y-6 w-full">
      {/* 1. Welcome Card Banner */}
      <div className="bg-gradient-to-r from-[#1D2A62] via-[#1A2657] to-[#121B40] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[190px] border border-white/5 transition-all duration-300 hover:shadow-xl">
        {/* Glow effect on the right */}
        <div className="absolute top-[-50%] right-[-10%] w-[350px] h-[350px] bg-gradient-to-br from-[#87ADEC]/15 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-[200px] h-[200px] bg-gradient-to-br from-[#ADD061]/5 to-transparent rounded-full blur-[50px] pointer-events-none" />

        <div className="relative z-10 space-y-2">
          {/* Tagline */}
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[#ADD061] tracking-widest uppercase">
            <svg
              className="w-4 h-4 text-[#ADD061] animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            ADMIN PANEL • EDUMINA KAMPUNG SIROTO
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight">
            Selamat Datang, Admin! 👋
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 text-sm md:text-base max-w-xl font-normal leading-relaxed">
            Kelola konten Study Center Edumina dengan mudah
          </p>
        </div>

        {/* Date Container */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center text-xs text-white/70">
          <svg
            className="w-4 h-4 mr-2 text-white/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {currentDate}
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Berita */}
        <div className="bg-white rounded-3xl p-6 border border-white/40 shadow-sm flex flex-col justify-between min-h-[170px] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#E5F1FD] flex items-center justify-center text-[#1D2A62] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <NewsIcon />
            </div>
            <div className="flex items-center gap-0.5 bg-[#EAF5D6] text-[#437118] px-2.5 py-1 rounded-full text-xs font-bold shadow-sm/5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              +5%
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#1D2A62] tracking-tight">
              45
            </div>
            <div className="text-sm font-semibold text-slate-800 mt-1">
              Total Berita
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              3 draft menunggu
            </div>
          </div>
        </div>

        {/* Card 2: Total Produk */}
        <div className="bg-white rounded-3xl p-6 border border-white/40 shadow-sm flex flex-col justify-between min-h-[170px] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#E5F1FD] flex items-center justify-center text-[#1D2A62] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <ProductIcon />
            </div>
            <div className="flex items-center gap-0.5 bg-[#EAF5D6] text-[#437118] px-2.5 py-1 rounded-full text-xs font-bold shadow-sm/5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              +3%
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#1D2A62] tracking-tight">
              28
            </div>
            <div className="text-sm font-semibold text-slate-800 mt-1">
              Total Produk
            </div>
            <div className="text-xs text-red-500 font-medium mt-0.5">
              2 stok habis
            </div>
          </div>
        </div>

        {/* Card 3: Total Aktivitas */}
        <div className="bg-white rounded-3xl p-6 border border-white/40 shadow-sm flex flex-col justify-between min-h-[170px] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#E5F1FD] flex items-center justify-center text-[#1D2A62] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <ActivityIcon />
            </div>
            <div className="flex items-center gap-0.5 bg-[#EAF5D6] text-[#437118] px-2.5 py-1 rounded-full text-xs font-bold shadow-sm/5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              +18%
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-extrabold text-[#1D2A62] tracking-tight">
              67
            </div>
            <div className="text-sm font-semibold text-slate-800 mt-1">
              Total Aktivitas
            </div>
            <div className="text-xs text-amber-600 font-medium mt-0.5">
              4 akan datang
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions ("Aksi Cepat") */}
      <div className="bg-white rounded-3xl p-6 border border-white/40 shadow-sm transition-all duration-300 hover:shadow-md">
        <div>
          <h3 className="text-lg font-bold text-[#1D2A62]">Aksi Cepat</h3>
          <p className="text-sm text-slate-400 mt-0.5 mb-5">
            Buat konten baru dengan cepat
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/berita"
            className="inline-flex items-center gap-2 bg-[#437118] hover:bg-[#345912] active:scale-95 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#437118]/15 hover:shadow-lg hover:shadow-[#437118]/25"
          >
            <div className="w-5 h-5 shrink-0 flex items-center justify-center text-white">
              <NewsIcon />
            </div>
            + Tambah Berita
          </Link>

          <Link
            href="/admin/produk"
            className="inline-flex items-center gap-2 bg-[#437118] hover:bg-[#345912] active:scale-95 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#437118]/15 hover:shadow-lg hover:shadow-[#437118]/25"
          >
            <div className="w-5 h-5 shrink-0 flex items-center justify-center text-white">
              <ProductIcon />
            </div>
            + Tambah Produk
          </Link>

          <Link
            href="/admin/aktivitas"
            className="inline-flex items-center gap-2 bg-[#437118] hover:bg-[#345912] active:scale-95 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md shadow-[#437118]/15 hover:shadow-lg hover:shadow-[#437118]/25"
          >
            <div className="w-5 h-5 shrink-0 flex items-center justify-center text-white">
              <ActivityIcon />
            </div>
            + Tambah Aktivitas
          </Link>
        </div>
      </div>
    </div>
  );
}

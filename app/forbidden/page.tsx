"use client";

import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1D2A62]/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#437118]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 text-center shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Shield & Lock Graphic Badge */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-amber-500/10 border border-red-500/30 flex items-center justify-center mb-6 shadow-inner relative">
          <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping opacity-75" style={{ animationDuration: "3s" }} />
          <svg
            className="w-12 h-12 text-red-400 relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* 403 Status Code Badge */}
        <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 font-extrabold text-xs tracking-widest uppercase mb-3">
          Error 403 • Restricted Area
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl font-black tracking-tight text-white mb-3">
          Akses Ditolak!
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed mb-8 font-normal">
          Maaf, akun Anda (<span className="text-amber-400 font-semibold">Operator</span>) tidak memiliki izin untuk mengakses halaman manajemen pengguna ini. Halaman ini hanya diperuntukkan bagi <span className="text-green-400 font-semibold">Administrator</span>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/admin"
            className="flex-1 bg-[#437118] hover:bg-[#355a13] text-white font-bold text-sm py-3 px-5 rounded-xl transition active:scale-95 shadow-lg shadow-[#437118]/25 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Ke Dashboard
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 font-bold text-sm py-3 px-5 rounded-xl transition active:scale-95 flex items-center justify-center"
          >
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

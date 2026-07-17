"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import Navbar from "@/components/public/Navbar";
import { beritaList } from "@/data/content/berita";
import type { Berita } from "@/types/berita";
import Footer from "@/components/public/Footer";

// ── Config ───────────────────────────────────────────────────
const PER_PAGE = 9;

const ALL_CATEGORIES = ["Semua", ...Array.from(new Set(beritaList.map((b) => b.kategori).filter(Boolean))) as string[]];

// ── News Card (full page variant — vertical stack) ────────────
function BeritaCardFull({ item }: { item: Berita }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      {/* Image */}
      <div className="relative w-full" style={{ height: "200px" }}>
        <Image
          src={item.gambar}
          alt={item.judul}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge */}
        {item.kategori && (
          <span
            className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: "var(--color-primary-dark)", fontFamily: "Poppins, sans-serif" }}
          >
            {item.kategori}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <Link href={`/berita/${item.slug}`} className="block">
          <p
            className="font-semibold text-[#111827] leading-snug line-clamp-3 group-hover:text-[var(--color-accent-darkgreen)] transition-colors"
            style={{ fontSize: "15px", fontFamily: "Poppins, sans-serif" }}
          >
            {item.judul}
          </p>

          {item.ringkasan && (
            <p
              className="text-gray-500 leading-relaxed line-clamp-2"
              style={{ fontSize: "13px", fontFamily: "Poppins, sans-serif" }}
            >
              {item.ringkasan}
            </p>
          )}
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span
            className="text-gray-400"
            style={{ fontSize: "13px", fontWeight: 300, fontFamily: "Poppins, sans-serif" }}
          >
            {item.tanggal}
          </span>
          <Link
            href={`/berita/${item.slug}`}
            className="flex items-center justify-center rounded-lg hover:bg-[var(--color-accent-lightgreen)]/10 transition-colors"
            style={{
              border: "1px solid #b6cf7b",
              padding: "3px 10px",
              fontSize: "13px",
              color: "#4c7026",
              fontFamily: "Poppins, sans-serif",
              textDecoration: "none",
            }}
          >
            Baca &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Page Content ─────────────────────────────────────────
export default function BeritaPageContent() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  // Filter
  const filtered = useMemo(() => {
    return beritaList.filter((b) => {
      const matchCat = activeCategory === "Semua" || b.kategori === activeCategory;
      const matchSearch =
        !search || b.judul.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  // Reset page on filter change
  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(0);
  };
  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pt-[72px]">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div
        className="relative w-full flex flex-col items-center justify-center text-center py-20 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1D2A62 0%, #263580 60%, #1a4a7a 100%)", minHeight: "260px" }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #AFD06E, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #87ADEC, transparent)", transform: "translate(-30%, 30%)" }} />

        <nav className="relative z-10 flex items-center gap-2 text-xs text-white/60 mb-4" aria-label="breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
          <span>/</span>
          <span className="text-white">Berita</span>
        </nav>

        <h1
          className="relative z-10 font-extrabold text-white leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", fontFamily: "Poppins, sans-serif" }}
        >
          Berita Terbaru
        </h1>
        <p
          className="relative z-10 text-white/70 mt-3 max-w-lg"
          style={{ fontSize: "15px", fontFamily: "Poppins, sans-serif" }}
        >
          Perkembangan terkini seputar budidaya lele, teknologi, dan kisah sukses dari Study Center Edumina.
        </p>
      </div>

      {/* ── Filters ── */}
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px] mt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-dark)]/30 transition-all"
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: activeCategory === cat ? "var(--color-primary-dark)" : "#f3f4f6",
                  color: activeCategory === cat ? "#fff" : "#374151",
                  boxShadow: activeCategory === cat ? "0 2px 8px rgba(29,42,98,0.25)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-400 mt-3" style={{ fontFamily: "Poppins, sans-serif" }}>
          Menampilkan {paginated.length} dari {filtered.length} berita
        </p>
      </div>

      {/* ── News Grid ── */}
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px] mt-6 pb-20">
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((item) => (
              <BeritaCardFull key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
              Tidak ada berita yang sesuai.
            </p>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: i === page ? "var(--color-primary-dark)" : "transparent",
                  color: i === page ? "#fff" : "#374151",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

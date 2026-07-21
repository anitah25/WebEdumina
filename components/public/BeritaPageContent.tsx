"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/public/Navbar";
import type { Berita } from "@/types/berita";
import Footer from "@/components/public/Footer";
import { apiRequest, getImageUrl } from "@/lib/api";

const PER_PAGE = 12; // Maksimal 12 card per halaman

const ALL_CATEGORIES = ["Semua", "Budidaya", "Edukasi", "Wirausaha", "Teknologi"];

function formatDate(dateStr: string) {
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
}

const getMockCategory = (title: string): string => {
  const lower = title.toLowerCase();
  if (lower.includes("bioflok") || lower.includes("lele") || lower.includes("pakan") || lower.includes("panen")) return "Budidaya";
  if (lower.includes("pelatihan") || lower.includes("studi") || lower.includes("edukasi") || lower.includes("workshop") || lower.includes("kunjungan")) return "Edukasi";
  if (lower.includes("umkm") || lower.includes("penghargaan") || lower.includes("wirausaha") || lower.includes("bisnis") || lower.includes("raih")) return "Wirausaha";
  return "Teknologi";
};

const getSummary = (content?: string, maxLength = 90) => {
  if (!content) return "Klik untuk membaca selengkapnya mengenai berita ini.";
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + "...";
};

// ── News Card (Responsive full page variant) ────────────
function BeritaCardFull({ item }: { item: Berita }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full shadow-md border border-gray-100">
      {/* Image */}
      <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden bg-gray-100">
        <Image
          src={getImageUrl(item.gambar)}
          alt={item.judul}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge */}
        {item.kategori && (
          <span className="absolute top-3 left-3 text-white text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-[#1D2A62] shadow-sm">
            {item.kategori}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between">
        <div>
          <Link href={`/berita/${item.slug}`} className="block">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#437118] transition-colors">
              {item.judul}
            </h3>

            {item.ringkasan && (
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mt-2">
                {item.ringkasan}
              </p>
            )}
          </Link>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 shrink-0">
          <span className="text-gray-400 text-xs font-normal">
            {item.tanggal}
          </span>
          <Link
            href={`/berita/${item.slug}`}
            className="flex items-center justify-center rounded-lg bg-[#ADD061]/10 border border-[#b6cf7b] px-3 py-1 text-xs sm:text-sm font-medium text-[#437118] hover:bg-[#437118] hover:text-white transition-colors"
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
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchAllBerita = async () => {
      try {
        const response = await apiRequest("/api/berita?limit=100");
        if (response.success && response.data) {
          const mapped = response.data.map((item: any) => ({
            id: String(item.id),
            judul: item.judul,
            tanggal: formatDate(item.tanggal_publish),
            gambar: item.gambar,
            slug: item.slug,
            kategori: getMockCategory(item.judul),
            ringkasan: getSummary(item.isi_konten),
            isi_konten: item.isi_konten,
          }));
          setBeritaList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch news page content:", err);
      }
    };
    fetchAllBerita();
  }, []);

  // Filter
  const filtered = useMemo(() => {
    return beritaList.filter((b) => {
      const matchCat =
        activeCategory === "Semua" || b.kategori === activeCategory;
      const matchSearch =
        !search || b.judul.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search, beritaList]);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 280, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pt-[72px]">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div
        className="relative w-full flex flex-col items-center justify-center text-center pt-10 pb-14 sm:pt-14 sm:pb-16 px-4 sm:px-6 overflow-hidden min-h-[220px] sm:min-h-[260px]"
        style={{
          background:
            "linear-gradient(135deg, #1D2A62 0%, #263580 60%, #1a4a7a 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #AFD06E, transparent)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #87ADEC, transparent)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <nav
          className="relative z-10 flex items-center gap-2 text-xs sm:text-sm text-white/70 mb-3 sm:mb-4"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-white font-medium">Berita</span>
        </nav>

        <h1 className="relative z-10 font-extrabold text-white text-2xl sm:text-4xl lg:text-5xl leading-tight mb-2 sm:mb-3">
          Berita Terbaru
        </h1>
        <p className="relative z-10 text-white/80 text-xs sm:text-base leading-relaxed max-w-lg mx-auto px-2">
          Perkembangan terkini seputar budidaya lele, teknologi, dan kisah
          sukses dari Study Center Edumina.
        </p>
      </div>

      {/* ── Filters Section ── */}
      <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto max-w-[1440px] mt-8 sm:mt-10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35"
              />
            </svg>
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D2A62]/20 transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#1D2A62] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result Count */}
        <p className="text-xs sm:text-sm text-gray-500 mt-4">
          Menampilkan {paginated.length} dari {filtered.length} berita
        </p>
      </div>

      {/* ── News Grid ── */}
      <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto max-w-[1440px] mt-6 pb-16 sm:pb-20">
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {paginated.map((item) => (
              <BeritaCardFull key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-500 text-base font-medium">
              Tidak ada berita yang sesuai dengan pencarian Anda.
            </p>
          </div>
        )}

        {/* ── Pagination Bar (Maksimal 12 card/page) ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-14">
            {/* Prev Page Button */}
            <button
              onClick={() => handlePageChange(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Halaman sebelumnya"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  i === page
                    ? "bg-[#1D2A62] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              aria-label="Halaman selanjutnya"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { beritaList } from "@/data/content/berita";
import type { Berita } from "@/types/berita";

// ── Berita Card ───────────────────────────────────────────────
// Matches CSS export: horizontal flex card
//   image 144×138px on left, content area on right
//   title (font-weight 600), date (top 85px, font-weight 300),
//   "Baca >" button (top 112px, right-aligned, outlined green)
function BeritaCard({ item }: { item: Berita }) {
  return (
    <div
      className="flex items-center gap-[13px] bg-white w-full"
      style={{
        borderRadius: "8px",
        boxShadow: "2px 4px 4px rgba(0,0,0,0.25)",
        borderRight: "1px solid #fff",
        borderBottom: "1px solid #fff",
      }}
    >
      {/* Image — left side */}
      <div className="relative flex-shrink-0" style={{ width: "144px", height: "138px" }}>
        <Image
          src={item.gambar}
          alt={item.judul}
          fill
          className="object-cover"
          style={{ borderRadius: "8px" }}
          sizes="144px"
        />
      </div>

      {/* Content — right side */}
      <div className="relative flex-1" style={{ height: "138px" }}>
        {/* Title */}
        <p
          className="absolute top-0 left-0 right-3 font-semibold text-black leading-snug"
          style={{ fontSize: "15px", fontFamily: "Poppins, sans-serif" }}
        >
          {item.judul}
        </p>

        {/* Date */}
        <p
          className="absolute left-0 text-gray-500"
          style={{ top: "85px", fontSize: "15px", fontWeight: 300, fontFamily: "Poppins, sans-serif" }}
        >
          {item.tanggal}
        </p>

        {/* Baca > button — bottom right */}
        <Link
          href={`/berita/${item.slug}`}
          className="absolute flex items-center justify-center rounded-lg hover:bg-[var(--color-accent-lightgreen)]/10 transition-colors"
          style={{
            top: "108px",
            right: "12px",
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
  );
}

// ── Main Section ─────────────────────────────────────────────
// Shows first 9 news in a 3-column × 3-row grid
// + "Lihat Lainnya" button linking to /berita
const PREVIEW_COUNT = 9;

export default function BeritaSection() {
  const preview = beritaList.slice(0, PREVIEW_COUNT);

  return (
    <section id="berita" className="w-full bg-white py-16 lg:py-20">
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px]">

        {/* ── Header ── */}
        <div className="mb-8">
          <span className="text-sm font-bold text-[var(--color-accent-darkgreen)] uppercase tracking-widest">
            Berita Terbaru
          </span>
        </div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>

        {/* ── Lihat Lainnya button ── */}
        <div className="flex justify-center mt-10">
          <Link
            href="/berita"
            className="inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#8FACCA",
              color: "#1D2A62",
              padding: "10px 40px",
              fontSize: "15px",
              fontFamily: "Poppins, sans-serif",
              boxShadow: "2px 4px 4px rgba(0,0,0,0.15)",
            }}
          >
            Lihat Lainnya
          </Link>
        </div>

      </div>
    </section>
  );
}

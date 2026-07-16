"use client";

import Image from "next/image";
import { paketEdukasiList } from "@/data/content/paketEdukasi";
import type { PaketEdukasi } from "@/types/paketEdukasi";

// ── Icon: training/education ─────────────────────────────────
function EduIcon() {
  return (
    <svg
      className="w-6 h-6 text-[var(--color-accent-darkgreen)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 10c1-2 3-2 4 0s3 2 4 0" />
    </svg>
  );
}

// ── Paket Edukasi Card ────────────────────────────────────────
// Same overlay style as TentangKami cards (CSS export):
//   card 342px tall, image 264px, white box overlaps at 206px
//   icon at 227px left-16, title+desc right of icon,
//   price badge + selengkapnya button at bottom row (299-301px)
function PaketCard({ item }: { item: PaketEdukasi }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 w-full rounded-lg"
      style={{
        height: "342px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image */}
      <div className="absolute top-0 left-0 w-full" style={{ height: "264px" }}>
        <Image
          src={item.gambar}
          alt={item.nama}
          fill
          className="object-cover"
          style={{ borderRadius: "8px" }}
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>

      {/* White overlay box — overlaps bottom of image */}
      <div
        className="absolute left-0 w-full bg-white"
        style={{
          top: "206px",
          height: "136px",
          borderRadius: "8px",
          boxShadow: "2px 4px 4px rgba(0,0,0,0.25)",
        }}
      >
        {/* Icon */}
        <div
          className="absolute flex items-center justify-center rounded-full bg-(--color-accent-lightgreen)/40"
          style={{ top: "21px", left: "16px", width: "40px", height: "40px" }}
        >
          <EduIcon />
        </div>

        {/* Title */}
        <p
          className="absolute text-black font-semibold leading-snug"
          style={{
            top: "21px",
            left: "68px",
            right: "8px",
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {item.nama}
        </p>

        {/* Description */}
        <p
          className="absolute text-gray-500 leading-snug"
          style={{
            top: "46px",
            left: "68px",
            right: "8px",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {item.deskripsi}
        </p>

        {/* ── Bottom row: Price badge + Selengkapnya button ── */}
        {/* Price badge */}
        <div
          className="absolute flex items-center justify-center rounded-xl"
          style={{
            top: "95px",
            left: "16px",
            backgroundColor: "var(--color-accent-darkgreen)",
            padding: "3px 10px",
          }}
        >
          <span
            className="font-semibold text-white"
            style={{ fontSize: "12px", fontFamily: "Poppins, sans-serif" }}
          >
            {item.harga}
          </span>
        </div>

        {/* Selengkapnya button */}
        <div
          className="absolute flex items-center justify-center rounded-lg cursor-pointer hover:bg-[var(--color-accent-lightgreen)]/10 transition-colors"
          style={{
            top: "93px",
            right: "12px",
            border: "1px solid #b6cf7b",
            padding: "3px 10px",
          }}
        >
          <span
            className="text-[var(--color-accent-darkgreen)]"
            style={{ fontSize: "13px", fontFamily: "Poppins, sans-serif" }}
          >
            Selengkapnya &gt;
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────
export default function PaketEdukasiSection() {
  return (
    <section id="paket-edukasi" className="w-full bg-white py-16 lg:py-20">
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px]">
        {/* ── Header — centered green title ── */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2
            className="font-bold text-[var(--color-accent-darkgreen)]"
            style={{ fontSize: "20px", fontFamily: "Poppins, sans-serif" }}
          >
            Paket Edukasi
          </h2>
        </div>

        {/* ── Grid: 4 kolom, semua paket tampil langsung ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {paketEdukasiList.map((item) => (
            <PaketCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

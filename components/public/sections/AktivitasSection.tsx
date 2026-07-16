"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { aktivitasList } from "@/data/content/aktivitas";
import type { Aktivitas } from "@/types/aktivitas";

// ── Config ──────────────────────────────────────────────────
const VISIBLE = 4; // cards visible at a time on desktop

// ── Activity Card ────────────────────────────────────────────
// Matches the CSS from the design export:
//   card height 296px, image 274px, gradient overlay from 137px,
//   title at 227px left 13px, date at 258px left 13px
function AktivitasCard({ item }: { item: Aktivitas }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ height: "296px", width: "100%" }}
    >
      {/* Image */}
      <Image
        src={item.gambar}
        alt={item.judul}
        fill
        className="object-cover"
        style={{ borderRadius: "8px" }}
        sizes="(max-width: 640px) 100vw, 25vw"
      />

      {/* Gradient overlay — starts at ~46% from top, fades to white */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "137px",
          height: "159px",
          borderRadius: "0 0 8px 8px",
          background:
            "linear-gradient(181.45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 18.27%, #fff 63.46%)",
          borderRight: "1px solid #e8e8e8",
          borderBottom: "1px solid #e8e8e8",
          borderLeft: "1px solid #e8e8e8",
          boxSizing: "border-box",
        }}
      />

      {/* Title */}
      <p
        className="absolute text-black leading-snug"
        style={{
          top: "227px",
          left: "13px",
          fontSize: "16px",
          fontWeight: 500,
          fontFamily: "Poppins, sans-serif",
          right: "13px",
        }}
      >
        {item.judul}
      </p>

      {/* Date */}
      <p
        className="absolute text-gray-500"
        style={{
          top: "258px",
          left: "13px",
          fontSize: "13px",
          fontWeight: 300,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {item.tanggal}
      </p>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────
export default function AktivitasSection() {
  const total = aktivitasList.length;
  const maxIndex = Math.max(0, total - VISIBLE);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c === 0 ? maxIndex : c - 1));
  const next = () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 4000); // auto-slide every 4 seconds
    return () => clearInterval(timer);
  }, [current, maxIndex]);

  // Dots: one per possible position
  const dots = Array.from({ length: maxIndex + 1 });

  return (
    <section id="aktivitas" className="w-full bg-white py-16 lg:py-20 overflow-hidden">
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px]">

        {/* ── Header ── */}
        <div className="mb-8">
          <span className="text-sm font-bold text-[var(--color-accent-darkgreen)] uppercase tracking-widest">
            Aktivitas Kami
          </span>
        </div>

        {/* ── Carousel wrapper ── */}
        <div className="relative">

          {/* Prev button */}
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Sebelumnya"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10
                       w-10 h-10 rounded-full bg-[var(--color-primary-dark)] text-white shadow-lg
                       flex items-center justify-center
                       disabled:opacity-30 disabled:cursor-not-allowed
                       hover:bg-[#263580] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${current} * (100% / ${VISIBLE} + 5px / ${VISIBLE} * (${VISIBLE} - 1))))`,
              }}
            >
              {aktivitasList.map((item) => (
                <div
                  key={item.id}
                  style={{ minWidth: `calc((100% - ${(VISIBLE - 1) * 20}px) / ${VISIBLE})` }}
                >
                  <AktivitasCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            aria-label="Selanjutnya"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10
                       w-10 h-10 rounded-full bg-[var(--color-primary-dark)] text-white shadow-lg
                       flex items-center justify-center
                       disabled:opacity-30 disabled:cursor-not-allowed
                       hover:bg-[#263580] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {dots.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-4 h-3 bg-[var(--color-primary-dark)]"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

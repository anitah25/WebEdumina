"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { produkList } from "@/data/content/produk";
import type { Produk } from "@/types/produk";
import ProdukModal from "../modals/ProdukModal";

// ── Config ──────────────────────────────────────────────────
const VISIBLE = 5; // items visible at a time on desktop

// ── Produk Circle Card ───────────────────────────────────────
// Matches CSS export:
//   white circle 183×183px with box-shadow: 2px 4px 4px rgba(0,0,0,0.25)
//   product image centered inside the circle
//   name label centered below
function ProdukCard({
  item,
  onClick
}: {
  item: Produk;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group">
      {/* Circle */}
      <div
        className="relative flex items-center justify-center bg-white rounded-full overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105 shadow-lg"
        style={{
          width: "183px",
          height: "183px",
          boxShadow: "2px 4px 4px rgba(0,0,0,0.25)",
        }}
        onClick={onClick}
      >
        <Image
          src={item.gambar}
          alt={item.nama}
          fill
          className="object-contain p-4"
          sizes="183px"
        />
      </div>

      {/* Name */}
      <p
        className="text-[#000] text-center group-hover:text-[#1D2A62] transition-colors"
        style={{ fontSize: "13px", fontFamily: "Poppins, sans-serif" }}
      >
        {item.nama}
      </p>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────
export default function ProdukSection() {
  const total = produkList.length;
  const maxIndex = Math.max(0, total - VISIBLE);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? maxIndex : c - 1));
  const next = () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 4000); // auto-slide every 4 seconds
    return () => clearInterval(timer);
  }, [current, maxIndex]);

  const dots = Array.from({ length: maxIndex + 1 });

  // Gap between cards in px
  const GAP = 20;
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<Produk | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCardClick = (item: Produk) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section id="produk" className="w-full bg-white py-16 lg:py-20 overflow-hidden">
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px]">

        {/* ── Header — center aligned ── */}
        <div className="mb-10 text-center">
          <span className="text-sm font-bold text-[var(--color-accent-darkgreen)] uppercase tracking-widest">
            Produk Kami
          </span>
        </div>

        {/* ── Carousel wrapper ── */}
        <div className="relative">

          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Sebelumnya"
            className="absolute left-0 top-[91px] -translate-x-5 z-10
                       w-10 h-10 rounded-full bg-[var(--color-primary-dark)] text-white shadow-lg
                       flex items-center justify-center
                       hover:bg-[#263580] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(calc(-${current} * (183px + ${GAP}px)))`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Track */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(calc(-${current} * (183px + ${GAP}px)))`,
                }}
              >
                {produkList.map((item) => (
                  <ProdukCard
                    key={item.id}
                    item={item}
                    onClick={() => handleCardClick(item)}
                  />
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={next}
              disabled={current === maxIndex}
              aria-label="Selanjutnya"
              className="absolute right-0 top-[91px] translate-x-5 z-10
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

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Selanjutnya"
            className="absolute right-0 top-[91px] translate-x-5 z-10
                       w-10 h-10 rounded-full bg-[var(--color-primary-dark)] text-white shadow-lg
                       flex items-center justify-center
                       hover:bg-[#263580] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        </div>
      </section>

      <ProdukModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
}

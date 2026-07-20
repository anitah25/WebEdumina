"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Aktivitas } from "@/types/aktivitas";
import AktivitasModal from "../modals/AktivitasModal";
import { apiRequest, getImageUrl } from "@/lib/api";

const VISIBLE = 4; // cards visible at a time on desktop

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

function AktivitasCard({
  item,
  onClick
}: {
  item: Aktivitas;
  onClick: () => void;
}) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
      style={{ height: "296px", width: "100%" }}
      onClick={onClick}
    >
      {/* Image */}
      <Image
        src={getImageUrl(item.gambar)}
        alt={item.judul}
        fill
        className="object-cover"
        style={{ borderRadius: "8px" }}
        sizes="(max-width: 640px) 100vw, 25vw"
      />

      {/* Gradient overlay */}
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
        {formatDate(item.tanggal)}
      </p>
    </div>
  );
}

export default function AktivitasSection() {
  const [aktivitasList, setAktivitasList] = useState<Aktivitas[]>([]);
  const total = aktivitasList.length;
  const maxIndex = Math.max(0, total - VISIBLE);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<Aktivitas | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? maxIndex : c - 1)), [maxIndex]);
  const next = useCallback(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);

  useEffect(() => {
    const fetchAktivitas = async () => {
      try {
        const response = await apiRequest("/api/aktivitas?limit=100");
        if (response.success && response.data) {
          setAktivitasList(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch aktivitas:", err);
      }
    };
    fetchAktivitas();
  }, []);

  useEffect(() => {
    if (maxIndex === 0) return;
    const timer = setInterval(() => {
      next();
    }, 4000); // auto-slide every 4 seconds
    return () => clearInterval(timer);
  }, [next, maxIndex]);

  const dots = Array.from({ length: maxIndex + 1 });

  const handleCardClick = (item: Aktivitas) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
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
                    <AktivitasCard
                      item={item}
                      onClick={() => handleCardClick(item)}
                    />
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

      <AktivitasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
}

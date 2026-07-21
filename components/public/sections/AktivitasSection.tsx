"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Aktivitas } from "@/types/aktivitas";
import AktivitasModal from "../modals/AktivitasModal";
import { apiRequest, getImageUrl } from "@/lib/api";

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
      className="relative w-full h-[320px] sm:h-[296px] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-sm border border-gray-100"
      onClick={onClick}
    >
      {/* Background Image */}
      <Image
        src={getImageUrl(item.gambar)}
        alt={item.judul}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />

      {/* Bottom Gradient Overlay & Text */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/85 to-transparent pt-16 pb-4 px-4 flex flex-col justify-end rounded-b-xl border-b border-x border-gray-200/50">
        <p className="text-gray-900 text-base font-semibold leading-snug line-clamp-2 drop-shadow-xs">
          {item.judul}
        </p>
        <p className="text-gray-500 text-xs font-normal mt-1">
          {formatDate(item.tanggal)}
        </p>
      </div>
    </div>
  );
}

export default function AktivitasSection() {
  const [aktivitasList, setAktivitasList] = useState<Aktivitas[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleCount(1);
      } else if (w < 768) {
        setVisibleCount(2);
      } else if (w < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const total = aktivitasList.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Clamp current index when screen size / maxIndex changes
  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [maxIndex, current]);

  // Modal state
  const [selectedItem, setSelectedItem] = useState<Aktivitas | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? maxIndex : c - 1)), [maxIndex]);
  const next = useCallback(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);

  // Touch swipe handling for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      next();
    } else if (diff < -50) {
      prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

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

  const gapPx = 16;

  return (
    <>
      <section id="aktivitas" className="w-full bg-white py-12 lg:py-20 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto max-w-[1440px]">

          {/* ── Header ── */}
          <div className="mb-6 lg:mb-8">
            <span className="text-xs sm:text-sm font-bold text-[var(--color-accent-darkgreen)] uppercase tracking-widest">
              Aktivitas Kami
            </span>
          </div>

          {/* ── Carousel wrapper ── */}
          <div className="relative px-2 sm:px-0">

            {/* Prev button */}
            <button
              onClick={prev}
              disabled={current === 0}
              suppressHydrationWarning
              aria-label="Sebelumnya"
              className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1D2A62] text-white shadow-lg
                         flex items-center justify-center
                         disabled:opacity-20 disabled:cursor-not-allowed
                         hover:bg-[#263580] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Track */}
            <div
              className="overflow-hidden touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  gap: `${gapPx}px`,
                  transform: `translateX(calc(-${current} * (100% / ${visibleCount} + ${gapPx / visibleCount}px)))`,
                }}
              >
                {aktivitasList.map((item) => (
                  <div
                    key={item.id}
                    className="shrink-0"
                    style={{
                      width: `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`,
                    }}
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
              suppressHydrationWarning
              aria-label="Selanjutnya"
              className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1D2A62] text-white shadow-lg
                         flex items-center justify-center
                         disabled:opacity-20 disabled:cursor-not-allowed
                         hover:bg-[#263580] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* ── Dot indicators ── */}
          {dots.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
              {dots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 h-2.5 bg-[#1D2A62]"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}

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

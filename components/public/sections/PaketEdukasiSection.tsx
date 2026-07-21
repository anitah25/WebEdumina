"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import type { PaketEdukasi } from "@/types/paketEdukasi";
import { formatHarga } from "@/types/paketEdukasi";
import PaketEdukasiModal from "../modals/PaketEdukasiModal";
import { apiRequest, getImageUrl } from "@/lib/api";

function EduIcon() {
  return (
    <svg
      className="w-5 h-5 text-[var(--color-accent-darkgreen)]"
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

function PaketCard({
  item,
  onClick
}: {
  item: PaketEdukasi;
  onClick: () => void;
}) {
  return (
    <div
      className="relative flex flex-col w-full h-[360px] sm:h-[342px] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-md bg-white border border-gray-100"
      onClick={onClick}
    >
      {/* Top Image Container */}
      <div className="relative w-full h-[210px] shrink-0">
        <Image
          src={getImageUrl(item.gambar)}
          alt={item.nama}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Floating White Card Content */}
      <div className="relative flex-1 bg-white p-3.5 sm:p-4 flex flex-col justify-between -mt-8 mx-2 sm:mx-3 rounded-xl shadow-lg border border-gray-100/80 z-10 mb-2">
        {/* Upper Content: Icon + Title & Description */}
        <div className="flex gap-2.5 sm:gap-3 items-start">
          <div className="w-9 h-9 rounded-full bg-[#ADD061]/40 flex items-center justify-center shrink-0 mt-0.5">
            <EduIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-semibold text-sm leading-snug line-clamp-1">
              {item.nama}
            </p>
            <p className="text-gray-500 text-xs leading-snug line-clamp-2 mt-0.5">
              {item.deskripsi}
            </p>
          </div>
        </div>

        {/* Lower Content: Price Badge & Details Button */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="bg-[var(--color-accent-darkgreen)] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
            {item.harga}
          </div>

          <div className="text-[11px] sm:text-xs font-semibold text-[var(--color-accent-darkgreen)] hover:bg-[var(--color-accent-lightgreen)]/15 px-2 py-1 rounded-md transition-colors border border-[#b6cf7b]">
            Selengkapnya &gt;
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaketEdukasiSection() {
  const [paketList, setPaketList] = useState<PaketEdukasi[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [current, setCurrent] = useState(0);

  // Responsive visible items count
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

  const total = paketList.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Clamp current index when screen size / maxIndex changes
  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [maxIndex, current]);

  // Modal state
  const [selectedItem, setSelectedItem] = useState<PaketEdukasi | null>(null);
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
    const fetchPakets = async () => {
      try {
        const response = await apiRequest("/api/paket-edukasi?limit=100");
        if (response.success && response.data) {
          const mapped = response.data.map((item: any) => ({
            id: String(item.id),
            nama: item.judul,
            deskripsi: item.deskripsi_singkat,
            harga: formatHarga(item.harga),
            gambar: item.gambar,
            durasi: item.durasi,
            fasilitas: item.fasilitas,
            linkWa: item.link_wa,
            deskripsiLengkap: item.deskripsi_lengkap,
          }));
          setPaketList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      }
    };
    fetchPakets();
  }, []);

  useEffect(() => {
    if (maxIndex <= 0) return;
    const timer = setInterval(() => {
      next();
    }, 4000); // auto-slide every 4 seconds
    return () => clearInterval(timer);
  }, [next, maxIndex]);

  const gapPx = 16;
  const dots = Array.from({ length: maxIndex + 1 });

  const handleCardClick = (item: PaketEdukasi) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="paket-edukasi" className="w-full bg-white py-12 lg:py-20 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto max-w-[1440px]">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-sm sm:text-base font-bold text-[var(--color-accent-darkgreen)] uppercase tracking-widest">
              Paket Edukasi
            </h2>
          </div>

          {/* ── Carousel wrapper ── */}
          <div className="relative px-2 sm:px-0">

            {/* Prev button */}
            <button
              onClick={prev}
              disabled={current === 0}
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
              className="overflow-hidden w-full touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex items-center transition-transform duration-500 ease-in-out"
                style={{
                  gap: `${gapPx}px`,
                  transform: `translateX(calc(-${current} * (100% / ${visibleCount} + ${gapPx / visibleCount}px)))`,
                }}
              >
                {paketList.map((item) => (
                  <div
                    key={item.id}
                    className="shrink-0 flex justify-center"
                    style={{
                      width: `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`,
                    }}
                  >
                    <PaketCard
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

      <PaketEdukasiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
}

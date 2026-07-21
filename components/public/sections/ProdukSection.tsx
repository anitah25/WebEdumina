"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { Produk } from "@/types/produk";
import ProdukModal from "../modals/ProdukModal";
import { apiRequest, getImageUrl } from "@/lib/api";

function ProdukCard({
  item,
  onClick
}: {
  item: Produk;
  onClick: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 w-full cursor-pointer group py-2"
      onClick={onClick}
    >
      {/* Circle */}
      <div
        className="relative flex items-center justify-center bg-white rounded-full overflow-hidden shrink-0 transition-transform group-hover:scale-105 shadow-md border border-gray-100"
        style={{
          width: "160px",
          height: "160px",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.12)",
        }}
      >
        <Image
          src={getImageUrl(item.gambar)}
          alt={item.nama}
          fill
          className="object-contain p-4"
          sizes="160px"
        />
      </div>

      {/* Name & Price */}
      <div className="text-center max-w-[180px] px-2">
        <p className="text-gray-900 text-center group-hover:text-[#1D2A62] transition-colors font-semibold text-sm line-clamp-2">
          {item.nama}
        </p>
        {item.harga && (
          <p className="text-xs font-bold text-[#437118] mt-1">
            {item.harga}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProdukSection() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
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
      } else if (w < 1280) {
        setVisibleCount(4);
      } else {
        setVisibleCount(5);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Duplicate product list if items are fewer than visibleCount to allow carousel loop
  const displayList = useMemo(() => {
    if (produkList.length === 0) return [];
    if (produkList.length >= visibleCount) return produkList;

    let list = [...produkList];
    while (list.length < visibleCount + 2) {
      list = [...list, ...produkList];
    }
    return list;
  }, [produkList, visibleCount]);

  const total = displayList.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Clamp current index when maxIndex changes
  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [maxIndex, current]);

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
    const fetchProducts = async () => {
      try {
        const response = await apiRequest("/api/produk?limit=100");
        if (response.success && response.data) {
          const mapped = response.data.map((item: any) => ({
            id: String(item.id),
            nama: item.nama_produk,
            gambar: item.gambar,
            deskripsi: item.deskripsi,
            harga: item.harga
              ? isNaN(Number(item.harga))
                ? item.harga
                : new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(Number(item.harga))
              : undefined,
            linkWa: item.link_wa,
          }));
          setProdukList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (maxIndex <= 0) return;
    const timer = setInterval(() => {
      next();
    }, 4000); // auto-slide every 4 seconds
    return () => clearInterval(timer);
  }, [next, maxIndex]);

  const GAP = 16;
  const dots = Array.from({ length: maxIndex + 1 });

  // Modal state
  const [selectedItem, setSelectedItem] = useState<Produk | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item: Produk) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="produk" className="w-full bg-white py-12 lg:py-20 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto max-w-[1440px]">

          {/* ── Header — center aligned ── */}
          <div className="mb-8 text-center">
            <span className="text-xs sm:text-sm font-bold text-[var(--color-accent-darkgreen)] uppercase tracking-widest">
              Produk Kami
            </span>
          </div>

          {/* ── Carousel wrapper ── */}
          <div className="relative px-2 sm:px-0">

            {/* Prev button */}
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Sebelumnya"
              className="absolute -left-2 sm:-left-5 top-[80px] -translate-y-1/2 z-10
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
                  gap: `${GAP}px`,
                  transform: `translateX(calc(-${current} * (100% / ${visibleCount} + ${GAP / visibleCount}px)))`,
                }}
              >
                {displayList.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="shrink-0 flex justify-center"
                    style={{
                      width: `calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
                    }}
                  >
                    <ProdukCard
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
              className="absolute -right-2 sm:-right-5 top-[80px] -translate-y-1/2 z-10
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

      <ProdukModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
}

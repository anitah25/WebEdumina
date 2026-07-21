"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { Produk } from "@/types/produk";
import ProdukModal from "../modals/ProdukModal";
import { apiRequest, getImageUrl } from "@/lib/api";

const VISIBLE = 5; // items visible at a time on desktop

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
          src={getImageUrl(item.gambar)}
          alt={item.nama}
          fill
          className="object-contain p-4"
          sizes="183px"
        />
      </div>

      {/* Name */}
      <p
        className="text-[#000] text-center group-hover:text-[#1D2A62] transition-colors font-medium"
        style={{ fontSize: "13px", fontFamily: "Poppins, sans-serif" }}
      >
        {item.nama}
      </p>
    </div>
  );
}

export default function ProdukSection() {
  const [produkList, setProdukList] = useState<Produk[]>([]);

  // If products are fewer than VISIBLE (5), multiply the list so the carousel is filled and can auto-slide
  const displayList = useMemo(() => {
    if (produkList.length === 0) return [];
    if (produkList.length >= VISIBLE) return produkList;

    let list = [...produkList];
    while (list.length < VISIBLE + 2) {
      list = [...list, ...produkList];
    }
    return list;
  }, [produkList]);

  const total = displayList.length;
  const maxIndex = Math.max(0, total - VISIBLE);
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? maxIndex : c - 1)), [maxIndex]);
  const next = useCallback(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);

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

  const GAP = 20;
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<Produk | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCardClick = (item: Produk) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
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
            <div className="overflow-hidden w-full">
              <div
                className="flex justify-between items-center transition-transform duration-500 ease-in-out w-full"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(calc(-${current} * (183px + ${GAP}px)))`,
                }}
              >
                {displayList.map((item, index) => (
                  <ProdukCard
                    key={`${item.id}-${index}`}
                    item={item}
                    onClick={() => handleCardClick(item)}
                  />
                ))}
              </div>
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

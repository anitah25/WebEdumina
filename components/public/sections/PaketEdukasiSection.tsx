"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { PaketEdukasi } from "@/types/paketEdukasi";
import { formatHarga } from "@/types/paketEdukasi";
import PaketEdukasiModal from "../modals/PaketEdukasiModal";
import { apiRequest, getImageUrl } from "@/lib/api";

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

function PaketCard({
  item,
  onClick
}: {
  item: PaketEdukasi;
  onClick: () => void;
}) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 w-full rounded-lg cursor-pointer hover:scale-[1.02] transition-transform"
      style={{
        height: "342px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="absolute top-0 left-0 w-full" style={{ height: "264px" }}>
        <Image
          src={getImageUrl(item.gambar)}
          alt={item.nama}
          fill
          className="object-cover"
          style={{ borderRadius: "8px" }}
          sizes="(max-width: 640px) 100vw, 25vw"
        />
      </div>

      {/* White overlay box */}
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
          className="absolute flex items-center justify-center rounded-full bg-[#ADD061]/40"
          style={{ top: "21px", left: "16px", width: "40px", height: "40px" }}
        >
          <EduIcon />
        </div>

        {/* Title */}
        <p
          className="absolute text-black font-semibold leading-snug line-clamp-1"
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
          className="absolute text-gray-500 leading-snug line-clamp-2"
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
          className="absolute flex items-center justify-center rounded-lg hover:bg-[var(--color-accent-lightgreen)]/10 transition-colors"
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

export default function PaketEdukasiSection() {
  const [paketList, setPaketList] = useState<PaketEdukasi[]>([]);
  const [selectedItem, setSelectedItem] = useState<PaketEdukasi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  
  const handleCardClick = (item: PaketEdukasi) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="paket-edukasi" className="w-full bg-white py-16 lg:py-20">
        <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px]">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center mb-10">
            <h2
              className="font-bold text-[var(--color-accent-darkgreen)]"
              style={{ fontSize: "20px", fontFamily: "Poppins, sans-serif" }}
            >
              Paket Edukasi
            </h2>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {paketList.map((item) => (
              <PaketCard
                key={item.id}
                item={item}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>

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

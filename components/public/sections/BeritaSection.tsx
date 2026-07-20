"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Berita } from "@/types/berita";
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
      <div
        className="relative flex-shrink-0"
        style={{ width: "144px", height: "138px" }}
      >
        <Image
          src={getImageUrl(item.gambar)}
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
          className="absolute top-0 left-0 right-3 font-semibold text-black leading-snug line-clamp-3"
          style={{ fontSize: "15px", fontFamily: "Poppins, sans-serif" }}
        >
          {item.judul}
        </p>

        {/* Date */}
        <p
          className="absolute left-0 text-gray-500"
          style={{
            top: "85px",
            fontSize: "13px",
            fontWeight: 300,
            fontFamily: "Poppins, sans-serif",
          }}
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

const PREVIEW_COUNT = 9;

export default function BeritaSection() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await apiRequest(`/api/berita?limit=${PREVIEW_COUNT}`);
        if (response.success && response.data) {
          const mapped = response.data.map((item: any) => ({
            id: String(item.id),
            judul: item.judul,
            tanggal: formatDate(item.tanggal_publish),
            gambar: item.gambar,
            slug: item.slug,
            isi_konten: item.isi_konten,
          }));
          setBeritaList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch news section:", err);
      }
    };
    fetchBerita();
  }, []);

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
          {beritaList.map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>

        {/* ── Lihat Lainnya button ── */}
        <div className="flex justify-center mt-10">
          <Link
            href="/berita"
            className="inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 bg-[var(--color-accent-darkgreen)] hover:bg-[var(--color-accent-darkgreen)]/85 text-white px-6 py-3 text-sm cursor-pointer"
          >
            Lihat Lainnya
          </Link>
        </div>
      </div>
    </section>
  );
}

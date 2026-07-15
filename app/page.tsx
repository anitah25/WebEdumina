"use client";

import Image from "next/image";
import Navbar from "../components/public/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-bg-light">
      <Navbar />

      <main className="flex-1 w-full">
        <section id="beranda" className="min-h-[60vh] flex items-center justify-center py-20">
          <h1 className="text-4xl font-bold">Beranda (Hero)</h1>
        </section>

        <section id="tentang-kami" className="min-h-[60vh] flex items-center justify-center py-20 bg-bg-cream">
          <h2 className="text-3xl font-semibold">Tentang Kami</h2>
        </section>

        <section id="aktivitas" className="min-h-[60vh] flex items-center justify-center py-20">
          <h2 className="text-3xl font-semibold">Aktivitas</h2>
        </section>

        <section id="produk" className="min-h-[60vh] flex items-center justify-center py-20 bg-gray-50">
          <h2 className="text-3xl font-semibold">Produk</h2>
        </section>

        <section id="paket-edukasi" className="min-h-[60vh] flex items-center justify-center py-20">
          <h2 className="text-3xl font-semibold">Paket Edukasi</h2>
        </section>

        <section id="berita" className="min-h-[60vh] flex items-center justify-center py-20 bg-gray-50">
          <h2 className="text-3xl font-semibold">Berita</h2>
        </section>

        <section id="kontak" className="min-h-[40vh] flex items-center justify-center py-20">
          <h2 className="text-3xl font-semibold">Kontak</h2>
        </section>
      </main>
    </div>
  );
}

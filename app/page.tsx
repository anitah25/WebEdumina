"use client";

import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/sections/HeroSection";
import TentangKamiSection from "@/components/public/sections/TentangKamiSection";
import AktivitasSection from "@/components/public/sections/AktivitasSection";
import ProdukSection from "@/components/public/sections/ProdukSection";
import PaketEdukasiSection from "@/components/public/sections/PaketEdukasiSection";
import BeritaSection from "@/components/public/sections/BeritaSection";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white pt-[72px]">
      <Navbar />

      <main className="flex-1 w-full">
        <HeroSection />

        <TentangKamiSection />

        <AktivitasSection />

        <ProdukSection />

        <PaketEdukasiSection />

        <BeritaSection />
      </main>

      <Footer />
    </div>
  );
}

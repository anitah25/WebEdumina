"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const navItems = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang-kami", label: "Tentang Kami" },
  { id: "aktivitas", label: "Aktivitas" },
  { id: "produk", label: "Produk" },
  { id: "paket-edukasi", label: "Paket Edukasi" },
  { id: "berita", label: "Berita" },
  { id: "kontak", label: "Kontak" },
];

export default function Navbar() {
  return (
    <header className="w-full bg-[var(--color-primary-dark)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-3 lg:px-8 flex items-center gap-10">
        <div className="flex shrink-0 items-center gap-4">
          <Link href="#beranda" className="flex items-center gap-8 whitespace-nowrap" aria-label="Beranda">
            <div className="leading-tight select-none whitespace-nowrap">
              <span className="text-xl font-bold text-[var(--color-accent-darkgreen)]">Edumina</span>{" "}
              <span className="text-xl font-bold text-white">Kampung Siroto</span>
            </div>
            <Image src="/logoNavbar.svg" alt="logo" width={150} height={60} priority />
          </Link>
        </div>

        <nav className="flex-1 pl-8">
          <ul className="flex gap-5 justify-center items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="whitespace-nowrap text-[var(--color-primary-light)] hover:text-white focus:text-white focus:underline focus:outline-none transition-colors duration-150"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center">
          <Link
            href="#login"
            className="ml-4 inline-block rounded-full bg-[var(--button-secondary)] px-5 py-2 text-base font-medium text-white shadow-[0_6px_12px_rgba(17,24,39,0.18)] hover:bg-[var(--button-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--button-primary)]"
            aria-label="Login"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

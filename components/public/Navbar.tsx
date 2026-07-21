"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang-kami", label: "Tentang Kami" },
  { id: "aktivitas", label: "Aktivitas" },
  { id: "produk", label: "Produk" },
  { id: "paket-edukasi", label: "Paket Edukasi" },
  { id: "berita", label: "Berita" },
  { id: "kontak", label: "Kontak" },
];

const NAVBAR_H = 72; // px — tinggi navbar (harus sesuai pt-[72px] di page.tsx)
const SCROLL_LOCK_MS = 900; // ms — kunci observer setelah klik nav

// ── Scroll helper ─────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_H;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // ── Login state detection ─────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    checkLoginState();
    window.addEventListener("storage", checkLoginState);
    return () => window.removeEventListener("storage", checkLoginState);
  }, []);

  // ── Scrolled shadow ───────────────────────────────────────────
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section (via IntersectionObserver) ─────────────────
  const [activeId, setActiveId] = useState("beranda");
  // Referensi scroll-lock: saat klik nav, observer tidak boleh override dulu
  const scrollLockRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Abaikan update dari observer saat sedang dalam scroll-lock
        if (scrollLockRef.current) return;
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      // rootMargin: potong 72px atas (navbar) + potong 50% bawah
      // sehingga section aktif = yang ada di 50% atas viewport
      { rootMargin: `-${NAVBAR_H}px 0px -50% 0px`, threshold: 0 },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // ── Click handler ─────────────────────────────────────────────
  function handleNavClick(e: React.MouseEvent, id: string) {
    if (!isHome) return;
    e.preventDefault();

    // 1. Langsung set active ke section yang diklik
    setActiveId(id);

    // 2. Kunci observer agar tidak override sebelum scroll selesai
    scrollLockRef.current = true;
    clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, SCROLL_LOCK_MS);

    // 3. Smooth scroll
    scrollToSection(id);
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full text-white transition-shadow duration-300 h-[72px] flex items-center"
      style={{
        backgroundColor: "var(--color-primary-dark)",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.35)" : "none",
      }}
    >
      <div className="w-full px-6 py-3 lg:px-12 flex items-center gap-8 max-w-[1440px] mx-auto">
        {/* ── Logo ── */}
        <div className="flex shrink-0 items-center">
          <Link
            href={isHome ? "#beranda" : "/#beranda"}
            onClick={(e) => handleNavClick(e, "beranda")}
            className="flex items-center gap-4 whitespace-nowrap"
            aria-label="Beranda"
          >
            <h2 className="text-2xl font-black text-(--color-accent-darkgreen) leading-4">
              Edumina
              <br />
              <span className="text-lg text-(--color-primary-light)">
                Kampung Siroto
              </span>
            </h2>
            <div className="flex items-center gap-3 rounded-full bg-white px-6 py-2">
              <Image
                src="/logo-edumina.svg"
                alt="Logo Edumina"
                width={120}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
              <Image
                src="/logo-minalancar.svg"
                alt="Logo Mina Lancar"
                width={120}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* ── Nav links ── */}
        <nav className="flex-1">
          <ul className="flex gap-5 justify-end items-center">
            {navItems.map((item) => {
              const isActive = isHome && activeId === item.id;
              return (
                <li key={item.id} className="relative py-1">
                  <Link
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="whitespace-nowrap text-sm font-medium transition-colors duration-150 focus:outline-none"
                    style={{
                      color: isActive ? "#fff" : "var(--color-primary-light)",
                    }}
                  >
                    {item.label}
                  </Link>

                  {/* Active underline indicator */}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? "100%" : "0%",
                      backgroundColor: "var(--color-accent-lightgreen)",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Login / Dashboard button ── */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <Link
              href="/admin"
              className="ml-4 inline-block rounded-full bg-[#ADD061] px-5 py-2 text-sm font-bold text-[#1D2A62] shadow-[0_6px_12px_rgba(17,24,39,0.18)] hover:bg-[#437118] hover:text-white transition-colors focus-visible:outline-none"
              aria-label="Dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="ml-4 inline-block rounded-full bg-[var(--button-secondary)] px-5 py-2 text-sm font-medium text-white shadow-[0_6px_12px_rgba(17,24,39,0.18)] hover:bg-[var(--button-primary)] transition-colors focus-visible:outline-none"
              aria-label="Login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

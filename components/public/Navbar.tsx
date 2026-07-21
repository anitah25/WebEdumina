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

const NAVBAR_H = 72; // px — tinggi navbar
const SCROLL_LOCK_MS = 900; // ms — kunci observer setelah klik nav

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

  // ── Mobile menu state ─────────────────────────────────────────
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Active section (via IntersectionObserver) ─────────────────
  const [activeId, setActiveId] = useState("beranda");
  const scrollLockRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: `-${NAVBAR_H}px 0px -50% 0px`, threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // ── Click handler ─────────────────────────────────────────────
  function handleNavClick(e: React.MouseEvent, id: string) {
    setMobileMenuOpen(false);
    if (!isHome) return;
    e.preventDefault();

    setActiveId(id);

    scrollLockRef.current = true;
    clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, SCROLL_LOCK_MS);

    scrollToSection(id);
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full text-white transition-all duration-300 h-[72px] flex items-center bg-[#1D2A62]"
      style={{
        boxShadow: scrolled || mobileMenuOpen ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4 max-w-[1440px] mx-auto min-w-0">
        {/* ── Logo & Title ── */}
        <div className="flex items-center gap-2 sm:gap-4 shrink min-w-0">
          <Link
            href={isHome ? "#beranda" : "/#beranda"}
            onClick={(e) => handleNavClick(e, "beranda")}
            className="flex items-center gap-2 sm:gap-4 whitespace-nowrap min-w-0"
            aria-label="Beranda"
          >
            {/* Title Text */}
            <div className="leading-tight shrink-0">
              <span className="text-base sm:text-2xl font-black text-[#ADD061] block">
                Edumina
              </span>
              <span className="text-[11px] sm:text-sm text-[#87ADEC] font-medium block -mt-0.5 sm:mt-0">
                Kampung Siroto
              </span>
            </div>

            {/* White Pill Box with Logos (Responsive) */}
            <div className="flex items-center gap-1.5 sm:gap-3 rounded-full bg-white px-2.5 py-1 sm:px-4 sm:py-1.5 shrink-0">
              <Image
                src="/logo-edumina.svg"
                alt="Logo Edumina"
                width={85}
                height={35}
                className="h-5 sm:h-8 w-auto object-contain"
                priority
              />
              <Image
                src="/logo-minalancar.svg"
                alt="Logo Mina Lancar"
                width={85}
                height={35}
                className="h-5 sm:h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* ── Desktop Nav links & Button (lg and up) ── */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex-1">
            <ul className="flex gap-4 xl:gap-6 justify-end items-center">
              {navItems.map((item) => {
                const isActive = isHome && activeId === item.id;
                return (
                  <li key={item.id} className="relative py-1">
                    <Link
                      href={isHome ? `#${item.id}` : `/#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className="whitespace-nowrap text-sm font-medium transition-colors duration-150 focus:outline-none"
                      style={{
                        color: isActive ? "#ffffff" : "#87ADEC",
                      }}
                    >
                      {item.label}
                    </Link>

                    {/* Active underline indicator */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#ADD061]"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Login / Dashboard button (Desktop) ── */}
          <div className="flex items-center shrink-0">
            {isLoggedIn ? (
              <Link
                href="/admin"
                className="rounded-full bg-[#ADD061] px-5 py-2 text-sm font-bold text-[#1D2A62] shadow-md hover:bg-[#437118] hover:text-white transition-colors focus-visible:outline-none whitespace-nowrap"
                aria-label="Dashboard"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-[#87ADEC] px-5 py-2 text-sm font-semibold text-[#1D2A62] shadow-md hover:bg-[#ADD061] transition-colors focus-visible:outline-none whitespace-nowrap"
                aria-label="Login"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* ── Mobile Hamburger Toggle Button (< lg) ── */}
        <div className="flex items-center lg:hidden shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu Drawer (< lg) — SOLID BACKGROUND (NO BLUR) ── */}
      {mobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 w-full bg-[#1D2A62] shadow-2xl border-t border-white/10 px-5 py-6 flex flex-col gap-4 lg:hidden z-50 text-white">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = isHome && activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={isHome ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-white/10 text-white font-bold border-l-4 border-[#ADD061]"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#ADD061]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/10">
            {isLoggedIn ? (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block rounded-full bg-[#ADD061] py-3 px-6 text-base font-bold text-[#1D2A62] shadow-md hover:bg-[#437118] hover:text-white transition-colors"
              >
                Dashboard Admin
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block rounded-full bg-[#87ADEC] py-3 px-6 text-base font-bold text-[#1D2A62] shadow-md hover:bg-[#ADD061] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

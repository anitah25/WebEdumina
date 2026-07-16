"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Data ──────────────────────────────────────────────────────
const GMAPS_URL =
  "https://maps.google.com/?q=Siroto,+Gunungpati,+Kec.+Gn.+Pati,+Kota+Semarang,+Jawa+Tengah+50225";

const menuCol1 = [
  { label: "Beranda", id: "beranda" },
  { label: "Tentang Kami", id: "tentang-kami" },
  { label: "Aktivitas", id: "aktivitas" },
];
const menuCol2 = [
  { label: "Produk", id: "produk" },
  { label: "Paket Edukasi", id: "paket-edukasi" },
  { label: "Berita Terbaru", id: "berita" },
];

const contacts = [
  {
    id: "instagram",
    label: "@studycenterEdumina",
    href: "https://instagram.com/studycenterEdumina",
    // Instagram: gradient icon (pink → purple → orange)
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FCAF45" />
            <stop offset="35%" stopColor="#F56040" />
            <stop offset="60%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-grad)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
    ),
    bg: "#fce4ec",
    color: "#1D2A62",
  },
  {
    id: "whatsapp",
    label: "+6281-6156-3922-5",
    href: "https://wa.me/628161563922",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="#25D366" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    bg: "#e8f5e9",
    color: "#1D2A62",
  },
  {
    id: "telegram",
    label: "@studycenterEdumina",
    href: "https://t.me/studycenterEdumina",
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="#0088CC" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    bg: "#e3f2fd",
    color: "#1D2A62",
  },
  {
    id: "tiktok",
    label: "@studycenterEdumina",
    href: "https://tiktok.com/@studycenterEdumina",
    // TikTok: classic black icon with teal shadow effect
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        {/* Teal shadow */}
        <path
          fill="#69C9D0"
          d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
          opacity="0.4"
        />
        {/* Main black icon */}
        <path
          fill="#010101"
          d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
        />
      </svg>
    ),
    bg: "#f5f5f5",
    color: "#1D2A62",
  },
];

// ── Footer Component ──────────────────────────────────────────
export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const anchor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer
      id="kontak"
      className="w-full"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
    >
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px] py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* ── Col 1: Mitra + Lokasi ── */}
          <div className="flex flex-col gap-8">
            {/* Mitra Kami */}
            <div>
              <p
                className="text-sm font-bold text-[#F5F3DC] uppercase tracking-widest mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Mitra Kami
              </p>
              <div className="bg-white rounded-2xl px-5 py-3 flex items-center justify-center">
                <Image
                  src="/logoMitra.png"
                  alt="Logo Mitra Study Center Edumina"
                  width={280}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Lokasi Kami */}
            <div>
              <p
                className="text-sm font-bold text-[#F5F3DC] uppercase tracking-widest mb-3"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Lokasi Kami
              </p>
              <a
                href={GMAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-white/80 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {/* Pin icon */}
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 group-hover:bg-[#AFD06E]/20 transition-colors duration-200">
                  <svg
                    className="w-4 h-4 text-[#AFD06E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed group-hover:underline underline-offset-2">
                  Siroto, Gunungpati, Semarang,
                  <br />
                  Gunungpati, Kec. Gn. Pati,
                  <br />
                  Kota Semarang, Jawa Tengah 50225
                </span>
              </a>
            </div>
          </div>

          {/* ── Col 2: Menu ── */}
          <div>
            <p
              className="text-sm font-bold text-[#F5F3DC] uppercase tracking-widest mb-5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Menu
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[...menuCol1, ...menuCol2].map((item) => (
                <Link
                  key={item.id}
                  href={anchor(item.id)}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 3: Hubungi Kami ── */}
          <div>
            <p
              className="text-sm font-bold text-[#F5F3DC] uppercase tracking-widest mb-5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Hubungi Kami
            </p>
            <div className="flex flex-col gap-3">
              {contacts.map((c) => (
                <a
                  key={c.id}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    backgroundColor: c.bg,
                    color: c.color,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {/* Icon */}
                  <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                    {c.icon}
                  </span>
                  {/* Label */}
                  <span className="text-sm font-medium">{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-white/40 text-xs"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            © {new Date().getFullYear()} Study Center Edumina Kampung Siroto.
            All rights reserved.
          </p>
          <p
            className="text-white/30 text-xs"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Developed by KKN UNNES GIAT 16 Kampung Siroto 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

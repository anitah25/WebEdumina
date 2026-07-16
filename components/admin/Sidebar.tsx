"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ActivityIcon,
  DashboardIcon,
  LogoutIcon,
  NewsIcon,
  PackageIcon,
  ProductIcon,
  UserIcon,
} from "@/components/admin/Icons";

const navigationItems = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/produk", label: "Produk", icon: ProductIcon },
  { href: "/admin/aktivitas", label: "Aktivitas", icon: ActivityIcon },
  { href: "/admin/paket", label: "Paket Edukasi", icon: PackageIcon },
  { href: "/admin/berita", label: "Berita", icon: NewsIcon },
  { href: "/admin/pengguna", label: "Pengguna", icon: UserIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const handleLogout = () => {
    // Implementasikan logika logout di sini
    console.log("Logout clicked");
  };

  return (
    <aside className="w-60 bg-(--bg-dark) text-white h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-2 justify-between p-4 mb-6 pb-2 border-b border-(--color-primary-light)/20">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12.75C0 5.70837 5.70837 0 12.75 0H18.75C25.7916 0 31.5 5.70837 31.5 12.75V18.75C31.5 25.7916 25.7916 31.5 18.75 31.5H12.75C5.70837 31.5 0 25.7916 0 18.75V12.75Z"
              fill="#437118"
            />
            <path
              d="M11.396 15.75C12.1402 13.0108 15.3068 11 18.1252 11C20.9435 11 22.9227 13.0108 23.6668 15.75C22.9227 18.4971 20.9435 20.5 18.1252 20.5C15.3068 20.5 12.1402 18.4971 11.396 15.75Z"
              stroke="white"
              strokeWidth="1.58333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 15.75V16.1458"
              stroke="white"
              strokeWidth="1.58333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.9168 20.4446C17.887 19.0962 17.3291 17.4466 17.3291 15.75C17.3291 14.0534 17.887 12.4038 18.9168 11.0554"
              stroke="white"
              strokeWidth="1.58333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.7916 14.6971C11.7916 12.5833 10.6674 10.9762 8.41119 10.6042C7.61953 11.7917 7.61953 14.5625 8.59328 15.75C7.61161 16.9375 7.61161 19.7083 8.41119 20.8958C10.6674 20.5237 11.7916 18.9167 11.7916 16.8029"
              stroke="white"
              strokeWidth="1.58333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.531 11.9975C14.3252 10.905 13.5097 9.60668 12.5835 8.62501H17.1752C17.5508 8.62362 17.9147 8.75583 18.2019 8.99802C18.489 9.24021 18.6807 9.5766 18.7427 9.94709L18.9247 11.0554"
              stroke="white"
              strokeWidth="1.58333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.9247 20.4446L18.7427 21.5529C18.6807 21.9234 18.489 22.2598 18.2019 22.502C17.9147 22.7442 17.5508 22.8764 17.1752 22.875H13.771C14.538 22.0054 14.9579 20.8837 14.9506 19.7242"
              stroke="white"
              strokeWidth="1.58333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2 className="text-2xl font-black text-(--color-accent-darkgreen) leading-4">
            Edumina
            <br />
            <span className="text-lg text-(--color-primary-light)">
              Kampung Siroto
            </span>
          </h2>
        </div>
        <nav className="space-y-2 text-sm mx-4">
          <span className="font-bold text-(--color-primary-light)/60 px-3 block">
            Menu Utama
          </span>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 font-medium rounded-md px-3 py-2 transition-all duration-200 ease-in-out ${
                  isActive
                    ? "bg-(--color-accent-lightgreen)/13 text-(--color-accent-lightgreen) border-l-3 border-(--color-accent-lightgreen)"
                    : "hover:bg-(--color-accent-lightgreen)/13 text-white"
                }`}
              >
                <IconComponent className="w-6 h-6 shrink-0" />
                <span className="text-white">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* BAGIAN BAWAH: Profil User & Logout */}
      <div className="p-4 border-t-2 border-(--color-primary-light)/20 space-y-2">
        {/* Card Info User */}
        <Link
          href="/admin/profil"
          className="flex items-center gap-3 bg-(--color-primary-light)/10 p-3 rounded-xl border border-slate-800 hover:bg-(--color-primary-light)/20 transition active:scale-98 block group"
        >
          {/* Avatar Bulat Huruf A */}
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center font-bold text-white text-lg shrink-0 group-hover:scale-105 transition-transform duration-200">
            A
          </div>
          {/* Detail Teks */}
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-white truncate text-sm">
              Administrator
            </span>
            <span className="text-xs text-slate-400 truncate">Super Admin</span>
          </div>
        </Link>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-(--button-danger) hover:text-(--button-danger)/50 hover:bg-red-500/10 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          {/* SVG Ikon Logout */}
          <LogoutIcon className="w-5 h-5 text-(--button-danger)" />
          Logout
        </button>
      </div>
    </aside>
  );
}

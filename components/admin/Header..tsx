"use client";

import { usePathname } from "next/navigation";

const pageLabels: Record<string, string> = {
  aktivitas: "Aktivitas",
  produk: "Produk",
  "paket-edukasi": "Paket Edukasi",
  berita: "Berita",
  users: "Users",
  settings: "Settings",
};

function getCurrentPageLabel(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length < 2 || segments[0] !== "admin") {
    return "Dashboard";
  }

  return pageLabels[segments[1]] ?? segments[1].replace(/-/g, " ");
}

export default function Header() {
  const pathname = usePathname();
  const currentPageLabel = getCurrentPageLabel(pathname);
  const isDashboard = currentPageLabel === "Dashboard";

  return (
    <header className="h-17 border-b border-slate-200 bg-white px-6 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <h1
            className={`truncate text-[15px] font-semibold tracking-tight ${
              isDashboard ? "text-slate-900" : "text-slate-400"
            }`}
          >
            Dashboard
          </h1>

          {!isDashboard ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 flex-none text-slate-300"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 5.23a.75.75 0 0 1 1.06.02l4.54 4.25a.75.75 0 0 1 0 1.08l-4.54 4.25a.75.75 0 1 1-1.04-1.08L10.807 10 7.23 6.29a.75.75 0 0 1-.02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>

              <h2 className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
                {currentPageLabel}
              </h2>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-3 text-left">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
            A
          </div>

          <div className="leading-tight">
            <p className="text-[15px] font-semibold text-slate-900">Admin</p>
            <p className="text-sm text-slate-500">Super Admin</p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-slate-400"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.193l3.71-3.963a.75.75 0 1 1 1.08 1.04l-4.25 4.54a.75.75 0 0 1-1.08 0l-4.25-4.54a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

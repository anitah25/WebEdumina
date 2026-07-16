"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative w-full bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="w-full px-6 lg:px-12 mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 z-10">
            {/* Badge */}
            <div className="inline-block bg-[var(--color-primary-light)]/20 text-[var(--color-primary-dark)] font-bold px-4 py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-wider">
              Pusat Pembelajaran Budidaya Lele
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight tracking-tight">
              Belajar, Praktik, Berdaya <br />
              <span className="text-[var(--color-accent-darkgreen)]">Budidaya Lele</span> <br />
              Bersama Kami
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              Belajar, praktik, berinovasi dalam budidaya lele secara modern bersama para ahli berpengalaman.
            </p>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-6 relative w-full h-[280px] sm:h-[380px] lg:h-[480px] flex justify-end">
            <Image
              src="/gambarHerosection.svg"
              alt="Belajar Praktik Berdaya Budidaya Lele"
              fill
              className="object-contain object-right-bottom"
              priority
            />
          </div>

        </div>

        {/* Stats Bar */}
        <div className="mt-12 lg:mt-16 bg-white rounded-2xl border border-gray-100 shadow-[0_15px_40px_rgba(29,42,98,0.08)] px-8 py-6 md:py-8 z-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">

            {/* Stat 1: Kolam Budidaya */}
            <div className="flex items-center justify-center gap-5 pb-6 md:pb-0 md:px-6">
              {/* Fish Tail Splash Icon */}
              <svg className="w-14 h-14 text-sky-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 17c0-6 4-9 6-12C15 6 13 8 12 11c-1-3-3-5-6-6 2 3 6 6 6 12z" fill="currentColor" fillOpacity="0.15" strokeWidth="2" />
                <path d="M3 20c4-2 6-2 9-1s5 1 9-1" strokeWidth="2.5" />
                <path d="M5 22c3.5-1 5.5-1 8 0s4.5 1 8-1" strokeWidth="1.5" />
              </svg>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-[var(--color-primary-dark)]">25 +</div>
                <div className="text-sm text-gray-500 font-semibold tracking-wide mt-0.5">Kolam Budidaya</div>
              </div>
            </div>

            {/* Stat 2: Pengalaman */}
            <div className="flex items-center justify-center gap-5 pt-6 pb-6 md:py-0 md:px-6">
              {/* Medal/Award Icon */}
              <svg className="w-12 h-12 text-sky-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2h8v4H8z" fill="currentColor" fillOpacity="0.15" />
                <path d="M9 6v6m6-6v6M12 6v6" />
                <circle cx="12" cy="15" r="5" fill="currentColor" fillOpacity="0.15" strokeWidth="2.5" />
                <polygon points="12,12.5 12.8,14.5 14.8,14.7 13.3,16 13.7,18 12,17 10.3,18 10.7,16 9.2,14.7 11.2,14.5" fill="currentColor" stroke="none" />
              </svg>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-[var(--color-primary-dark)]">
                  16 <span className="text-lg lg:text-xl font-bold">tahun</span>
                </div>
                <div className="text-sm text-gray-500 font-semibold tracking-wide mt-0.5">Pengalaman</div>
              </div>
            </div>

            {/* Stat 3: Produksi Lele */}
            <div className="flex items-center justify-center gap-5 pt-6 md:pt-0 md:px-6">
              {/* Catfish Icon */}
              <svg className="w-14 h-14 text-sky-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c3-3 8-4 12-2 1.5.7 3 2 4 3.5-1 1.5-2.5 2.8-4 3.5-4 2-9 1-12-2z" fill="currentColor" fillOpacity="0.15" strokeWidth="2" />
                <path d="M18 13.5l4-3.5v7l-4-3.5z" fill="currentColor" strokeWidth="2" />
                <path d="M2 12h-2m2 1h-2" strokeWidth="1.5" />
                <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
              </svg>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-[var(--color-primary-dark)]">
                  120 + <span className="text-lg lg:text-xl font-bold">ton</span>
                </div>
                <div className="text-sm text-gray-500 font-semibold tracking-wide mt-0.5">Produksi Lele</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

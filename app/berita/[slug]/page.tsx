import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { beritaList } from "@/data/content/berita";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = beritaList.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pt-[72px]">
      <Navbar />

      {/* Hero Banner */}
      <div
        className="relative w-full flex flex-col items-center justify-center text-center py-16 px-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1D2A62 0%, #263580 60%, #1a4a7a 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #AFD06E, transparent)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #87ADEC, transparent)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <nav
          className="relative z-10 flex items-center gap-2 text-xs text-white/60 mb-4"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/berita" className="hover:text-white transition-colors">
            Berita
          </Link>
          <span>/</span>
          <span className="text-white/80">Detail</span>
        </nav>
      </div>

      {/* Article Content */}
      <article className="w-full px-6 lg:px-12 mx-auto max-w-[1000px] py-10">
        {/* Post Header */}
        <div className="mb-8">
          {post.kategori && (
            <span
              className="inline-block px-4 py-1 rounded-full text-white text-sm font-semibold mb-4"
              style={{ backgroundColor: "var(--color-primary-dark)" }}
            >
              {post.kategori}
            </span>
          )}
          <h1
            className="text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {post.judul}
          </h1>
          <p
            className="text-gray-500"
            style={{ fontSize: "14px", fontWeight: 300, fontFamily: "Poppins, sans-serif" }}
          >
            {post.tanggal}
          </p>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-10 relative shadow-md">
          <Image
            src={post.gambar}
            alt={post.judul}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            priority
          />
        </div>

        {/* Post Body */}
        <div
          className="text-gray-700 leading-relaxed"
          style={{ fontSize: "17px", fontFamily: "Poppins, sans-serif" }}
        >
          {post.isi_konten ? (
            <div className="whitespace-pre-line">
              {post.isi_konten.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">
              Artikel ini akan segera diperbarui dengan konten lengkap.
            </p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-12">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#1D2A62" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali ke Berita
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}

// Generate static params for all posts at build time
export function generateStaticParams() {
  return beritaList.map((post) => ({
    slug: post.slug,
  }));
}

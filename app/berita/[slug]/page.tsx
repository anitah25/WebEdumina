import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { getImageUrl } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  let post = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/berita/${slug}`, {
      next: { revalidate: 60 }, // Cache on server for 1 minute
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        post = json.data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch article detail:", err);
  }

  if (!post) {
    notFound();
  }

  const formattedPost = {
    ...post,
    tanggal: formatDate(post.tanggal_publish),
    gambar: getImageUrl(post.gambar),
  };

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
          <span
            className="inline-block px-4 py-1 rounded-full text-white text-sm font-semibold mb-4 bg-[#1D2A62]"
          >
            Berita Terbaru
          </span>
          <h1
            className="text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {formattedPost.judul}
          </h1>
          <p
            className="text-gray-500"
            style={{ fontSize: "14px", fontWeight: 300, fontFamily: "Poppins, sans-serif" }}
          >
            {formattedPost.tanggal}
          </p>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-10 relative shadow-md">
          <Image
            src={formattedPost.gambar}
            alt={formattedPost.judul}
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
          {formattedPost.isi_konten ? (
            <div className="whitespace-pre-line">
              {formattedPost.isi_konten.split("\n\n").map((paragraph: string, index: number) => (
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
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
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
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/berita?limit=100`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map((post: any) => ({
          slug: post.slug,
        }));
      }
    }
  } catch (err) {
    console.error("Failed to generate static params:", err);
  }
  return [];
}

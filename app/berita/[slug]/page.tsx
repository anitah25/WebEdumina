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

      {/* Ringkas Compact Top Banner */}
      <div
        className="relative w-full flex flex-col items-center justify-center text-center py-6 sm:py-8 px-4 sm:px-6 overflow-hidden bg-[#1D2A62]"
        style={{
          background: "linear-gradient(135deg, #1D2A62 0%, #263580 60%, #1a4a7a 100%)",
        }}
      >
        {/* Clean Breadcrumb Nav */}
        <nav
          className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/80"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <span className="text-white/40">/</span>
          <Link href="/berita" className="hover:text-white transition-colors">
            Berita
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">Detail Artikel</span>
        </nav>
      </div>

      {/* Main Article Content Container */}
      <article className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[860px] py-6 sm:py-10">
        {/* Article Metadata & Title */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3 bg-[#1D2A62]">
            Berita Terbaru
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug sm:leading-tight mb-2 sm:mb-3">
            {formattedPost.judul}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Dipublikasikan pada {formattedPost.tanggal}
          </p>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-gray-100 mb-6 sm:mb-8 relative shadow-sm border border-gray-100">
          <Image
            src={formattedPost.gambar}
            alt={formattedPost.judul}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 860px"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-4 sm:space-y-5">
          {formattedPost.isi_konten ? (
            <div className="whitespace-pre-line">
              {formattedPost.isi_konten.split("\n\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm">
              Artikel ini akan segera diperbarui dengan konten lengkap.
            </p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100">
          <Link
            href="/berita"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-medium px-5 py-2.5 rounded-xl bg-[#1D2A62] hover:bg-[#263580] transition-all text-sm shadow-sm active:scale-98"
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

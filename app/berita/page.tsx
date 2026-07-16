import type { Metadata } from "next";
import BeritaPageContent from "@/components/public/BeritaPageContent";

export const metadata: Metadata = {
  title: "Berita Terbaru | Study Center Edumina Kampung Siroto",
  description:
    "Ikuti perkembangan terkini seputar budidaya lele, teknologi akuakultur, dan kisah sukses dari Study Center Edumina Kampung Siroto.",
};

export default function BeritaPage() {
  return <BeritaPageContent />;
}

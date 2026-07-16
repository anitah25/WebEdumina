import type { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header.";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="h-screen bg-[#D0E6FD] flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

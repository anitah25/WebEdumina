"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header.";
import { apiRequest } from "@/lib/api";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const verifySession = async () => {
      if (
        localStorage.getItem("isLoggedIn") !== "true" ||
        !localStorage.getItem("token")
      ) {
        router.push("/login");
        return;
      }
      try {
        const response = await apiRequest("/api/auth/me");
        if (response.success && response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("userRole", response.data.role);
          setIsAuthorized(true);
        } else {
          router.push("/login");
        }
      } catch (err) {
        // apiRequest already handles 401 redirection, fallback for network errors
        router.push("/login");
      }
    };

    verifySession();
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="h-screen w-full bg-[#D0E6FD] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1D2A62]"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#D0E6FD] flex overflow-hidden">
      {/* Responsive Sidebar Component */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

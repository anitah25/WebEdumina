"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header.";
import { apiRequest } from "@/lib/api";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

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
        // apiRequest already handles 401 redirection, this is a fallback for other network errors
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
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

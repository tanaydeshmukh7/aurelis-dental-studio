"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { StaffRole } from "@/lib/roles";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    fullName: string;
    email: string;
    role: StaffRole;
    avatar?: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // If path is /admin/login, bypass the admin frame completely
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push(`/admin/login?from=${pathname}`);
        }
      } catch {
        router.push(`/admin/login?from=${pathname}`);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#86A58C] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-xs uppercase tracking-widest text-[#82786E]">
          Loading Aurelis Studio Workspace...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#28231F] flex">
      {/* Desktop Persistent / Collapsible Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          userRole={user?.role}
          userName={user?.fullName}
          userEmail={user?.email}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 w-72 bg-[#242522] h-full shadow-2xl">
            <AdminSidebar
              collapsed={false}
              onToggleCollapse={() => setMobileOpen(false)}
              userRole={user?.role}
              userName={user?.fullName}
              userEmail={user?.email}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <AdminHeader
          collapsed={collapsed}
          onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)}
          userRole={user?.role}
          userName={user?.fullName}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

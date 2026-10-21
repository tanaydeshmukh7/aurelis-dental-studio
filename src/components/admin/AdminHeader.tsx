"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Plus,
  Calendar,
  UserPlus,
  Receipt,
  FilePlus,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { StaffRole } from "@/lib/roles";

interface AdminHeaderProps {
  collapsed: boolean;
  onToggleMobileSidebar: () => void;
  userRole?: StaffRole;
  userName?: string;
  onLogout: () => void;
}

export default function AdminHeader({
  collapsed,
  onToggleMobileSidebar,
  userRole = "SUPER_ADMIN",
  userName = "Staff Member",
  onLogout,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Generate breadcrumbs from pathname
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1).replace("-", " "));

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/admin/notifications");
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications || []);
          setUnreadNotifications(data.unreadCount || 0);
        }
      } catch (err) {
        // quiet error
      }
    }
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 45000); // 45s poll
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllAsRead: true }),
      });
      setUnreadNotifications(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
  };

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E9E2D7] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_3px_rgba(40,35,31,0.02)]">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-[#28231F] hover:bg-[#F7F5F0] rounded-lg transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs text-[#82786E]">
          <Link href="/admin" className="hover:text-[#28231F] font-medium transition-colors">
            Aurelis Studio
          </Link>
          {segments.slice(1).map((segment, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-[#82786E]/50">/</span>
              <span className="text-[#28231F] font-semibold">{segment}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Right: Actions, Notifications, User */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#86A58C] hover:bg-[#75957b] text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Quick Action</span>
          </button>

          {isQuickActionOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E9E2D7] py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#82786E] border-b border-[#E9E2D7]">
                Fast Operations
              </div>
              <Link
                href="/admin/appointments?create=true"
                onClick={() => setIsQuickActionOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#28231F] hover:bg-[#F7F5F0] transition-colors"
              >
                <Calendar size={14} className="text-[#86A58C]" />
                <span>Create Appointment</span>
              </Link>
              <Link
                href="/admin/patients?register=true"
                onClick={() => setIsQuickActionOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#28231F] hover:bg-[#F7F5F0] transition-colors"
              >
                <UserPlus size={14} className="text-[#86A58C]" />
                <span>Register Patient</span>
              </Link>
              <Link
                href="/admin/billing?create=true"
                onClick={() => setIsQuickActionOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#28231F] hover:bg-[#F7F5F0] transition-colors"
              >
                <Receipt size={14} className="text-[#86A58C]" />
                <span>Issue Invoice</span>
              </Link>
              <Link
                href="/admin/blog?new=true"
                onClick={() => setIsQuickActionOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-[#28231F] hover:bg-[#F7F5F0] transition-colors"
              >
                <FilePlus size={14} className="text-[#86A58C]" />
                <span>New Journal Article</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-lg text-[#82786E] hover:text-[#28231F] hover:bg-[#F7F5F0] transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-rose-500 rounded-full animate-pulse">
                {unreadNotifications}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E9E2D7] py-2 z-50">
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#E9E2D7]">
                <span className="text-xs font-semibold text-[#28231F]">Notifications</span>
                {unreadNotifications > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-[#86A58C] hover:underline flex items-center gap-1"
                  >
                    <CheckCircle size={11} />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#E9E2D7]/60">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#82786E]">
                    No new notifications
                  </div>
                ) : (
                  notifications.slice(0, 8).map((n) => (
                    <Link
                      key={n.id}
                      href={n.link || "/admin/notifications"}
                      onClick={() => setIsNotifOpen(false)}
                      className={`block p-3 text-xs transition-colors hover:bg-[#F7F5F0] ${
                        !n.isRead ? "bg-[#86A58C]/10" : ""
                      }`}
                    >
                      <p className="font-semibold text-[#28231F]">{n.title}</p>
                      <p className="text-[#82786E] text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                      <span className="text-[10px] text-[#82786E]/70 mt-1 block">
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </Link>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-[#E9E2D7] text-center">
                <Link
                  href="/admin/notifications"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-xs text-[#86A58C] font-medium hover:underline"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E9E2D7] text-xs text-[#82786E] hover:text-[#28231F] hover:bg-[#F7F5F0] transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink size={12} />
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E9E2D7]">
          <div className="w-8 h-8 rounded-full bg-[#86A58C] text-white flex items-center justify-center text-xs font-semibold uppercase shadow-inner">
            {userName.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-[#28231F] leading-tight truncate max-w-[120px]">
              {userName}
            </p>
            <p className="text-[10px] font-medium text-[#86A58C] uppercase tracking-wider">
              {userRole.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

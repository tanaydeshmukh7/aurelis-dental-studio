"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Check,
} from "lucide-react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const d = await res.json();
        setNotifications(d.notifications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllAsRead: true }),
      });
      fetchNotifs();
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E9E2D7]">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#28231F]">
            Studio Notifications & Operational Alerts
          </h1>
          <p className="text-xs text-[#82786E] mt-0.5">
            Real-time feed of booking requests, payment settlements, inventory shortages, and follow-ups
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E9E2D7] hover:border-[#86A58C] text-[#28231F] text-xs font-semibold rounded-lg shadow-sm"
        >
          <Check size={14} className="text-[#86A58C]" />
          <span>Mark All Read</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#86A58C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#82786E] mt-3">Loading alerts...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] p-12 text-center space-y-3">
          <Bell size={36} className="mx-auto text-[#82786E]/40" />
          <h3 className="text-sm font-semibold text-[#28231F]">All Caught Up</h3>
          <p className="text-xs text-[#82786E]">No outstanding notifications or system alerts.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E9E2D7] shadow-sm divide-y divide-[#E9E2D7]/60 overflow-hidden text-xs">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                !n.isRead ? "bg-[#86A58C]/10" : "hover:bg-[#F7F5F0]/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {n.type === "warning" ? (
                    <AlertTriangle size={18} className="text-amber-600" />
                  ) : n.type === "success" ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : (
                    <Info size={18} className="text-[#86A58C]" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#28231F]">{n.title}</h4>
                  <p className="text-[#82786E] text-xs mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-[#82786E]/70 mt-1 block">
                    {new Date(n.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {n.link && (
                <Link
                  href={n.link}
                  className="px-3 py-1 bg-white border border-[#E9E2D7] hover:border-[#86A58C] rounded text-[11px] font-medium text-[#28231F] whitespace-nowrap"
                >
                  View Record
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

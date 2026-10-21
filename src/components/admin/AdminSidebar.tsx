"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Receipt,
  CreditCard,
  TrendingDown,
  Package,
  Truck,
  Sparkles,
  FileText,
  UserCheck,
  Image as ImageIcon,
  Star,
  Globe,
  Inbox,
  BarChart3,
  Bell,
  ShieldCheck,
  Settings,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { ROLE_PERMISSIONS, StaffRole } from "@/lib/roles";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  userRole?: StaffRole;
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
}

export default function AdminSidebar({
  collapsed,
  onToggleCollapse,
  userRole = "SUPER_ADMIN",
  userName = "Staff Member",
  userEmail = "staff@aurelisdental.in",
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const perms = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.SUPER_ADMIN;

  const navSections = [
    {
      title: "OPERATIONS",
      items: [
        { name: "Overview", href: "/admin", icon: LayoutDashboard, show: true },
        { name: "Appointments", href: "/admin/appointments", icon: Calendar, show: perms.canAccessAppointments },
        { name: "Patients", href: "/admin/patients", icon: Users, show: perms.canAccessPatients },
        { name: "Schedule", href: "/admin/schedule", icon: Clock, show: perms.canAccessSchedule },
      ],
    },
    {
      title: "FINANCIALS",
      items: [
        { name: "Billing & Invoices", href: "/admin/billing", icon: Receipt, show: perms.canAccessBilling },
        { name: "Payments", href: "/admin/payments", icon: CreditCard, show: perms.canAccessBilling },
        { name: "Expenses", href: "/admin/expenses", icon: TrendingDown, show: perms.canAccessExpenses },
      ],
    },
    {
      title: "SUPPLIES",
      items: [
        { name: "Inventory", href: "/admin/inventory", icon: Package, show: perms.canAccessInventory },
        { name: "Suppliers", href: "/admin/suppliers", icon: Truck, show: perms.canAccessInventory },
      ],
    },
    {
      title: "WEBSITE CMS",
      items: [
        { name: "Treatments", href: "/admin/treatments", icon: Sparkles, show: perms.canAccessTreatments },
        { name: "The Journal", href: "/admin/blog", icon: FileText, show: perms.canAccessCMS },
        { name: "Team CMS", href: "/admin/team", icon: UserCheck, show: perms.canAccessCMS },
        { name: "Gallery", href: "/admin/gallery", icon: ImageIcon, show: perms.canAccessCMS },
        { name: "Reviews", href: "/admin/reviews", icon: Star, show: perms.canAccessCMS },
        { name: "Public Pages", href: "/admin/pages", icon: Globe, show: perms.canAccessCMS },
      ],
    },
    {
      title: "INTELLIGENCE",
      items: [
        { name: "Leads & Enquiries", href: "/admin/leads", icon: Inbox, show: perms.canAccessLeads },
        { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3, show: perms.canAccessReports },
        { name: "Notifications", href: "/admin/notifications", icon: Bell, show: true },
      ],
    },
    {
      title: "GOVERNANCE",
      items: [
        { name: "Staff & RBAC", href: "/admin/staff", icon: ShieldCheck, show: perms.canAccessStaff },
        { name: "Clinic Settings", href: "/admin/settings", icon: Settings, show: perms.canAccessSettings },
        { name: "Audit Logs", href: "/admin/audit-logs", icon: History, show: perms.canAccessAuditLogs },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#242522] text-[#F7F5F0] flex flex-col z-30 transition-all duration-300 border-r border-[#383733] select-none ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-5 border-b border-[#383733]/80 bg-[#1e1f1c]">
        {!collapsed && (
          <Link href="/admin" className="flex flex-col">
            <span className="font-serif tracking-[0.25em] text-lg font-semibold text-[#F7F5F0]">
              AURELIS
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#86A58C]">
              Dental Studio
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/admin" className="mx-auto font-serif text-xl font-bold text-[#86A58C]">
            A
          </Link>
        )}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-md bg-[#2d2e2a] hover:bg-[#86A58C] hover:text-[#1e1f1c] text-[#E9E2D7] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700">
        {navSections.map((section) => {
          const visibleItems = section.items.filter((i) => i.show);
          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82786E]">
                  {section.title}
                </p>
              )}
              {visibleItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#86A58C] text-[#1e1f1c] font-semibold shadow-sm"
                        : "text-[#E9E2D7]/80 hover:text-white hover:bg-[#2d2e2a]"
                    } ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon size={17} className={isActive ? "text-[#1e1f1c]" : "text-[#86A58C]"} />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-3 border-t border-[#383733]/80 bg-[#1e1f1c]">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#28231F]/50">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">{userName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#86A58C]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86A58C] truncate">
                  {userRole.replace("_", " ")}
                </span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-[#343530] rounded-md transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center p-2.5 text-stone-400 hover:text-rose-400 hover:bg-[#2d2e2a] rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        )}

        {/* Link back to public website */}
        {!collapsed && (
          <Link
            href="/"
            target="_blank"
            className="mt-2 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] text-[#82786E] hover:text-[#E9E2D7] rounded transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink size={11} />
          </Link>
        )}
      </div>
    </aside>
  );
}

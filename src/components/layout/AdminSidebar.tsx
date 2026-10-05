"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bus,
  MapPin,
  GitBranch,
  Package,
  Users,
  Users2,
  Ticket,
  Tag,
  RotateCcw,
  Coins,
  Receipt,
  FileCheck,
  CreditCard,
  ShieldAlert,
  Settings,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

// Exactly ordered from Figma node 602:21691 / 602:23307
const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Buses", href: "/admin/buses", icon: Bus },
  { label: "Cities", href: "/admin/cities", icon: MapPin },
  { label: "Trips", href: "/admin/trips", icon: GitBranch },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Registered Travelers", href: "/admin/customers", icon: Users },
  { label: "Operators", href: "/admin/operators", icon: Users2, badge: 12, badgeColor: "bg-amber-400 text-amber-950 font-bold" },
  { label: "Bookings", href: "/admin/bookings", icon: Ticket },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Refund Requests", href: "/admin/refunds", icon: RotateCcw, badge: 2, badgeColor: "bg-rose-500 text-white font-bold" },
  { label: "Commissions", href: "/admin/commissions", icon: Coins },
  { label: "Transactions", href: "/admin/transactions", icon: Receipt },
  { label: "Payment Verification", href: "/admin/payment-verification", icon: FileCheck, badge: 42, badgeColor: "bg-[#FFE26D] text-[#320120] font-black" },
  { label: "Payouts Overview", href: "/admin/payouts", icon: CreditCard },
  { label: "Audit Log", href: "/admin/audit-log", icon: ShieldAlert },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin" || pathname === "/admin/dashboard";
    }
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`) ||
      pathname === href.replace("/admin", "") ||
      pathname.startsWith(`${href.replace("/admin", "")}/`)
    );
  };

  return (
    <aside className="w-64 bg-[#1E0818] text-white flex flex-col flex-shrink-0 h-full border-r border-[#38102E] select-none z-30 overflow-hidden">
      {/* Brand Header matching Figma 602:22070 & 602:22072 */}
      <div className="h-20 bg-[#280B21] flex items-center justify-between px-5 border-b border-[#431437] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFE26D] via-[#FDED9D] to-[#D9B747] flex items-center justify-center text-[#320120] font-extrabold shadow-md shadow-black/25 flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#320120]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-black text-base text-white tracking-wide leading-tight">
              Bus Arabia
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] font-bold text-[#FFE26D] tracking-wider uppercase">
                Admin Portal
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>
        </div>

        {/* Mobile close drawer button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Portal Switcher Banner */}
      <div className="px-4 pt-3 pb-1 flex-shrink-0">
        <Link
          href="/portal"
          onClick={onCloseMobile}
          className="group flex items-center justify-between px-3 py-2 rounded-xl bg-[#2D0D25] hover:bg-[#3D1233] border border-[#521945] text-xs transition-all shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Bus className="w-3.5 h-3.5 text-pink-300" />
            <span className="font-semibold text-pink-100">Operator Portal</span>
          </div>
          <span className="text-[10px] text-[#FFE26D] font-bold group-hover:translate-x-0.5 transition-transform">
            Switch →
          </span>
        </Link>
      </div>

      {/* Category Label */}
      <div className="px-6 pt-3 pb-1 flex-shrink-0">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Platform Governance
        </span>
      </div>

      {/* Navigation Links with smooth inner scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-1 space-y-1 sidebar-scrollbar">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                active
                  ? "bg-gradient-to-r from-[#B20163] to-[#800040] text-white shadow-md shadow-[#B20163]/25 font-bold"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors flex-shrink-0 ${
                    active ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                    item.badgeColor || "bg-pink-500/20 text-pink-200"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Profile & Logout - Always Pinned at Bottom */}
      <div className="p-4 bg-[#180614] border-t border-[#38102E] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-[#320120] font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
              SA
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">Sarah Al-Otaibi</p>
              <p className="text-[10px] text-amber-300 font-semibold uppercase">Super Admin</p>
            </div>
          </div>

          <Link
            href="/login"
            className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

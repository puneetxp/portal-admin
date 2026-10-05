"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Users2,
  Bus,
  Route,
  GitBranch,
  Ticket,
  ClipboardCheck,
  RefreshCw,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

// Exactly ordered from Figma node 840:8805 & 1546:2741
const operatorNavItems: NavItem[] = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "Company Profile", href: "/portal/profile", icon: User },
  { label: "Crew & Management", href: "/portal/operators", icon: Users2 },
  { label: "Fleet Coaches", href: "/portal/buses", icon: Bus, badge: 42, badgeColor: "bg-emerald-500/20 text-emerald-300" },
  { label: "Routes & Corridors", href: "/portal/routes", icon: Route },
  { label: "Trips & Timetables", href: "/portal/trips", icon: GitBranch, badge: 12, badgeColor: "bg-[#B20163] text-white" },
  { label: "Bookings", href: "/portal/bookings", icon: Ticket },
  { label: "Passenger Manifest", href: "/portal/manifest", icon: ClipboardCheck },
  { label: "Operational Recoveries", href: "/portal/recoveries", icon: RefreshCw },
  { label: "Payout Management", href: "/portal/payouts", icon: CreditCard, badge: "Pending", badgeColor: "bg-amber-400 text-amber-950 font-bold" },
  { label: "Carrier Reports", href: "/portal/reports", icon: BarChart3 },
  { label: "Settings", href: "/portal/settings", icon: Settings },
];

interface OperatorSidebarProps {
  onCloseMobile?: () => void;
}

export function OperatorSidebar({ onCloseMobile }: OperatorSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/portal") {
      return pathname === "/portal" || pathname === "/portal/dashboard";
    }
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`) ||
      pathname === href.replace("/portal", "") ||
      pathname.startsWith(`${href.replace("/portal", "")}/`)
    );
  };

  return (
    <aside className="w-64 bg-[#320120] text-white flex flex-col flex-shrink-0 h-full border-r border-[#4A0027] select-none z-30 overflow-hidden">
      {/* Brand Header matching Figma 840:8805 */}
      <div className="h-20 bg-[#3B0227] flex items-center justify-between px-5 border-b border-[#5C0030] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFE26D] via-[#FDED9D] to-[#D9B747] flex items-center justify-center text-[#4A0027] font-extrabold shadow-md shadow-black/25 flex-shrink-0">
            <Bus className="w-5 h-5 text-[#4A0027]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-black text-base text-white tracking-wide leading-tight">
              Bus Arabia
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] font-bold text-[#FDED9D] tracking-wider uppercase">
                Operator Portal
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#5C0030] text-[#FFE26D]">
                Arabia Fleet
              </span>
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
          href="/admin"
          onClick={onCloseMobile}
          className="group flex items-center justify-between px-3 py-2 rounded-xl bg-[#43022B] hover:bg-[#520335] border border-[#630440] text-xs transition-all shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-semibold text-amber-100">Enterprise Admin</span>
          </div>
          <span className="text-[10px] text-[#FFE26D] font-bold group-hover:translate-x-0.5 transition-transform">
            Switch →
          </span>
        </Link>
      </div>

      {/* Category Label */}
      <div className="px-6 pt-3 pb-1 flex-shrink-0">
        <span className="text-[10px] font-bold text-pink-300/70 uppercase tracking-widest">
          Fleet Operations
        </span>
      </div>

      {/* Navigation Links with smooth inner scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-1 space-y-1 sidebar-scrollbar">
        {operatorNavItems.map((item) => {
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
      <div className="p-4 bg-[#280119] border-t border-[#4A0027] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#950250] to-[#FFE26D] text-[#320120] font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
              AH
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">Ahmed Hassan</p>
              <p className="text-[10px] text-pink-300 font-semibold uppercase">Chief Operator</p>
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

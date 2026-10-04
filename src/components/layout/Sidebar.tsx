"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  Bus,
  Route,
  GitBranch,
  MapPin,
  Package,
  ClipboardCheck,
  FileCheck,
  RotateCcw,
  CreditCard,
  Receipt,
  Coins,
  RefreshCw,
  Users,
  Tag,
  Users2,
  BarChart3,
  ShieldAlert,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "OPERATIONS",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Bookings", href: "/bookings", icon: Ticket, badge: 12, badgeColor: "bg-[#B20163] text-white" },
      { label: "Fleet Coaches", href: "/buses", icon: Bus },
      { label: "Routes & Corridors", href: "/routes", icon: Route },
      { label: "Trips & Timetables", href: "/trips", icon: GitBranch },
      { label: "Cities & Stations", href: "/cities", icon: MapPin },
      { label: "Packages & Cargo", href: "/packages", icon: Package },
      { label: "Passenger Manifest", href: "/manifest", icon: ClipboardCheck },
    ],
  },
  {
    title: "FINANCE & SETTLEMENTS",
    items: [
      { label: "Payment Verification", href: "/payment-verification", icon: FileCheck, badge: 36, badgeColor: "bg-amber-400 text-amber-950 font-black" },
      { label: "Refund Claims", href: "/refunds", icon: RotateCcw, badge: 2, badgeColor: "bg-rose-500 text-white" },
      { label: "Operator Payouts", href: "/payouts", icon: CreditCard },
      { label: "Master Ledger", href: "/transactions", icon: Receipt },
      { label: "Commissions", href: "/commissions", icon: Coins },
      { label: "Operational Recoveries", href: "/recoveries", icon: RefreshCw },
    ],
  },
  {
    title: "PARTNERS & GROWTH",
    items: [
      { label: "Travelers CRM", href: "/customers", icon: Users },
      { label: "Coupons & Discounts", href: "/coupons", icon: Tag },
      { label: "Fleet Operators Hub", href: "/operators", icon: Users2 },
      { label: "Financial Reports", href: "/reports", icon: BarChart3 },
    ],
  },
  {
    title: "GOVERNANCE & SYSTEM",
    items: [
      { label: "System Audit Trail", href: "/audit-log", icon: ShieldAlert },
      { label: "Platform Policies", href: "/settings", icon: Settings },
      { label: "Carrier Profile", href: "/profile", icon: User },
      { label: "Support & Helpdesk", href: "/support", icon: HelpCircle },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#320120] text-white flex flex-col flex-shrink-0 min-h-screen border-r border-[#4A0027] select-none z-30">
      {/* Brand Header */}
      <div className="h-20 bg-[#3B0227] flex items-center px-5 gap-3 border-b border-[#5C0030]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFE26D] via-[#FDED9D] to-[#D9B747] flex items-center justify-center text-[#4A0027] font-extrabold shadow-md shadow-black/25 flex-shrink-0">
          <Bus className="w-5 h-5 text-[#4A0027]" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-black text-base tracking-tight text-white leading-tight truncate">
            Bus Arabia
          </span>
          <span className="text-[10px] font-bold text-gold tracking-widest uppercase truncate">
            ENTERPRISE ADMIN
          </span>
        </div>
      </div>

      {/* Navigation Groups with Scroll */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            <div className="px-3 text-[10px] font-extrabold tracking-wider text-pink-300/50 uppercase">
              {group.title}
            </div>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-[#660036] text-white shadow-sm font-bold border-l-2 border-gold"
                        : "text-pink-100/75 hover:bg-[#4E002A] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-gold" : "text-pink-200/60 group-hover:text-white"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          item.badgeColor || "bg-[#4E002A] text-pink-100"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-[#4A0027] space-y-1 bg-[#280018]">
        <Link
          href="/login"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/40 hover:text-rose-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Switch Operator</span>
        </Link>
      </div>
    </aside>
  );
}

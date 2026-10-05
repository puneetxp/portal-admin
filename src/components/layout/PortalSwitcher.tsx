"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Shield,
  Bus,
  ChevronDown,
  Check,
  Building,
  UserCheck,
} from "lucide-react";

export function PortalSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Check if currently inside the Admin portal or Operator portal
  const isAdmin =
    pathname.startsWith("/admin") ||
    pathname === "/payment-verification" ||
    pathname === "/commissions" ||
    pathname === "/refunds" ||
    pathname === "/transactions" ||
    pathname === "/audit-log" ||
    pathname === "/customers" ||
    pathname === "/coupons" ||
    pathname === "/packages" ||
    pathname === "/cities";

  const targetUrl = isAdmin ? "/portal" : "/admin";
  const targetLabel = isAdmin ? "Operator Portal" : "Enterprise Admin";

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 p-1 rounded-xl">
        <Link
          href="/admin"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isAdmin
              ? "bg-[#320120] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-white"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin</span>
        </Link>

        <Link
          href="/portal"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            !isAdmin
              ? "bg-gradient-to-r from-[#B20163] to-[#800040] text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900 hover:bg-white"
          }`}
        >
          <Bus className="w-3.5 h-3.5" />
          <span>Operator</span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Bell,
  HelpCircle,
  Menu,
  CheckCircle,
  LogOut,
  User,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export function Header({ onToggleMobileMenu }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-stroke flex items-center justify-between px-8 sticky top-0 z-20 shadow-xs">
      {/* Left: Mobile Toggle & Context Info */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-gray-600 hover:text-brand-primary hover:bg-pink-50 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Live system status indicator matching Figma */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Status: Active</span>
        </div>
      </div>

      {/* Right: Actions, Help & Profile */}
      <div className="flex items-center gap-5">
        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2.5 text-gray-600 hover:text-brand-primary hover:bg-[#FAF5F7] rounded-full transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B20163] ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-stroke p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-bold text-sm text-gray-900">Operator Alerts</span>
                <span className="text-[11px] font-semibold text-[#B20163] hover:underline cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="py-2 divide-y divide-gray-100 text-xs max-h-64 overflow-y-auto">
                <div className="py-2.5 flex items-start gap-2.5 hover:bg-gray-50 px-2 rounded-lg">
                  <div className="p-1.5 rounded-lg bg-pink-100 text-[#B20163] mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Payout Approved</p>
                    <p className="text-gray-500 text-[11px]">Cycle 2309-B settlement of SAR 12,400 has been verified.</p>
                    <span className="text-[10px] text-gray-400">10 mins ago</span>
                  </div>
                </div>
                <div className="py-2.5 flex items-start gap-2.5 hover:bg-gray-50 px-2 rounded-lg">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Scheduled Inspection</p>
                    <p className="text-gray-500 text-[11px]">Bus #UAE-3390-X due for brake pad replacement.</p>
                    <span className="text-[10px] text-gray-400">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Icon */}
        <Link
          href="/support"
          className="p-2.5 text-gray-600 hover:text-brand-primary hover:bg-[#FAF5F7] rounded-full transition-colors"
          title="Support & FAQ"
        >
          <HelpCircle className="w-5 h-5" />
        </Link>

        {/* User Profile matching Figma exact layout: Ahmad Al-Mansour, OWNER */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-[#FAF5F7] transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#550036] via-[#950250] to-[#D9B747] p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#550036]">
                AM
              </div>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-bold text-gray-900 leading-tight">Ahmad Al-Mansour</span>
              <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">OWNER</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-stroke p-2 z-50">
              <div className="px-3 py-2 border-b border-gray-100 mb-1">
                <p className="text-xs font-bold text-gray-900">Ahmad Al-Mansour</p>
                <p className="text-[11px] text-gray-500 truncate">ahmad@arabiafleet.ae</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E6F9EE] text-emerald-800">
                    Verified Operator
                  </span>
                </div>
              </div>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-[#B20163] rounded-lg transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <User className="w-4 h-4 text-gray-400" />
                Company Profile
              </Link>
              <div className="my-1 border-t border-gray-100" />
              <Link
                href="/login"
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

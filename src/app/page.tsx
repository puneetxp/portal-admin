"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Bus,
  ArrowRight,
  TrendingUp,
  FileCheck,
  CreditCard,
  Users2,
  Calendar,
  CheckCircle2,
  Sparkles,
  Layers,
  Activity,
  MapPin,
  ClipboardCheck,
  Receipt,
  RotateCcw,
} from "lucide-react";

export default function PortalGatewayPage() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <header className="h-20 bg-white border-b border-stroke flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFE26D] via-[#FDED9D] to-[#D9B747] flex items-center justify-center text-[#320120] font-black shadow-md shadow-black/15">
            <Bus className="w-5 h-5 text-[#320120]" />
          </div>
          <div>
            <span className="font-black text-lg text-gray-900 tracking-wide">
              Bus Arabia
            </span>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Unified Transit System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Platform Status: Fully Operational</span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5F7] border border-pink-200 text-[#B20163] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Two Distinct Applications • Grounded in Figma System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Select Your Portal Application
          </h1>
          <p className="text-base text-gray-500 mt-3 max-w-2xl mx-auto">
            The Bus Arabia ecosystem is split into two specialized interfaces: the Enterprise Platform Admin for super-admin governance, and the Operator Portal for carrier fleet command.
          </p>
        </div>

        {/* Dual App Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* APP 1: ENTERPRISE ADMIN PORTAL */}
          <div className="bg-white rounded-3xl border-2 border-stroke hover:border-[#320120] transition-all p-8 flex flex-col justify-between shadow-sm hover:shadow-xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-70 group-hover:scale-110 transition-transform" />

            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#1E0818] flex items-center justify-center text-[#FFE26D] shadow-md shadow-[#320120]/25">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#320120] text-[#FFE26D]">
                  Super Admin
                </span>
              </div>

              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Enterprise Admin Portal
              </h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Centralized network command for platform managers, finance auditors, and platform operations leads.
              </p>

              {/* Live KPI Highlights */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Total Bookings</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">12,842 <span className="text-[10px] text-emerald-600 font-bold">LIVE</span></p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Operator Hub</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">38 <span className="text-[10px] text-amber-600 font-bold">Active</span></p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Network Status</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">142 Routes</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Settlement Pool</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">SAR 1.25M</p>
                </div>
              </div>

              {/* Core Features List */}
              <div className="mt-6 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#B20163]" />
                  <span>Manual Payment & SARIE Verification Queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#B20163]" />
                  <span>Master Financial Transactions & Ledgers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-[#B20163]" />
                  <span>Operator Approvals & Tiered Commission Rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#B20163]" />
                  <span>Wallet & Customer Refund Approvals</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/admin"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#1E0818] hover:bg-[#320120] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1E0818]/20 transition-all group-hover:scale-[1.02]"
              >
                <span>Launch Enterprise Admin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* APP 2: OPERATOR PORTAL */}
          <div className="bg-white rounded-3xl border-2 border-stroke hover:border-[#B20163] transition-all p-8 flex flex-col justify-between shadow-sm hover:shadow-xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-70 group-hover:scale-110 transition-transform" />

            <div>
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#950250] to-[#550036] flex items-center justify-center text-[#FFE26D] shadow-md shadow-[#950250]/25">
                  <Bus className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Arabia Fleet
                </span>
              </div>

              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Bus Operator & Fleet Portal
              </h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Carrier operations command center for fleet owners, trip schedulers, and station captains.
              </p>

              {/* Live KPI Highlights */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Today&apos;s Trips</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">42 <span className="text-[10px] text-emerald-600 font-bold">+5%</span></p>
                </div>
                <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Active Fleet</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">42 Coaches</p>
                </div>
                <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Settlement Net</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">SAR 24,500</p>
                </div>
                <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Seat Inventory</span>
                  <p className="text-lg font-black text-gray-900 mt-0.5">156 / 200</p>
                </div>
              </div>

              {/* Core Features List */}
              <div className="mt-6 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#B20163]" />
                  <span>Single & Recurring Trip Scheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-[#B20163]" />
                  <span>Passenger Manifest & Digital Check-in Scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#B20163]" />
                  <span>Bi-Weekly Payout Cycle & Disbursement Tracker</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-[#B20163]" />
                  <span>Coach Fleet Registry & Maintenance Alerts</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/portal"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#B20163] to-[#800040] hover:from-[#950250] hover:to-[#6B0036] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#B20163]/25 transition-all group-hover:scale-[1.02]"
              >
                <span>Launch Operator Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-stroke bg-white text-center text-xs text-gray-400">
        <p>Bus Arabia Enterprise Mobility • Integrated Transit & Settlement Architecture</p>
      </footer>
    </div>
  );
}

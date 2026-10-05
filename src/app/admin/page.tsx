"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  ArrowUpRight,
  Bus,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Coins,
  CreditCard,
  Download,
  Percent,
  Shield,
  FileCheck,
  RotateCcw,
  Users2,
  MapPin,
  Calendar,
  Activity,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Eye,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeframe, setTimeframe] = useState<"monthly" | "weekly">("monthly");

  return (
    <div className="space-y-7 pb-12">
        {/* Top Header / Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#320120] text-[#FFE26D]">
                Platform Super Admin
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE NETWORK FEED
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-2">
              Platform Operations & Financial Health
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Enterprise oversight across all GCC corridors, carrier fleets, settlement queues, and ticketing ledgers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/payment-verification"
              className="flex items-center gap-2 bg-[#FAF5F7] text-[#550036] hover:bg-[#F3E8EE] px-4 py-2.5 rounded-xl text-xs font-bold border border-pink-200 transition-all"
            >
              <FileCheck className="w-4 h-4 text-[#B20163]" />
              <span>Verify Queue (42)</span>
            </Link>

            <Link
              href="/admin/operators"
              className="flex items-center gap-2 bg-gradient-to-r from-[#B20163] to-[#800040] hover:from-[#950250] hover:to-[#6B0036] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
            >
              <Users2 className="w-4 h-4 text-[#FFE26D]" />
              <span>Operator Hub (38)</span>
            </Link>
          </div>
        </div>

        {/* Primary Metric Grid (4 Cards - matches Figma 602:21691) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Bookings */}
          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px] font-bold text-gray-400">
                TOTAL BOOKINGS
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900 tracking-tight">12,842</span>
              <span className="text-xs font-bold text-emerald-600">+18.4%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1 text-[11px] text-gray-500">
              <div className="flex items-center justify-between">
                <span>Today&apos;s Bookings:</span>
                <span className="font-bold text-gray-900">24,582</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>Admin-created: <strong className="text-gray-700">266</strong></span>
                <span>Customer: <strong className="text-gray-700">983</strong></span>
              </div>
            </div>
          </div>

          {/* Card 2: Network Status */}
          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px] font-bold text-gray-400">
                NETWORK STATUS
              </span>
              <div className="p-1 rounded-lg bg-emerald-50 text-emerald-600">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900 tracking-tight">142</span>
              <span className="text-xs font-semibold text-gray-500">Active Routes</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 text-[11px]">Today&apos;s Scheduled Trips:</span>
              <span className="font-bold text-[#B20163] bg-pink-50 px-2 py-0.5 rounded-md">865 Trips</span>
            </div>
          </div>

          {/* Card 3: Operator Hub */}
          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px] font-bold text-gray-400">
                OPERATOR HUB
              </span>
              <div className="p-1 rounded-lg bg-pink-50 text-[#B20163]">
                <Bus className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900 tracking-tight">38</span>
              <span className="text-xs font-bold text-emerald-600">Active</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">12 Pending</span>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">3 Suspended</span>
            </div>
          </div>

          {/* Card 4: Wallet Credits */}
          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[11px] font-bold text-gray-400">
                WALLET CREDITS
              </span>
              <div className="p-1 rounded-lg bg-amber-50 text-amber-700">
                <Coins className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-gray-900 tracking-tight">SAR 1,245,800</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 text-[11px]">Settlement Pool:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
                100% Backed
              </span>
            </div>
          </div>
        </div>

        {/* Financial Health Section (from Figma 602:21691) */}
        <div className="bg-white rounded-2xl border border-stroke shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#B20163]" />
                <h2 className="text-lg font-bold text-gray-900">Platform Financial Health</h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Consolidated gross ticket sales, platform commission take-rate, and operator payout disbursements.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setTimeframe("weekly")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  timeframe === "weekly"
                    ? "bg-white text-gray-900 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe("monthly")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  timeframe === "monthly"
                    ? "bg-white text-[#B20163] shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Sales MTD */}
            <div className="p-4 rounded-xl bg-[#FAF5F7] border border-pink-100">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                TOTAL SALES (MTD)
              </span>
              <p className="text-2xl font-black text-gray-900 mt-2">SAR 4,892,100</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14.2% vs last month</span>
              </div>
            </div>

            {/* Today's Sales */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                TODAY&apos;S SALES
              </span>
              <p className="text-2xl font-black text-gray-900 mt-2">SAR 152,400</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Across 865 trips</span>
              </div>
            </div>

            {/* Commission Earned */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                COMMISSION EARNED
              </span>
              <p className="text-2xl font-black text-emerald-950 mt-2">SAR 366,907</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-700">
                <Percent className="w-3.5 h-3.5" />
                <span>7.5% Platform Average</span>
              </div>
            </div>

            {/* Operator Payouts */}
            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100">
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">
                OPERATOR PAYOUTS
              </span>
              <p className="text-2xl font-black text-purple-950 mt-2">SAR 3.5M <span className="text-xs font-normal text-purple-700">Paid</span></p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-purple-700">
                <span className="px-1.5 py-0.5 rounded bg-purple-200/60 text-purple-900 text-[10px]">
                  SAR 1.3M Pending
                </span>
                <Link href="/admin/payouts" className="hover:underline text-[11px] ml-auto">
                  Disburse →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Two-Column Grid: Booking States & Payment Verification Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Booking States Breakdown */}
          <div className="bg-white rounded-2xl border border-stroke shadow-xs p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Booking States Breakdown</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Live status distribution across GCC network</p>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                  24,997 Total
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-5">
                <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100">
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">UPCOMING</span>
                  <p className="text-xl font-black text-sky-950 mt-1">3,115</p>
                  <span className="text-[10px] text-sky-600">Next 72 Hours</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">COMPLETED</span>
                  <p className="text-xl font-black text-emerald-950 mt-1">18,402</p>
                  <span className="text-[10px] text-emerald-600">Fulfilled trips</span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-100">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">MODIFIED</span>
                  <p className="text-xl font-black text-amber-950 mt-1">842</p>
                  <span className="text-[10px] text-amber-600">Date/Seat changed</span>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">CANCELLED</span>
                  <p className="text-xl font-black text-rose-950 mt-1">2,118</p>
                  <span className="text-[10px] text-rose-600">Refund initiated</span>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-100/70 border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">NO-SHOW</span>
                  <p className="text-xl font-black text-gray-900 mt-1">105</p>
                  <span className="text-[10px] text-gray-500">Boarding missed</span>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">LIVE IN-TRANSIT</span>
                  <p className="text-xl font-black text-purple-950 mt-1">420</p>
                  <span className="text-[10px] text-purple-600">En route now</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Platform completion rate: <strong className="text-emerald-700">92.4%</strong></span>
              <Link href="/admin/bookings" className="text-[#B20163] font-bold hover:underline flex items-center gap-1">
                <span>View All Bookings</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Payment Verification Queue & Transaction Integrity */}
          <div className="space-y-6">
            {/* Payment Verification Card */}
            <div className="bg-white rounded-2xl border border-stroke shadow-xs p-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#B20163]">
                      PAYMENT VERIFICATION DETAILS
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                      42 Action Required
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mt-1">Verification Queue</h3>
                  <p className="text-xs text-gray-500">Review manual payment uploads & bank transfers</p>
                </div>

                <Link
                  href="/admin/payment-verification"
                  className="px-3.5 py-2 rounded-xl bg-[#320120] hover:bg-[#4A0027] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Review Queue
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100">
                  <span className="text-[10px] font-bold text-amber-800 uppercase">PENDING</span>
                  <p className="text-2xl font-black text-gray-900 mt-1">42</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-600 uppercase">EXPIRED</span>
                  <p className="text-2xl font-black text-gray-900 mt-1">15</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                  <span className="text-[10px] font-bold text-rose-800 uppercase">CANCELLED</span>
                  <p className="text-2xl font-black text-rose-600 mt-1">8</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5F7] border border-pink-100">
                  <span className="text-xs font-bold text-gray-700">Bank Transfers:</span>
                  <span className="text-sm font-black text-[#B20163]">24</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-xs font-bold text-gray-700">Cash Pending:</span>
                  <span className="text-sm font-black text-gray-900">18</span>
                </div>
              </div>
            </div>

            {/* Transaction Integrity Card */}
            <div className="bg-white rounded-2xl border border-stroke shadow-xs p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Transaction Integrity</h4>
                  <p className="text-xs text-gray-500">Gateway success & dispute breakdown</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  STABLE (90.2%)
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-center">
                  <span className="text-[10px] font-bold text-emerald-800">SUCCESS</span>
                  <p className="font-black text-gray-900 text-base mt-0.5">90.2%</p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 text-center">
                  <span className="text-[10px] font-bold text-amber-800">MANUAL PENDING</span>
                  <p className="font-black text-gray-900 text-base mt-0.5">6.4%</p>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 text-center">
                  <span className="text-[10px] font-bold text-rose-800">FAILURE/REFUSAL</span>
                  <p className="font-black text-rose-700 text-base mt-0.5">3.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table (from Figma 602:21691) */}
        <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Recent Platform Activity</h3>
              <p className="text-xs text-gray-500 mt-0.5">Real-time bookings streamed from all operators</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-[#B20163] hover:underline flex items-center gap-1"
            >
              <span>View All Bookings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6">Ref</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Route</th>
                  <th className="py-3.5 px-6">Source</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Value</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#B20163]">#BA-98214</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Ahmed Mohammed</td>
                  <td className="py-4 px-6 text-gray-600">Riyadh → Dammam</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-medium">
                      Web App
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      BOARDED
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">145 SAR</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href="/admin/bookings"
                      className="text-gray-400 hover:text-[#B20163] font-medium inline-flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#B20163]">#BA-98215</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Sarah Khan</td>
                  <td className="py-4 px-6 text-gray-600">Jeddah → Mecca</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-100">
                      Admin UI
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      CONFIRMED
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">85 SAR</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href="/admin/bookings"
                      className="text-gray-400 hover:text-[#B20163] font-medium inline-flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#B20163]">#BA-98216</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Tariq Al-Ghamdi</td>
                  <td className="py-4 px-6 text-gray-600">Medina → Tabuk</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 text-[11px] font-medium border border-sky-100">
                      Mobile iOS
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      CONFIRMED
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">210 SAR</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href="/admin/bookings"
                      className="text-gray-400 hover:text-[#B20163] font-medium inline-flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#B20163]">#BA-98217</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Noura Al-Zahrani</td>
                  <td className="py-4 px-6 text-gray-600">Dammam → Khobar</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100">
                      Mobile Android
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      BOARDED
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">45 SAR</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href="/admin/bookings"
                      className="text-gray-400 hover:text-[#B20163] font-medium inline-flex items-center gap-1 text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#B20163]">#BA-98218</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">Khalid Mansour</td>
                  <td className="py-4 px-6 text-gray-600">Riyadh → Abha</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-medium">
                      Web App
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                      PENDING PAYMENT
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">190 SAR</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href="/admin/payment-verification"
                      className="text-rose-600 hover:underline font-bold inline-flex items-center gap-1 text-[11px]"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

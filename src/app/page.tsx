"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
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
} from "lucide-react";
import { mockPassengerManifest } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function OperatorDashboardPage() {
  const [dateFilter] = useState("Today, Oct 24, 2023");

  return (
    <AdminLayout>
      <div className="space-y-7 pb-12">
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Financial & Operations Command Center
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Good Morning, <span className="font-semibold text-gray-700">Ahmed</span>. Here is your operational overview for {dateFilter}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#FAF5F7] text-[#550036] px-4 py-2 rounded-xl text-xs font-semibold border border-pink-100">
            <Calendar className="w-4 h-4 text-[#B20163]" />
            <span>{dateFilter}</span>
          </div>

          <Link
            href="/trips/new"
            className="flex items-center gap-2 bg-gradient-to-r from-[#550036] to-[#950250] hover:from-[#6B0044] hover:to-[#B20163] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-98"
          >
            <span>+ Create Single Trip</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Today's Trips */}
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Today&apos;s Trips</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
              <TrendingUp className="w-3 h-3" /> +5%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">42</span>
            <span className="text-xs text-gray-400 font-medium">scheduled</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              12 Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              30 En Route
            </span>
          </div>
        </div>

        {/* Upcoming Trips */}
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Upcoming Trips</span>
            <span className="text-[11px] text-gray-400 font-medium">Next 72 Hours</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">128</span>
            <span className="text-xs text-gray-400 font-medium">trips</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>8 Express Intercity</span>
            <span className="font-semibold text-gray-700">120 Regular</span>
          </div>
        </div>

        {/* Active Routes */}
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Active Routes</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-pink-50 text-[#950250]">
              Network
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">12</span>
            <span className="text-xs text-gray-400 font-medium">corridors</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span className="text-amber-600 font-medium">3 Under Maintenance</span>
            <Link href="/routes" className="text-[#950250] font-bold hover:underline flex items-center gap-0.5">
              View <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Active Recurring */}
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs hover:border-pink-200 transition-all">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Active Recurring</span>
            <span className="text-emerald-600 font-bold text-[11px]">99.2% Uptime</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900 tracking-tight">85</span>
            <span className="text-xs text-gray-400 font-medium">schedules</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Daily & Weekly</span>
            <span className="font-semibold text-gray-700">Automated</span>
          </div>
        </div>
      </div>

      {/* Mid Operations & Performance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Performance Chart Card */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Booking Performance</h2>
              <p className="text-xs text-gray-400 mt-0.5">Passenger boarding metrics today</p>
            </div>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
              2,480 Total
            </span>
          </div>

          {/* Visual Bars Breakdown matching Figma */}
          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">Confirmed Bookings</span>
                <span className="text-gray-900 font-bold">1,240 (50%)</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#550036] rounded-full" style={{ width: "50%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Boarded Passengers</span>
                <span className="text-emerald-700 font-bold">1,180 (47.5%)</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "47.5%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">No-Shows Reported</span>
                <span className="text-amber-700 font-bold">42 (1.7%)</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-700">Cancelled Bookings</span>
                <span className="text-rose-700 font-bold">18 (0.8%)</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: "8%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bus Arabia Inventory Card */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stroke shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Bus Arabia Inventory</h2>
                <p className="text-xs text-gray-400 mt-0.5">Platform allocated seats ratio</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                15% Allocated
              </span>
            </div>

            <div className="bg-[#FAF7F8] p-4 rounded-xl border border-pink-100/60 mt-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-600 font-semibold">Allocated to Platform</span>
                <span className="text-xl font-black text-[#550036]">30 Seats</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2.5">
                <div className="h-full bg-gradient-to-r from-[#D9B747] to-[#FFE26D] rounded-full" style={{ width: "15%" }} />
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 mt-2 font-medium">
                <span>Available: 156 Seats</span>
                <span>Fleet Total: 200 Seats</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Live seat syncing enabled</span>
            <Link href="/buses" className="text-[#B20163] font-bold hover:underline flex items-center gap-1">
              Manage Fleet <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Current Payout Cycle Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-[#3B001F] to-[#5C0030] text-white p-6 rounded-2xl shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-pink-200/80 uppercase tracking-wider">
                Current Settlement Cycle
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#FFE26D] text-[#3B001F]">
                12 / 14 Days
              </span>
            </div>

            <p className="text-xs text-pink-100/70">Estimated Accrual (Net):</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tracking-tight">SAR 24,500.00</span>
            </div>
            <p className="text-[11px] text-pink-200/80 mt-1">Next automatic bank transfer: Oct 31, 2023</p>
          </div>

          <div className="mt-6 pt-4 border-t border-pink-400/20 flex items-center justify-between relative z-10">
            <span className="text-xs text-pink-200">Emirates NBD •••• 345</span>
            <Link
              href="/payouts"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              Payout History <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        </div>
      </div>

      {/* Financial Insights Section matching Figma 840:8805 */}
      <div className="bg-white p-7 rounded-2xl border border-stroke shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#B20163]" />
              Financial Insights
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Comprehensive ledger of ticket sales, platform commissions, and net balances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              Download Statement
            </button>
          </div>
        </div>

        {/* Highlight Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-[#550036] to-[#760046] text-white p-4 rounded-xl shadow-xs">
            <span className="text-xs font-medium text-pink-200">Total Sales (MTD)</span>
            <p className="text-2xl font-black mt-1">SAR 142,850.50</p>
            <span className="text-[11px] text-pink-200/80 mt-1 block">+18.4% compared to last month</span>
          </div>

          <div className="bg-[#FAF5F7] p-4 rounded-xl border border-pink-100">
            <span className="text-xs font-semibold text-gray-500">Today&apos;s Gross Sales</span>
            <p className="text-2xl font-black text-gray-900 mt-1">SAR 12,400.00</p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% vs yesterday
            </span>
          </div>

          <div className="bg-[#FAF5F7] p-4 rounded-xl border border-pink-100">
            <span className="text-xs font-semibold text-gray-500">Current Cycle Gross</span>
            <p className="text-2xl font-black text-gray-900 mt-1">SAR 88,320.00</p>
            <span className="text-[11px] text-gray-500 mt-1 block">142 Completed Trips in cycle</span>
          </div>
        </div>

        {/* Breakdown & Outstanding Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Detailed Ledger Breakdown */}
          <div className="lg:col-span-2 space-y-2.5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Monthly Settlement Breakdown
            </h3>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-100 text-xs">
              <span className="font-medium text-gray-700">Completed Trips Gross Revenue</span>
              <span className="font-bold text-gray-900">SAR 112,000.00</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-100 text-xs">
              <span className="font-medium text-gray-700">Cancelled Passenger Bookings</span>
              <span className="font-semibold text-rose-600">- SAR 2,450.00</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-100 text-xs">
              <span className="font-medium text-gray-700">Operational Refund Adjustments</span>
              <span className="font-semibold text-rose-600">- SAR 1,200.00</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-pink-50/60 border border-pink-100 text-xs">
              <span className="font-medium text-[#550036] flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-[#B20163]" />
                Bus Arabia Platform Commission (10%)
              </span>
              <span className="font-bold text-[#550036]">- SAR 14,285.00</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-900">Estimated Total Operator Payout</span>
              <span className="text-sm font-black text-emerald-900">SAR 128,565.50</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 border border-gray-100 text-xs text-gray-500">
              <span>Paid Out to Date (Past Cycles)</span>
              <span className="font-semibold text-gray-700">SAR 104,065.50</span>
            </div>
          </div>

          {/* Outstanding Balance Card matching Figma */}
          <div className="lg:col-span-1 bg-[#FAF5F7] p-6 rounded-2xl border-2 border-pink-200/70 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#950250] uppercase tracking-wider block">
                Outstanding Balance
              </span>
              <p className="text-3xl font-black text-[#550036] mt-2 tracking-tight">
                SAR 24,500.00
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Pending reconciliation & approval</span>
              </div>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                Settlement cycle ending on October 31, 2023. Funds will be directly disbursed to your verified corporate bank account.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-pink-200/50">
              <Link
                href="/payouts"
                className="w-full flex items-center justify-center gap-2 bg-[#550036] hover:bg-[#760046] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <span>View Payout History</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Booking Activity & System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Recent Passenger Bookings</h2>
              <p className="text-xs text-gray-400 mt-0.5">Live bookings streaming across your fleet routes</p>
            </div>
            <Link
              href="/bookings"
              className="text-xs font-bold text-[#950250] hover:underline flex items-center gap-1"
            >
              See All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-y border-gray-100">
                <tr>
                  <th className="py-2.5 px-3">Booking Ref</th>
                  <th className="py-2.5 px-3">Passenger</th>
                  <th className="py-2.5 px-3">Seat</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPassengerManifest.slice(0, 4).map((p) => (
                  <tr key={p.id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-gray-900">{p.bookingRef}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-gray-800">{p.passengerName}</div>
                      <div className="text-[11px] text-gray-400">{p.tier}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#550036]">{p.seatNumber}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href="/manifest"
                        className="text-[11px] font-semibold text-[#B20163] hover:underline"
                      >
                        Manifest
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System & Maintenance Alerts */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stroke shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-1">Operational Alerts</h2>
            <p className="text-xs text-gray-400 mb-4">Urgent vehicle and compliance notifications</p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-amber-900">Urgent: Bus #UAE-3390-X</p>
                  <p className="text-amber-800 text-[11px] mt-0.5">Brake pad maintenance required before next departure.</p>
                  <Link href="/buses" className="text-[11px] font-bold text-amber-900 underline mt-1.5 inline-block">
                    Assign Workshop
                  </Link>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-900">KYC Status: High Confidence</p>
                  <p className="text-emerald-800 text-[11px] mt-0.5">All corporate licenses and bank IBAN are fully verified.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-pink-50/70 border border-pink-200/80 flex items-start gap-3">
                <CreditCard className="w-4 h-4 text-[#B20163] mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#550036]">Cycle 2309-B Disbursed</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">SAR 12,400 sent to Emirates NBD bank account.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 text-center">
            <Link
              href="/profile"
              className="text-xs font-bold text-gray-600 hover:text-[#550036] transition-colors"
            >
              Review Company Compliance →
            </Link>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

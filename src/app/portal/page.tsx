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
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#5C0030] text-[#FFE26D]">
                Carrier Fleet Command
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Arabia Fleet • Active
              </span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-2">
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
              href="/portal/trips/new"
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
              <Link href="/portal/routes" className="text-[#950250] font-bold hover:underline flex items-center gap-0.5">
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
              <Link href="/portal/buses" className="text-[#B20163] font-bold hover:underline flex items-center gap-1">
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
                href="/portal/payouts"
                className="text-xs font-bold text-[#FFE26D] hover:underline flex items-center gap-1"
              >
                Track Payout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Live Passenger Manifest Board */}
        <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Today&apos;s Active Manifest</h2>
              <p className="text-xs text-gray-500 mt-0.5">Live passenger boarding status for departing coaches</p>
            </div>
            <Link
              href="/portal/manifest"
              className="text-xs font-bold text-[#B20163] hover:underline flex items-center gap-1"
            >
              <span>Full Manifest</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-6">Seat</th>
                  <th className="py-3 px-6">Passenger Name</th>
                  <th className="py-3 px-6">Booking Ref</th>
                  <th className="py-3 px-6">Route</th>
                  <th className="py-3 px-6">Departure</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPassengerManifest.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-[#B20163]">{p.seatNumber}</td>
                    <td className="py-3.5 px-6 font-semibold text-gray-900">{p.passengerName}</td>
                    <td className="py-3.5 px-6 font-mono text-gray-500">{p.ticketNumber}</td>
                    <td className="py-3.5 px-6 text-gray-600">{p.route}</td>
                    <td className="py-3.5 px-6 text-gray-500">{p.departureTime}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === "BOARDED"
                            ? "bg-emerald-100 text-emerald-800"
                            : p.status === "CONFIRMED"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href="/portal/manifest"
                        className="text-[#B20163] hover:underline font-semibold"
                      >
                        Check-in
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

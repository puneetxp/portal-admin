"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Calendar,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Bus as BusIcon,
  Route as RouteIcon,
  FileSpreadsheet,
  FileText,
  Filter,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { mockOperatorRoutes } from "@/data/mockData";

export default function OperatorReportsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [selectedRoute, setSelectedRoute] = useState("ALL");

  const routePerformance = [
    { code: "RT-RUH-JED", name: "Riyadh ➔ Jeddah VIP", revenue: "SAR 612,400", trips: 120, loadFactor: "92.4%", onTime: "99.1%" },
    { code: "RT-RUH-DMM", name: "Riyadh ➔ Dammam Express", revenue: "SAR 398,500", trips: 90, loadFactor: "88.6%", onTime: "98.5%" },
    { code: "RT-JED-MED", name: "Jeddah ➔ Madinah Shuttle", revenue: "SAR 310,200", trips: 80, loadFactor: "91.0%", onTime: "97.8%" },
    { code: "RT-RUH-MAK", name: "Riyadh ➔ Makkah Sleeper", revenue: "SAR 189,150", trips: 40, loadFactor: "94.2%", onTime: "100%" },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Intelligence</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Fleet Operations Report</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Operational Analytics & Route Yield
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Fleet utilization rates, passenger loads, route profitability, and captain punctuality across your 42 coaches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-200 transition-colors">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button className="flex items-center gap-2 bg-[#5C0030] hover:bg-[#72003c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs">
            <Download className="w-4 h-4 text-[#FFE26D]" />
            <span>Export Summary PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Net Earnings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">SAR 1,510,250</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">+14.2% vs last month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Average Seat Load</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">89.8%</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Top 5% across network</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">On-Time Departure Rate</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">98.6%</span>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">330 Dispatches analyzed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Fleet In Service</span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#5C0030]">
              <BusIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">38 / 42</span>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">4 in routine garage service</span>
        </div>
      </div>

      {/* Corridor Breakdown Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-gray-900">Arabia Fleet Corridor Profitability</h2>
            <p className="text-xs text-gray-400">Dispatches, load factors, and gross revenues by route</p>
          </div>
          <span className="text-xs font-bold text-[#5C0030] bg-pink-50 px-2.5 py-1 rounded-full">
            All 42 Luxury Coaches
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">Route Code & Name</th>
                <th className="py-4 px-5">Completed Dispatches</th>
                <th className="py-4 px-5">Average Load Factor</th>
                <th className="py-4 px-5">Gross Revenue</th>
                <th className="py-4 px-5 text-right">Punctuality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {routePerformance.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-mono font-bold text-gray-900 block">{r.code}</span>
                    <span className="text-[11px] text-gray-500">{r.name}</span>
                  </td>

                  <td className="py-4 px-5 font-semibold text-gray-800">
                    {r.trips} Departures
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: r.loadFactor }} />
                      </div>
                      <span className="font-bold text-gray-900">{r.loadFactor}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5 font-black text-gray-900 text-sm">
                    {r.revenue}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {r.onTime}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

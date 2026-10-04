"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { mockOperatorRoutes } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function OperatorReportsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [selectedRoute, setSelectedRoute] = useState("ALL");

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span>Analytics & Intelligence</span>
            <span>/</span>
            <span className="text-[#950250]">Bookings Report</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Operator Reports
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Operational analytics, ticket revenue distributions, route profitability, and fleet load trends
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Exporting Bookings Data to CSV...")}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-200 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => alert("Generating Executive PDF Summary...")}
            className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-[#FFE26D]" />
            <span>Export Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Quarter">This Quarter (Q4)</option>
              <option value="Year to Date">Year to Date (2023)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <RouteIcon className="w-4 h-4 text-gray-400" />
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option value="ALL">All Network Routes</option>
              {mockOperatorRoutes.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.code}: {r.origin} → {r.destination}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs font-semibold text-gray-400">
          Audited Period: Oct 01, 2023 – Oct 31, 2023
        </span>
      </div>

      {/* KPI Stats Cards matching Figma 840:10087 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Bookings</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">14,892</span>
            <span className="text-xs text-emerald-600 font-semibold">+12.4%</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Tickets confirmed across web & mobile</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Gross Ticket Volume</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#550036]">SAR 2.14M</span>
            <span className="text-xs text-emerald-600 font-semibold">+15.8%</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Gross passenger fare revenue</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Average Ticket Yield</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">SAR 143.70</span>
            <span className="text-xs text-gray-400">per pax</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">+3.1% after dynamic surge</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Fleet Load Factor</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">84.2%</span>
            <span className="text-xs text-emerald-600 font-semibold">Optimal</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Above regional benchmark of 76%</span>
        </div>
      </div>

      {/* Route Profitability & Revenue Share Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#550036]" />
              <h2 className="text-sm font-bold text-gray-900">Highest Yield Travel Corridors</h2>
            </div>
            <span className="text-xs text-gray-400">Monthly Volume</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Riyadh ⇄ Jeddah Express (VIP Luxury)</span>
                <span className="font-bold text-gray-900">SAR 845,200 (39.5%)</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#550036] rounded-full" style={{ width: "39.5%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Dubai ⇄ Abu Dhabi Rapid Link (Executive Plus)</span>
                <span className="font-bold text-gray-900">SAR 542,100 (25.3%)</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#950250] rounded-full" style={{ width: "25.3%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Riyadh ⇄ Dammam Coastal (Executive Plus)</span>
                <span className="font-bold text-gray-900">SAR 418,900 (19.6%)</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#D9B747] rounded-full" style={{ width: "19.6%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Mecca ⇄ Medina Pilgrim Shuttle (Standard Shuttle)</span>
                <span className="font-bold text-gray-900">SAR 334,300 (15.6%)</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: "15.6%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Audit Archive */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-[#550036]">
            <FileText className="w-5 h-5" />
            <h2 className="text-sm font-bold text-gray-900">Audited Exports Archive</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Q3 2023 Tax & VAT Summary</p>
                <p className="text-[10px] text-gray-400">PDF • 1.4 MB • Oct 02, 2023</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white text-gray-600 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Fleet Maintenance Telematics</p>
                <p className="text-[10px] text-gray-400">CSV • 820 KB • Sep 30, 2023</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white text-gray-600 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Passenger Boarding Logs (Sep)</p>
                <p className="text-[10px] text-gray-400">CSV • 2.1 MB • Oct 01, 2023</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white text-gray-600 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

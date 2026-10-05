"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Building2,
  MapPin,
  FileSpreadsheet,
  FileText,
  PieChart,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Users,
} from "lucide-react";

export default function AdminPlatformReportsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  const carrierMarketShare = [
    { name: "Arabia Fleet Transport", share: "31.4%", gmv: "SAR 1,511,250", buses: 42, color: "bg-[#950250]" },
    { name: "SAPTCO Regional", share: "24.2%", gmv: "SAR 1,164,720", buses: 68, color: "bg-blue-600" },
    { name: "Desert Express Lines", share: "18.5%", gmv: "SAR 890,380", buses: 28, color: "bg-amber-600" },
    { name: "Red Sea Transit", share: "13.8%", gmv: "SAR 664,180", buses: 22, color: "bg-emerald-600" },
    { name: "Other 34 Carriers", share: "12.1%", gmv: "SAR 582,370", buses: 224, color: "bg-gray-400" },
  ];

  const topCorridors = [
    { corridor: "Riyadh ⇄ Jeddah", trips: 420, pax: 18480, gmv: "SAR 1,478,400", load: "91.2%" },
    { corridor: "Makkah ⇄ Madinah", trips: 380, pax: 16720, gmv: "SAR 1,337,600", load: "94.8%" },
    { corridor: "Dammam ⇄ Riyadh", trips: 310, pax: 13640, gmv: "SAR 954,800", load: "87.4%" },
    { corridor: "Jeddah ⇄ Yanbu", trips: 190, pax: 7980, gmv: "SAR 558,600", load: "82.5%" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Intelligence</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Executive Reports</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Platform Master Analytics & Market Yield
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#320120] text-[#FFE26D]">
              Platform Wide
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Cross-carrier passenger volume trends, operator market share splits, corridor occupancy, and fee yields.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#320120] text-white text-xs font-bold hover:bg-[#480230] transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-[#FFE26D]" />
            <span>Executive Board PDF</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Network GMV</p>
          <p className="text-2xl font-black text-gray-900 mt-2">SAR 4,812,900</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">+16.8% vs last month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Platform Fee Yield</p>
          <p className="text-2xl font-black text-[#950250] mt-2">SAR 481,290</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">10.0% weighted take</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Passengers Transported</p>
          <p className="text-2xl font-black text-gray-900 mt-2">84,120 Pax</p>
          <p className="text-xs text-gray-500 mt-1">Avg 2,804 daily passengers</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">TGA Regulatory Compliance</p>
          <p className="text-2xl font-black text-emerald-700 mt-2">99.4%</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Zero grounding orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Carrier Market Share Breakdown */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-base font-black text-gray-900">Carrier Volume & GMV Share</h2>
              <p className="text-xs text-gray-400">Monthly ticket booking distributions across 38 carriers</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-[#950250]">
              October 2026
            </span>
          </div>

          <div className="space-y-4">
            {carrierMarketShare.map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-900 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                    {c.name}
                  </span>
                  <div className="text-right">
                    <span className="font-black text-gray-900">{c.gmv}</span>
                    <span className="text-[10px] text-gray-400 ml-1.5">({c.share})</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`${c.color} h-full rounded-full`} style={{ width: c.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highest Volume Corridors */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-base font-black text-gray-900">Top Performing Corridors</h2>
              <p className="text-xs text-gray-400">Passenger demand and occupancy rates by route</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Avg 88.9% Occupancy
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 font-bold uppercase text-[10px] border-b border-gray-100">
                <tr>
                  <th className="pb-2.5">Corridor Route</th>
                  <th className="pb-2.5">Departures</th>
                  <th className="pb-2.5">Total Passengers</th>
                  <th className="pb-2.5">GMV</th>
                  <th className="pb-2.5 text-right">Load</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {topCorridors.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50/60">
                    <td className="py-3 font-bold text-gray-900">{r.corridor}</td>
                    <td className="py-3">{r.trips}</td>
                    <td className="py-3 font-semibold text-gray-800">{r.pax.toLocaleString()}</td>
                    <td className="py-3 font-bold text-gray-900">{r.gmv}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-md font-bold text-emerald-700 bg-emerald-50">
                        {r.load}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

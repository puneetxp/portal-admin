"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Route as RouteIcon,
  Search,
  Plus,
  MapPin,
  Clock,
  TrendingUp,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  ArrowRight,
  BarChart2,
  Navigation,
} from "lucide-react";
import { mockOperatorRoutes, OperatorRouteItem } from "@/data/mockData";

export default function OperatorRoutesPage() {
  const [routes, setRoutes] = useState<OperatorRouteItem[]>(mockOperatorRoutes);
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New route form state
  const [newRoute, setNewRoute] = useState({
    code: "",
    origin: "",
    originTerminal: "",
    destination: "",
    destinationTerminal: "",
    duration: "",
    distanceKm: 0,
    serviceLevel: "VIP Luxury" as const,
  });

  const toggleRouteStatus = (id: string) => {
    setRoutes(
      routes.map((r) =>
        r.id === id ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" } : r
      )
    );
  };

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const created: OperatorRouteItem = {
      id: `r-${Date.now()}`,
      code: newRoute.code || `AF-R-${Math.floor(100 + Math.random() * 900)}`,
      origin: newRoute.origin,
      originTerminal: newRoute.originTerminal || `${newRoute.origin} Central Hub`,
      destination: newRoute.destination,
      destinationTerminal: newRoute.destinationTerminal || `${newRoute.destination} Terminal`,
      stopsCount: 0,
      stopsList: ["Direct Express"],
      duration: newRoute.duration || "3h 30m",
      distanceKm: Number(newRoute.distanceKm) || 350,
      serviceLevel: newRoute.serviceLevel,
      status: "Active",
      weeklyTrips: 14,
      onTimePerformance: "99.0%",
      avgOccupancy: "88%",
    };
    setRoutes([created, ...routes]);
    setShowCreateModal(false);
  };

  const filteredRoutes = routes.filter((r) => {
    const matchesSearch =
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService =
      serviceFilter === "ALL" || r.serviceLevel === serviceFilter;

    return matchesSearch && matchesService;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Network</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Corridors & Timetables</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Fleet Routes & Corridors
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure regional travel corridors, departure hubs, and express routes for your 42 coaches.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#5C0030] hover:bg-[#72003c] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-98"
        >
          <Plus className="w-4 h-4 text-[#FFE26D]" />
          <span>Add New Route</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active Fleet Corridors</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">6</span>
            <span className="text-xs text-emerald-600 font-semibold">100% active</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Covering Riyadh, Jeddah, Makkah, Dammam</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Top Flagship Route</span>
          <div className="mt-2">
            <span className="text-base font-black text-[#5C0030] block truncate">Riyadh → Jeddah VIP</span>
            <span className="text-xs text-gray-500 font-medium">1,240 Monthly Travelers</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1.5 block">99.1% on-time record</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Average Duration</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">4h 30m</span>
            <span className="text-xs text-gray-400">express</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">TGA approved highway corridors</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Fleet On-Time Rate</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">98.9%</span>
            <span className="text-xs text-emerald-600 font-semibold">Punctual</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Monitored via GPS telematics</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search routes by origin, destination, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="ALL">All Service Levels</option>
              <option value="VIP Luxury">VIP Luxury</option>
              <option value="Executive Plus">Executive Plus</option>
              <option value="Standard Shuttle">Standard Shuttle</option>
            </select>
          </div>
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Route ID & Corridor</th>
                <th className="py-3 px-4">Origin / Terminal</th>
                <th className="py-3 px-4">Destination / Terminal</th>
                <th className="py-3 px-4">Stops</th>
                <th className="py-3 px-4">Duration & Distance</th>
                <th className="py-3 px-4">Service Tier</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRoutes.map((r) => (
                <tr key={r.id} className="hover:bg-pink-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-pink-50 text-[#5C0030]">
                        <RouteIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 font-mono">{r.code}</div>
                        <div className="text-gray-700 font-semibold text-xs mt-0.5">
                          {r.origin} → {r.destination}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{r.origin}</div>
                    <div className="text-[11px] text-gray-400">{r.originTerminal}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{r.destination}</div>
                    <div className="text-[11px] text-gray-400">{r.destinationTerminal}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700">
                      {r.stopsCount} Stops
                    </span>
                    <div className="text-[10px] text-gray-400 mt-1 max-w-[150px] truncate">
                      {r.stopsList.join(", ")}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{r.duration}</div>
                    <div className="text-[11px] text-gray-400">{r.distanceKm} km</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FAF5F7] text-[#5C0030] border border-pink-100">
                      {r.serviceLevel}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleRouteStatus(r.id)}
                      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        r.status === "Active" ? "bg-[#5C0030]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          r.status === "Active" ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/portal/trips?route=${r.code}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>View Trips</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Route Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stroke space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Add Fleet Route Corridor</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Origin City</label>
                  <input
                    type="text"
                    placeholder="e.g. Riyadh"
                    value={newRoute.origin}
                    onChange={(e) => setNewRoute({ ...newRoute, origin: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Destination City</label>
                  <input
                    type="text"
                    placeholder="e.g. Jeddah"
                    value={newRoute.destination}
                    onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 8h 30m"
                    value={newRoute.duration}
                    onChange={(e) => setNewRoute({ ...newRoute, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Distance (km)</label>
                  <input
                    type="number"
                    placeholder="e.g. 950"
                    value={newRoute.distanceKm || ""}
                    onChange={(e) => setNewRoute({ ...newRoute, distanceKm: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#5C0030] text-white font-bold hover:bg-[#72003c]"
                >
                  Save Route
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

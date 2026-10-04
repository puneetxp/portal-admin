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
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function RoutesManagementPage() {
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
      code: newRoute.code || `R-${Math.floor(1000 + Math.random() * 9000)}`,
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
      avgOccupancy: "85%",
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
    <AdminLayout>
      <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span>Network Planning</span>
            <span>/</span>
            <span className="text-[#950250]">Routes Management</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Routes Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure regional travel corridors, departure hubs, and intermediate stops
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Route</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Active Routes</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">142</span>
            <span className="text-xs text-emerald-600 font-semibold">+8 new this Q</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Covering 24 regional cities</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Most Traveled Route</span>
          <div className="mt-2">
            <span className="text-base font-black text-[#550036] block truncate">Riyadh → Jeddah Express</span>
            <span className="text-xs text-gray-500 font-medium">2,450 Monthly Travelers</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1.5 block">98.4% on-time record</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Average Duration</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">5h 45m</span>
            <span className="text-xs text-gray-400">avg corridor</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Optimized express bypasses</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Network On-Time</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">98.7%</span>
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
                  {/* Route ID & Corridor */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-pink-50 text-[#550036]">
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

                  {/* Origin */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{r.origin}</div>
                    <div className="text-[11px] text-gray-400">{r.originTerminal}</div>
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{r.destination}</div>
                    <div className="text-[11px] text-gray-400">{r.destinationTerminal}</div>
                  </td>

                  {/* Intermediate Stops */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700">
                      {r.stopsCount} Stops
                    </span>
                    <div className="text-[10px] text-gray-400 mt-1 max-w-[150px] truncate">
                      {r.stopsList.join(", ")}
                    </div>
                  </td>

                  {/* Duration & Distance */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{r.duration}</div>
                    <div className="text-[11px] text-gray-400">{r.distanceKm} km</div>
                  </td>

                  {/* Service Tier */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FAF5F7] text-[#550036] border border-pink-100">
                      {r.serviceLevel}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleRouteStatus(r.id)}
                      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        r.status === "Active" ? "bg-[#550036]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          r.status === "Active" ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="block text-[10px] text-gray-400 mt-1">{r.status}</span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/trips/new?route=${r.code}`}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF5F7] hover:bg-[#550036] text-[#550036] hover:text-white font-bold text-[11px] transition-colors"
                    >
                      Schedule Trip
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics & Reach Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#B20163]" />
              <h2 className="text-sm font-bold text-gray-900">Route Efficiency Analytics</h2>
            </div>
            <span className="text-xs text-gray-400">Weekly Utilization Rate</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Riyadh ⇄ Jeddah Corridor</span>
                <span className="font-bold text-gray-900">94% Occupancy</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#550036] rounded-full" style={{ width: "94%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Dubai ⇄ Abu Dhabi Rapid Link</span>
                <span className="font-bold text-gray-900">91% Occupancy</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#950250] rounded-full" style={{ width: "91%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Riyadh ⇄ Dammam Coastal</span>
                <span className="font-bold text-gray-900">88% Occupancy</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#D9B747] rounded-full" style={{ width: "88%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stroke shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#550036]">
              <Navigation className="w-5 h-5" />
              <h3 className="font-bold text-sm">Network Reach</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your fleet currently connects 24 major city hubs with 142 daily scheduled trips across the GCC transit network.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs">
            <span className="text-gray-400">Need route approvals?</span>
            <Link href="/profile" className="text-[#B20163] font-bold hover:underline flex items-center gap-1">
              Contact Desk <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Create Route Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Create New Route</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Origin City</label>
                  <input
                    type="text"
                    placeholder="e.g. Riyadh"
                    value={newRoute.origin}
                    onChange={(e) => setNewRoute({ ...newRoute, origin: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
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
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 4h 30m"
                    value={newRoute.duration}
                    onChange={(e) => setNewRoute({ ...newRoute, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Distance (km)</label>
                  <input
                    type="number"
                    placeholder="e.g. 420"
                    value={newRoute.distanceKm || ""}
                    onChange={(e) => setNewRoute({ ...newRoute, distanceKm: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Service Level</label>
                <select
                  value={newRoute.serviceLevel}
                  onChange={(e) => setNewRoute({ ...newRoute, serviceLevel: e.target.value as any })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option value="VIP Luxury">VIP Luxury</option>
                  <option value="Executive Plus">Executive Plus</option>
                  <option value="Standard Shuttle">Standard Shuttle</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#550036] hover:bg-[#760046] text-white font-bold transition-all shadow-sm"
                >
                  Save & Publish Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}

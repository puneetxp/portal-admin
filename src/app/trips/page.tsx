"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  Plus,
  Search,
  Calendar,
  Clock,
  Bus as BusIcon,
  Ticket,
  SlidersHorizontal,
  ChevronRight,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { mockOperatorTrips, OperatorTripDetail } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function TripsManagementPage() {
  const [trips, setTrips] = useState<OperatorTripDetail[]>(mockOperatorTrips);
  const [activeTab, setActiveTab] = useState<"All" | "Single Trip" | "Recurring Trip">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const toggleSeatSelection = (id: string) => {
    setTrips(
      trips.map((t) =>
        t.id === id ? { ...t, seatSelection: !t.seatSelection } : t
      )
    );
  };

  const filteredTrips = trips.filter((t) => {
    const matchesTab = activeTab === "All" || t.tripType === activeTab;
    const matchesSearch =
      t.tripNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.busPlate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || t.status.includes(statusFilter);

    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span>Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250]">Trips Management</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Trips Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor departure timetables, live passenger capacities, and publish new trip runs
          </p>
        </div>

        <Link
          href="/trips/new"
          className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Trip</span>
        </Link>
      </div>

      {/* Tabs: Single vs Recurring Trips */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/60">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "All"
                ? "bg-white text-[#550036] shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            All Trips ({trips.length})
          </button>
          <button
            onClick={() => setActiveTab("Single Trip")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "Single Trip"
                ? "bg-white text-[#550036] shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Single Trips
          </button>
          <button
            onClick={() => setActiveTab("Recurring Trip")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "Recurring Trip"
                ? "bg-white text-[#550036] shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Regular / Recurring
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trips, route, vehicle plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Published & Active</option>
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trips Table matching Figma 840:7139 */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Trip Code & Schedule</th>
                <th className="py-3 px-4">Route & Corridors</th>
                <th className="py-3 px-4">Departure / Arrival</th>
                <th className="py-3 px-4">Bus & Category</th>
                <th className="py-3 px-4">Fare</th>
                <th className="py-3 px-4">Seat Allocation</th>
                <th className="py-3 px-4 text-center">Seat Selection</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-pink-50/20 transition-colors">
                  {/* Trip Code & Schedule */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 font-mono text-xs">{trip.tripNumber}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{trip.departureDate}</span>
                    </div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                      {trip.tripType}
                    </span>
                  </td>

                  {/* Route & Corridors */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{trip.origin} → {trip.destination}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Route {trip.routeCode}</div>
                  </td>

                  {/* Departure & Arrival */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{trip.departureTime}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">arr: {trip.arrivalTime}</div>
                  </td>

                  {/* Bus & Category */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{trip.busModel}</div>
                    <div className="font-mono text-[11px] text-[#550036] font-semibold">{trip.busPlate}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-extrabold bg-[#FAF5F7] text-[#550036] border border-pink-100">
                      {trip.category}
                    </span>
                  </td>

                  {/* Fare */}
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-900 text-sm">
                      {trip.currency} {trip.fare.toFixed(2)}
                    </span>
                  </td>

                  {/* Seat Allocation */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>{trip.allocatedSeats} / {trip.totalSeats}</span>
                      <span className="text-[11px] text-gray-400">
                        {Math.round((trip.allocatedSeats / trip.totalSeats) * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#550036] rounded-full"
                        style={{ width: `${(trip.allocatedSeats / trip.totalSeats) * 100}%` }}
                      />
                    </div>
                  </td>

                  {/* Seat Selection Enabled */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleSeatSelection(trip.id)}
                      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        trip.seatSelection ? "bg-[#550036]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          trip.seatSelection ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="block text-[10px] text-gray-400 mt-1">
                      {trip.seatSelection ? "Enabled" : "Auto-Assign"}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        trip.status.includes("Active")
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/manifest"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF5F7] hover:bg-[#550036] text-[#550036] hover:text-white font-bold text-[11px] transition-colors"
                    >
                      <ClipboardList className="w-3.5 h-3.5" />
                      <span>Manifest</span>
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

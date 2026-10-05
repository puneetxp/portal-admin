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
  Users,
  ArrowRight,
  ShieldAlert,
  Download,
} from "lucide-react";
import { mockOperatorTrips, OperatorTripDetail } from "@/data/mockData";

export default function OperatorTripsPage() {
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
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Daily Departures</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Trips & Dispatches
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Schedule departures, assign captains, and view live passenger boarding manifests.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/portal/manifest"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs"
          >
            <ClipboardList className="w-3.5 h-3.5 text-gray-500" />
            <span>Passenger Manifest</span>
          </Link>
          <Link
            href="/portal/recoveries"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-rose-200 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Rescue & Recovery</span>
          </Link>
          <Link
            href="/portal/trips/new"
            className="flex items-center gap-2 bg-[#5C0030] hover:bg-[#72003c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#FFE26D]" />
            <span>Create Departure</span>
          </Link>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Today's Departures</span>
            <div className="w-8 h-8 rounded-lg bg-[#5C0030]/10 flex items-center justify-center text-[#5C0030]">
              <BusIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">18 Trips</span>
            <span className="text-xs text-emerald-600 font-semibold">100% on-time</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Riyadh, Jeddah, Dammam & Madinah</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Booked Seats</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">792 / 882</span>
            <span className="text-xs text-emerald-600 font-bold">89.8% Load</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Average ticket: SAR 185</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Assigned Captains</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-700">36 Drivers</span>
            <span className="text-xs text-blue-600 font-semibold">18 Primary + 18 Relief</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Full MOT compliance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Accrued Today</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">SAR 146,520</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Net to settle on Sunday</span>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100">
          {(["All", "Single Trip", "Recurring Trip"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? "bg-white text-[#5C0030] shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-1 max-w-md items-center gap-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by trip #, route, or coach plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5C0030]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active</option>
            <option value="Departed">Departed</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">Trip #</th>
                <th className="py-4 px-5">Route & Corridor</th>
                <th className="py-4 px-5">Timing</th>
                <th className="py-4 px-5">Coach Assigned</th>
                <th className="py-4 px-5">Seat Selection</th>
                <th className="py-4 px-5">Fares (SAR)</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-black text-gray-900 block text-sm">{trip.tripNumber}</span>
                    <span className="text-[10px] font-bold text-gray-400 block">{trip.tripType}</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-bold text-gray-900">
                      <span>{trip.origin}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span>{trip.destination}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-gray-800 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{trip.departureTime}</span>
                      <span className="text-gray-400">➔</span>
                      <span>{trip.arrivalTime}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{trip.duration} duration</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-gray-800">
                      <BusIcon className="w-3.5 h-3.5 text-[#5C0030]" />
                      <span>{trip.busPlate}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <button
                      onClick={() => toggleSeatSelection(trip.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        trip.seatSelection
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {trip.seatSelection ? "Enabled (Interactive)" : "Assigned at Gate"}
                    </button>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-gray-900 text-sm">SAR {trip.baseFare}</span>
                    {trip.vipFare && (
                      <span className="block text-[10px] text-[#950250] font-bold">VIP: SAR {trip.vipFare}</span>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        trip.status.includes("Active")
                          ? "bg-emerald-100 text-emerald-800"
                          : trip.status.includes("Departed")
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href="/portal/manifest"
                        className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                      >
                        Manifest
                      </Link>
                    </div>
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

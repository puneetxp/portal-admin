"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Bus,
  Building2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Download,
  Activity,
  SlidersHorizontal,
} from "lucide-react";

interface NetworkTrip {
  id: string;
  tripCode: string;
  carrier: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  busPlate: string;
  busModel: string;
  seatsBooked: number;
  totalSeats: number;
  gmvSar: number;
  commissionSar: number;
  status: "Scheduled" | "Boarding" | "In Transit" | "Arrived" | "Delayed";
}

const mockNetworkTrips: NetworkTrip[] = [
  {
    id: "TRIP-001",
    tripCode: "AF-401",
    carrier: "Arabia Fleet Transport",
    origin: "Riyadh (Al-Aziziyah Hub)",
    destination: "Jeddah (Al-Balad Station)",
    departureTime: "06:00 AM",
    arrivalTime: "04:30 PM",
    busPlate: "4821 KSA",
    busModel: "Mercedes Tourismo VIP",
    seatsBooked: 44,
    totalSeats: 49,
    gmvSar: 8140,
    commissionSar: 814,
    status: "In Transit",
  },
  {
    id: "TRIP-002",
    tripCode: "DEL-109",
    carrier: "Desert Express Lines",
    origin: "Dammam (Corniche)",
    destination: "Riyadh (North Terminal)",
    departureTime: "07:30 AM",
    arrivalTime: "11:45 AM",
    busPlate: "9134 RYA",
    busModel: "Volvo 9700 HD",
    seatsBooked: 50,
    totalSeats: 53,
    gmvSar: 6250,
    commissionSar: 500,
    status: "In Transit",
  },
  {
    id: "TRIP-003",
    tripCode: "RST-088",
    carrier: "Red Sea Transit",
    origin: "Jeddah (Al-Balad)",
    destination: "Yanbu (Al-Bahr)",
    departureTime: "09:00 AM",
    arrivalTime: "01:15 PM",
    busPlate: "6022 JDA",
    busModel: "Scania Touring HD",
    seatsBooked: 38,
    totalSeats: 45,
    gmvSar: 4180,
    commissionSar: 418,
    status: "Boarding",
  },
  {
    id: "TRIP-004",
    tripCode: "AHE-901",
    carrier: "Al-Haramain Express",
    origin: "Makkah (Haramain Terminal)",
    destination: "Madinah (Central Station)",
    departureTime: "10:15 AM",
    arrivalTime: "03:00 PM",
    busPlate: "3310 MKA",
    busModel: "Mercedes Travego High-Deck",
    seatsBooked: 49,
    totalSeats: 49,
    gmvSar: 9800,
    commissionSar: 1176,
    status: "Scheduled",
  },
  {
    id: "TRIP-005",
    tripCode: "SPT-220",
    carrier: "SAPTCO Regional",
    origin: "Abha (City Center)",
    destination: "Jeddah (Coastal)",
    departureTime: "05:30 AM",
    arrivalTime: "03:30 PM",
    busPlate: "5509 RYA",
    busModel: "Volvo 9700 HD",
    seatsBooked: 42,
    totalSeats: 51,
    gmvSar: 6930,
    commissionSar: 415.8,
    status: "Delayed",
  },
  {
    id: "TRIP-006",
    tripCode: "AF-402",
    carrier: "Arabia Fleet Transport",
    origin: "Riyadh (Al-Aziziyah Hub)",
    destination: "Dammam (Corniche)",
    departureTime: "01:00 PM",
    arrivalTime: "05:15 PM",
    busPlate: "1894 KSA",
    busModel: "Mercedes Tourismo VIP",
    seatsBooked: 46,
    totalSeats: 49,
    gmvSar: 5980,
    commissionSar: 598,
    status: "Scheduled",
  },
];

export default function AdminNetworkTripsPage() {
  const [search, setSearch] = useState("");
  const [carrierFilter, setCarrierFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [trips, setTrips] = useState(mockNetworkTrips);

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.tripCode.toLowerCase().includes(search.toLowerCase()) ||
      t.carrier.toLowerCase().includes(search.toLowerCase()) ||
      t.origin.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase()) ||
      t.busPlate.toLowerCase().includes(search.toLowerCase());
    const matchesCarrier = carrierFilter === "ALL" || t.carrier.includes(carrierFilter);
    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    return matchesSearch && matchesCarrier && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Network Schedule</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Network Master Schedule & Dispatches
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#320120] text-[#FFE26D]">
              All Carriers
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time oversight of inter-city passenger bus schedules, booking velocities, and platform commissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            Download Timetable CSV
          </button>
        </div>
      </div>

      {/* Network Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Scheduled Today</p>
          <p className="text-2xl font-black text-gray-900 mt-2">128 Trips</p>
          <p className="text-xs text-gray-500 mt-1">Across 42 inter-city corridors</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Network Seats Sold</p>
          <p className="text-2xl font-black text-emerald-700 mt-2">5,412 / 6,100</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">88.7% System Load Factor</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total GMV (Today)</p>
          <p className="text-2xl font-black text-gray-900 mt-2">SAR 412,850</p>
          <p className="text-xs text-gray-500 mt-1">Gross ticket bookings</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Platform Commission</p>
          <p className="text-2xl font-black text-[#950250] mt-2">SAR 41,285</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">+14.2% vs last week</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trip code, operating carrier, city route, or plate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#950250]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
          >
            <option value="ALL">All Carriers (38)</option>
            <option value="Arabia Fleet">Arabia Fleet Transport</option>
            <option value="Desert Express">Desert Express Lines</option>
            <option value="Red Sea">Red Sea Transit</option>
            <option value="Al-Haramain">Al-Haramain Express</option>
            <option value="SAPTCO">SAPTCO Regional</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
          >
            <option value="ALL">All Dispatches</option>
            <option value="In Transit">In Transit</option>
            <option value="Boarding">Boarding</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
      </div>

      {/* Master Trips Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">Trip ID & Carrier</th>
                <th className="py-4 px-5">Corridor Route</th>
                <th className="py-4 px-5">Departure / Arrival</th>
                <th className="py-4 px-5">Coach & Spec</th>
                <th className="py-4 px-5">Capacity Sold</th>
                <th className="py-4 px-5">Gross GMV & Take</th>
                <th className="py-4 px-5 text-right">Trip Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-black text-gray-900 block text-sm">{trip.tripCode}</span>
                    <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      {trip.carrier}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900">
                        <span>{trip.origin}</span>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span>{trip.destination}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1 text-gray-800 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{trip.departureTime}</span>
                      <span className="text-gray-400 text-[10px]">➔</span>
                      <span>{trip.arrivalTime}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="block font-semibold text-gray-900">{trip.busModel}</span>
                    <span className="text-[11px] font-mono text-gray-400">{trip.busPlate}</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-16 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${(trip.seatsBooked / trip.totalSeats) * 100}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-900">
                        {trip.seatsBooked}/{trip.totalSeats}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {Math.round((trip.seatsBooked / trip.totalSeats) * 100)}% Occupancy
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-gray-900 block">SAR {trip.gmvSar.toLocaleString()}</span>
                    <span className="text-[11px] font-semibold text-[#950250]">
                      +SAR {trip.commissionSar.toLocaleString()} Platform
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        trip.status === "In Transit"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : trip.status === "Boarding"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : trip.status === "Scheduled"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {trip.status}
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

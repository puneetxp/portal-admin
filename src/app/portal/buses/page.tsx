"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bus,
  Plus,
  Search,
  Filter,
  Users,
  Wrench,
  Fuel,
  Gauge,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";

interface OperatorCoach {
  id: string;
  code: string;
  plate: string;
  model: string;
  seatingClass: string;
  seats: number;
  captain: string;
  reliefCaptain: string;
  route: string;
  status: "In Service" | "Depot Ready" | "Maintenance" | "Standby";
  odometer: string;
  fuelLevel: number;
}

const mockOperatorCoaches: OperatorCoach[] = [
  {
    id: "AF-101",
    code: "AF-101",
    plate: "4821 KSA",
    model: "Mercedes-Benz Tourismo 16 RHD (2023)",
    seatingClass: "Royal VIP 2+1",
    seats: 49,
    captain: "Captain Tariq Al-Mansoor",
    reliefCaptain: "Captain Fahad Al-Mutairi",
    route: "Riyadh Al-Aziziyah ⇄ Jeddah Al-Balad",
    status: "In Service",
    odometer: "184,200 km",
    fuelLevel: 84,
  },
  {
    id: "AF-102",
    code: "AF-102",
    plate: "3319 KSA",
    model: "Mercedes-Benz Tourismo 16 RHD (2023)",
    seatingClass: "Royal VIP 2+1",
    seats: 49,
    captain: "Captain Khalid Otaibi",
    reliefCaptain: "Captain Sami Nabeel",
    route: "Makkah Haramain ⇄ Madinah Central",
    status: "In Service",
    odometer: "142,600 km",
    fuelLevel: 92,
  },
  {
    id: "AF-103",
    code: "AF-103",
    plate: "7102 KSA",
    model: "Volvo 9700 HD Supreme (2022)",
    seatingClass: "Executive 2+2",
    seats: 53,
    captain: "Captain Omar Al-Ghamdi",
    reliefCaptain: "Captain Youssef Zahrani",
    route: "Dammam Corniche ⇄ Riyadh North",
    status: "In Service",
    odometer: "219,800 km",
    fuelLevel: 68,
  },
  {
    id: "AF-104",
    code: "AF-104",
    plate: "8823 KSA",
    model: "Mercedes-Benz Tourismo 16 RHD (2023)",
    seatingClass: "Royal VIP 2+1",
    seats: 49,
    captain: "Captain Saud Al-Qahtani",
    reliefCaptain: "Captain Salem Dosari",
    route: "Riyadh Al-Aziziyah ⇄ Abha Terminal",
    status: "Depot Ready",
    odometer: "98,400 km",
    fuelLevel: 100,
  },
  {
    id: "AF-105",
    code: "AF-105",
    plate: "1924 KSA",
    model: "Scania Touring HD (2021)",
    seatingClass: "Royal VIP 2+1",
    seats: 45,
    captain: "Unassigned (Depot Lead: Eng. Bashir)",
    reliefCaptain: "—",
    route: "Riyadh Central Workshop (Bay 2)",
    status: "Maintenance",
    odometer: "284,100 km",
    fuelLevel: 45,
  },
  {
    id: "AF-106",
    code: "AF-106",
    plate: "6450 KSA",
    model: "Mercedes-Benz Tourismo 16 RHD (2023)",
    seatingClass: "Royal VIP 2+1",
    seats: 49,
    captain: "Captain Ibrahim Al-Shahrani",
    reliefCaptain: "Captain Mazen Turki",
    route: "Jeddah Al-Balad ⇄ Taif Express",
    status: "Standby",
    odometer: "112,000 km",
    fuelLevel: 95,
  },
];

export default function OperatorCoachesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [coaches, setCoaches] = useState(mockOperatorCoaches);
  const [selectedSeatMapCoach, setSelectedSeatMapCoach] = useState<OperatorCoach | null>(null);

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch =
      coach.code.toLowerCase().includes(search.toLowerCase()) ||
      coach.plate.toLowerCase().includes(search.toLowerCase()) ||
      coach.captain.toLowerCase().includes(search.toLowerCase()) ||
      coach.route.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || coach.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Fleet Coaches</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Arabia Fleet Coaches
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              42 Coaches
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your company's luxury inter-city coach inventory, driver rosters, and seat configurations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <Wrench className="w-3.5 h-3.5 text-gray-500" />
            Depot Work Orders
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5C0030] text-white text-xs font-bold hover:bg-[#72003c] transition-colors shadow-xs">
            <Plus className="w-4 h-4 text-[#FFE26D]" />
            Register New Coach
          </button>
        </div>
      </div>

      {/* Fleet KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Fleet</p>
            <div className="w-8 h-8 rounded-lg bg-[#5C0030]/10 flex items-center justify-center text-[#5C0030]">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">42</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">100% Owned by Arabia Fleet</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">In Service Today</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">38</p>
          <p className="text-xs text-gray-500 mt-1">90.4% Fleet Utilization</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Depot Maintenance</p>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">3</p>
          <p className="text-xs text-amber-700 font-medium mt-1">Scheduled service cycles</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Standby Rescue</p>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-blue-600 mt-2">1</p>
          <p className="text-xs text-blue-700 font-medium mt-1">Emergency recovery coach</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coach ID, plate number, driver captain, or assigned route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#950250]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
          >
            <option value="ALL">All Coach Statuses</option>
            <option value="In Service">In Service</option>
            <option value="Depot Ready">Depot Ready</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Standby">Standby</option>
          </select>
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCoaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-white rounded-2xl border border-stroke shadow-xs hover:border-[#5C0030]/40 transition-all p-5 flex flex-col justify-between space-y-4"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#5C0030]/10 flex items-center justify-center text-[#5C0030] font-black text-sm shrink-0">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-base">{coach.code}</h3>
                  <span className="text-xs font-mono font-bold text-gray-500">{coach.plate}</span>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  coach.status === "In Service"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : coach.status === "Depot Ready"
                    ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                    : coach.status === "Maintenance"
                    ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                    : "bg-purple-50 text-purple-700 border border-purple-200/60"
                }`}
              >
                {coach.status}
              </span>
            </div>

            {/* Coach Spec */}
            <div className="text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-gray-800">{coach.model}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="px-2 py-0.5 rounded-md bg-gray-100 font-semibold text-[10px] text-gray-700">
                  {coach.seatingClass}
                </span>
                <span>•</span>
                <span>{coach.seats} Passenger Seats</span>
              </div>
            </div>

            {/* Captain & Route */}
            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-gray-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  Captain:
                </span>
                <span className="font-bold text-gray-800 text-right">{coach.captain}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-gray-400 font-semibold flex items-center gap-1.5 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  Route:
                </span>
                <span className="font-medium text-gray-700 text-right text-[11px] truncate max-w-[180px]">
                  {coach.route}
                </span>
              </div>
            </div>

            {/* Odometer & Fuel bar */}
            <div className="space-y-1.5 pt-1 border-t border-gray-100 text-xs">
              <div className="flex items-center justify-between text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-gray-400" />
                  {coach.odometer}
                </span>
                <span className="flex items-center gap-1 font-bold text-gray-700">
                  <Fuel className="w-3.5 h-3.5 text-amber-500" />
                  {coach.fuelLevel}% Fuel
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    coach.fuelLevel > 50
                      ? "bg-emerald-500"
                      : coach.fuelLevel > 25
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${coach.fuelLevel}%` }}
                />
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setSelectedSeatMapCoach(coach)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Seat Layout Map
              </button>
              <button className="px-3 py-2 rounded-xl bg-[#5C0030] text-white text-xs font-bold hover:bg-[#72003c] transition-colors">
                Assign Crew
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seat Map Modal */}
      {selectedSeatMapCoach && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stroke space-y-5 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Seat Map: {selectedSeatMapCoach.code}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedSeatMapCoach.seatingClass} • {selectedSeatMapCoach.seats} Total Seats
                </p>
              </div>
              <button
                onClick={() => setSelectedSeatMapCoach(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Simulated 2+1 Luxury VIP Seat Map */}
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stroke space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-200">
                <span>Front • Driver Cabin</span>
                <span>Restroom / Door ⮑</span>
              </div>

              {/* Rows */}
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((row) => (
                  <div key={row} className="flex items-center justify-between gap-3 text-xs font-bold">
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shadow-xs">
                        {row}A
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shadow-xs">
                        {row}B
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-300 font-mono">AISLE</div>

                    <div className="w-8 h-8 rounded-lg bg-[#5C0030]/15 border border-[#5C0030]/30 text-[#5C0030] flex items-center justify-center shadow-xs">
                      {row}C (VIP)
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-200 text-[11px] font-semibold text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> Standard VIP
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-[#5C0030]/20 border border-[#5C0030]/40" /> Solo Window VIP
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSeatMapCoach(null)}
              className="w-full py-2.5 rounded-xl bg-[#5C0030] text-white text-xs font-bold hover:bg-[#72003c] transition-colors"
            >
              Done & Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

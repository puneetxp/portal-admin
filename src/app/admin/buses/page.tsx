"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bus,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  SlidersHorizontal,
  Building2,
  Eye,
  FileCheck,
  Ban,
  Activity,
  ArrowUpRight,
  Download,
} from "lucide-react";

interface AdminBusRecord {
  id: string;
  code: string;
  plate: string;
  operator: string;
  model: string;
  year: number;
  classType: "Royal VIP (2+1)" | "Business Class (2+2)" | "Economy Express";
  capacity: number;
  motStatus: "Compliant" | "Expiring Soon" | "Expired" | "Grounded";
  motExpiry: string;
  telematics: "Online - On Route" | "Idle at Terminal" | "Maintenance Bay" | "Offline";
  currentCorridor: string;
}

const mockAdminBuses: AdminBusRecord[] = [
  {
    id: "B-001",
    code: "AF-104",
    plate: "4821 KSA",
    operator: "Arabia Fleet Transport",
    model: "Mercedes-Benz Tourismo 16 RHD",
    year: 2023,
    classType: "Royal VIP (2+1)",
    capacity: 49,
    motStatus: "Compliant",
    motExpiry: "2025-06-15",
    telematics: "Online - On Route",
    currentCorridor: "Riyadh ⇄ Jeddah (Highway 40)",
  },
  {
    id: "B-002",
    code: "DE-208",
    plate: "9134 RYA",
    operator: "Desert Express Lines",
    model: "Volvo 9700 HD Luxury",
    year: 2022,
    classType: "Business Class (2+2)",
    capacity: 53,
    motStatus: "Compliant",
    motExpiry: "2024-11-30",
    telematics: "Online - On Route",
    currentCorridor: "Dammam ⇄ Riyadh (Expressway)",
  },
  {
    id: "B-003",
    code: "RS-044",
    plate: "6022 JDA",
    operator: "Red Sea Transit",
    model: "Scania Touring HD",
    year: 2021,
    classType: "Royal VIP (2+1)",
    capacity: 45,
    motStatus: "Expiring Soon",
    motExpiry: "2023-11-15",
    telematics: "Idle at Terminal",
    currentCorridor: "Jeddah ⇄ Yanbu",
  },
  {
    id: "B-004",
    code: "AH-312",
    plate: "3310 MKA",
    operator: "Al-Haramain Express",
    model: "Mercedes-Benz Travego High-Deck",
    year: 2024,
    classType: "Royal VIP (2+1)",
    capacity: 49,
    motStatus: "Compliant",
    motExpiry: "2025-09-01",
    telematics: "Online - On Route",
    currentCorridor: "Makkah ⇄ Madinah Haram Corridor",
  },
  {
    id: "B-005",
    code: "AQ-119",
    plate: "7721 QSM",
    operator: "Al-Qassim Transport Co.",
    model: "MAN Lion's Coach Supreme",
    year: 2020,
    classType: "Economy Express",
    capacity: 55,
    motStatus: "Grounded",
    motExpiry: "2023-09-10",
    telematics: "Maintenance Bay",
    currentCorridor: "Buraidah Depot (Grounded by MOT)",
  },
  {
    id: "B-006",
    code: "AF-112",
    plate: "1894 KSA",
    operator: "Arabia Fleet Transport",
    model: "Mercedes-Benz Tourismo 16 RHD",
    year: 2023,
    classType: "Royal VIP (2+1)",
    capacity: 49,
    motStatus: "Compliant",
    motExpiry: "2025-07-20",
    telematics: "Online - On Route",
    currentCorridor: "Riyadh ⇄ Dammam",
  },
  {
    id: "B-007",
    code: "SP-802",
    plate: "5509 RYA",
    operator: "SAPTCO Regional",
    model: "Volvo 9700 HD",
    year: 2022,
    classType: "Business Class (2+2)",
    capacity: 51,
    motStatus: "Compliant",
    motExpiry: "2024-12-05",
    telematics: "Online - On Route",
    currentCorridor: "Abha ⇄ Jeddah Coastal",
  },
];

export default function AdminBusesRegistryPage() {
  const [search, setSearch] = useState("");
  const [operatorFilter, setOperatorFilter] = useState("ALL");
  const [complianceFilter, setComplianceFilter] = useState("ALL");
  const [buses, setBuses] = useState(mockAdminBuses);

  const filteredBuses = buses.filter((b) => {
    const matchesSearch =
      b.code.toLowerCase().includes(search.toLowerCase()) ||
      b.plate.toLowerCase().includes(search.toLowerCase()) ||
      b.operator.toLowerCase().includes(search.toLowerCase()) ||
      b.model.toLowerCase().includes(search.toLowerCase()) ||
      b.currentCorridor.toLowerCase().includes(search.toLowerCase());
    const matchesOperator = operatorFilter === "ALL" || b.operator.includes(operatorFilter);
    const matchesCompliance = complianceFilter === "ALL" || b.motStatus === complianceFilter;
    return matchesSearch && matchesOperator && matchesCompliance;
  });

  const toggleGrounded = (id: string) => {
    setBuses((prev) =>
      prev.map((bus) =>
        bus.id === id
          ? {
              ...bus,
              motStatus: bus.motStatus === "Grounded" ? "Compliant" : "Grounded",
              telematics: bus.motStatus === "Grounded" ? "Idle at Terminal" : "Maintenance Bay",
            }
          : bus
      )
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Fleet Registry & Compliance</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Network Fleet Compliance Registry
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#320120] text-[#FFE26D]">
              38 Operators
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Super Admin regulatory oversight across all commercial coaches registered on the Bus Arabia network.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            Export MOT Audit PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#320120] text-white text-xs font-bold hover:bg-[#480230] transition-colors shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFE26D]" />
            Bulk Regulatory Audit
          </button>
        </div>
      </div>

      {/* Network Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Network Fleet</p>
            <div className="w-8 h-8 rounded-lg bg-[#320120]/5 flex items-center justify-center text-[#320120]">
              <Bus className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">384</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <Activity className="w-3 h-3" /> Across 38 authorized carriers
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active On-Road</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">342</p>
          <p className="text-xs text-gray-500 mt-1">Live GPS telematics verified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">MOT Expiring &lt;30d</p>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">38</p>
          <p className="text-xs text-amber-700 font-medium mt-1">Renewal notices dispatched</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Grounded / Audit</p>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">4</p>
          <p className="text-xs text-rose-700 font-medium mt-1">Prohibited from dispatch</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by bus code, plate, operator, corridor, or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#950250]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={operatorFilter}
            onChange={(e) => setOperatorFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
          >
            <option value="ALL">All Carriers (38)</option>
            <option value="Arabia Fleet">Arabia Fleet Transport</option>
            <option value="Desert Express">Desert Express Lines</option>
            <option value="Red Sea Transit">Red Sea Transit</option>
            <option value="Al-Haramain">Al-Haramain Express</option>
            <option value="SAPTCO">SAPTCO Regional</option>
          </select>

          <select
            value={complianceFilter}
            onChange={(e) => setComplianceFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
          >
            <option value="ALL">All Compliance</option>
            <option value="Compliant">Compliant & Active</option>
            <option value="Expiring Soon">Expiring &lt;30d</option>
            <option value="Grounded">Safety Grounded</option>
          </select>
        </div>
      </div>

      {/* Bus Registry Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">Bus & Plate</th>
                <th className="py-4 px-5">Carrier Operator</th>
                <th className="py-4 px-5">Model & Spec</th>
                <th className="py-4 px-5">Class & Seats</th>
                <th className="py-4 px-5">MOT License Status</th>
                <th className="py-4 px-5">Telematics & Corridor</th>
                <th className="py-4 px-5 text-right">Super Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#320120]/5 flex items-center justify-center text-[#320120] font-black shrink-0">
                        <Bus className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{bus.code}</span>
                        <span className="text-[11px] font-mono text-gray-500">{bus.plate}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-bold text-gray-900">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      {bus.operator}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="block font-semibold text-gray-800">{bus.model}</span>
                    <span className="text-[11px] text-gray-400">Mfg Year: {bus.year}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF2F7] text-[#950250] mb-0.5">
                      {bus.classType}
                    </span>
                    <span className="block text-[11px] text-gray-500">{bus.capacity} Passenger Seats</span>
                  </td>

                  <td className="py-4 px-5">
                    {bus.motStatus === "Compliant" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Valid to {bus.motExpiry}
                      </span>
                    )}
                    {bus.motStatus === "Expiring Soon" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Expires {bus.motExpiry}
                      </span>
                    )}
                    {bus.motStatus === "Grounded" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        MOT Grounded
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          bus.telematics.includes("Online")
                            ? "bg-emerald-500 animate-pulse"
                            : bus.telematics.includes("Idle")
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        }`}
                      />
                      <span className="font-semibold text-gray-800">{bus.telematics}</span>
                    </div>
                    <span className="text-[11px] text-gray-500 block truncate max-w-[220px]">
                      {bus.currentCorridor}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toggleGrounded(bus.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          bus.motStatus === "Grounded"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                        }`}
                      >
                        {bus.motStatus === "Grounded" ? "Certify Active" : "Ground Coach"}
                      </button>
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

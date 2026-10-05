"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  Bus,
  Coins,
  FileText,
  ExternalLink,
  ChevronRight,
  Download,
  Plus,
  Ban,
} from "lucide-react";

interface CarrierPartner {
  id: string;
  name: string;
  code: string;
  crNumber: string;
  motLicense: string;
  licenseExpiry: string;
  fleetCount: number;
  commissionRate: number; // in percent
  bankIban: string;
  bankName: string;
  status: "Verified & Active" | "Pending Document" | "Under Audit" | "Suspended";
  contactPerson: string;
  contactPhone: string;
}

const mockCarriers: CarrierPartner[] = [
  {
    id: "OP-001",
    name: "Arabia Fleet Transport LLC",
    code: "AFS",
    crNumber: "1010892401",
    motLicense: "MOT-KSA-2023-0891",
    licenseExpiry: "2026-04-12",
    fleetCount: 42,
    commissionRate: 10,
    bankIban: "SA44 8000 0201 6080 1029 3301",
    bankName: "Al Rajhi Bank",
    status: "Verified & Active",
    contactPerson: "Ahmed Hassan (Chief Operator)",
    contactPhone: "+966 50 123 4567",
  },
  {
    id: "OP-002",
    name: "Desert Express Lines",
    code: "DEL",
    crNumber: "1010774892",
    motLicense: "MOT-KSA-2022-1402",
    licenseExpiry: "2025-11-30",
    fleetCount: 28,
    commissionRate: 8,
    bankIban: "SA92 1000 0019 4482 9102 4410",
    bankName: "Saudi National Bank (SNB)",
    status: "Verified & Active",
    contactPerson: "Rashid Al-Kindi",
    contactPhone: "+966 55 987 6543",
  },
  {
    id: "OP-003",
    name: "Red Sea Transit Co.",
    code: "RST",
    crNumber: "4030198421",
    motLicense: "MOT-KSA-2021-9921",
    licenseExpiry: "2023-11-20",
    fleetCount: 35,
    commissionRate: 10,
    bankIban: "SA12 5000 0001 2940 9182 4492",
    bankName: "Riyad Bank",
    status: "Under Audit",
    contactPerson: "Ziyad Al-Harbi",
    contactPhone: "+966 54 321 0987",
  },
  {
    id: "OP-004",
    name: "Al-Haramain Express Transport",
    code: "AHE",
    crNumber: "4031982103",
    motLicense: "MOT-KSA-2024-0012",
    licenseExpiry: "2027-01-15",
    fleetCount: 50,
    commissionRate: 12,
    bankIban: "SA88 2000 0004 9182 3019 5521",
    bankName: "Alinma Bank",
    status: "Verified & Active",
    contactPerson: "Faisal Ba-Othman",
    contactPhone: "+966 56 443 2109",
  },
  {
    id: "OP-005",
    name: "Al-Qassim Transport Co.",
    code: "AQT",
    crNumber: "1131092834",
    motLicense: "MOT-KSA-2020-4491",
    licenseExpiry: "2023-08-30",
    fleetCount: 18,
    commissionRate: 10,
    bankIban: "SA55 4500 0000 9812 4019 7723",
    bankName: "Banque Saudi Fransi",
    status: "Suspended",
    contactPerson: "Turki Al-Suleiman",
    contactPhone: "+966 51 223 3445",
  },
  {
    id: "OP-006",
    name: "SAPTCO Regional Express",
    code: "SPT",
    crNumber: "1010028192",
    motLicense: "MOT-KSA-NAT-0001",
    licenseExpiry: "2028-12-31",
    fleetCount: 165,
    commissionRate: 6,
    bankIban: "SA01 1000 0000 1111 2222 3333",
    bankName: "Saudi National Bank (SNB)",
    status: "Verified & Active",
    contactPerson: "Nasser Al-Subaie",
    contactPhone: "+966 50 888 9999",
  },
];

export default function AdminOperatorsDirectoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [carriers, setCarriers] = useState(mockCarriers);

  const filteredCarriers = carriers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.crNumber.includes(search) ||
      c.motLicense.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleCarrierStatus = (id: string) => {
    setCarriers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "Suspended" ? "Verified & Active" : "Suspended",
            }
          : c
      )
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Carrier Directory</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Registered Carrier Partners
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#320120] text-[#FFE26D]">
              38 Active Companies
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Commercial bus transport operating licenses, legal CR verification, and commission agreements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            Export Carrier Audits
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#320120] text-white text-xs font-bold hover:bg-[#480230] transition-colors shadow-xs">
            <Plus className="w-4 h-4 text-[#FFE26D]" />
            Onboard New Carrier
          </button>
        </div>
      </div>

      {/* Network KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Partners</p>
            <div className="w-8 h-8 rounded-lg bg-[#320120]/10 flex items-center justify-center text-[#320120]">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">38</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Authorized MOT Transport Operators</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Verified & Active</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">34</p>
          <p className="text-xs text-gray-500 mt-1">Compliant CR & Tax Certificates</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Under MOT Audit</p>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">3</p>
          <p className="text-xs text-amber-700 font-medium mt-1">License renewal pending</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Suspended</p>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Ban className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2">1</p>
          <p className="text-xs text-rose-700 font-medium mt-1">Ticketing halted</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search carrier name, CR number, MOT license, or code..."
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
            <option value="ALL">All Partner Statuses</option>
            <option value="Verified & Active">Verified & Active</option>
            <option value="Under Audit">Under Audit</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Carriers Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">Carrier Company</th>
                <th className="py-4 px-5">CR & MOT License</th>
                <th className="py-4 px-5">Fleet Size</th>
                <th className="py-4 px-5">Commission Tier</th>
                <th className="py-4 px-5">SARIE Payout Bank</th>
                <th className="py-4 px-5">Compliance Status</th>
                <th className="py-4 px-5 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredCarriers.map((carrier) => (
                <tr key={carrier.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#320120]/5 flex items-center justify-center text-[#320120] font-black shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{carrier.name}</span>
                        <span className="text-[11px] text-gray-500">
                          {carrier.contactPerson} • {carrier.contactPhone}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-semibold text-gray-900 block font-mono">CR: {carrier.crNumber}</span>
                    <span className="text-[11px] text-gray-500">{carrier.motLicense}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-gray-900 text-sm">{carrier.fleetCount}</span>
                    <span className="text-[11px] text-gray-400 block">Active Coaches</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-black bg-[#FAF2F7] text-[#950250]">
                      {carrier.commissionRate}% Take
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-semibold text-gray-800 block">{carrier.bankName}</span>
                    <span className="text-[10px] font-mono text-gray-400 truncate max-w-[170px] block">
                      {carrier.bankIban}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    {carrier.status === "Verified & Active" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Active
                      </span>
                    )}
                    {carrier.status === "Under Audit" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Under Audit
                      </span>
                    )}
                    {carrier.status === "Suspended" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Suspended
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => toggleCarrierStatus(carrier.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        carrier.status === "Suspended"
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                      }`}
                    >
                      {carrier.status === "Suspended" ? "Reinstate" : "Suspend"}
                    </button>
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  Building2,
  Calendar,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
  FileSpreadsheet,
  Coins,
  Send,
} from "lucide-react";

interface CarrierDisbursement {
  id: string;
  carrierName: string;
  crNumber: string;
  bankName: string;
  iban: string;
  cyclePeriod: string;
  grossSalesSar: number;
  commissionRate: string;
  platformTakeSar: number;
  netPayoutSar: number;
  status: "Transferred" | "Pending Approval" | "Held";
}

const mockCarrierDisbursements: CarrierDisbursement[] = [
  {
    id: "DISB-2026-42",
    carrierName: "Arabia Fleet Transport Ltd.",
    crNumber: "1010482910",
    bankName: "Al Rajhi Bank",
    iban: "SA44 8000 0412 •••• 3410",
    cyclePeriod: "Oct 15 - Oct 21, 2026",
    grossSalesSar: 347166,
    commissionRate: "10%",
    platformTakeSar: 34716,
    netPayoutSar: 312450,
    status: "Pending Approval",
  },
  {
    id: "DISB-2026-41",
    carrierName: "Desert Express Lines Co.",
    crNumber: "2050119283",
    bankName: "Saudi National Bank (SNB)",
    iban: "SA29 1000 0291 •••• 9921",
    cyclePeriod: "Oct 15 - Oct 21, 2026",
    grossSalesSar: 268200,
    commissionRate: "8%",
    platformTakeSar: 21456,
    netPayoutSar: 246744,
    status: "Pending Approval",
  },
  {
    id: "DISB-2026-40",
    carrierName: "Red Sea Transit Group",
    crNumber: "4030291884",
    bankName: "Riyad Bank",
    iban: "SA55 2000 0110 •••• 4412",
    cyclePeriod: "Oct 15 - Oct 21, 2026",
    grossSalesSar: 189400,
    commissionRate: "10%",
    platformTakeSar: 18940,
    netPayoutSar: 170460,
    status: "Transferred",
  },
  {
    id: "DISB-2026-39",
    carrierName: "Al-Haramain Express Mobility",
    crNumber: "4031992019",
    bankName: "Banque Saudi Fransi",
    iban: "SA67 5500 0981 •••• 0019",
    cyclePeriod: "Oct 15 - Oct 21, 2026",
    grossSalesSar: 412500,
    commissionRate: "12%",
    platformTakeSar: 49500,
    netPayoutSar: 363000,
    status: "Transferred",
  },
  {
    id: "DISB-2026-38",
    carrierName: "Najd Regional Transport Co.",
    crNumber: "1010339912",
    bankName: "Alinma Bank",
    iban: "SA12 0500 0772 •••• 8812",
    cyclePeriod: "Oct 15 - Oct 21, 2026",
    grossSalesSar: 95400,
    commissionRate: "9%",
    platformTakeSar: 8586,
    netPayoutSar: 86814,
    status: "Held",
  },
];

export default function AdminPayoutsPage() {
  const [disbursements, setDisbursements] = useState(mockCarrierDisbursements);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  const filtered = disbursements.filter((d) => {
    const matchesSearch =
      d.carrierName.toLowerCase().includes(search.toLowerCase()) ||
      d.crNumber.includes(search) ||
      d.bankName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveBatch = () => {
    setIsProcessingBatch(true);
    setTimeout(() => {
      setDisbursements((prev) =>
        prev.map((d) => (d.status === "Pending Approval" ? { ...d, status: "Transferred" } : d))
      );
      setIsProcessingBatch(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Treasury</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Carrier SARIE Settlements</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Carrier Settlements & SARIE Disbursements
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#320120] text-[#FFE26D]">
              Platform Treasury
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage bi-weekly ticket revenue remittances to 38 registered carrier partners via SAMA SARIE ACH.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleApproveBatch}
            disabled={isProcessingBatch}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#320120] text-white text-xs font-bold hover:bg-[#480230] transition-colors shadow-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-[#FFE26D]" />
            <span>{isProcessingBatch ? "Processing SARIE ACH..." : "Release Approved Batch"}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>SAMA ACH File</span>
          </button>
        </div>
      </div>

      {/* Treasury Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Net to Disburse</p>
          <p className="text-2xl font-black text-gray-900 mt-2">SAR 1,179,468</p>
          <p className="text-xs text-gray-500 mt-1">Cycle: Oct 15 - Oct 21</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Platform Commission Retained</p>
          <p className="text-2xl font-black text-[#950250] mt-2">SAR 133,198</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">10.1% aggregate split</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending SARIE Release</p>
          <p className="text-2xl font-black text-amber-600 mt-2">2 Carriers</p>
          <p className="text-xs text-amber-700 font-semibold mt-1">SAR 559,194.00</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Escrow Account Status</p>
          <p className="text-2xl font-black text-emerald-700 mt-2">Fully Funded</p>
          <p className="text-xs text-gray-500 mt-1">SARIE Gateway: Online 100%</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search carrier name, CR number, or bank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#950250]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
        >
          <option value="ALL">All Payout Statuses</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Transferred">Transferred</option>
          <option value="Held">Held (MOT Audit)</option>
        </select>
      </div>

      {/* Carrier Disbursements Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">Carrier & CR Number</th>
                <th className="py-4 px-5">Depository Bank & IBAN</th>
                <th className="py-4 px-5">Gross Ticket Sales</th>
                <th className="py-4 px-5">Platform Commission</th>
                <th className="py-4 px-5">Net Remittance</th>
                <th className="py-4 px-5">Settlement Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block text-sm">{d.carrierName}</span>
                    <span className="text-[11px] text-gray-500 font-mono">CR #{d.crNumber}</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                      <Landmark className="w-3.5 h-3.5 text-gray-400" />
                      {d.bankName}
                    </div>
                    <span className="text-[11px] font-mono text-gray-400 block mt-0.5">{d.iban}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900">SAR {d.grossSalesSar.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{d.cyclePeriod}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-[#950250]">
                      -SAR {d.platformTakeSar.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Rate: {d.commissionRate}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-emerald-700 text-sm block">
                      SAR {d.netPayoutSar.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">SARIE Direct Deposit</span>
                  </td>

                  <td className="py-4 px-5">
                    {d.status === "Transferred" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Transferred
                      </span>
                    )}
                    {d.status === "Pending Approval" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending Dual-Key
                      </span>
                    )}
                    {d.status === "Held" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Compliance Hold
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                      Audit Ledger
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Download,
  Filter,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileText,
  CreditCard,
  Search,
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Landmark,
  Coins,
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { mockSettlements, SettlementCycle } from "@/data/mockData";

export default function OperatorPayoutsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredSettlements = mockSettlements.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bankRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cyclePeriod.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20 max-w-7xl mx-auto">
        {/* Page Header matching Figma 1546:2741 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
              <span>Finance & Remittances</span>
              <span>/</span>
              <span className="text-[#950250]">Operator Settlements & Payouts</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-[#550036] tracking-tight">
              Settlements & Payouts
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Automated SARIE direct depository remittances, audited fee statements, and cycle reconciliation
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Exporting master CSV ledger...")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[12.8px] border border-[#88717A] text-[#550036] bg-white font-semibold text-xs hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4 text-[#550036]" />
              <span>Export Tax Summary</span>
            </button>
            <Link
              href="/payouts/SETT-2026-0814"
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12.8px] bg-gradient-to-r from-[#550036] to-[#7C0051] text-white font-semibold text-xs shadow-md hover:opacity-95 transition-all active:scale-98"
            >
              <Eye className="w-4 h-4 text-[#FFE26D]" />
              <span>Latest Statement</span>
            </Link>
          </div>
        </div>

        {/* Bento Grid: Highlight Current Cycle Card (Figma 1546:2764) & Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Current Cycle Highlight Card (8 Cols) - Figma 1546:2764 */}
          <div className="lg:col-span-8 relative overflow-hidden rounded-[24px] bg-[#64003B0D] border border-[#64003B33] p-7 shadow-xs">
            {/* Background Blur Glow matching Figma */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#64003B1A] blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#64003B]">
                    Active Reconciliation Cycle: Oct 16 - Oct 31, 2026
                  </span>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full text-[11px] font-bold bg-[#64003B] text-[#FFE26D]">
                  Next Payout: Nov 02, 2026
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                  <span className="text-xs font-semibold text-gray-500 block mb-1">
                    Estimated Net Disbursable Yield
                  </span>
                  <div className="text-3xl lg:text-4xl font-black text-[#550036] tracking-tight">
                    SAR 126,112.50
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Subject to final weekend transaction settlement and toll adjustments
                  </p>
                </div>

                <div className="space-y-1.5 text-xs bg-white/60 backdrop-blur-sm p-3.5 rounded-xl border border-[#64003B1A]">
                  <div className="flex justify-between text-gray-600">
                    <span>Gross Ticket Sales (412 trips):</span>
                    <span className="font-bold text-gray-900">SAR 142,500.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Commission (10%):</span>
                    <span className="font-bold text-rose-600">- SAR 14,250.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Value Added Tax (15%):</span>
                    <span className="font-bold text-rose-600">- SAR 2,137.50</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#64003B1A]">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Clearing automatically through <strong>SARIE RTGS ACH</strong></span>
                </div>

                <Link
                  href="/payouts/SETT-2026-0814"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#550036] hover:text-[#950250] transition-colors"
                >
                  <span>Inspect Preliminary Breakdown</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Depository Depository & Remittance Profile (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-[24px] border border-[#DBBFC933] p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Remittance Depository
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Verified IBAN
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#550036]">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Al Rajhi Bank</h3>
                    <p className="text-xs font-mono text-gray-500">Corporate Account</p>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F8] rounded-xl border border-[#DCBFC8] space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">
                    Designated IBAN
                  </span>
                  <p className="text-xs font-mono font-bold text-[#550036]">
                    SA44 2000 0001 2345 6789 4821
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Disbursement Schedule:</span>
                <span className="font-bold text-gray-800">Bi-Weekly (1st & 16th)</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Settlement Currency:</span>
                <span className="font-bold text-gray-800">SAR (Saudi Riyal)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#DBBFC933] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by settlement #, bank ref, cycle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#950250]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
              >
                <option value="ALL">All Payout Statuses</option>
                <option value="Disbursed">Disbursed / Paid</option>
                <option value="Reconciling">Reconciling</option>
                <option value="Approved">Approved for Transfer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Past Settlements Responsive Table matching Figma 1546:2836 */}
        <div className="bg-white rounded-2xl border border-[#DBBFC933] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Audited Past Settlements</h3>
              <p className="text-xs text-gray-400">Historical remittance statements cleared to your designated bank</p>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              Showing {filteredSettlements.length} settlement records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Statement #</th>
                  <th className="py-3 px-4">Billing Cycle Period</th>
                  <th className="py-3 px-4 text-center">Trips Reconciled</th>
                  <th className="py-3 px-4">Gross Revenue</th>
                  <th className="py-3 px-4">Platform Fee & VAT</th>
                  <th className="py-3 px-4">Net Remittance</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSettlements.map((cycle) => (
                  <tr key={cycle.id} className="hover:bg-pink-50/20 transition-colors">
                    {/* Statement # */}
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/payouts/${cycle.id}`}
                        className="font-mono font-bold text-[#550036] hover:underline flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                        <span>{cycle.id}</span>
                      </Link>
                      <span className="text-[10px] text-gray-400 font-mono block mt-0.5">
                        {cycle.bankRef}
                      </span>
                    </td>

                    {/* Billing Cycle */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{cycle.cyclePeriod}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Remitted {cycle.disbursementDate}
                      </div>
                    </td>

                    {/* Trips Reconciled */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full text-xs">
                        {cycle.tripsCount} Departures
                      </span>
                    </td>

                    {/* Gross Revenue */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-900">
                        SAR {cycle.grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Fee & VAT */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-rose-600">
                        - SAR {(cycle.commission + cycle.vat).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Net Remittance */}
                    <td className="py-3.5 px-4">
                      <span className="font-black text-[#550036] text-sm">
                        SAR {cycle.netPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          cycle.status === "Disbursed"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{cycle.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/payouts/${cycle.id}`}
                          className="p-1.5 rounded-lg bg-gray-50 hover:bg-[#550036] text-gray-600 hover:text-white transition-colors"
                          title="View Statement Breakdown"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => alert(`Downloading formal PDF tax invoice for statement ${cycle.id}...`)}
                          className="p-1.5 rounded-lg bg-gray-50 hover:bg-[#550036] text-gray-600 hover:text-white transition-colors"
                          title="Download Tax Invoice (PDF)"
                        >
                          <Download className="w-4 h-4" />
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
    </AdminLayout>
  );
}

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
import { mockSettlements, SettlementCycle } from "@/data/mockData";

export default function OperatorPayoutsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedSettlement, setSelectedSettlement] = useState<SettlementCycle | null>(null);

  const filteredSettlements = mockSettlements.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bankRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cyclePeriod.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Finance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Earnings & Settlements</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-[#5C0030] tracking-tight flex items-center gap-2.5">
            Earnings & Bank Payouts
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Bi-weekly SARIE remittances into your Al Rajhi Bank corporate account, audited tax invoices, and cycle settlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Download ZATCA Invoices (ZIP)</span>
          </button>
        </div>
      </div>

      {/* Primary Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Payout Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#3B001F] to-[#760046] text-white shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-200 uppercase tracking-wider">
                Upcoming SARIE Remittance
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE26D] text-[#765B00]">
                Scheduled
              </span>
            </div>
            <div className="text-3xl font-black tracking-tight">SAR 312,450.00</div>
            <p className="text-xs text-pink-100 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-[#FFE26D]" />
              Direct deposit on <strong>Sunday, 2 Nov 2026</strong>
            </p>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-pink-200">
            <span>Cycle: Oct 15 - Oct 21</span>
            <span className="font-semibold">Al Rajhi Bank (•• 3410)</span>
          </div>
        </div>

        {/* Depository Bank Account Card */}
        <div className="p-6 rounded-2xl bg-white border border-stroke shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Verified Bank Account
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active & Verified
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900">Al Rajhi Banking Corp.</h3>
                <p className="text-xs text-gray-400">Arabia Fleet Transport Ltd.</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl font-mono text-xs text-gray-800 font-bold tracking-wider">
              SA44 8000 0412 •••• 3410
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>SAMA Direct SARIE</span>
            <span className="text-emerald-600 font-semibold">Instant Clearing</span>
          </div>
        </div>

        {/* Year-To-Date Totals */}
        <div className="p-6 rounded-2xl bg-white border border-stroke shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Total Settled YTD (2026)
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">SAR 4,892,100.00</div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span>+18.4% growth vs previous period</span>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Total Completed Trips:</span>
              <span className="font-bold text-gray-900">1,480 Trips</span>
            </div>
            <div className="flex justify-between">
              <span>Passengers Transported:</span>
              <span className="font-bold text-gray-900">62,190 Pax</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cycle ID, bank reference, or dates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5C0030]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#5C0030]"
        >
          <option value="ALL">All Remittance Statuses</option>
          <option value="Paid">Paid / Deposited</option>
          <option value="Processing">Processing</option>
          <option value="Pending">Pending Audit</option>
        </select>
      </div>

      {/* Settlement Cycles Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">Cycle ID & Dates</th>
                <th className="py-4 px-5">Gross Fares</th>
                <th className="py-4 px-5">Platform Commission (10%)</th>
                <th className="py-4 px-5">Net Bank Deposit</th>
                <th className="py-4 px-5">SARIE Bank Reference</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Tax Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredSettlements.map((cycle) => (
                <tr key={cycle.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block text-sm">{cycle.id}</span>
                    <span className="text-[11px] text-gray-500">{cycle.cyclePeriod}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">
                      SAR {cycle.grossAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-400">{cycle.tripsCount} Completed Trips</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-[#950250]">
                      -SAR {cycle.commissionFee.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-400 block">Standard Tier (10%)</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-emerald-700 text-sm block">
                      SAR {cycle.netPayout.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Direct Deposit</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-mono text-xs font-semibold text-gray-800 block">
                      {cycle.bankRef}
                    </span>
                    <span className="text-[10px] text-gray-400">{cycle.payoutDate}</span>
                  </td>

                  <td className="py-4 px-5">
                    {cycle.status === "Paid" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Deposited
                      </span>
                    )}
                    {cycle.status === "Processing" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Clock className="w-3 h-3 text-blue-600" />
                        Processing
                      </span>
                    )}
                    {cycle.status === "Pending" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedSettlement(cycle)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#5C0030]" />
                      <span>ZATCA PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedSettlement && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stroke space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">
                  ZATCA Tax Statement: {selectedSettlement.id}
                </h3>
                <p className="text-xs text-gray-500">Arabia Fleet Transport Ltd.</p>
              </div>
              <button
                onClick={() => setSelectedSettlement(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Billing Period:</span>
                <span className="font-bold text-gray-900">{selectedSettlement.cyclePeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gross Ticket Sales:</span>
                <span className="font-bold text-gray-900">
                  SAR {selectedSettlement.grossAmount.toLocaleString()}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Platform Commission (10%):</span>
                <span className="font-bold text-[#950250]">
                  -SAR {selectedSettlement.commissionFee.toLocaleString()}.00
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="text-gray-800 font-bold">Net Direct Deposit:</span>
                <span className="font-black text-emerald-700 text-sm">
                  SAR {selectedSettlement.netPayout.toLocaleString()}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">SARIE Bank Reference:</span>
                <span className="font-mono text-gray-800">{selectedSettlement.bankRef}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSettlement(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#5C0030] text-white text-xs font-bold hover:bg-[#72003c] transition-colors"
              >
                Download PDF
              </button>
              <button
                onClick={() => setSelectedSettlement(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

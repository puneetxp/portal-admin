"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Landmark,
  FileText,
  Calendar,
  DollarSign,
  ShieldCheck,
  Printer,
  Bus as BusIcon,
  ChevronRight,
  Clock,
  ExternalLink,
  Info,
  Sparkles,
} from "lucide-react";
import { mockSettlements, mockOperatorTrips, mockOperatorProfile } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function PayoutSettlementDetailPage() {
  const params = useParams();
  const settlementId = (params?.id as string) || "SETT-2026-0814";

  // Find cycle or fallback to default
  const cycle =
    mockSettlements.find((s) => s.id === settlementId) || mockSettlements[0];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20 max-w-7xl mx-auto">
        {/* Top Header matching Figma 1546:2978 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs">
          <div className="flex items-center gap-4">
            <Link
              href="/payouts"
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-[#550036] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                <Link href="/payouts" className="hover:text-gray-600">Settlements</Link>
                <span>/</span>
                <span className="text-[#950250]">{cycle.id}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-[#550036] tracking-tight">
                Settlement Statement {cycle.id}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Official billing statement for operating cycle {cycle.cyclePeriod}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[12.8px] border border-[#88717A] text-[#550036] bg-white font-semibold text-xs hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4 text-[#550036]" />
              <span>Print Statement</span>
            </button>
            <button
              onClick={() => alert(`Downloading formal PDF tax invoice for ${cycle.id}...`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12.8px] bg-gradient-to-r from-[#550036] to-[#7C0051] text-white font-semibold text-xs shadow-md hover:opacity-95 transition-all active:scale-98"
            >
              <Download className="w-4 h-4 text-[#FFE26D]" />
              <span>Download Formal PDF Invoice</span>
            </button>
          </div>
        </div>

        {/* 4-Step Progress Status Tracker matching Figma 1546:3022 */}
        <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Settlement Disbursement Lifecycle
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Direct Depository Complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF7F8] border border-[#DCBFC8] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">1. Generated & Audited</span>
                <span className="text-[11px] text-gray-500 block mt-0.5">Cycle closed Oct 15</span>
                <span className="text-[10px] text-emerald-700 font-semibold">486 trips audited</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F8] border border-[#DCBFC8] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">2. Taxes & Fees Verified</span>
                <span className="text-[11px] text-gray-500 block mt-0.5">10% Platform fee + 15% VAT</span>
                <span className="text-[10px] text-emerald-700 font-semibold">ZATCA compliant</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F8] border border-[#DCBFC8] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">3. Finance Approved</span>
                <span className="text-[11px] text-gray-500 block mt-0.5">Authorized by Controller</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Batch SARIE #B-881</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-950 block">4. Remitted to Bank</span>
                <span className="text-[11px] text-emerald-800 block mt-0.5">{cycle.disbursementDate}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-700">{cycle.bankRef}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid: Financial Summary Card (Deep Maroon #8A0D54) + Remarks + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Maroon Financial Summary Card matching Figma 1546:3046 (7 Cols) */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-[24px] bg-[#8A0D54] text-white p-7 shadow-md">
            {/* Blurred Glow Overlays matching Figma */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/20 blur-xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-pink-200 font-bold block">
                    Net Operator Remittance
                  </span>
                  <div className="text-4xl font-black text-white tracking-tight mt-1">
                    SAR {cycle.netPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FFE26D] border border-white/20">
                  Fully Settled
                </div>
              </div>

              {/* Itemized summary breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 text-pink-100">
                  <span>Gross Ticket Volume ({cycle.tripsCount} Scheduled Trips):</span>
                  <span className="font-bold text-white">
                    SAR {cycle.grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between py-1 text-pink-100">
                  <span>Bus Arabia Commission (10.0% Service Contract):</span>
                  <span className="font-bold text-[#FFE26D]">
                    - SAR {cycle.commission.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between py-1 text-pink-100">
                  <span>Value Added Tax (15% ZATCA Requirement):</span>
                  <span className="font-bold text-[#FFE26D]">
                    - SAR {cycle.vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {cycle.adjustments !== 0 && (
                  <div className="flex justify-between py-1 text-pink-100">
                    <span>Operational Adjustments:</span>
                    <span className="font-bold text-white">
                      SAR {cycle.adjustments.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-white/20 text-sm font-bold text-white">
                  <span>Disbursed Electronic Wire Total:</span>
                  <span className="text-base font-black text-[#FFE26D]">
                    SAR {cycle.netPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 & 3: Depository Bank & Remarks (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Depository Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Remittance Depository Bank
                </span>
                <span className="text-xs font-mono font-bold text-[#550036]">
                  {cycle.bankRef}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Corporate Payee</span>
                  <span className="font-bold text-gray-900 text-sm">
                    {mockOperatorProfile.companyName || "Saudi National Transport Co."}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Clearing Bank</span>
                  <span className="font-semibold text-gray-800">{cycle.bankName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Designated IBAN</span>
                  <span className="font-mono font-bold text-[#550036]">{cycle.ibanMasked}</span>
                </div>
              </div>
            </div>

            {/* Adjustments & Operational Remarks Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block pb-2 border-b border-gray-100">
                Auditor Remarks & Notes
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                Statement audited and reconciled with standard 10% platform facilitation fee. No operational penalties or route cancellation deductions were assessed during this billing window.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Remittance cleared via SARIE RTGS with 100% reconciliation accuracy.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Itemized Trips Breakdown Table matching Figma 1546:3113 */}
        <div className="bg-white rounded-2xl border border-[#DBBFC933] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Itemized Completed Departures in this Settlement
              </h3>
              <p className="text-xs text-gray-400">
                Audited departure volume reconciled in statement #{cycle.id}
              </p>
            </div>
            <span className="text-xs font-bold text-[#550036] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Sample of Audited Roster
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Trip Code</th>
                  <th className="py-3 px-4">Corridor Route</th>
                  <th className="py-3 px-4">Departure Date & Time</th>
                  <th className="py-3 px-4 text-center">Seats Filled</th>
                  <th className="py-3 px-4">Gross Fare (SAR)</th>
                  <th className="py-3 px-4">Platform Fee (10%)</th>
                  <th className="py-3 px-4 text-right">Net Operator Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockOperatorTrips.map((trip) => {
                  const gross = trip.fare * trip.allocatedSeats;
                  const fee = gross * 0.1;
                  const net = gross - fee;

                  return (
                    <tr key={trip.id} className="hover:bg-pink-50/20 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                        {trip.tripNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">{trip.origin} → {trip.destination}</div>
                        <div className="text-[10px] text-gray-400 font-mono">Route {trip.routeCode}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <div>{trip.departureDate}</div>
                        <div className="text-[11px] text-gray-400">{trip.departureTime}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-gray-800">
                          {trip.allocatedSeats} / {trip.totalSeats}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        SAR {gross.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-rose-600 font-semibold">
                        - SAR {fee.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-[#550036] text-sm">
                        SAR {net.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  AlertCircle,
  Wallet,
  Clock
} from "lucide-react";
import { initialRefundRequests, RefundRequest } from "@/data/mockData";

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState<RefundRequest[]>(initialRefundRequests);
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | null>(null);

  const handleConfirmAction = () => {
    if (!selectedRefund || !actionType) return;
    setRefunds(
      refunds.map((r) =>
        r.id === selectedRefund.id
          ? { ...r, status: actionType === "APPROVE" ? "Approved" : "Rejected" }
          : r
      )
    );
    setSelectedRefund(null);
    setActionType(null);
  };

  const filtered = refunds.filter(
    (r) => filterStatus === "ALL" || r.status === filterStatus
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Finance & Disputes</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Refund & Wallet Claims
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-[#B20163] font-bold">
              {refunds.length} Total Applications
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Process passenger refund claims, automated wallet credits, and payment gateway reversals.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 bg-white border border-stroke hover:bg-[#FAF5F7] shadow-xs transition-all">
          <Download className="w-4 h-4 text-gray-500" />
          <span>Export Requests</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Pending Claims
          </span>
          <div className="text-3xl font-extrabold text-amber-600 mt-1">2</div>
          <div className="text-xs text-amber-700 mt-2 font-medium">Awaiting administrator approval</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Approved This Month
          </span>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">SAR 18,450</div>
          <div className="text-xs text-emerald-600 mt-2 font-medium">Processed to wallet/cards</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Average Resolution Time
          </span>
          <div className="text-3xl font-extrabold text-[#550036] mt-1">4.2 Hrs</div>
          <div className="text-xs text-gray-500 mt-2">Well within 24h SLA target</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stroke shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {["ALL", "Pending Approval", "Approved", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                filterStatus === st
                  ? "bg-[#550036] text-white shadow-xs font-bold"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Refunds Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF5F7] border-b border-stroke text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Request ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Claim Amount</th>
                <th className="py-3 px-6">Refund Method</th>
                <th className="py-3 px-6">PNR Reference</th>
                <th className="py-3 px-6">Reason Given</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke/60 font-medium text-gray-800">
              {filtered.map((rf) => {
                const statusStyles = {
                  "Pending Approval": "bg-amber-50 text-amber-700 border-amber-200",
                  "Approved": "bg-emerald-50 text-emerald-700 border-emerald-200",
                  "Rejected": "bg-rose-50 text-rose-700 border-rose-200",
                }[rf.status];

                return (
                  <tr key={rf.id} className="hover:bg-pink-50/20 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-[#550036]">
                      {rf.requestId}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-gray-900">{rf.customerName}</div>
                      <div className="text-[11px] text-gray-400">{rf.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-6 font-black text-gray-900 text-sm">
                      {rf.amount} SAR
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-gray-800">{rf.method}</span>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#550036]">#{rf.pnr}</td>
                    <td className="py-3.5 px-6 text-gray-600 max-w-xs truncate">{rf.reason}</td>
                    <td className="py-3.5 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${statusStyles}`}>
                        {rf.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {rf.status === "Pending Approval" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedRefund(rf);
                              setActionType("APPROVE");
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRefund(rf);
                              setActionType("REJECT");
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[11px]">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedRefund && actionType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <h3 className="text-lg font-black text-gray-900">
                {actionType === "APPROVE" ? "Confirm Refund Approval" : "Reject Refund Claim"}
              </h3>
              <button
                onClick={() => {
                  setSelectedRefund(null);
                  setActionType(null);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <p className="text-gray-600">
                Are you sure you want to {actionType === "APPROVE" ? "approve and release" : "decline"} the refund of{" "}
                <span className="font-extrabold text-gray-900">{selectedRefund.amount} SAR</span> for passenger{" "}
                <span className="font-bold">{selectedRefund.customerName}</span>?
              </p>
              <div className="p-3 rounded-xl bg-[#FAF5F7] border border-stroke text-gray-700">
                <div>PNR: #{selectedRefund.pnr}</div>
                <div>Method: {selectedRefund.method}</div>
                <div>Reason: {selectedRefund.reason}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-stroke flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedRefund(null);
                  setActionType(null);
                }}
                className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs ${
                  actionType === "APPROVE" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                {actionType === "APPROVE" ? "Yes, Approve Refund" : "Yes, Reject Claim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

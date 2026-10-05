"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Shield,
  CreditCard,
  Building,
  Key,
  Globe,
  Save,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
  Server,
  Layers,
  Check,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  // Cancellation & Modification Policies State
  const [policies, setPolicies] = useState({
    cancellationWindowHours: 24,
    refundFeePercent: 10,
    lateCancelFeePercent: 30,
    rescheduleDeadlineHours: 6,
    maxReschedulesPerTicket: 2,
    autoRefundCustomerWallet: true,
  });

  // System Deadlines State
  const [deadlines, setDeadlines] = useState({
    unpaidReservationHoldMinutes: 15,
    bankTransferVerificationHours: 24,
    cashPaymentCollectionHours: 12,
    payoutCycleCutoffDay: "Wednesday 23:59 AST",
    disputeResolutionWindowDays: 7,
  });

  // TGA WASL API Configuration
  const [waslConfig, setWaslConfig] = useState({
    environment: "Production (TGA-WASL-v2)",
    apiKey: "wasl_live_99a8b1c0942e88a10",
    clientId: "busarabia_central_hub",
    autoTransmitManifests: true,
    gpsCorridorSyncRateSeconds: 30,
  });

  // SARIE Platform Escrow
  const [escrowConfig, setEscrowConfig] = useState({
    escrowAccountHolder: "Bus Arabia Platform Custody LLC",
    depositoryBank: "Saudi Central Bank (SAMA Direct Settlement)",
    iban: "SA03 8000 0000 6080 1016 7519",
    settlementCycle: "Bi-Weekly (Sunday 02:00 AST)",
    dualKeyApprovalRequired: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">System Configuration</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Platform Master Settings & Policy Governance
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#320120] text-[#FFE26D]">
              Super Admin
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure cross-carrier cancellation deadlines, TGA WASL regulatory APIs, and SAMA SARIE settlement rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#320120] hover:bg-[#480230] text-white text-xs font-bold transition-all shadow-md active:scale-98"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-[#FFE26D]" />
              <span>Policies Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-[#FFE26D]" />
              <span>Save System Changes</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TGA WASL API Configuration */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">TGA / MOT WASL Regulatory Gateway</h2>
              <p className="text-[11px] text-gray-400">Transport General Authority real-time telemetry link</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">WASL Gateway Environment</label>
              <input
                type="text"
                value={waslConfig.environment}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-600 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Live API Secret Key</label>
              <input
                type="password"
                value={waslConfig.apiKey}
                onChange={(e) => setWaslConfig({ ...waslConfig, apiKey: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-gray-200 rounded-xl font-mono text-xs focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-gray-800">Auto-Transmit Passenger Manifests</p>
                <p className="text-[10px] text-gray-400">Transmit to TGA at time of coach departure</p>
              </div>
              <input
                type="checkbox"
                checked={waslConfig.autoTransmitManifests}
                onChange={(e) => setWaslConfig({ ...waslConfig, autoTransmitManifests: e.target.checked })}
                className="rounded text-[#950250] focus:ring-[#950250] h-4 w-4"
              />
            </div>
          </div>
        </div>

        {/* SAMA SARIE Settlement Escrow Configuration */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">SAMA SARIE Platform Escrow</h2>
              <p className="text-[11px] text-gray-400">Master custody account for passenger ticket funds</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Escrow Custody Entity</label>
              <input
                type="text"
                value={escrowConfig.escrowAccountHolder}
                onChange={(e) => setEscrowConfig({ ...escrowConfig, escrowAccountHolder: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-gray-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Master Escrow IBAN</label>
              <input
                type="text"
                value={escrowConfig.iban}
                onChange={(e) => setEscrowConfig({ ...escrowConfig, iban: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-gray-200 rounded-xl font-mono text-xs font-bold focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-gray-800">Dual-Key Approval for SARIE Releases</p>
                <p className="text-[10px] text-gray-400">Requires Head of Finance + Super Admin release</p>
              </div>
              <input
                type="checkbox"
                checked={escrowConfig.dualKeyApprovalRequired}
                onChange={(e) => setEscrowConfig({ ...escrowConfig, dualKeyApprovalRequired: e.target.checked })}
                className="rounded text-[#950250] focus:ring-[#950250] h-4 w-4"
              />
            </div>
          </div>
        </div>

        {/* Cancellation & Refund Policies */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#950250]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">Standard Passenger Ticket Policies</h2>
              <p className="text-[11px] text-gray-400">Applies across all 38 carrier routes unless overridden</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Free Cancel Window (Hours)</label>
              <input
                type="number"
                value={policies.cancellationWindowHours}
                onChange={(e) => setPolicies({ ...policies, cancellationWindowHours: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-gray-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Standard Refund Fee (%)</label>
              <input
                type="number"
                value={policies.refundFeePercent}
                onChange={(e) => setPolicies({ ...policies, refundFeePercent: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-gray-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Reservation Hold Deadlines */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">Seat Hold & Inventory Locks</h2>
              <p className="text-[11px] text-gray-400">Checkout lock duration and payment expiry</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Seat Lock (Minutes)</label>
              <input
                type="number"
                value={deadlines.unpaidReservationHoldMinutes}
                onChange={(e) => setDeadlines({ ...deadlines, unpaidReservationHoldMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-gray-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Dispute Window (Days)</label>
              <input
                type="number"
                value={deadlines.disputeResolutionWindowDays}
                onChange={(e) => setDeadlines({ ...deadlines, disputeResolutionWindowDays: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-gray-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

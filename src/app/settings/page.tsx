"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
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
  Edit3,
  X,
  Server,
  Layers,
  Check,
} from "lucide-react";

export default function PlatformSettingsPage() {
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

  // Bank Transfer Instructions State
  const [bankInstructions, setBankInstructions] = useState({
    beneficiaryName: "Bus Arabia Logistics & Transport Services Co.",
    bankName: "Al Rajhi Bank (KSA)",
    iban: "SA03 8000 0000 6080 1016 7519",
    swiftCode: "RJHISARI",
    accountNumber: "608010167519",
    notesEn:
      "Please write your Booking Reference Number (e.g. BKG-XXXX) in the transfer description.",
    notesAr:
      "يرجى كتابة رقم الحجز المرجعي في خانة الملاحظات / الغرض من التحويل البنكي.",
  });

  // Cash Payment Instructions State
  const [cashInstructions, setCashInstructions] = useState({
    allowedBranches: "All Official Bus Arabia Central Terminal Counters",
    collectionCutoffMinutes: 60,
    receiptPolicy: "Passenger must show SMS/Email booking code at counter.",
    cashierReconciliationCutoff: "Daily at 23:00 AST",
  });

  // Technical & Tax Config State
  const [technical, setTechnical] = useState({
    vatNumber: "300456789000003",
    zatcaComplianceActive: true,
    maintenanceMode: false,
    gpsPingIntervalSeconds: 15,
    apiRateLimitPerMinute: 1200,
  });

  // Modals
  const [editingBankModal, setEditingBankModal] = useState(false);
  const [editingCashModal, setEditingCashModal] = useState(false);

  const handleSaveAll = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-24">
        {/* Sophisticated Header - Figma 1483:3 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DBBFC9] shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#554149] mb-1">
              <span>Platform Administration</span>
              <span>/</span>
              <span className="text-[#550036] font-bold">Settings</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1C1B1B] tracking-tight font-heading">
              Platform Settings
            </h1>
            <p className="text-sm text-[#554149] mt-1">
              Configure operational policies, payment instructions, deadlines, and platform rules.
            </p>
          </div>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 bg-[#550036] hover:bg-[#43002a] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all self-start md:self-auto"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Changes Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>

        {/* Bento Grid Layout - Figma 1483:32 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Policies & Deadlines (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cancellation & Modification Policies - Figma 1483:34 */}
            <div className="bg-white rounded-2xl border border-[#DBBFC9] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#550036]/10 text-[#550036] flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#1C1B1B]">
                      Cancellation & Modification Policies
                    </h2>
                    <p className="text-xs text-[#554149]">
                      Governs passenger refund eligibility, penalty deductions, and reschedule bounds.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active in Production
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Standard Free Cancel Window (Hours)
                  </label>
                  <input
                    type="number"
                    value={policies.cancellationWindowHours}
                    onChange={(e) =>
                      setPolicies({ ...policies, cancellationWindowHours: Number(e.target.value) })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Full refund if cancelled before this threshold.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Cancellation Processing Fee (%)
                  </label>
                  <input
                    type="number"
                    value={policies.refundFeePercent}
                    onChange={(e) =>
                      setPolicies({ ...policies, refundFeePercent: Number(e.target.value) })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Platform handling retention fee.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Late Cancellation Penalty (%)
                  </label>
                  <input
                    type="number"
                    value={policies.lateCancelFeePercent}
                    onChange={(e) =>
                      setPolicies({ ...policies, lateCancelFeePercent: Number(e.target.value) })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Applies within 12h of scheduled trip departure.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Reschedule Deadline (Hours)
                  </label>
                  <input
                    type="number"
                    value={policies.rescheduleDeadlineHours}
                    onChange={(e) =>
                      setPolicies({
                        ...policies,
                        rescheduleDeadlineHours: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Last moment a passenger can self-change seat or date.
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1C1B1B]">
                    Instant Customer Wallet Refund
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Credit eligible refunds to in-app wallet immediately rather than bank reversal (3-5 days).
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={policies.autoRefundCustomerWallet}
                  onChange={(e) =>
                    setPolicies({ ...policies, autoRefundCustomerWallet: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#550036] rounded"
                />
              </div>
            </div>

            {/* System Deadlines - Figma 1483:78 */}
            <div className="bg-white rounded-2xl border border-[#DBBFC9] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#765B00] flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#1C1B1B]">System Deadlines & SLAs</h2>
                    <p className="text-xs text-[#554149]">
                      Automated background timers for payment hold, expiry, and cycle cutoffs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Unpaid Seat Hold TTL (Minutes)
                  </label>
                  <input
                    type="number"
                    value={deadlines.unpaidReservationHoldMinutes}
                    onChange={(e) =>
                      setDeadlines({
                        ...deadlines,
                        unpaidReservationHoldMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Seats auto-released if payment intent not completed.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Bank Transfer Proof SLA (Hours)
                  </label>
                  <input
                    type="number"
                    value={deadlines.bankTransferVerificationHours}
                    onChange={(e) =>
                      setDeadlines({
                        ...deadlines,
                        bankTransferVerificationHours: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Allowed grace period before reservation auto-voids.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Payout Cycle Lock Period
                  </label>
                  <input
                    type="text"
                    value={deadlines.payoutCycleCutoffDay}
                    onChange={(e) =>
                      setDeadlines({ ...deadlines, payoutCycleCutoffDay: e.target.value })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Weekly batch settlement calculation freeze time.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#554149] mb-1.5">
                    Operator Dispute Window (Days)
                  </label>
                  <input
                    type="number"
                    value={deadlines.disputeResolutionWindowDays}
                    onChange={(e) =>
                      setDeadlines({
                        ...deadlines,
                        disputeResolutionWindowDays: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Timeframe to query automated deductions or penalties.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Instructions & Tech Config (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Bank Transfer Instructions - Figma 1483:229 */}
            <div className="bg-white rounded-2xl border border-[#DBBFC9] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#550036]" />
                  <h3 className="text-sm font-bold text-[#1C1B1B]">Bank Transfer Instructions</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBankModal(true)}
                  className="flex items-center gap-1 text-xs font-bold text-[#550036] hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="p-3 bg-[#FAF7F8] rounded-xl border border-[#DBBFC9]/50">
                  <span className="text-[10px] uppercase font-bold text-[#554149] block">
                    Beneficiary Entity
                  </span>
                  <span className="font-bold text-[#1C1B1B]">
                    {bankInstructions.beneficiaryName}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF7F8] rounded-xl border border-[#DBBFC9]/50">
                  <span className="text-[10px] uppercase font-bold text-[#554149] block">
                    Bank & Swift
                  </span>
                  <div className="font-bold text-[#1C1B1B]">{bankInstructions.bankName}</div>
                  <div className="font-mono text-[11px] text-gray-500">
                    Swift: {bankInstructions.swiftCode}
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F8] rounded-xl border border-[#DBBFC9]/50">
                  <span className="text-[10px] uppercase font-bold text-[#554149] block">
                    Corporate IBAN
                  </span>
                  <div className="font-mono text-xs font-bold text-[#550036] break-all">
                    {bankInstructions.iban}
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Payment Instructions - Figma 1483:442 */}
            <div className="bg-white rounded-2xl border border-[#DBBFC9] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#765B00]" />
                  <h3 className="text-sm font-bold text-[#1C1B1B]">Cash Payment Instructions</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingCashModal(true)}
                  className="flex items-center gap-1 text-xs font-bold text-[#550036] hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <span className="text-[10px] uppercase font-bold text-[#765B00] block">
                    Authorized Collection Points
                  </span>
                  <span className="font-semibold text-gray-900">
                    {cashInstructions.allowedBranches}
                  </span>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <span className="text-[10px] uppercase font-bold text-[#765B00] block">
                    Departure Cutoff
                  </span>
                  <span className="font-semibold text-gray-900">
                    Must be paid {cashInstructions.collectionCutoffMinutes} mins before departure
                  </span>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <span className="text-[10px] uppercase font-bold text-[#765B00] block">
                    Daily Cashier Reconciliation
                  </span>
                  <span className="font-semibold text-gray-900">
                    {cashInstructions.cashierReconciliationCutoff}
                  </span>
                </div>
              </div>
            </div>

            {/* Technical & Tax Configuration - Figma 1483:739 */}
            <div className="bg-white rounded-2xl border border-[#DBBFC9] p-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Server className="w-4 h-4 text-gray-700" />
                <h3 className="text-sm font-bold text-[#1C1B1B]">ZATCA & Technical Engine</h3>
              </div>

              <div className="mt-3 space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#554149] mb-1">
                    ZATCA Tax Identification Number
                  </label>
                  <input
                    type="text"
                    value={technical.vatNumber}
                    onChange={(e) => setTechnical({ ...technical, vatNumber: e.target.value })}
                    className="w-full bg-[#F4F7F9] border border-[#DBBFC9] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#1C1B1B]"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="font-bold text-[#1C1B1B]">ZATCA Phase 2 E-Invoicing</div>
                    <div className="text-[10px] text-gray-500">Cryptographic QR stamping active</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={technical.zatcaComplianceActive}
                    onChange={(e) =>
                      setTechnical({ ...technical, zatcaComplianceActive: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#550036] rounded"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <div className="font-bold text-rose-600">Platform Maintenance Mode</div>
                    <div className="text-[10px] text-gray-500">Presents maintenance splash to consumers</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={technical.maintenanceMode}
                    onChange={(e) =>
                      setTechnical({ ...technical, maintenanceMode: e.target.checked })
                    }
                    className="w-4 h-4 accent-rose-600 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Edit Bank Transfer Instructions */}
        {editingBankModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-[#DBBFC9] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-6 bg-gradient-to-r from-[#550036] to-[#760046] text-white flex items-center justify-between">
                <h3 className="text-base font-bold">Edit Bank Transfer Instructions</h3>
                <button
                  onClick={() => setEditingBankModal(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Beneficiary Name</label>
                  <input
                    type="text"
                    value={bankInstructions.beneficiaryName}
                    onChange={(e) =>
                      setBankInstructions({ ...bankInstructions, beneficiaryName: e.target.value })
                    }
                    className="w-full bg-[#F4F7F9] border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankInstructions.bankName}
                    onChange={(e) =>
                      setBankInstructions({ ...bankInstructions, bankName: e.target.value })
                    }
                    className="w-full bg-[#F4F7F9] border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">IBAN Number</label>
                  <input
                    type="text"
                    value={bankInstructions.iban}
                    onChange={(e) =>
                      setBankInstructions({ ...bankInstructions, iban: e.target.value })
                    }
                    className="w-full bg-[#F4F7F9] border border-gray-300 rounded-lg p-2.5 text-xs font-mono font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Transfer Remarks Note</label>
                  <textarea
                    rows={2}
                    value={bankInstructions.notesEn}
                    onChange={(e) =>
                      setBankInstructions({ ...bankInstructions, notesEn: e.target.value })
                    }
                    className="w-full bg-[#F4F7F9] border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBankModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBankModal(false);
                    setIsSaved(true);
                    setTimeout(() => setIsSaved(false), 2000);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#550036] text-white hover:bg-[#43002a]"
                >
                  Save Banking Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Edit Cash Instructions */}
        {editingCashModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-[#DBBFC9] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-6 bg-gradient-to-r from-[#765B00] to-[#997600] text-white flex items-center justify-between">
                <h3 className="text-base font-bold">Edit Cash Payment Instructions</h3>
                <button
                  onClick={() => setEditingCashModal(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Authorized Branches</label>
                  <input
                    type="text"
                    value={cashInstructions.allowedBranches}
                    onChange={(e) =>
                      setCashInstructions({ ...cashInstructions, allowedBranches: e.target.value })
                    }
                    className="w-full bg-[#F4F7F9] border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Collection Cutoff Before Trip (Minutes)
                  </label>
                  <input
                    type="number"
                    value={cashInstructions.collectionCutoffMinutes}
                    onChange={(e) =>
                      setCashInstructions({
                        ...cashInstructions,
                        collectionCutoffMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#F4F7F9] border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Counter Receipt Policy</label>
                  <textarea
                    rows={2}
                    value={cashInstructions.receiptPolicy}
                    onChange={(e) =>
                      setCashInstructions({ ...cashInstructions, receiptPolicy: e.target.value })
                    }
                    className="w-full bg-[#F4F7F9] border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCashModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCashModal(false);
                    setIsSaved(true);
                    setTimeout(() => setIsSaved(false), 2000);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#765B00] text-white hover:bg-[#5b4600]"
                >
                  Save Cash Instructions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

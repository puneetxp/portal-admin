"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  FileCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Download,
  AlertTriangle,
  Building,
  Receipt,
  FileText,
  Calendar,
  Check,
  X,
  CreditCard,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

interface VerificationEntry {
  id: string;
  bookingRef: string;
  passengerName: string;
  passengerPhone: string;
  amount: number;
  method: "Bank Transfer" | "Cash Deposit";
  bankName?: string;
  wireRef?: string;
  stationName?: string;
  counterfoilUrl?: string;
  submittedAt: string;
  status: "Bank Transfer Pending" | "Cash Pending" | "Verified" | "Rejected" | "Expired/Cancelled";
  notes?: string;
}

const mockVerifications: VerificationEntry[] = [
  {
    id: "VR-01",
    bookingRef: "BKG-9921",
    passengerName: "Turki Al-Ghamdi",
    passengerPhone: "+966 50 123 4567",
    amount: 280.0,
    method: "Bank Transfer",
    bankName: "Al Rajhi Bank",
    wireRef: "SARIE-99882190",
    submittedAt: "15m ago",
    status: "Bank Transfer Pending",
  },
  {
    id: "VR-02",
    bookingRef: "BKG-9918",
    passengerName: "Noura Al-Hassan",
    passengerPhone: "+966 55 987 6543",
    amount: 140.0,
    method: "Bank Transfer",
    bankName: "SNB (AlAhli)",
    wireRef: "ACH-44120934",
    submittedAt: "32m ago",
    status: "Bank Transfer Pending",
  },
  {
    id: "VR-03",
    bookingRef: "BKG-9915",
    passengerName: "Sultan Al-Otaibi",
    passengerPhone: "+966 56 333 8899",
    amount: 420.0,
    method: "Cash Deposit",
    stationName: "Riyadh Central Bus Terminal (Counter 03)",
    wireRef: "CSH-RC-8812",
    submittedAt: "45m ago",
    status: "Cash Pending",
  },
  {
    id: "VR-04",
    bookingRef: "BKG-9912",
    passengerName: "Fahad Al-Harbi",
    passengerPhone: "+966 54 222 1100",
    amount: 160.0,
    method: "Cash Deposit",
    stationName: "Jeddah Al-Balad Terminal (Counter 01)",
    wireRef: "CSH-JD-9011",
    submittedAt: "1h 10m ago",
    status: "Cash Pending",
  },
  {
    id: "VR-05",
    bookingRef: "BKG-9890",
    passengerName: "Amina Al-Subaie",
    passengerPhone: "+966 50 777 9922",
    amount: 320.0,
    method: "Bank Transfer",
    bankName: "Riyad Bank",
    wireRef: "SARIE-77219902",
    submittedAt: "2h ago",
    status: "Verified",
    notes: "Verified by Cashier #12. Match found on Al Rajhi statement.",
  },
  {
    id: "VR-06",
    bookingRef: "BKG-9884",
    passengerName: "Bandar Al-Mutairi",
    passengerPhone: "+966 55 444 3311",
    amount: 210.0,
    method: "Bank Transfer",
    bankName: "Alinma Bank",
    wireRef: "ACH-11099231",
    submittedAt: "3h ago",
    status: "Rejected",
    notes: "Transfer amount does not match booking sum (short by SAR 40).",
  },
  {
    id: "VR-07",
    bookingRef: "BKG-9870",
    passengerName: "Majed Al-Shehri",
    passengerPhone: "+966 53 888 1234",
    amount: 190.0,
    method: "Bank Transfer",
    submittedAt: "24h ago",
    status: "Expired/Cancelled",
    notes: "No counterfoil submitted within 24h grace window.",
  },
];

type VerificationTab =
  | "Bank Transfer Pending"
  | "Cash Pending"
  | "Verified"
  | "Rejected"
  | "Expired/Cancelled";

export default function PaymentVerificationPage() {
  const [items, setItems] = useState<VerificationEntry[]>(mockVerifications);
  const [activeTab, setActiveTab] = useState<VerificationTab>("Bank Transfer Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<VerificationEntry | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  // Tab counts
  const bankPendingCount = items.filter((i) => i.status === "Bank Transfer Pending").length;
  const cashPendingCount = items.filter((i) => i.status === "Cash Pending").length;
  const verifiedCount = items.filter((i) => i.status === "Verified").length;
  const rejectedCount = items.filter((i) => i.status === "Rejected").length;
  const expiredCount = items.filter((i) => i.status === "Expired/Cancelled").length;

  const filteredItems = items.filter((item) => {
    if (item.status !== activeTab) return false;
    if (
      searchQuery &&
      !item.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(item.wireRef && item.wireRef.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  const handleApprove = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: "Verified" } : i)));
    setSelectedEntry(null);
  };

  const handleReject = (id: string) => {
    setItems(
      items.map((i) =>
        i.id === id
          ? {
              ...i,
              status: "Rejected",
              notes: rejectReason || "Rejected by finance operator",
            }
          : i
      )
    );
    setIsRejecting(false);
    setRejectReason("");
    setSelectedEntry(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20">
        {/* Sophisticated Header - Figma 602:10053 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DBBFC9] shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#554149] mb-1">
              <span>Financial Ledger</span>
              <span>/</span>
              <span className="text-[#550036] font-bold">Verification</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1C1B1B] tracking-tight font-heading">
              Payment Verification Queue
            </h1>
            <p className="text-sm text-[#554149] mt-1">
              Review and clear manual bank transfers, station counterfoils, and cash deposits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Verification Queue Report exported.")}
              className="flex items-center gap-2 bg-[#550036] hover:bg-[#43002a] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Queue</span>
            </button>
          </div>
        </div>

        {/* Verification Tabs - Figma 602:10064 */}
        <div className="bg-white rounded-2xl border border-[#DBBFC9] p-2 shadow-xs flex items-center overflow-x-auto gap-2">
          {/* Tab 1: Bank Transfer Pending */}
          <button
            onClick={() => setActiveTab("Bank Transfer Pending")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-heading text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "Bank Transfer Pending"
                ? "bg-[#550036] text-white shadow-xs"
                : "text-[#554149] hover:bg-[#FAF7F8]"
            }`}
          >
            <span>Bank Transfer Pending</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeTab === "Bank Transfer Pending"
                  ? "bg-[#7C0051] text-white"
                  : "bg-pink-100 text-[#550036]"
              }`}
            >
              {bankPendingCount}
            </span>
          </button>

          {/* Tab 2: Cash Pending */}
          <button
            onClick={() => setActiveTab("Cash Pending")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-heading text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "Cash Pending"
                ? "bg-[#550036] text-white shadow-xs"
                : "text-[#554149] hover:bg-[#FAF7F8]"
            }`}
          >
            <span>Cash Pending</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeTab === "Cash Pending"
                  ? "bg-[#7C0051] text-white"
                  : "bg-gray-100 text-[#554149]"
              }`}
            >
              {cashPendingCount}
            </span>
          </button>

          {/* Tab 3: Verified */}
          <button
            onClick={() => setActiveTab("Verified")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-heading text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "Verified"
                ? "bg-[#550036] text-white shadow-xs"
                : "text-[#554149] hover:bg-[#FAF7F8]"
            }`}
          >
            <span>Verified</span>
            <span className="text-xs text-emerald-600 font-mono">({verifiedCount})</span>
          </button>

          {/* Tab 4: Rejected */}
          <button
            onClick={() => setActiveTab("Rejected")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-heading text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "Rejected"
                ? "bg-[#550036] text-white shadow-xs"
                : "text-[#554149] hover:bg-[#FAF7F8]"
            }`}
          >
            <span>Rejected</span>
            <span className="text-xs text-rose-600 font-mono">({rejectedCount})</span>
          </button>

          {/* Tab 5: Expired/Cancelled */}
          <button
            onClick={() => setActiveTab("Expired/Cancelled")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-heading text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "Expired/Cancelled"
                ? "bg-[#550036] text-white shadow-xs"
                : "text-[#554149] hover:bg-[#FAF7F8]"
            }`}
          >
            <span>Expired/Cancelled</span>
            <span className="text-xs text-gray-400 font-mono">({expiredCount})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#DBBFC9] shadow-xs flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search booking ref, customer name, wire ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F4F7F9] border border-[#DBBFC9] rounded-xl text-xs sm:text-sm text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#550036]"
            />
          </div>

          <div className="text-xs font-bold text-[#554149]">
            Showing {filteredItems.length} records in {activeTab}
          </div>
        </div>

        {/* Data Table Content - Figma 602:10084 */}
        <div className="bg-white rounded-2xl border border-[#DBBFC9] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F8] text-[#554149] font-bold border-b border-[#DBBFC9] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Booking Ref</th>
                  <th className="py-3.5 px-4">Passenger Details</th>
                  <th className="py-3.5 px-4">Method & Bank / Desk</th>
                  <th className="py-3.5 px-4">Wire / Slip Reference</th>
                  <th className="py-3.5 px-4 text-right">Amount</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400">
                      No records found matching "{activeTab}".
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedEntry(item)}
                      className="hover:bg-pink-50/20 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-4 font-mono font-bold text-[#550036]">
                        {item.bookingRef}
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-[#1C1B1B]">{item.passengerName}</div>
                        <div className="text-[10px] text-gray-400">{item.passengerPhone}</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-800">{item.method}</div>
                        <div className="text-[10px] text-gray-500">
                          {item.bankName || item.stationName}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-gray-700">
                        {item.wireRef || "—"}
                      </td>

                      <td className="py-4 px-4 text-right font-black text-sm text-[#1C1B1B]">
                        SAR {item.amount.toFixed(2)}
                      </td>

                      <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                        {item.submittedAt}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.status === "Verified"
                              ? "bg-emerald-50 text-[#0A4900] border border-emerald-200"
                              : item.status.includes("Pending")
                              ? "bg-amber-50 text-[#765B00] border border-amber-200"
                              : "bg-rose-50 text-[#BA1A1A] border border-rose-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedEntry(item)}
                            className="w-8 h-8 rounded-lg bg-pink-50 hover:bg-[#550036] text-[#550036] hover:text-white flex items-center justify-center transition-colors"
                            title="Inspect Proof & Slip"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {item.status.includes("Pending") && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(item.id)}
                                className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white flex items-center justify-center transition-colors"
                                title="Approve Verification"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedEntry(item);
                                  setIsRejecting(true);
                                }}
                                className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center transition-colors"
                                title="Reject Verification"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Inspection Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-[#DBBFC9] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-6 bg-gradient-to-r from-[#550036] to-[#760046] text-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">Verification Dossier</h3>
                  <p className="text-xs text-pink-200 font-mono">{selectedEntry.bookingRef}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedEntry(null);
                    setIsRejecting(false);
                  }}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="bg-[#FAF7F8] p-4 rounded-xl border border-[#DBBFC9]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#554149] block">
                      Booking Total Amount
                    </span>
                    <div className="text-2xl font-black text-[#550036]">
                      SAR {selectedEntry.amount.toFixed(2)}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                      selectedEntry.status === "Verified"
                        ? "bg-emerald-100 text-[#0A4900]"
                        : selectedEntry.status.includes("Pending")
                        ? "bg-amber-100 text-[#765B00]"
                        : "bg-rose-100 text-[#BA1A1A]"
                    }`}
                  >
                    {selectedEntry.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Passenger Name</span>
                    <span className="font-bold text-gray-900">{selectedEntry.passengerName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Phone Contact</span>
                    <span className="font-mono text-gray-900">{selectedEntry.passengerPhone}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Channel</span>
                    <span className="font-semibold text-gray-900">{selectedEntry.method}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Bank / Station</span>
                    <span className="text-gray-900">
                      {selectedEntry.bankName || selectedEntry.stationName}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Reference Token</span>
                    <span className="font-mono font-bold text-[#550036]">
                      {selectedEntry.wireRef || "—"}
                    </span>
                  </div>
                </div>

                {/* Counterfoil Simulated Receipt Preview */}
                <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center space-y-1">
                  <Receipt className="w-8 h-8 text-[#550036] mx-auto opacity-70" />
                  <div className="font-bold text-gray-800">Bank Transfer / Cash Slip Attached</div>
                  <div className="text-[11px] text-gray-400 font-mono">
                    SHA256: e891cf298b449102c91a01... verified
                  </div>
                </div>

                {/* Reject Reason Input (If Reject Mode) */}
                {isRejecting && (
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-2">
                    <label className="block text-xs font-bold text-rose-800">
                      State Reason for Rejection
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Counterfoil reference unreadable, or sum mismatch..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="w-full bg-white border border-rose-300 rounded-lg p-2 text-xs text-rose-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEntry(null);
                    setIsRejecting(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200"
                >
                  Close
                </button>

                {selectedEntry.status.includes("Pending") && (
                  <>
                    {!isRejecting ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsRejecting(true)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApprove(selectedEntry.id)}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-[#550036] hover:bg-[#43002a] text-white"
                        >
                          Verify & Confirm Ticket
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleReject(selectedEntry.id)}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
                      >
                        Confirm Rejection
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

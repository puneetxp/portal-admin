"use client";

import React, { useState } from "react";
import {
  Coins,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronDown,
  RotateCcw,
  BarChart3,
  Activity,
  CreditCard,
  Eye,
  Check,
  X,
  TrendingUp,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface TransactionItem {
  id: string;
  ref: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  type: "DEBIT" | "CREDIT" | "COMMISSION" | "REFUND";
  status: "Settled" | "Pending" | "Failed";
  method: "Mada" | "Apple Pay" | "Visa" | "Mastercard" | "Cash At Counter";
  bookingId: string;
  timestamp: string;
  gatewayFee: number;
}

const mockTransactions: TransactionItem[] = [
  {
    id: "TX-901",
    ref: "TXN-2023-8821",
    customerName: "Abdulaziz Al-Saud",
    customerEmail: "abdulaziz@saudi.com",
    amount: 145.0,
    type: "DEBIT",
    status: "Settled",
    method: "Mada",
    bookingId: "BKG-9921",
    timestamp: "Oct 24, 2023 14:45",
    gatewayFee: 1.45,
  },
  {
    id: "TX-902",
    ref: "TXN-2023-8820",
    customerName: "Reem Al-Ghamdi",
    customerEmail: "reem.g@gmail.com",
    amount: 220.0,
    type: "DEBIT",
    status: "Settled",
    method: "Apple Pay",
    bookingId: "BKG-9920",
    timestamp: "Oct 24, 2023 14:38",
    gatewayFee: 3.3,
  },
  {
    id: "TX-903",
    ref: "TXN-2023-8819",
    customerName: "Omar Mansoor",
    customerEmail: "omar.m@yahoo.com",
    amount: 75.0,
    type: "REFUND",
    status: "Settled",
    method: "Mada",
    bookingId: "BKG-9844",
    timestamp: "Oct 24, 2023 14:12",
    gatewayFee: 0.0,
  },
  {
    id: "TX-904",
    ref: "TXN-2023-8818",
    customerName: "Nasser Al-Dossary",
    customerEmail: "nasser.d@corp.sa",
    amount: 350.0,
    type: "DEBIT",
    status: "Pending",
    method: "Visa",
    bookingId: "BKG-9917",
    timestamp: "Oct 24, 2023 13:55",
    gatewayFee: 5.25,
  },
  {
    id: "TX-905",
    ref: "TXN-2023-8817",
    customerName: "Huda Al-Sharif",
    customerEmail: "huda.sharif@gmail.com",
    amount: 180.0,
    type: "DEBIT",
    status: "Settled",
    method: "Mastercard",
    bookingId: "BKG-9915",
    timestamp: "Oct 24, 2023 13:20",
    gatewayFee: 2.7,
  },
  {
    id: "TX-906",
    ref: "TXN-2023-8816",
    customerName: "Hamad Al-Qahtani",
    customerEmail: "hamad.q@outlook.com",
    amount: 120.0,
    type: "DEBIT",
    status: "Failed",
    method: "Mada",
    bookingId: "BKG-9912",
    timestamp: "Oct 24, 2023 12:50",
    gatewayFee: 0.0,
  },
];

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionItem[]>(mockTransactions);
  const [selectedTx, setSelectedTx] = useState<TransactionItem | null>(null);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [paymentMethod, setPaymentMethod] = useState("All Methods");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = transactions.filter((t) => {
    if (statusFilter !== "All Statuses" && t.status !== statusFilter) return false;
    if (typeFilter !== "All Types" && t.type !== typeFilter) return false;
    if (paymentMethod !== "All Methods" && t.method !== paymentMethod) return false;
    if (
      searchQuery &&
      !t.ref.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setDateRange("Last 30 Days");
    setPaymentMethod("All Methods");
    setStatusFilter("All Statuses");
    setTypeFilter("All Types");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Financial Ledger</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">All Transactions</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Financial Transactions
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time settlement stream of all bookings, cancellations, commissions, and payment gateway logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 bg-white text-gray-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-stroke hover:border-[#550036] shadow-xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#550036]" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <button
            onClick={() => alert("Comprehensive Financial Ledger (CSV) generated.")}
            className="flex items-center gap-2 bg-[#550036] hover:bg-[#72003c] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-98"
          >
            <Download className="w-4 h-4 text-[#FFE26D]" />
            <span>Export Ledger</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs border-l-4 border-l-[#550036] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Total Volume
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              12%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-gray-900">
              SAR 1,240,500
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Gross payment intent captured</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs border-l-4 border-l-amber-600 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Pending Verifications
            </span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              42 Units
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-gray-900">
              SAR 12,450
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Bank wires awaiting counter check</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs border-l-4 border-l-emerald-600 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Total Commissions
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              15.0% Avg
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-gray-900">
              SAR 186,075
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Platform operational revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs border-l-4 border-l-rose-600 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Refund Volume
            </span>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              0.6% Rate
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-gray-900">
              SAR 8,240
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Low dispute / void ratio</p>
          </div>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-[#FAF7F8] border border-stroke rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
            >
              <option>Last 30 Days</option>
              <option>Today (Oct 24)</option>
              <option>This Week</option>
              <option>Current Quarter</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-[#FAF7F8] border border-stroke rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
            >
              <option>All Methods</option>
              <option value="Mada">Mada</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Cash At Counter">Cash At Counter</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Transaction Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#FAF7F8] border border-stroke rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
            >
              <option>All Statuses</option>
              <option value="Settled">Settled</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Transaction Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-[#FAF7F8] border border-stroke rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
            >
              <option>All Types</option>
              <option value="DEBIT">Debit (Passenger Payment)</option>
              <option value="REFUND">Refund</option>
              <option value="COMMISSION">Commission Deduction</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by ref, customer, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F8] border border-stroke rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Data Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stroke bg-[#FAF7F8] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
            Showing {filtered.length} Recorded Transactions
          </span>
          <span className="text-[11px] font-mono text-[#550036] font-bold">
            Gateway Settlement: Live
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F8] text-gray-600 font-bold border-b border-stroke uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Transaction Ref</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-right">Gateway Fee</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="hover:bg-pink-50/20 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#550036]">
                    {tx.ref}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{tx.customerName}</div>
                    <div className="text-[10px] text-gray-400">{tx.customerEmail}</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-700 font-semibold">
                    {tx.bookingId}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 font-semibold text-gray-700 text-[11px]">
                      <CreditCard className="w-3 h-3 text-[#550036]" />
                      {tx.method}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-black text-sm">
                    <span
                      className={
                        tx.type === "REFUND" ? "text-rose-600" : "text-gray-900"
                      }
                    >
                      {tx.type === "REFUND" ? "- " : "+ "}
                      SAR {tx.amount.toFixed(2)}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right text-gray-500 font-mono">
                    SAR {tx.gatewayFee.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        tx.status === "Settled"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : tx.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                    {tx.timestamp}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTx(tx);
                      }}
                      className="inline-flex items-center justify-center w-7 h-7 rounded-lg hover:bg-[#550036] hover:text-white text-[#550036] bg-pink-50/70 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stroke p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Transaction Velocity</h3>
                <p className="text-xs text-gray-500">Payment volume distribution across peak hours</p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-pink-50 text-[#550036]">
                Peak: 14:00 - 18:00
              </span>
            </div>

            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { time: "08:00", val: 38, count: "SAR 42k" },
                { time: "10:00", val: 62, count: "SAR 88k" },
                { time: "12:00", val: 54, count: "SAR 75k" },
                { time: "14:00", val: 82, count: "SAR 140k" },
                { time: "16:00", val: 68, count: "SAR 112k" },
                { time: "18:00", val: 95, count: "SAR 195k" },
                { time: "20:00", val: 44, count: "SAR 58k" },
                { time: "22:00", val: 58, count: "SAR 82k" },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] font-mono font-bold text-[#550036] opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.count}
                  </span>
                  <div
                    style={{ height: `${bar.val}%` }}
                    className="w-full rounded-t-md bg-[#550036] group-hover:bg-[#760046] transition-all shadow-xs"
                  />
                  <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">
                    {bar.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stroke p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Payment Gateway Health</h3>
                <p className="text-xs text-gray-500">Latency, authorization ratios, and API health</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                All Systems Operational
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-900">Gateway Success Rate</span>
                  <span className="text-emerald-700 font-extrabold">98.42%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "98.42%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-900">Average Settlement Latency</span>
                  <span className="text-[#550036] font-extrabold">210 ms</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#550036] rounded-full" style={{ width: "85%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-900">Dispute & Reversal Margin</span>
                  <span className="text-amber-700 font-extrabold">0.04%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "4%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-stroke shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-gradient-to-r from-[#550036] to-[#760046] text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Transaction Receipt</h3>
                <p className="text-xs text-pink-200 font-mono">{selectedTx.ref}</p>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-[#FAF7F8] p-4 rounded-xl border border-stroke flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-500 block">
                    Net Charge
                  </span>
                  <div className="text-2xl font-black text-[#550036]">
                    SAR {selectedTx.amount.toFixed(2)}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    selectedTx.status === "Settled"
                      ? "bg-emerald-100 text-emerald-800"
                      : selectedTx.status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {selectedTx.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-bold text-gray-900">{selectedTx.customerName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Booking Reference</span>
                  <span className="font-mono font-bold text-[#550036]">{selectedTx.bookingId}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Payment Gateway</span>
                  <span className="font-semibold text-gray-900">{selectedTx.method}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Gateway Fee</span>
                  <span className="font-mono text-gray-900">SAR {selectedTx.gatewayFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Timestamp</span>
                  <span className="text-gray-900">{selectedTx.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => alert(`Receipt downloaded for ${selectedTx.ref}`)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#550036] text-white hover:bg-[#72003c]"
              >
                Download Tax Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

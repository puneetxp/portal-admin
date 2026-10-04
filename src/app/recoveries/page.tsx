"use client";

import React, { useState } from "react";
import {
  RotateCcw,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Smartphone,
  Globe,
  Building,
  Store,
  Plus,
} from "lucide-react";
import { mockOperationalRecoveries, OperationalRecoveryItem } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function OperationalRecoveriesPage() {
  const [recoveries, setRecoveries] = useState<OperationalRecoveryItem[]>(mockOperationalRecoveries);
  const [activeTab, setActiveTab] = useState<"cancelled" | "modified">("cancelled");
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  // New recovery entry state
  const [newRecovery, setNewRecovery] = useState({
    bookingRef: "",
    customerName: "",
    customerPhone: "+966 50 123 4567",
    origin: "Riyadh",
    destination: "Jeddah",
    tripDate: "Today",
    tripTime: "14:00 PM",
    cancellationDate: "Just now",
    countdown: "T-2h",
    channel: "MOBILE APP" as OperationalRecoveryItem["channel"],
    refundStatus: "FULL REFUND" as OperationalRecoveryItem["refundStatus"],
    seatsCount: 1,
    payoutImpact: "- SAR 150.00",
  });

  const handleAddRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    const created: OperationalRecoveryItem = {
      id: `rec-${Date.now()}`,
      bookingRef: newRecovery.bookingRef.toUpperCase() || `BK-99${Math.floor(100 + Math.random() * 900)}`,
      customerName: newRecovery.customerName || "Walk-in Passenger",
      customerPhone: newRecovery.customerPhone,
      origin: newRecovery.origin,
      destination: newRecovery.destination,
      tripDate: newRecovery.tripDate,
      tripTime: newRecovery.tripTime,
      cancellationDate: newRecovery.cancellationDate,
      countdown: newRecovery.countdown,
      channel: newRecovery.channel,
      refundStatus: newRecovery.refundStatus,
      seatsCount: Number(newRecovery.seatsCount),
      payoutImpact: newRecovery.payoutImpact,
      settlementStatus: "Processing",
    };
    setRecoveries([created, ...recoveries]);
    setShowModal(false);
    setNewRecovery({
      bookingRef: "",
      customerName: "",
      customerPhone: "+966 50 123 4567",
      origin: "Riyadh",
      destination: "Jeddah",
      tripDate: "Today",
      tripTime: "14:00 PM",
      cancellationDate: "Just now",
      countdown: "T-2h",
      channel: "MOBILE APP",
      refundStatus: "FULL REFUND",
      seatsCount: 1,
      payoutImpact: "- SAR 150.00",
    });
  };

  const filteredRecoveries = recoveries.filter((item) => {
    const matchesSearch =
      item.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesChannel =
      channelFilter === "ALL" || item.channel === channelFilter;

    return matchesSearch && matchesChannel;
  });

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "MOBILE APP":
        return <Smartphone className="w-3.5 h-3.5 text-[#550036]" />;
      case "WEB PORTAL":
        return <Globe className="w-3.5 h-3.5 text-blue-600" />;
      case "COUNTER":
        return <Store className="w-3.5 h-3.5 text-amber-600" />;
      case "CORPORATE":
        return <Building className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span>Finance & Audit</span>
            <span>/</span>
            <span className="text-[#950250]">Operational Recoveries</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Operational Recoveries
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track cancelled passenger tickets, fare adjustments, seat recoveries, and platform settlement impact
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4 text-[#FFE26D]" />
          <span>Log Recovery Action</span>
        </button>
      </div>

      {/* KPI Stats Cards matching Figma 840:6326 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active Modifications</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">482</span>
            <span className="text-xs text-amber-600 font-semibold">Processed MTD</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Cancellations, schedule swaps & refunds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Fare Difference</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-700">SAR 124,500</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Deducted from gross payout ledger</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Modified Seats</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#550036]">84</span>
            <span className="text-xs text-emerald-600 font-semibold">re-listed live</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Recaptured into customer booking pool</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/60 w-fit">
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "cancelled"
              ? "bg-white text-[#550036] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Cancelled Bookings
        </button>
        <button
          onClick={() => setActiveTab("modified")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "modified"
              ? "bg-white text-[#550036] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Modified Bookings
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search booking ref, customer, route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
          >
            <option value="ALL">All Sales Channels</option>
            <option value="MOBILE APP">Mobile App</option>
            <option value="WEB PORTAL">Web Portal</option>
            <option value="COUNTER">Counter</option>
            <option value="CORPORATE">Corporate</option>
          </select>
        </div>
      </div>

      {/* Recoveries Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Booking Ref & Channel</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Trip Details</th>
                <th className="py-3 px-4">Cancellation Timing</th>
                <th className="py-3 px-4 text-center">Refund Status</th>
                <th className="py-3 px-4 text-center">Seats</th>
                <th className="py-3 px-4">Payout Impact</th>
                <th className="py-3 px-4 text-right">Settlement State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecoveries.map((item) => (
                <tr key={item.id} className="hover:bg-pink-50/20 transition-colors">
                  {/* Booking Ref & Channel */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-gray-900">{item.bookingRef}</div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 mt-1">
                      {getChannelIcon(item.channel)}
                      <span>{item.channel}</span>
                    </div>
                  </td>

                  {/* Customer Details */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{item.customerName}</div>
                    <div className="font-mono text-[11px] text-gray-400">{item.customerPhone}</div>
                  </td>

                  {/* Trip Details */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{item.origin} → {item.destination}</div>
                    <div className="text-[11px] text-gray-400">{item.tripDate} • {item.tripTime}</div>
                  </td>

                  {/* Cancellation Timing */}
                  <td className="py-3.5 px-4">
                    <div className="text-gray-800 font-medium">{item.cancellationDate}</div>
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800">
                      {item.countdown}
                    </span>
                  </td>

                  {/* Refund Status */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.refundStatus === "FULL REFUND"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : item.refundStatus === "PARTIAL (50%)"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {item.refundStatus}
                    </span>
                  </td>

                  {/* Seats */}
                  <td className="py-3.5 px-4 text-center font-bold text-gray-900">
                    {item.seatsCount}
                  </td>

                  {/* Payout Impact */}
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-600">
                    {item.payoutImpact}
                  </td>

                  {/* Settlement State */}
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        item.settlementStatus === "Settled"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.settlementStatus === "Operator Kept"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.settlementStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Recovery Action Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stroke">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">Log Operational Recovery / Adjustment</h3>
                <p className="text-xs text-gray-500">Record a cancelled booking, seat reclaim, or relief coach assignment</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRecovery} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Booking Reference #</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BK-9942"
                    value={newRecovery.bookingRef}
                    onChange={(e) => setNewRecovery({ ...newRecovery, bookingRef: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 uppercase focus:outline-none focus:border-[#550036]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Passenger Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nasser Al-Otaibi"
                    value={newRecovery.customerName}
                    onChange={(e) => setNewRecovery({ ...newRecovery, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:border-[#550036]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Origin City</label>
                  <input
                    type="text"
                    value={newRecovery.origin}
                    onChange={(e) => setNewRecovery({ ...newRecovery, origin: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Destination City</label>
                  <input
                    type="text"
                    value={newRecovery.destination}
                    onChange={(e) => setNewRecovery({ ...newRecovery, destination: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Departure Countdown</label>
                  <input
                    type="text"
                    value={newRecovery.countdown}
                    onChange={(e) => setNewRecovery({ ...newRecovery, countdown: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                    placeholder="e.g. T-2h"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Fare Impact</label>
                  <input
                    type="text"
                    value={newRecovery.payoutImpact}
                    onChange={(e) => setNewRecovery({ ...newRecovery, payoutImpact: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                    placeholder="- SAR 150.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Booking Channel</label>
                  <select
                    value={newRecovery.channel}
                    onChange={(e) => setNewRecovery({ ...newRecovery, channel: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                  >
                    <option value="MOBILE APP">MOBILE APP</option>
                    <option value="WEB PORTAL">WEB PORTAL</option>
                    <option value="COUNTER">COUNTER</option>
                    <option value="CORPORATE">CORPORATE</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Refund Status</label>
                  <select
                    value={newRecovery.refundStatus}
                    onChange={(e) => setNewRecovery({ ...newRecovery, refundStatus: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                  >
                    <option value="FULL REFUND">FULL REFUND (100%)</option>
                    <option value="PARTIAL (50%)">PARTIAL (50%)</option>
                    <option value="NO REFUND">NO REFUND (0%)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Seats Affected</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newRecovery.seatsCount}
                    onChange={(e) => setNewRecovery({ ...newRecovery, seatsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#550036] hover:bg-[#760046] text-white font-bold transition-all shadow-sm"
                >
                  Commit Recovery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}

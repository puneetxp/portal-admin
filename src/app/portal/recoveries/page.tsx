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
        return <Smartphone className="w-3.5 h-3.5 text-[#5C0030]" />;
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
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Seat Recovery & Re-listing</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Operational Recoveries & Standby Desk
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track cancelled passenger tickets, fare adjustments, seat recoveries, and platform settlement impact.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#5C0030] hover:bg-[#72003c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-98"
        >
          <Plus className="w-4 h-4 text-[#FFE26D]" />
          <span>Log Recovery Action</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
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
            <span className="text-3xl font-black text-[#5C0030]">84</span>
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
              ? "bg-white text-[#5C0030] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Cancelled Bookings
        </button>
        <button
          onClick={() => setActiveTab("modified")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "modified"
              ? "bg-white text-[#5C0030] shadow-xs"
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
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-gray-900">{item.bookingRef}</div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 mt-1">
                      {getChannelIcon(item.channel)}
                      <span>{item.channel}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{item.customerName}</div>
                    <div className="font-mono text-[11px] text-gray-400">{item.customerPhone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-900">{item.origin} → {item.destination}</div>
                    <div className="text-[11px] text-gray-400">{item.tripDate} • {item.tripTime}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-gray-900 font-medium">{item.cancellationDate}</div>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{item.countdown}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.refundStatus === "FULL REFUND"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {item.refundStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg">
                      {item.seatsCount}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-rose-700">
                    {item.payoutImpact}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {item.settlementStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stroke space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Log Seat Recovery Action</h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRecovery} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Booking Reference</label>
                <input
                  type="text"
                  placeholder="e.g. BK-88910"
                  value={newRecovery.bookingRef}
                  onChange={(e) => setNewRecovery({ ...newRecovery, bookingRef: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Passenger Name</label>
                <input
                  type="text"
                  placeholder="Passenger Name"
                  value={newRecovery.customerName}
                  onChange={(e) => setNewRecovery({ ...newRecovery, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Origin City</label>
                  <input
                    type="text"
                    value={newRecovery.origin}
                    onChange={(e) => setNewRecovery({ ...newRecovery, origin: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Destination City</label>
                  <input
                    type="text"
                    value={newRecovery.destination}
                    onChange={(e) => setNewRecovery({ ...newRecovery, destination: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#5C0030] text-white font-bold hover:bg-[#72003c]"
                >
                  Save & Re-list Seat
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

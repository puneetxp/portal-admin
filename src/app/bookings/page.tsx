"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Search,
  Filter,
  Plus,
  Ticket,
  Calendar,
  Users,
  CreditCard,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  ChevronDown,
  Download,
  AlertCircle
} from "lucide-react";
import { initialBookings, Booking } from "@/data/mockData";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

  // New Booking Form State
  const [newBookingData, setNewBookingData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    route: "Riyadh → Jeddah",
    date: new Date().toISOString().split("T")[0],
    departureTime: "09:00 AM",
    busPlate: "KSA 1285",
    busCategory: "Luxury (Gold Class)" as Booking["busCategory"],
    seats: "05A",
    amount: 175,
    operator: "Arabian Sands Transit",
    paymentMethod: "Credit Card" as Booking["paymentMethod"],
  });

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.pnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerPhone.includes(searchQuery);
    const matchesStatus =
      selectedStatus === "ALL" || b.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      pnr: `BA-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: newBookingData.customerName || "Walk-in Passenger",
      customerEmail: newBookingData.customerEmail || "passenger@example.com",
      customerPhone: newBookingData.customerPhone || "+966 50 000 0000",
      route: newBookingData.route,
      origin: newBookingData.route.split("→")[0].trim(),
      destination: newBookingData.route.split("→")[1]?.trim() || "Destination",
      departureTime: newBookingData.departureTime,
      arrivalTime: "04:30 PM",
      date: newBookingData.date,
      busPlate: newBookingData.busPlate,
      busCategory: newBookingData.busCategory,
      seats: newBookingData.seats.split(",").map((s) => s.trim()),
      operator: newBookingData.operator,
      status: "CONFIRMED",
      amount: Number(newBookingData.amount),
      paymentMethod: newBookingData.paymentMethod,
      source: "Admin UI",
    };

    setBookings([newBooking, ...bookings]);
    setIsNewBookingModalOpen(false);
  };

  const handleCancelBooking = (id: string) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: "CANCELLED" });
    }
  };

  return (
    <AdminLayout>
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            Bookings Management
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-[#B20163] font-bold">
              {bookings.length} Total
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage all passenger reservations across Saudi Arabia and regional GCC lines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewBookingModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#550036] via-[#760046] to-[#950250] hover:opacity-95 shadow-md shadow-[#550036]/20 transition-all"
          >
            <Plus className="w-4 h-4 text-gold-light" />
            New Booking
          </button>
        </div>
      </div>

      {/* KPI Cards from Figma (602:15002) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Total Bookings Today
          </span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">1,284</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>+12%</span>
            <span className="text-gray-400 font-normal">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Total Revenue (SAR)
          </span>
          <div className="text-3xl font-extrabold text-[#550036] mt-1">452,190</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>+5.4%</span>
            <span className="text-gray-400 font-normal">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Active Passengers
          </span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">3,892</div>
          <div className="text-xs text-gray-500 mt-2">
            Live on 142 buses across KSA routes
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Pending Verifications
          </span>
          <div className="text-3xl font-extrabold text-amber-600 mt-1">18</div>
          <div className="text-xs text-amber-700 mt-2 font-medium">
            Requires agent manual review
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stroke shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by PNR, passenger name, phone or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
            {[
              { id: "ALL", label: "All Bookings" },
              { id: "CONFIRMED", label: "Confirmed" },
              { id: "BOARDED", label: "Boarded" },
              { id: "MODIFIED", label: "Modified" },
              { id: "CANCELLED", label: "Cancelled" },
              { id: "PENDING_PAYMENT", label: "Pending Payment" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedStatus === tab.id
                    ? "bg-[#550036] text-white shadow-xs"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF5F7] border-b border-stroke text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">PNR / Ref</th>
                <th className="py-3 px-6">Passenger Details</th>
                <th className="py-3 px-6">Route & Travel Date</th>
                <th className="py-3 px-6">Bus & Seats</th>
                <th className="py-3 px-6">Operator</th>
                <th className="py-3 px-6">Fare (SAR)</th>
                <th className="py-3 px-6">Source</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke/60 font-medium text-gray-800">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    No reservations found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const statusStyles = {
                    CONFIRMED: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    BOARDED: "bg-purple-50 text-purple-700 border-purple-200",
                    MODIFIED: "bg-blue-50 text-blue-700 border-blue-200",
                    CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
                    PENDING_PAYMENT: "bg-amber-50 text-amber-700 border-amber-200",
                  }[b.status];

                  return (
                    <tr key={b.id} className="hover:bg-pink-50/20 transition-colors">
                      <td className="py-3.5 px-6 font-mono font-bold text-[#550036]">
                        #{b.pnr}
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-bold text-gray-900">{b.customerName}</div>
                        <div className="text-[11px] text-gray-400">{b.customerPhone}</div>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-gray-800">{b.route}</div>
                        <div className="text-[11px] text-gray-400">
                          {b.date} • {b.departureTime}
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-gray-900">{b.busPlate}</div>
                        <div className="text-[11px] text-[#B20163] font-bold">
                          Seat: {b.seats.join(", ")}
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-gray-600">{b.operator}</td>
                      <td className="py-3.5 px-6 font-extrabold text-gray-900">
                        {b.amount} SAR
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                          {b.source}
                        </span>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${statusStyles}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-brand-primary hover:bg-pink-100 transition-colors"
                            title="Inspect Reservation"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {b.status !== "CANCELLED" && (
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Cancel Ticket"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Electronic Passenger Ticket
                </span>
                <h3 className="text-xl font-black text-brand-primary">PNR #{selectedBooking.pnr}</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF5F7] border border-stroke">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Passenger</span>
                  <p className="font-bold text-sm text-gray-900 mt-0.5">{selectedBooking.customerName}</p>
                  <p className="text-gray-500">{selectedBooking.customerPhone}</p>
                  <p className="text-gray-500">{selectedBooking.customerEmail}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Operator & Fleet</span>
                  <p className="font-bold text-sm text-brand-primary mt-0.5">{selectedBooking.operator}</p>
                  <p className="text-gray-700">Plate: {selectedBooking.busPlate}</p>
                  <p className="text-xs font-semibold text-gold-dark">{selectedBooking.busCategory}</p>
                </div>
              </div>

              <div className="border border-stroke rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Route</span>
                  <span className="font-extrabold text-sm text-gray-900">{selectedBooking.route}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Scheduled Departure</span>
                  <span className="font-bold text-gray-800">{selectedBooking.date} at {selectedBooking.departureTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Estimated Arrival</span>
                  <span className="font-bold text-gray-800">{selectedBooking.arrivalTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Allocated Seats</span>
                  <span className="font-black text-sm text-[#B20163] bg-pink-100 px-2.5 py-0.5 rounded-lg">
                    {selectedBooking.seats.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Payment Channel</span>
                  <span className="font-semibold text-gray-800">{selectedBooking.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="font-bold text-gray-700 text-sm">Total Fare Paid</span>
                  <span className="font-black text-lg text-brand-primary">{selectedBooking.amount} SAR</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stroke flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stroke text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Printer className="w-4 h-4 text-gray-500" />
                Print Ticket Slip
              </button>

              <div className="flex items-center gap-2">
                {selectedBooking.status !== "CANCELLED" && (
                  <button
                    onClick={() => handleCancelBooking(selectedBooking.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100"
                  >
                    Void Ticket
                  </button>
                )}
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#760046]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Booking Modal */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Admin Reservation Terminal
                </span>
                <h3 className="text-xl font-black text-brand-primary">Create New Booking</h3>
              </div>
              <button
                onClick={() => setIsNewBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Passenger Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Faisal Al-Harbi"
                    value={newBookingData.customerName}
                    onChange={(e) => setNewBookingData({ ...newBookingData, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+966 50 000 0000"
                    value={newBookingData.customerPhone}
                    onChange={(e) => setNewBookingData({ ...newBookingData, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Route</label>
                  <select
                    value={newBookingData.route}
                    onChange={(e) => setNewBookingData({ ...newBookingData, route: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  >
                    <option value="Riyadh → Jeddah">Riyadh → Jeddah</option>
                    <option value="Jeddah → Mecca">Jeddah → Mecca</option>
                    <option value="Riyadh → Dammam">Riyadh → Dammam</option>
                    <option value="Medina → Jeddah">Medina → Jeddah</option>
                    <option value="Dubai → Riyadh">Dubai → Riyadh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={newBookingData.date}
                    onChange={(e) => setNewBookingData({ ...newBookingData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Seats (Comma sep.)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 05A, 05B"
                    value={newBookingData.seats}
                    onChange={(e) => setNewBookingData({ ...newBookingData, seats: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Bus Class</label>
                  <select
                    value={newBookingData.busCategory}
                    onChange={(e) => setNewBookingData({ ...newBookingData, busCategory: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  >
                    <option value="Luxury (Gold Class)">Luxury (Gold Class)</option>
                    <option value="Executive">Executive</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Total Fare (SAR)</label>
                  <input
                    type="number"
                    required
                    value={newBookingData.amount}
                    onChange={(e) => setNewBookingData({ ...newBookingData, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stroke flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewBookingModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#550036] to-[#B20163] hover:opacity-95 shadow-md shadow-[#550036]/20"
                >
                  Issue Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

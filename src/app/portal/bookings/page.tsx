"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
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
  AlertCircle,
  Check,
  UserCheck,
  ArrowRight,
  Bus as BusIcon,
} from "lucide-react";

interface OperatorPassengerBooking {
  id: string;
  pnr: string;
  passengerName: string;
  nationalId: string;
  phone: string;
  tripNumber: string;
  route: string;
  departureTime: string;
  date: string;
  seat: string;
  busPlate: string;
  ticketClass: "VIP Luxury" | "Business Class" | "Economy";
  fare: number;
  paymentMethod: "Apple Pay" | "Mada" | "Credit Card";
  checkInStatus: "Checked In" | "Not Boarded" | "No Show";
}

const mockOperatorBookings: OperatorPassengerBooking[] = [
  {
    id: "OP-B1",
    pnr: "AF-78210",
    passengerName: "Fahad Al-Otaibi",
    nationalId: "1089234120",
    phone: "+966 50 123 4567",
    tripNumber: "AF-401",
    route: "Riyadh ➔ Jeddah",
    departureTime: "06:00 AM",
    date: "2026-10-26",
    seat: "04A",
    busPlate: "4821 KSA",
    ticketClass: "VIP Luxury",
    fare: 185,
    paymentMethod: "Apple Pay",
    checkInStatus: "Checked In",
  },
  {
    id: "OP-B2",
    pnr: "AF-78211",
    passengerName: "Khalid Al-Mutairi",
    nationalId: "1098442190",
    phone: "+966 50 671 2210",
    tripNumber: "AF-402",
    route: "Riyadh ➔ Dammam",
    departureTime: "01:00 PM",
    date: "2026-10-26",
    seat: "14D",
    busPlate: "1894 KSA",
    ticketClass: "Business Class",
    fare: 130,
    paymentMethod: "Mada",
    checkInStatus: "Not Boarded",
  },
  {
    id: "OP-B3",
    pnr: "AF-78212",
    passengerName: "Sarah Al-Ghamdi",
    nationalId: "1077239011",
    phone: "+966 54 992 1133",
    tripNumber: "AF-401",
    route: "Riyadh ➔ Jeddah",
    departureTime: "06:00 AM",
    date: "2026-10-26",
    seat: "04B",
    busPlate: "4821 KSA",
    ticketClass: "VIP Luxury",
    fare: 185,
    paymentMethod: "Credit Card",
    checkInStatus: "Checked In",
  },
  {
    id: "OP-B4",
    pnr: "AF-78213",
    passengerName: "Zaid Al-Harbi",
    nationalId: "1062993810",
    phone: "+966 55 412 8877",
    tripNumber: "AF-882",
    route: "Jeddah ➔ Madinah",
    departureTime: "08:30 AM",
    date: "2026-10-26",
    seat: "08A",
    busPlate: "2941 KSA",
    ticketClass: "Economy",
    fare: 95,
    paymentMethod: "Mada",
    checkInStatus: "Not Boarded",
  },
  {
    id: "OP-B5",
    pnr: "AF-78214",
    passengerName: "Omar Al-Dosari",
    nationalId: "1055812903",
    phone: "+966 53 109 4432",
    tripNumber: "AF-104",
    route: "Riyadh ➔ Makkah Express",
    departureTime: "11:00 PM",
    date: "2026-10-26",
    seat: "02A",
    busPlate: "7712 KSA",
    ticketClass: "VIP Luxury",
    fare: 220,
    paymentMethod: "Apple Pay",
    checkInStatus: "Not Boarded",
  },
];

export default function OperatorBookingsPage() {
  const [bookings, setBookings] = useState<OperatorPassengerBooking[]>(mockOperatorBookings);
  const [search, setSearch] = useState("");
  const [tripFilter, setTripFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedTicket, setSelectedTicket] = useState<OperatorPassengerBooking | null>(null);

  const toggleCheckIn = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            checkInStatus: b.checkInStatus === "Checked In" ? "Not Boarded" : "Checked In",
          };
        }
        return b;
      })
    );
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.pnr.toLowerCase().includes(search.toLowerCase()) ||
      b.passengerName.toLowerCase().includes(search.toLowerCase()) ||
      b.nationalId.includes(search) ||
      b.seat.toLowerCase().includes(search.toLowerCase());
    const matchesTrip = tripFilter === "ALL" || b.tripNumber === tripFilter;
    const matchesStatus = statusFilter === "ALL" || b.checkInStatus === statusFilter;
    return matchesSearch && matchesTrip && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Passenger Check-In</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Passenger Tickets & Boarding
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage passenger reservations, verify National IDs, and process gate check-in.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/portal/manifest"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs"
          >
            <Ticket className="w-3.5 h-3.5 text-gray-500" />
            <span>Passenger Manifest</span>
          </Link>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Bookings Today</p>
          <p className="text-2xl font-black text-gray-900 mt-2">792 Seats</p>
          <p className="text-xs text-gray-500 mt-1">Across 18 Arabia Fleet departures</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Checked In</p>
          <p className="text-2xl font-black text-emerald-700 mt-2">488 Pax</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">61.6% Boarded</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending Gate Check-In</p>
          <p className="text-2xl font-black text-amber-600 mt-2">304 Pax</p>
          <p className="text-xs text-gray-500 mt-1">Departing next 4 hours</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Today's Revenue</p>
          <p className="text-2xl font-black text-[#5C0030] mt-2">SAR 146,520</p>
          <p className="text-xs text-gray-500 mt-1">Avg Ticket: SAR 185</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PNR, passenger name, National ID, or seat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5C0030]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={tripFilter}
            onChange={(e) => setTripFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#5C0030]"
          >
            <option value="ALL">All Trips</option>
            <option value="AF-401">AF-401 (Riyadh ➔ Jeddah)</option>
            <option value="AF-402">AF-402 (Riyadh ➔ Dammam)</option>
            <option value="AF-882">AF-882 (Jeddah ➔ Madinah)</option>
            <option value="AF-104">AF-104 (Riyadh ➔ Makkah)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#5C0030]"
          >
            <option value="ALL">All Status</option>
            <option value="Checked In">Checked In</option>
            <option value="Not Boarded">Not Boarded</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">PNR #</th>
                <th className="py-4 px-5">Passenger & National ID</th>
                <th className="py-4 px-5">Trip & Corridor</th>
                <th className="py-4 px-5">Seat & Class</th>
                <th className="py-4 px-5">Fare</th>
                <th className="py-4 px-5">Check-In Status</th>
                <th className="py-4 px-5 text-right">Gate Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-mono font-black text-gray-900 block text-sm">{b.pnr}</span>
                    <span className="text-[10px] text-gray-400">{b.paymentMethod}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">{b.passengerName}</span>
                    <span className="text-[11px] font-mono text-gray-400">ID: {b.nationalId}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-[#5C0030] block">{b.tripNumber}</span>
                    <span className="text-[11px] text-gray-600 font-semibold">{b.route}</span>
                    <span className="text-[10px] text-gray-400 block">{b.departureTime}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#5C0030]/10 text-[#5C0030] font-mono font-black text-xs">
                      {b.seat}
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{b.ticketClass}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-gray-900 text-sm">SAR {b.fare}</span>
                  </td>

                  <td className="py-4 px-5">
                    <button
                      onClick={() => toggleCheckIn(b.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        b.checkInStatus === "Checked In"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {b.checkInStatus === "Checked In" ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          Checked In
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" />
                          Not Boarded
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedTicket(b)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                      Boarding Pass
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Boarding Pass Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stroke space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">
                  Boarding Pass: {selectedTicket.pnr}
                </h3>
                <p className="text-xs text-gray-500">Arabia Fleet Transport</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-[#3B001F] to-[#760046] text-white space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#FFE26D] uppercase">
                  {selectedTicket.ticketClass}
                </span>
                <span className="font-mono text-xs">{selectedTicket.busPlate}</span>
              </div>
              <div className="text-xl font-black">{selectedTicket.route}</div>
              <div className="flex justify-between text-xs pt-2 border-t border-white/20">
                <div>
                  <span className="text-[10px] text-pink-200 block">Passenger</span>
                  <span className="font-bold">{selectedTicket.passengerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-pink-200 block">Seat</span>
                  <span className="font-bold text-base text-[#FFE26D]">{selectedTicket.seat}</span>
                </div>
                <div>
                  <span className="text-[10px] text-pink-200 block">Departure</span>
                  <span className="font-bold">{selectedTicket.departureTime}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  toggleCheckIn(selectedTicket.id);
                  setSelectedTicket(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#5C0030] text-white text-xs font-bold hover:bg-[#72003c] transition-colors"
              >
                {selectedTicket.checkInStatus === "Checked In" ? "Unmark Check-In" : "Confirm Gate Boarding"}
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
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

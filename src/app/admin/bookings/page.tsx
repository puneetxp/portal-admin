"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Ticket,
  Search,
  Filter,
  CreditCard,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Eye,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface AdminBookingRecord {
  id: string;
  pnr: string;
  passengerName: string;
  passengerPhone: string;
  carrier: string;
  tripCode: string;
  route: string;
  departureDate: string;
  seat: string;
  grossAmountSar: number;
  platformTakeSar: number;
  paymentGateway: "Mada" | "Apple Pay" | "Visa / MC" | "Tabby (BNPL)";
  status: "Confirmed" | "Completed" | "Refund Requested" | "Disputed";
}

const mockAdminBookings: AdminBookingRecord[] = [
  {
    id: "B-8801",
    pnr: "PNR-88123",
    passengerName: "Fahad Al-Otaibi",
    passengerPhone: "+966 50 123 4567",
    carrier: "Arabia Fleet Transport",
    tripCode: "AF-401",
    route: "Riyadh ⇄ Jeddah",
    departureDate: "2026-10-26 (06:00 AM)",
    seat: "04A (VIP)",
    grossAmountSar: 185,
    platformTakeSar: 18.5,
    paymentGateway: "Apple Pay",
    status: "Confirmed",
  },
  {
    id: "B-8802",
    pnr: "PNR-90412",
    passengerName: "Mariam Al-Ghamdi",
    passengerPhone: "+966 54 881 2299",
    carrier: "Desert Express Lines",
    tripCode: "DEL-109",
    route: "Dammam ⇄ Riyadh",
    departureDate: "2026-10-26 (07:30 AM)",
    seat: "12C",
    grossAmountSar: 125,
    platformTakeSar: 10.0,
    paymentGateway: "Mada",
    status: "Confirmed",
  },
  {
    id: "B-8803",
    pnr: "PNR-77291",
    passengerName: "Sultan Al-Dosari",
    passengerPhone: "+966 56 312 9901",
    carrier: "Red Sea Transit",
    tripCode: "RST-088",
    route: "Jeddah ⇄ Yanbu",
    departureDate: "2026-10-25 (09:00 AM)",
    seat: "08A",
    grossAmountSar: 110,
    platformTakeSar: 11.0,
    paymentGateway: "Mada",
    status: "Completed",
  },
  {
    id: "B-8804",
    pnr: "PNR-66102",
    passengerName: "Noura Al-Shehri",
    passengerPhone: "+966 55 901 3344",
    carrier: "Al-Haramain Express",
    tripCode: "AHE-901",
    route: "Makkah ⇄ Madinah",
    departureDate: "2026-10-26 (10:15 AM)",
    seat: "02B (VIP)",
    grossAmountSar: 200,
    platformTakeSar: 24.0,
    paymentGateway: "Tabby (BNPL)",
    status: "Confirmed",
  },
  {
    id: "B-8805",
    pnr: "PNR-55290",
    passengerName: "Khalid Al-Mutairi",
    passengerPhone: "+966 50 671 2210",
    carrier: "Arabia Fleet Transport",
    tripCode: "AF-402",
    route: "Riyadh ⇄ Dammam",
    departureDate: "2026-10-24 (01:00 PM)",
    seat: "14D",
    grossAmountSar: 130,
    platformTakeSar: 13.0,
    paymentGateway: "Apple Pay",
    status: "Refund Requested",
  },
  {
    id: "B-8806",
    pnr: "PNR-44109",
    passengerName: "Abdullah Ba-Khashwin",
    passengerPhone: "+966 53 441 9920",
    carrier: "SAPTCO Regional",
    tripCode: "SPT-220",
    route: "Abha ⇄ Jeddah",
    departureDate: "2026-10-24 (05:30 AM)",
    seat: "20A",
    grossAmountSar: 165,
    platformTakeSar: 9.9,
    paymentGateway: "Visa / MC",
    status: "Disputed",
  },
];

export default function AdminGlobalBookingsPage() {
  const [search, setSearch] = useState("");
  const [carrierFilter, setCarrierFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bookings, setBookings] = useState(mockAdminBookings);
  const [selectedBooking, setSelectedBooking] = useState<AdminBookingRecord | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.pnr.toLowerCase().includes(search.toLowerCase()) ||
      b.passengerName.toLowerCase().includes(search.toLowerCase()) ||
      b.carrier.toLowerCase().includes(search.toLowerCase()) ||
      b.tripCode.toLowerCase().includes(search.toLowerCase()) ||
      b.route.toLowerCase().includes(search.toLowerCase());
    const matchesCarrier = carrierFilter === "ALL" || b.carrier.includes(carrierFilter);
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    return matchesSearch && matchesCarrier && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Financials</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Ticketing Ledger</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Platform Master Ticketing Ledger
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#320120] text-[#FFE26D]">
              Network Wide
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time audit log of all passenger ticket bookings, payment gateway settlements, and dispute resolutions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-gray-500" />
            Export Ledger CSV
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Bookings Today</p>
          <p className="text-2xl font-black text-gray-900 mt-2">1,842</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">+9.5% vs yesterday</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Gross Ticket GMV</p>
          <p className="text-2xl font-black text-gray-900 mt-2">SAR 284,910</p>
          <p className="text-xs text-gray-500 mt-1">Avg Ticket: SAR 154.67</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Platform Commission Take</p>
          <p className="text-2xl font-black text-[#950250] mt-2">SAR 28,491</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">10.0% weighted avg split</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Refund Claims</p>
          <p className="text-2xl font-black text-rose-600 mt-2">12</p>
          <p className="text-xs text-rose-700 font-medium mt-1">SAR 1,820 awaiting review</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PNR, passenger name, carrier, trip code, or route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#950250]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
          >
            <option value="ALL">All Carriers (38)</option>
            <option value="Arabia Fleet">Arabia Fleet Transport</option>
            <option value="Desert Express">Desert Express Lines</option>
            <option value="Red Sea">Red Sea Transit</option>
            <option value="Al-Haramain">Al-Haramain Express</option>
            <option value="SAPTCO">SAPTCO Regional</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#950250]"
          >
            <option value="ALL">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Refund Requested">Refund Requested</option>
            <option value="Disputed">Disputed</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-stroke text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-5">PNR & Passenger</th>
                <th className="py-4 px-5">Operating Carrier</th>
                <th className="py-4 px-5">Route & Departure</th>
                <th className="py-4 px-5">Seat</th>
                <th className="py-4 px-5">Gross Fare & Take</th>
                <th className="py-4 px-5">Gateway</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Ledger Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-mono font-bold text-gray-900 block">{b.pnr}</span>
                    <span className="text-[11px] text-gray-500">{b.passengerName}</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 font-bold text-gray-900">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      {b.carrier}
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{b.tripCode}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">{b.route}</span>
                    <span className="text-[11px] text-gray-500">{b.departureDate}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 font-mono font-bold text-gray-800 text-[11px]">
                      {b.seat}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-gray-900 block">SAR {b.grossAmountSar}</span>
                    <span className="text-[11px] font-semibold text-[#950250]">
                      SAR {b.platformTakeSar} Take
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-[10px] font-bold text-gray-700">
                      <CreditCard className="w-3 h-3 text-gray-400" />
                      {b.paymentGateway}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    {b.status === "Confirmed" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Confirmed
                      </span>
                    )}
                    {b.status === "Completed" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700">
                        Completed
                      </span>
                    )}
                    {b.status === "Refund Requested" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                        <RotateCcw className="w-3 h-3 text-amber-600" />
                        Refund Requested
                      </span>
                    )}
                    {b.status === "Disputed" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Disputed
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stroke space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">
                  Transaction Audit: {selectedBooking.pnr}
                </h3>
                <p className="text-xs text-gray-500">
                  Carrier: {selectedBooking.carrier} • Trip {selectedBooking.tripCode}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Passenger Legal Name:</span>
                <span className="font-bold text-gray-900">{selectedBooking.passengerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Passenger Contact:</span>
                <span className="font-mono text-gray-800">{selectedBooking.passengerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gross Ticket Amount:</span>
                <span className="font-bold text-gray-900">SAR {selectedBooking.grossAmountSar}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Platform Split (10%):</span>
                <span className="font-bold text-[#950250]">SAR {selectedBooking.platformTakeSar}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Net Operator Accrual:</span>
                <span className="font-bold text-emerald-700">
                  SAR {selectedBooking.grossAmountSar - selectedBooking.platformTakeSar}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Gateway:</span>
                <span className="font-bold text-gray-900">{selectedBooking.paymentGateway}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full py-2.5 rounded-xl bg-[#320120] text-white text-xs font-bold hover:bg-[#480230] transition-colors"
            >
              Close Audit Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

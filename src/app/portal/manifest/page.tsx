"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  Search,
  QrCode,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  User,
  Phone,
  Shield,
  Camera,
} from "lucide-react";
import { mockPassengerManifest, PassengerManifestItem } from "@/data/mockData";

export default function PassengerManifestPage() {
  const [manifest, setManifest] = useState<PassengerManifestItem[]>(mockPassengerManifest);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showScanner, setShowScanner] = useState(false);
  const [scanSuccessMsg, setScanSuccessMsg] = useState("");

  const markBoarded = (id: string) => {
    setManifest(
      manifest.map((item) =>
        item.id === id ? { ...item, boardingStatus: "Boarded" } : item
      )
    );
  };

  const markNoShow = (id: string) => {
    setManifest(
      manifest.map((item) =>
        item.id === id ? { ...item, boardingStatus: "No-Show" } : item
      )
    );
  };

  const handleSimulateScan = () => {
    const unboarded = manifest.find((m) => m.boardingStatus !== "Boarded");
    if (unboarded) {
      markBoarded(unboarded.id);
      setScanSuccessMsg(`Scanned: ${unboarded.passengerName} (Seat ${unboarded.seatNumber}) Boarded!`);
      setTimeout(() => {
        setScanSuccessMsg("");
        setShowScanner(false);
      }, 1500);
    }
  };

  const filteredManifest = manifest.filter((item) => {
    const matchesSearch =
      item.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact.includes(searchQuery);

    const matchesStatus =
      statusFilter === "ALL" || item.boardingStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const boardedCount = manifest.filter((m) => m.boardingStatus === "Boarded").length;
  const waitingCount = manifest.filter((m) => m.boardingStatus === "Mark Boarded").length;
  const noShowCount = manifest.filter((m) => m.boardingStatus === "No-Show").length;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Trip #TRP-8821</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Passenger Boarding Manifest
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time boarding roster, passenger verification, and station gate dispatch for coach AF-101.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-2 bg-[#5C0030] hover:bg-[#72003c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-98"
          >
            <QrCode className="w-4 h-4 text-[#FFE26D]" />
            <span>Scan QR Code</span>
          </button>

          <button
            onClick={() => alert("Passenger manifest exported as PDF/CSV.")}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-200 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>Export Manifest</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Booked</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{manifest.length}</span>
            <span className="text-xs text-gray-400">/ 50 Seats</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#5C0030] rounded-full" style={{ width: `${(manifest.length / 50) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Boarded</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">{boardedCount}</span>
            <span className="text-xs text-emerald-600 font-semibold">
              {Math.round((boardedCount / manifest.length) * 100)}% done
            </span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Verified through boarding gate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Waiting to Board</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-700">{waitingCount}</span>
            <span className="text-xs text-amber-600 font-semibold">In Terminal</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Departure in 18 minutes</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Reported No-Shows</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-700">{noShowCount}</span>
            <span className="text-xs text-rose-600 font-semibold">Attention</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Seats eligible for reallocation</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search booking ref, name, seat, contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
          >
            <option value="ALL">All Passenger States</option>
            <option value="Boarded">Boarded</option>
            <option value="Mark Boarded">Waiting to Board</option>
            <option value="No-Show">No-Show</option>
          </select>
        </div>
      </div>

      {/* Passenger Manifest Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Seat #</th>
                <th className="py-3 px-4">Passenger Name & Tier</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Verified ID / Document</th>
                <th className="py-3 px-4 text-center">Ticket Status</th>
                <th className="py-3 px-4 text-right">Boarding Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredManifest.map((item) => (
                <tr key={item.id} className="hover:bg-pink-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    {item.bookingRef}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-[#FAF5F7] text-[#5C0030] font-extrabold text-xs border border-pink-100">
                      {item.seatNumber}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{item.passengerName}</div>
                    <div className="text-[11px] text-gray-400">{item.tier}</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-600">
                    {item.contact}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Shield className="w-3.5 h-3.5 text-[#5C0030]" />
                      <span className="font-semibold">{item.idType}:</span>
                      <span className="font-mono text-gray-500">{item.idNumberMasked}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {item.boardingStatus === "Boarded" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Boarded</span>
                      </span>
                    ) : item.boardingStatus === "No-Show" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
                        <XCircle className="w-4 h-4" />
                        <span>No-Show</span>
                      </span>
                    ) : (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => markBoarded(item.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#5C0030] hover:bg-[#72003c] text-white font-bold text-xs transition-colors shadow-xs"
                        >
                          Mark Boarded
                        </button>
                        <button
                          onClick={() => markNoShow(item.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-rose-50 hover:text-rose-700 text-gray-600 font-semibold text-xs transition-colors"
                        >
                          No-Show
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Scanner Simulation Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-pink-50 text-[#5C0030] flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8 text-[#B20163] animate-pulse" />
            </div>

            <div>
              <h3 className="font-black text-gray-900 text-base">Ticket Scanner Active</h3>
              <p className="text-xs text-gray-500 mt-1">
                Align passenger QR code from mobile boarding pass with scanner
              </p>
            </div>

            <div className="h-40 bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden border-2 border-[#FFE26D]">
              <div className="w-32 h-32 border-2 border-dashed border-[#FFE26D]/70 rounded-lg flex items-center justify-center text-[#FFE26D] text-xs font-mono">
                [ SCAN AREA ]
              </div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFE26D] to-transparent animate-bounce" />
            </div>

            {scanSuccessMsg && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
                {scanSuccessMsg}
              </div>
            )}

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleSimulateScan}
                className="flex-1 py-2.5 bg-[#5C0030] text-white font-bold text-xs rounded-xl hover:bg-[#72003c] transition-colors"
              >
                Simulate QR Scan
              </button>
              <button
                type="button"
                onClick={() => setShowScanner(false)}
                className="px-4 py-2.5 border border-gray-200 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-50"
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

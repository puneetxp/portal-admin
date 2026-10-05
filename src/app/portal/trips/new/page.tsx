"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Bus as BusIcon,
  Check,
  Eye,
  AlertCircle,
  Save,
  Send,
  Wifi,
  Wind,
  Tv,
  Armchair,
  Sparkles,
  Repeat,
  Layers,
  ChevronRight,
  ShieldCheck,
  Info,
} from "lucide-react";
import { mockOperatorRoutes, mockOperatorBuses } from "@/data/mockData";

export default function OperatorNewTripPage() {
  const router = useRouter();

  const [tripType, setTripType] = useState<"Single Trip" | "Recurring Trip">("Recurring Trip");
  const [recurrenceFreq, setRecurrenceFreq] = useState<"Daily" | "Selected Days" | "Weekdays">("Selected Days");
  const [activeDays, setActiveDays] = useState<string[]>(["Sun", "Tue", "Thu", "Sat"]);
  const [cycleStartDate, setCycleStartDate] = useState("2026-10-15");
  const [cycleEndDate, setCycleEndDate] = useState("2026-12-15");

  const [selectedRouteCode, setSelectedRouteCode] = useState(mockOperatorRoutes[0].code);
  const selectedRoute = mockOperatorRoutes.find((r) => r.code === selectedRouteCode) || mockOperatorRoutes[0];

  const [departureDate, setDepartureDate] = useState("2026-10-26");
  const [departureTime, setDepartureTime] = useState("09:00");
  const [pickupPoint, setPickupPoint] = useState(selectedRoute.originTerminal || "Riyadh Al-Aziziyah Hub Gate 3");
  const [dropoffPoint, setDropoffPoint] = useState(selectedRoute.destinationTerminal || "Jeddah Al-Balad Station");

  const [selectedBusPlate, setSelectedBusPlate] = useState(mockOperatorBuses[0].plateNumber);
  const selectedBus = mockOperatorBuses.find((b) => b.plateNumber === selectedBusPlate) || mockOperatorBuses[0];
  const [ticketFare, setTicketFare] = useState("150.00");
  const [currency, setCurrency] = useState("SAR");
  const [isPublished, setIsPublished] = useState(true);

  const [amenities, setAmenities] = useState({
    wifi: true,
    climate: true,
    usb: true,
    screen: true,
    restroom: true,
    extraLegroom: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const daysOfWeek = [
    { key: "Sun", label: "S", full: "Sunday" },
    { key: "Mon", label: "M", full: "Monday" },
    { key: "Tue", label: "T", full: "Tuesday" },
    { key: "Wed", label: "W", full: "Wednesday" },
    { key: "Thu", label: "T", full: "Thursday" },
    { key: "Fri", label: "F", full: "Friday" },
    { key: "Sat", label: "S", full: "Saturday" },
  ];

  const toggleDay = (dayKey: string) => {
    if (activeDays.includes(dayKey)) {
      if (activeDays.length > 1) {
        setActiveDays(activeDays.filter((d) => d !== dayKey));
      }
    } else {
      setActiveDays([...activeDays, dayKey]);
    }
  };

  const handleFrequencyChange = (freq: "Daily" | "Selected Days" | "Weekdays") => {
    setRecurrenceFreq(freq);
    if (freq === "Daily") {
      setActiveDays(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    } else if (freq === "Weekdays") {
      setActiveDays(["Sun", "Mon", "Tue", "Wed", "Thu"]);
    } else {
      setActiveDays(["Sun", "Tue", "Thu", "Sat"]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      router.push("/portal/trips");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/portal/trips"
            className="p-2.5 rounded-xl bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-[#5C0030] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
              <Link href="/portal/trips" className="hover:text-gray-600">Departures</Link>
              <span>/</span>
              <span className="text-[#950250]">Create New Departure</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-[#5C0030] tracking-tight">
              Create Arabia Fleet Departure
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Configure departure corridors, automated recurrence timetables, and vehicle capacity allocations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/trips"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white font-semibold text-xs hover:bg-gray-50 transition-colors"
          >
            Discard Draft
          </Link>
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5C0030] text-white font-semibold text-xs shadow-md hover:bg-[#72003c] transition-all active:scale-98 disabled:opacity-50"
          >
            {isSubmitted ? (
              <>
                <Check className="w-4 h-4 text-[#FFE26D]" />
                <span>Departure Published!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#FFE26D]" />
                <span>Publish Departure</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DBBFC933]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#5C0030]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1B1B]">Basic Information</h2>
                  <p className="text-[11px] text-gray-400">Choose departure structure and operational cadence</p>
                </div>
              </div>

              <div className="inline-flex p-1 bg-[#F1EDEC] rounded-full self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setTripType("Single Trip")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    tripType === "Single Trip"
                      ? "bg-[#5C0030] text-white shadow-xs"
                      : "text-[#554149] hover:text-black"
                  }`}
                >
                  Single Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("Recurring Trip")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    tripType === "Recurring Trip"
                      ? "bg-[#5C0030] text-white shadow-xs"
                      : "text-[#554149] hover:text-black"
                  }`}
                >
                  Recurring Trip
                </button>
              </div>
            </div>

            {/* Recurrence Pattern Card */}
            {tripType === "Recurring Trip" && (
              <div className="p-5 rounded-2xl bg-[#FAF7F8] border border-[#DCBFC8] space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-[#765B00]" />
                    <h3 className="text-xs font-bold text-[#1C1B1B] uppercase tracking-wider">
                      Recurrence Pattern & Cycle Cadence
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FDEAA9] text-[#765B00] border border-[#FFE26D]">
                    Automated Scheduler Active
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Repeat Frequency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Daily", "Selected Days", "Weekdays"] as const).map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => handleFrequencyChange(freq)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          recurrenceFreq === freq
                            ? "bg-[#5C0030] text-white border-[#5C0030] shadow-xs"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#DCBFC8]"
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Active Days of Departure
                  </label>
                  <div className="flex items-center gap-2">
                    {daysOfWeek.map((day) => {
                      const isSelected = activeDays.includes(day.key);
                      return (
                        <button
                          key={day.key}
                          type="button"
                          onClick={() => toggleDay(day.key)}
                          title={day.full}
                          className={`w-10 h-10 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all border ${
                            isSelected
                              ? "bg-[#765B00] text-white border-[#765B00] shadow-sm scale-105"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span>{day.label}</span>
                          <span className="text-[8px] font-normal opacity-80">{day.key}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Cycle Start Date
                    </label>
                    <input
                      type="date"
                      value={cycleStartDate}
                      onChange={(e) => setCycleStartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCBFC8] rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Cycle End Date (Expiry)
                    </label>
                    <input
                      type="date"
                      value={cycleEndDate}
                      onChange={(e) => setCycleEndDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCBFC8] rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Route & Corridor Selection */}
          <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#DBBFC933]">
              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#5C0030]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1C1B1B]">Route & Corridor Selection</h2>
                <p className="text-[11px] text-gray-400">Assigned corridor stations and transit checkpoints</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Select Corridor Route
              </label>
              <select
                value={selectedRouteCode}
                onChange={(e) => {
                  setSelectedRouteCode(e.target.value);
                  const found = mockOperatorRoutes.find((r) => r.code === e.target.value);
                  if (found) {
                    setPickupPoint(found.originTerminal);
                    setDropoffPoint(found.destinationTerminal);
                  }
                }}
                className="w-full px-4 py-3 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs font-bold text-[#1C1B1B] focus:bg-white focus:outline-none"
              >
                {mockOperatorRoutes.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.code}: {r.origin} ({r.originTerminal}) → {r.destination} ({r.destinationTerminal}) — {r.serviceLevel} ({r.duration})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {tripType === "Single Trip" ? "Departure Date" : "Initial Departure Date"}
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Scheduled Departure Time
                </label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs font-semibold text-gray-800 focus:bg-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Origin Terminal & Departure Bay
                </label>
                <input
                  type="text"
                  value={pickupPoint}
                  onChange={(e) => setPickupPoint(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Destination Terminal Platform
                </label>
                <input
                  type="text"
                  value={dropoffPoint}
                  onChange={(e) => setDropoffPoint(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Inventory & Coach Allocation */}
          <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBBFC933]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#5C0030]">
                  <BusIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1B1B]">Coach & Pricing Allocation</h2>
                  <p className="text-[11px] text-gray-400">Assign Arabia Fleet luxury coach and set ticket pricing</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#5C0030] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                {selectedBus.capacity} Total Seats
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Assigned Arabia Fleet Coach
                </label>
                <select
                  value={selectedBusPlate}
                  onChange={(e) => setSelectedBusPlate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs font-bold text-[#1C1B1B] focus:bg-white focus:outline-none"
                >
                  {mockOperatorBuses.map((bus) => (
                    <option key={bus.plateNumber} value={bus.plateNumber}>
                      {bus.model} ({bus.plateNumber}) • {bus.category} • {bus.capacity} seats
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Standard Fare (SAR)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={ticketFare}
                    onChange={(e) => setTicketFare(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:outline-none"
                    required
                  />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F8] border border-[#DCBFC8] rounded-xl text-xs font-bold text-gray-800 focus:outline-none"
                  >
                    <option value="SAR">SAR</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-900">Visibility Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Active / Published
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-100 text-xs text-[#5C0030] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#950250] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Instant Booking:</strong> This departure will be live across the Bus Arabia passenger network immediately upon publication.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full flex items-center justify-center gap-2 bg-[#5C0030] hover:bg-[#72003c] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-[#FFE26D]" />
                  <span>Departure Published!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Departure</span>
                </>
              )}
            </button>

            <Link
              href="/portal/trips"
              className="w-full block text-center py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel & Return to Dispatches
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

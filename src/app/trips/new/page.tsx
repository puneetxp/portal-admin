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
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function NewTripCreatorPage() {
  const router = useRouter();

  // Mode: Single Trip vs Recurring Trip (Figma 1546:872 & 1546:2182)
  const [tripType, setTripType] = useState<"Single Trip" | "Recurring Trip">("Recurring Trip");

  // Recurrence states (Figma 1546:1980)
  const [recurrenceFreq, setRecurrenceFreq] = useState<"Daily" | "Selected Days" | "Weekdays">("Selected Days");
  const [activeDays, setActiveDays] = useState<string[]>(["Sun", "Tue", "Thu", "Sat"]);
  const [cycleStartDate, setCycleStartDate] = useState("2026-10-15");
  const [cycleEndDate, setCycleEndDate] = useState("2026-12-15");

  // Route & Corridor
  const [selectedRouteCode, setSelectedRouteCode] = useState(mockOperatorRoutes[0].code);
  const selectedRoute = mockOperatorRoutes.find((r) => r.code === selectedRouteCode) || mockOperatorRoutes[0];

  // Schedule details
  const [departureDate, setDepartureDate] = useState("2026-10-26");
  const [departureTime, setDepartureTime] = useState("09:00");
  const [arrivalTime, setArrivalTime] = useState("13:30");
  const [pickupPoint, setPickupPoint] = useState(selectedRoute.originTerminal || "Olaya Central Terminal Gate 3");
  const [dropoffPoint, setDropoffPoint] = useState(selectedRoute.destinationTerminal || "Eastern Gateway Terminal");

  // Vehicle & Pricing
  const [selectedBusPlate, setSelectedBusPlate] = useState(mockOperatorBuses[0].plateNumber);
  const selectedBus = mockOperatorBuses.find((b) => b.plateNumber === selectedBusPlate) || mockOperatorBuses[0];
  const [ticketFare, setTicketFare] = useState("150.00");
  const [currency, setCurrency] = useState("SAR");
  const [isPublished, setIsPublished] = useState(true);

  // Amenities
  const [amenities, setAmenities] = useState({
    wifi: true,
    climate: true,
    usb: true,
    screen: true,
    restroom: true,
    extraLegroom: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Days of week definitions
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
      router.push("/trips");
    }, 1200);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20 max-w-7xl mx-auto">
        {/* Figma 1546:2303 Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs">
          <div className="flex items-center gap-4">
            <Link
              href="/trips"
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-[#550036] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                <Link href="/trips" className="hover:text-gray-600">Trips</Link>
                <span>/</span>
                <span className="text-[#950250]">New Trip Management</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-[#550036] tracking-tight">
                New Trip Management
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Configure departure corridors, automated recurrence timetables, and vehicle capacity allocations
              </p>
            </div>
          </div>

          {/* Action Buttons matching Figma 1546:2314 */}
          <div className="flex items-center gap-3">
            <Link
              href="/trips"
              className="px-5 py-2.5 rounded-[12.8px] border border-[#88717A] text-[#550036] bg-white font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Discard Draft
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="flex items-center gap-2 px-6 py-2.5 rounded-[12.8px] bg-gradient-to-r from-[#550036] to-[#7C0051] text-white font-semibold text-sm shadow-md hover:opacity-95 transition-all active:scale-98 disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-[#FFE26D]" />
                  <span>Trip Scheduled!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#FFE26D]" />
                  <span>Publish Trip</span>
                </>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Primary Config - 8 Cols) matching Figma 1546:2323 */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Trip Type & Basic Info (Figma 1546:2324 & 1546:2331) */}
            <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DBBFC933]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#550036]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#1C1B1B]">Basic Information</h2>
                    <p className="text-[11px] text-gray-400">Choose departure structure and operational cadence</p>
                  </div>
                </div>

                {/* Pill Switcher matching Figma 1546:2331 */}
                <div className="inline-flex p-1 bg-[#F1EDEC] rounded-full self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setTripType("Single Trip")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      tripType === "Single Trip"
                        ? "bg-[#550036] text-white shadow-xs"
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
                        ? "bg-[#550036] text-white shadow-xs"
                        : "text-[#554149] hover:text-black"
                    }`}
                  >
                    Recurring Trip
                  </button>
                </div>
              </div>

              {/* Recurrence Pattern Card matching Figma 1546:1980 */}
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

                  {/* Frequency Selector */}
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
                              ? "bg-[#550036] text-white border-[#550036] shadow-xs"
                              : "bg-white text-gray-700 border-gray-200 hover:border-[#DCBFC8]"
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Days of Week Toggles */}
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

                  {/* Date Range Calendar Pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Cycle Start Date
                      </label>
                      <input
                        type="date"
                        value={cycleStartDate}
                        onChange={(e) => setCycleStartDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCBFC8] rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#950250]"
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
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCBFC8] rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#950250]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-pink-100 flex items-center gap-2.5 text-xs text-gray-600">
                    <Sparkles className="w-4 h-4 text-[#D9B747] flex-shrink-0" />
                    <span>
                      Pattern will automatically generate <strong>{activeDays.length * 8} scheduled departures</strong> across this 8-week operating window.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Route Corridor & Timetable (Figma 1546:2336) */}
            <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#DBBFC933]">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#550036]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1B1B]">Route & Corridor Selection</h2>
                  <p className="text-[11px] text-gray-400">Assigned corridor stations and transit checkpoints</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Select Corridors Route
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
                  className="w-full px-4 py-3 bg-[#FAF7F8] border border-[#DCBFC8] rounded-[12.8px] text-xs font-bold text-[#1C1B1B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#550036]"
                >
                  {mockOperatorRoutes.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.code}: {r.origin} ({r.originTerminal}) → {r.destination} ({r.destinationTerminal}) — {r.serviceLevel} ({r.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Timing Row */}
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

              {/* Station Terminals */}
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

              {/* Intermediate Route Checkpoints */}
              {selectedRoute.stopsList && selectedRoute.stopsList.length > 0 && (
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Intermediate Stops & Passenger Boarding Points
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-1 rounded bg-[#550036] text-white font-bold text-[10px]">
                      {selectedRoute.origin}
                    </span>
                    {selectedRoute.stopsList.map((stop, i) => (
                      <React.Fragment key={i}>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <span className="px-2 py-1 rounded bg-white text-gray-700 font-semibold text-[10px] border border-gray-200">
                          {stop}
                        </span>
                      </React.Fragment>
                    ))}
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    <span className="px-2 py-1 rounded bg-[#765B00] text-white font-bold text-[10px]">
                      {selectedRoute.destination}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: Inventory & Seats Card matching Figma 1546:1105 */}
            <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#DBBFC933]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#550036]">
                    <BusIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#1C1B1B]">Inventory & Seat Allocation</h2>
                    <p className="text-[11px] text-gray-400">Coach fleet configuration, seat matrix and standard pricing</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#550036] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  {selectedBus.capacity} Total Seats
                </span>
              </div>

              {/* Vehicle & Pricing Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Assigned Fleet Coach
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
                      <option value="EGP">EGP</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Visual Seat Map Allocation matching Figma 1546:1151 */}
              <div className="p-5 rounded-2xl bg-[#FAF7F8] border border-dashed border-[#DCBFC8] flex flex-col items-center">
                <div className="w-full flex justify-between items-center text-xs font-bold text-gray-700 pb-3 border-b border-gray-200 mb-4">
                  <span>Visual Coach Deck Preview (Front Entrance to Rear)</span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    42 of {selectedBus.capacity} Seats Available
                  </span>
                </div>

                <div className="w-full max-w-xs space-y-2.5">
                  <div className="flex justify-between text-[10px] text-gray-400 font-extrabold px-1">
                    <span>A</span>
                    <span>B</span>
                    <span className="text-gray-300">AISLE</span>
                    <span>C</span>
                    <span>D</span>
                  </div>

                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex justify-between items-center text-xs font-bold">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#550036] text-white flex items-center justify-center shadow-xs">
                          {row}A
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#550036] text-white flex items-center justify-center shadow-xs">
                          {row}B
                        </div>
                      </div>
                      <div className="w-6 text-center text-gray-300 text-xs">|</div>
                      <div className="flex gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                            row === 2
                              ? "bg-[#FFE26D] text-[#765B00] border border-[#D9B747]"
                              : "bg-white border border-[#DCBFC8] text-gray-800"
                          }`}
                        >
                          {row}C
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white border border-[#DCBFC8] text-gray-800 flex items-center justify-center">
                          {row}D
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 w-full flex justify-center gap-6 text-[10px] text-gray-600 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#550036]" /> Open / Online
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#FFE26D] border border-[#D9B747]" /> Reserved
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-white border border-[#DCBFC8]" /> Available
                  </span>
                </div>
              </div>

              {/* Onboard Amenities */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Complimentary Fleet Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-pink-50/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities.wifi}
                      onChange={(e) => setAmenities({ ...amenities, wifi: e.target.checked })}
                      className="rounded text-[#550036] focus:ring-[#B20163]"
                    />
                    <Wifi className="w-3.5 h-3.5 text-[#550036]" />
                    <span>Free Wi-Fi</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-pink-50/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities.climate}
                      onChange={(e) => setAmenities({ ...amenities, climate: e.target.checked })}
                      className="rounded text-[#550036] focus:ring-[#B20163]"
                    />
                    <Wind className="w-3.5 h-3.5 text-[#550036]" />
                    <span>Climate Control</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-pink-50/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities.usb}
                      onChange={(e) => setAmenities({ ...amenities, usb: e.target.checked })}
                      className="rounded text-[#550036] focus:ring-[#B20163]"
                    />
                    <span>USB Fast Charging</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-pink-50/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities.screen}
                      onChange={(e) => setAmenities({ ...amenities, screen: e.target.checked })}
                      className="rounded text-[#550036] focus:ring-[#B20163]"
                    />
                    <Tv className="w-3.5 h-3.5 text-[#550036]" />
                    <span>Media Screens</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-pink-50/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities.restroom}
                      onChange={(e) => setAmenities({ ...amenities, restroom: e.target.checked })}
                      className="rounded text-[#550036] focus:ring-[#B20163]"
                    />
                    <span>Onboard Restroom</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 hover:bg-pink-50/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities.extraLegroom}
                      onChange={(e) => setAmenities({ ...amenities, extraLegroom: e.target.checked })}
                      className="rounded text-[#550036] focus:ring-[#B20163]"
                    />
                    <Armchair className="w-3.5 h-3.5 text-[#550036]" />
                    <span>Extra Legroom</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Status & Interactive Trip Preview - 4 Cols) matching Figma 1546:2503 */}
          <div className="lg:col-span-4 space-y-6">
            {/* Status & Controls Card matching Figma 1546:2504 */}
            <div className="bg-white p-6 rounded-2xl border border-[#DBBFC933] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-900">Trip Status & Visibility</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isPublished
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isPublished ? "Active / Published" : "Draft"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-800">Publish Immediately</p>
                  <p className="text-[11px] text-gray-400">Available to customers online</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isPublished ? "bg-[#550036]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isPublished ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-100 text-xs text-[#550036] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#B20163] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Instant Online Search:</strong> Once published, this departure will immediately appear across Bus Arabia booking apps with active seat selection enabled.
                </p>
              </div>
            </div>

            {/* Live Trip Preview Card matching Figma 1546:2529 */}
            <div className="bg-white rounded-[19.2px] border border-[#DBBFC933] shadow-sm overflow-hidden">
              <div className="p-3 bg-[#FAF7F8] border-b border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#550036]" /> Customer App Card Preview
                </span>
                <span className="text-[10px] font-bold text-[#550036] bg-pink-100/60 px-2 py-0.5 rounded-full">
                  Live Preview
                </span>
              </div>

              {/* Card visual representation */}
              <div className="p-5 space-y-4">
                <div className="relative h-32 rounded-xl bg-gradient-to-br from-[#3B001F] to-[#760046] overflow-hidden flex flex-col justify-between p-3.5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-[#765B00] text-[#FFE26D]">
                      {selectedBus.category || "VIP Luxury"}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-pink-200">
                      {selectedRoute.code}
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-black text-white flex items-center gap-1.5">
                      <span>{selectedRoute.origin}</span>
                      <span>→</span>
                      <span>{selectedRoute.destination}</span>
                    </div>
                    <p className="text-[11px] text-pink-200">
                      {selectedBus.model} • {selectedBus.plateNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Departure</span>
                    <span className="text-sm font-black text-[#1C1B1B]">{departureTime}</span>
                    <span className="text-[10px] text-gray-500 block">
                      {tripType === "Single Trip" ? departureDate : `${activeDays.join(", ")}`}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Starting Fare</span>
                    <span className="text-base font-black text-[#550036]">
                      {currency} {parseFloat(ticketFare || "0").toFixed(2)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold block">Tax Included</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> {selectedRoute.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Bus Arabia Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2.5">
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#550036] to-[#950250] hover:from-[#6B0044] hover:to-[#B20163] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 disabled:opacity-50"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-[#FFE26D]" />
                    <span>Departure Published!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish {tripType}</span>
                  </>
                )}
              </button>

              <Link
                href="/trips"
                className="w-full block text-center py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel & Return to Timetable
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

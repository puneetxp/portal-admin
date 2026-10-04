"use client";

import React, { useState } from "react";
import {
  Bus as BusIcon,
  Search,
  Plus,
  Wifi,
  Wind,
  Tv,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MoreVertical,
  SlidersHorizontal,
  Wrench,
  Armchair,
} from "lucide-react";
import { mockOperatorBuses, OperatorFleetBus } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function BusManagementPage() {
  const [buses, setBuses] = useState<OperatorFleetBus[]>(mockOperatorBuses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding bus
  const [newBus, setNewBus] = useState({
    plateNumber: "",
    model: "",
    category: "LUXURY ELITE" as const,
    capacity: 45,
    config: "2+2 Standard",
  });

  const toggleActiveStatus = (id: string) => {
    setBuses(
      buses.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Active" ? "Offline" : "Active" }
          : b
      )
    );
  };

  const toggleSeatSelection = (id: string) => {
    setBuses(
      buses.map((b) =>
        b.id === id ? { ...b, seatSelectionEnabled: !b.seatSelectionEnabled } : b
      )
    );
  };

  const handleAddBus = (e: React.FormEvent) => {
    e.preventDefault();
    const createdBus: OperatorFleetBus = {
      id: `bus-${Date.now()}`,
      plateNumber: newBus.plateNumber,
      model: newBus.model,
      category: newBus.category,
      capacity: Number(newBus.capacity),
      config: newBus.config,
      utilizationRate: 0,
      amenities: { wifi: true, climate: true, usb: true, screen: false, restroom: true, extraLegroom: true },
      status: "Active",
      seatSelectionEnabled: true,
      nextInspection: "Scheduled Dec 2024",
      driverAssigned: "Unassigned",
    };
    setBuses([createdBus, ...buses]);
    setShowAddModal(false);
    setNewBus({ plateNumber: "", model: "", category: "LUXURY ELITE", capacity: 45, config: "2+2 Standard" });
  };

  const filteredBuses = buses.filter((b) => {
    const matchesSearch =
      b.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.driverAssigned && b.driverAssigned.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "ALL" || b.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "ALL" || b.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span>Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250]">Bus Management</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Bus Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Overview, telemetry and operational readiness of your vehicle fleet
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bus</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Buses</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{buses.length + 120}</span>
            <span className="text-xs text-gray-400">units</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">100% Authorized & Licensed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active Vehicles</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">114</span>
            <span className="text-xs text-emerald-600 font-semibold">91% in service</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Assigned to live routes</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Under Maintenance</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-700">08</span>
            <span className="text-xs text-amber-600 font-semibold">workshop</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">2 Urgent brake/diagnostic</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Avg Fleet Capacity</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#550036]">82%</span>
            <span className="text-xs text-gray-400">load factor</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">+4.2% vs previous month</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by plate, model, driver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="LUXURY ELITE">Luxury Elite</option>
              <option value="EXECUTIVE PLUS">Executive Plus</option>
              <option value="STANDARD">Standard</option>
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Vehicle & Plate</th>
                <th className="py-3 px-4">Category & Config</th>
                <th className="py-3 px-4">Capacity & Load</th>
                <th className="py-3 px-4">Amenities</th>
                <th className="py-3 px-4 text-center">Active Status</th>
                <th className="py-3 px-4 text-center">Seat Selection</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-pink-50/20 transition-colors">
                  {/* Vehicle & Plate */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-pink-50 text-[#550036]">
                        <BusIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{bus.model}</div>
                        <div className="font-mono text-[11px] font-semibold text-gray-500">
                          {bus.plateNumber}
                        </div>
                        {bus.driverAssigned && (
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            Driver: {bus.driverAssigned}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category & Config */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FAF5F7] text-[#550036] border border-pink-100">
                      {bus.category}
                    </span>
                    <div className="text-[11px] text-gray-500 mt-1">{bus.config}</div>
                  </td>

                  {/* Capacity & Load */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-900">{bus.capacity} Seats</span>
                      <span className="text-gray-500">{bus.utilizationRate}%</span>
                    </div>
                    <div className="h-1.5 w-28 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#550036] rounded-full"
                        style={{ width: `${bus.utilizationRate}%` }}
                      />
                    </div>
                  </td>

                  {/* Amenities */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      {bus.amenities.wifi && <span title="Wi-Fi"><Wifi className="w-3.5 h-3.5 text-[#550036]" /></span>}
                      {bus.amenities.climate && <span title="AC"><Wind className="w-3.5 h-3.5 text-[#550036]" /></span>}
                      {bus.amenities.screen && <span title="Screen"><Tv className="w-3.5 h-3.5 text-[#550036]" /></span>}
                      {bus.amenities.extraLegroom && <span title="Legroom"><Armchair className="w-3.5 h-3.5 text-[#550036]" /></span>}
                    </div>
                  </td>

                  {/* Active Toggle Switch */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleActiveStatus(bus.id)}
                      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        bus.status === "Active" ? "bg-[#550036]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          bus.status === "Active" ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="block text-[10px] text-gray-400 mt-1">{bus.status}</span>
                  </td>

                  {/* Seat Selection Toggle Switch */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleSeatSelection(bus.id)}
                      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        bus.seatSelectionEnabled ? "bg-emerald-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          bus.seatSelectionEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="block text-[10px] text-gray-400 mt-1">
                      {bus.seatSelectionEnabled ? "Allowed" : "Auto-Assign"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance & Workshop Alerts Card */}
      <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-gray-900">Scheduled Fleet Maintenance</h2>
          </div>
          <span className="text-xs font-semibold text-gray-500">2 Actions Required</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900">Bus #UAE-3390-X (Scania Touring)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                  URGENT
                </span>
              </div>
              <p className="text-amber-800 text-[11px] mt-1.5">
                Front and rear brake pad friction threshold reached. Service is required before passenger deployment.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-[11px]">
                Assign Workshop Tech
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold text-[11px]">
                Postpone 24h
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Bus #KSA-1024-B (Mercedes Tourismo)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  ROUTINE
                </span>
              </div>
              <p className="text-gray-600 text-[11px] mt-1.5">
                Scheduled 50,000 km electronic transmission diagnosis & AC filter replacement.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-[#550036] hover:bg-[#760046] text-white font-bold text-[11px]">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Bus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Add New Bus to Fleet</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBus} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Plate Number</label>
                <input
                  type="text"
                  placeholder="e.g. KSA-9901-A"
                  value={newBus.plateNumber}
                  onChange={(e) => setNewBus({ ...newBus, plateNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Vehicle Model</label>
                <input
                  type="text"
                  placeholder="e.g. Volvo 9700 Grand"
                  value={newBus.model}
                  onChange={(e) => setNewBus({ ...newBus, model: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newBus.category}
                    onChange={(e) => setNewBus({ ...newBus, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  >
                    <option value="LUXURY ELITE">Luxury Elite</option>
                    <option value="EXECUTIVE PLUS">Executive Plus</option>
                    <option value="STANDARD">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Capacity (Seats)</label>
                  <input
                    type="number"
                    value={newBus.capacity}
                    onChange={(e) => setNewBus({ ...newBus, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#550036] hover:bg-[#760046] text-white font-bold transition-all shadow-sm"
                >
                  Save Vehicle
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

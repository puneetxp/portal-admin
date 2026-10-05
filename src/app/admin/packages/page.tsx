"use client";

import React, { useState } from "react";
import {
  Package as PackageIcon,
  Plus,
  Search,
  Filter,
  Truck,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  CheckCircle2
} from "lucide-react";
import { Package } from "@/data/mockData";

const initialPackages: Package[] = [
  {
    id: "pkg-1",
    code: "PKG-7701",
    title: "Express Parcel Cargo (Same Day)",
    operator: "Arabian Sands Transit",
    category: "Cargo / Freight",
    origin: "Riyadh",
    destination: "Dammam",
    durationDays: 1,
    price: 45,
    status: "Active",
    repetition: "Daily",
  },
  {
    id: "pkg-2",
    code: "PKG-7702",
    title: "Desert Luxury Weekend Getaway (All Inclusive)",
    operator: "Gulf Intercity Coaches",
    category: "VIP Luxury",
    origin: "Dubai",
    destination: "Riyadh",
    durationDays: 3,
    price: 1850,
    status: "Active",
    repetition: "Weekly",
  },
  {
    id: "pkg-3",
    code: "PKG-7703",
    title: "Umrah Pilgrimage Bus + Hotel Transit",
    operator: "Haramain Express Lines",
    category: "Family Package",
    origin: "Jeddah",
    destination: "Mecca",
    durationDays: 5,
    price: 1200,
    status: "Active",
    repetition: "Weekly",
  },
  {
    id: "pkg-4",
    code: "PKG-7704",
    title: "Heavy Luggage & Commercial Freight Cargo",
    operator: "Asir Royal Transport",
    category: "Cargo / Freight",
    origin: "Riyadh",
    destination: "Abha",
    durationDays: 2,
    price: 280,
    status: "Active",
    repetition: "Daily",
  },
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState(false);

  const [newPackage, setNewPackage] = useState({
    title: "",
    operator: "Arabian Sands Transit",
    category: "Cargo / Freight" as Package["category"],
    origin: "Riyadh",
    destination: "Dammam",
    durationDays: 1,
    price: 50,
    repetition: "Daily" as Package["repetition"],
  });

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Package = {
      id: `pkg-${Date.now()}`,
      code: `PKG-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newPackage.title,
      operator: newPackage.operator,
      category: newPackage.category,
      origin: newPackage.origin,
      destination: newPackage.destination,
      durationDays: Number(newPackage.durationDays),
      price: Number(newPackage.price),
      status: "Active",
      repetition: newPackage.repetition,
    };
    setPackages([...packages, created]);
    setIsAddPackageModalOpen(false);
  };

  const filtered = packages.filter((p) => {
    const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Logistics & Cargo</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Packages & Logistics Management
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-[#B20163] font-bold">
              {packages.length} Active Packages
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure travel packages, cargo parcels, bulk freight pricing, and scheduled logistical routes.
          </p>
        </div>

        <button
          onClick={() => setIsAddPackageModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#72003c] shadow-xs transition-all active:scale-98 self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#FFE26D]" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stroke shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by package name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {["ALL", "Cargo / Freight", "VIP Luxury", "Family Package", "Economy Travel"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedCategory === cat
                  ? "bg-[#550036] text-white shadow-xs font-bold"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat === "ALL" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((pkg) => {
          const isCargo = pkg.category === "Cargo / Freight";
          const isLuxury = pkg.category === "VIP Luxury";

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-soft flex flex-col justify-between ${
                isLuxury ? "border-amber-300 shadow-xs ring-1 ring-amber-200" : "border-stroke shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs font-extrabold text-[#550036] bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                    {pkg.code}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      isLuxury
                        ? "bg-amber-50 text-amber-900 border-amber-300"
                        : isCargo
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {pkg.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-gray-900 mt-2.5 leading-snug">
                  {pkg.title}
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">{pkg.operator}</p>

                <div className="my-4 py-3 border-y border-stroke/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Logistical Route:</span>
                    <span className="font-bold text-gray-800">
                      {pkg.origin} → {pkg.destination}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-medium text-gray-800">{pkg.durationDays} Day(s)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Repetition:</span>
                    <span className="font-semibold text-[#550036]">{pkg.repetition}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stroke/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Pricing</span>
                  <span className="font-black text-lg text-gray-900">{pkg.price} SAR</span>
                </div>
                <button className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#550036] hover:bg-pink-50 border border-stroke transition-colors">
                  Edit Package
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Package Modal */}
      {isAddPackageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Cargo & Package Setup
                </span>
                <h3 className="text-xl font-black text-[#550036]">Add New Package</h3>
              </div>
              <button
                onClick={() => setIsAddPackageModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPackage} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Express Refrigerated Freight"
                  value={newPackage.title}
                  onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Operator</label>
                  <select
                    value={newPackage.operator}
                    onChange={(e) => setNewPackage({ ...newPackage, operator: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  >
                    <option value="Arabian Sands Transit">Arabian Sands Transit</option>
                    <option value="Gulf Intercity Coaches">Gulf Intercity Coaches</option>
                    <option value="Haramain Express Lines">Haramain Express Lines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newPackage.category}
                    onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  >
                    <option value="Cargo / Freight">Cargo / Freight</option>
                    <option value="VIP Luxury">VIP Luxury</option>
                    <option value="Family Package">Family Package</option>
                    <option value="Economy Travel">Economy Travel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Price (SAR)</label>
                  <input
                    type="number"
                    required
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={newPackage.durationDays}
                    onChange={(e) => setNewPackage({ ...newPackage, durationDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Repetition</label>
                  <select
                    value={newPackage.repetition}
                    onChange={(e) => setNewPackage({ ...newPackage, repetition: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-stroke flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddPackageModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#72003c]"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

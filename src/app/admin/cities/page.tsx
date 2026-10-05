"use client";

import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Search,
  Building,
  Route,
  CheckCircle2,
  Globe2,
  Compass,
  ArrowUpRight
} from "lucide-react";
import { initialCities, City } from "@/data/mockData";

export default function AdminCitiesPage() {
  const [cities, setCities] = useState<City[]>(initialCities);
  const [countryFilter, setCountryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);

  const [newCity, setNewCity] = useState({
    name: "",
    country: "Saudi Arabia" as City["country"],
    stationsCount: 4,
    status: "Operational" as City["status"],
    routesCount: 12,
    mainHub: "",
  });

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    const created: City = {
      id: `c-${Date.now()}`,
      name: newCity.name,
      country: newCity.country,
      stationsCount: Number(newCity.stationsCount),
      status: newCity.status,
      routesCount: Number(newCity.routesCount),
      mainHub: newCity.mainHub || `${newCity.name} Central Terminal`,
    };
    setCities([...cities, created]);
    setIsAddCityModalOpen(false);
  };

  const filteredCities = cities.filter((c) => {
    const matchesCountry = countryFilter === "ALL" || c.country === countryFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mainHub.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Network & Regional Hubs</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Cities & Transit Hubs
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-[#B20163] font-bold">
              {cities.length} Served Cities
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage the list of service cities, intermodal stations, and cross-border corridors.
          </p>
        </div>

        <button
          onClick={() => setIsAddCityModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#72003c] shadow-xs transition-all active:scale-98 self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#FFE26D]" />
          <span>Add City</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stroke shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by city name or hub terminal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {[
            { id: "ALL", label: "All Countries", flag: "🌐" },
            { id: "Saudi Arabia", label: "Saudi Arabia", flag: "🇸🇦" },
            { id: "UAE", label: "UAE", flag: "🇦🇪" },
            { id: "Oman", label: "Oman", flag: "🇴🇲" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCountryFilter(c.id)}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                countryFilter === c.id
                  ? "bg-[#550036] text-white shadow-xs font-bold"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cities Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCities.map((city) => {
          const flag =
            city.country === "Saudi Arabia"
              ? "🇸🇦"
              : city.country === "UAE"
              ? "🇦🇪"
              : "🇴🇲";

          return (
            <div
              key={city.id}
              className="bg-white rounded-2xl p-5 border border-stroke shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{flag}</span>
                    <div>
                      <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#550036] transition-colors">
                        {city.name}
                      </h3>
                      <p className="text-xs font-medium text-gray-400">{city.country}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      city.status === "Operational"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {city.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4 py-3 border-y border-stroke/60 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#550036] flex items-center justify-center font-bold">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Stations</span>
                      <p className="font-extrabold text-gray-900">{city.stationsCount} Hubs</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Route className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Connected Routes</span>
                      <p className="font-extrabold text-gray-900">{city.routesCount} Active</p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                    Main Intermodal Terminal
                  </span>
                  <p className="text-xs font-semibold text-gray-800 truncate">{city.mainHub}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-stroke/60 mt-4 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-400">Scheduled daily dispatches</span>
                <button className="font-bold text-[#550036] hover:text-[#72003c] flex items-center gap-1">
                  Manage Stations →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add City Modal */}
      {isAddCityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Regional Transit Expansion
                </span>
                <h3 className="text-xl font-black text-[#550036]">Add Service City</h3>
              </div>
              <button
                onClick={() => setIsAddCityModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCity} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">City Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taif, Tabuk, Abu Dhabi"
                  value={newCity.name}
                  onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Country</label>
                  <select
                    value={newCity.country}
                    onChange={(e) => setNewCity({ ...newCity, country: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  >
                    <option value="Saudi Arabia">Saudi Arabia (🇸🇦)</option>
                    <option value="UAE">UAE (🇦🇪)</option>
                    <option value="Oman">Oman (🇴🇲)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Number of Stations</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCity.stationsCount}
                    onChange={(e) => setNewCity({ ...newCity, stationsCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Main Terminal / Hub Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Central Intercity Terminal"
                  value={newCity.mainHub}
                  onChange={(e) => setNewCity({ ...newCity, mainHub: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs text-gray-800 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stroke flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddCityModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#72003c]"
                >
                  Save City
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

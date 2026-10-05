"use client";

import React, { useState } from "react";
import {
  Percent,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Sliders,
  DollarSign,
  TrendingUp,
  Building,
  ArrowRight
} from "lucide-react";

interface CommissionTier {
  id: string;
  category: string;
  rateType: "Percentage" | "Fixed Fee";
  rateValue: number;
  description: string;
  operatorsCount: number;
  status: "Active" | "Draft";
}

const initialTiers: CommissionTier[] = [
  {
    id: "tier-1",
    category: "Standard Intercity Coaches",
    rateType: "Percentage",
    rateValue: 7.5,
    description: "Default platform rate applied to all regular intercity trips.",
    operatorsCount: 24,
    status: "Active",
  },
  {
    id: "tier-2",
    category: "Luxury (Gold Class VIP)",
    rateType: "Percentage",
    rateValue: 10.0,
    description: "Applied to ultra-luxury, premium hospitality coaches with complimentary catering.",
    operatorsCount: 8,
    status: "Active",
  },
  {
    id: "tier-3",
    category: "Cargo, Freight & Logistics",
    rateType: "Percentage",
    rateValue: 12.0,
    description: "Applied to commercial package and freight dispatches.",
    operatorsCount: 6,
    status: "Active",
  },
  {
    id: "tier-4",
    category: "Cross-Border International Express (UAE / Oman)",
    rateType: "Percentage",
    rateValue: 9.0,
    description: "Cross-border customs support and multi-currency handling fee.",
    operatorsCount: 4,
    status: "Active",
  },
];

export default function AdminCommissionsPage() {
  const [tiers, setTiers] = useState<CommissionTier[]>(initialTiers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [testAmount, setTestAmount] = useState<number>(350);
  const [selectedTierForCalc, setSelectedTierForCalc] = useState<number>(7.5);

  const [newTier, setNewTier] = useState({
    category: "",
    rateType: "Percentage" as CommissionTier["rateType"],
    rateValue: 8.0,
    description: "",
  });

  const handleAddTier = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CommissionTier = {
      id: `tier-${Date.now()}`,
      category: newTier.category,
      rateType: newTier.rateType,
      rateValue: Number(newTier.rateValue),
      description: newTier.description,
      operatorsCount: 0,
      status: "Active",
    };
    setTiers([...tiers, created]);
    setIsAddModalOpen(false);
  };

  const calculatedPlatformCommission = (testAmount * selectedTierForCalc) / 100;
  const calculatedOperatorEarnings = testAmount - calculatedPlatformCommission;

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Monetization & Commission</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Platform Commission & Revenue Splits
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-[#B20163] font-bold">
              {tiers.length} Active Tiers
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure platform commission tiers, tiered revenue splits, and operator fee overrides.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#760046] shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4 text-[#FFE26D]" />
          <span>Create Commission Tier</span>
        </button>
      </div>

      {/* Simulator Widget */}
      <div className="bg-gradient-to-r from-[#3B0227] via-[#550036] to-[#760046] rounded-3xl p-6 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-md">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFE26D]">
              Interactive Settlement Simulator
            </span>
            <h2 className="text-xl font-black">Live Commission Breakdown Preview</h2>
            <p className="text-xs text-pink-100/80">
              Simulate real-time revenue splits between Bus Arabia platform and partner fleet operators.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-wrap items-center gap-6 text-xs w-full lg:w-auto">
            <div>
              <label className="block text-[10px] uppercase font-bold text-pink-200 mb-1">
                Gross Ticket Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={testAmount}
                  onChange={(e) => setTestAmount(Number(e.target.value))}
                  className="w-32 px-3 py-1.5 bg-black/20 border border-white/30 rounded-xl text-white font-black text-sm focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-pink-200">
                  SAR
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-pink-200 mb-1">
                Tier Percentage
              </label>
              <select
                value={selectedTierForCalc}
                onChange={(e) => setSelectedTierForCalc(Number(e.target.value))}
                className="px-3 py-2 bg-black/20 border border-white/30 rounded-xl text-white font-bold text-xs focus:outline-none"
              >
                {tiers.map((t) => (
                  <option key={t.id} value={t.rateValue} className="text-gray-900">
                    {t.category} ({t.rateValue}%)
                  </option>
                ))}
              </select>
            </div>

            <div className="border-l border-white/20 pl-6 space-y-1">
              <div className="text-[11px] text-pink-200">
                Platform Share:{" "}
                <span className="font-extrabold text-[#FFE26D] text-sm">
                  {calculatedPlatformCommission.toFixed(2)} SAR
                </span>
              </div>
              <div className="text-[11px] text-pink-200">
                Operator Payout:{" "}
                <span className="font-extrabold text-white text-sm">
                  {calculatedOperatorEarnings.toFixed(2)} SAR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="bg-white rounded-2xl p-5 border border-stroke shadow-xs hover:shadow-soft transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">{tier.category}</h3>
                  <p className="text-xs text-gray-500 mt-1">{tier.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#550036]">
                    {tier.rateValue}%
                  </div>
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    {tier.rateType}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stroke/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-600">
                  {tier.operatorsCount} Fleet Operators Assigned
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {tier.status}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stroke/60 mt-4 flex justify-end gap-2">
              <button className="px-3 py-1.5 rounded-xl border border-stroke text-xs font-semibold text-gray-600 hover:bg-gray-50">
                Edit Rate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Tier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <h3 className="text-xl font-black text-[#550036]">Create Commission Tier</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTier} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Tier / Service Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Luxury Express"
                  value={newTier.category}
                  onChange={(e) => setNewTier({ ...newTier, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Rate Type</label>
                  <select
                    value={newTier.rateType}
                    onChange={(e) => setNewTier({ ...newTier, rateType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed Fee">Fixed Fee (SAR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Rate Value</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newTier.rateValue}
                    onChange={(e) => setNewTier({ ...newTier, rateValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newTier.description}
                  onChange={(e) => setNewTier({ ...newTier, description: e.target.value })}
                  placeholder="Terms and applicability criteria..."
                  className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-stroke flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#760046]"
                >
                  Save Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

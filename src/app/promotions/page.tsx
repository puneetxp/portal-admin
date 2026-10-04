"use client";

import React, { useState } from "react";
import {
  Tag,
  Search,
  Plus,
  Percent,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { mockOperatorPromotions, OperatorPromotionItem } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function PromotionsManagementPage() {
  const [promotions, setPromotions] = useState<OperatorPromotionItem[]>(mockOperatorPromotions);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newPromo, setNewPromo] = useState({
    code: "",
    name: "",
    discountType: "Percentage",
    discountValue: "20%",
    applicableRoute: "All Fleet Routes",
    validUntil: "2023-11-30",
    maxRedemptions: 500,
  });

  const togglePromoStatus = (id: string) => {
    setPromotions(
      promotions.map((p): OperatorPromotionItem =>
        p.id === id ? { ...p, status: p.status === "Active" ? "Paused" : "Active" } : p
      )
    );
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const created: OperatorPromotionItem = {
      id: `p-${Date.now()}`,
      code: newPromo.code.toUpperCase(),
      name: newPromo.name,
      discountType: newPromo.discountType,
      discountValue: newPromo.discountValue,
      applicableRoute: newPromo.applicableRoute,
      validFrom: "Today",
      validUntil: newPromo.validUntil,
      usedCount: 0,
      maxRedemptions: Number(newPromo.maxRedemptions),
      status: "Active",
      totalDiscountDisbursed: "SAR 0.00",
    };
    setPromotions([created, ...promotions]);
    setShowCreateModal(false);
  };

  const filteredPromos = promotions.filter((p) =>
    p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.applicableRoute.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span>Growth & Commercial</span>
            <span>/</span>
            <span className="text-[#950250]">Cashback & Promotions</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Promotions & Cashback
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Operator sponsored promotional campaigns, coupon redemptions, and passenger acquisition incentives
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active Campaigns</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{promotions.filter(p => p.status === "Active").length}</span>
            <span className="text-xs text-emerald-600 font-semibold">Live in app</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Checkout coupon validation</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Redeemed</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#550036]">SAR 34,200</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Disbursed passenger savings</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Redemptions</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">1,280</span>
            <span className="text-xs text-gray-400">tickets</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Converted passenger checkouts</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Avg ROI Multiplier</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-700">4.6x</span>
            <span className="text-xs text-purple-600 font-semibold">Gross Return</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">Generated SAR 157K in ticket volume</span>
        </div>
      </div>

      {/* AI Campaign Opportunity Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF5F7] via-[#FFF8E6] to-[#FAF5F7] border border-pink-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-900 flex items-center gap-2">
              <span>Bus Arabia Dynamic Demand Recommendation</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-[#550036] text-white">
                AI INSIGHT
              </span>
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Riyadh → Dammam corridor has 32% unbooked seat inventory on Thursday evening departures. Launching a 15% flash cashback promo can capture an estimated SAR 18,500 in additional ticket bookings.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            alert("Dynamic 15% Flash Cashback promo scheduled for Thursday departures!");
          }}
          className="px-4 py-2.5 rounded-xl bg-[#550036] hover:bg-[#760046] text-white font-bold text-xs whitespace-nowrap shadow-xs active:scale-98 transition-all"
        >
          Launch Flash Campaign
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaigns, coupon code, route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#B20163]"
          />
        </div>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F8] text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Campaign Code & Title</th>
                <th className="py-3 px-4">Incentive</th>
                <th className="py-3 px-4">Eligible Corridors</th>
                <th className="py-3 px-4">Active Validity Window</th>
                <th className="py-3 px-4">Redemption Progress</th>
                <th className="py-3 px-4 text-center">Campaign State</th>
                <th className="py-3 px-4 text-right">Disbursed Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPromos.map((p) => (
                <tr key={p.id} className="hover:bg-pink-50/20 transition-colors">
                  {/* Campaign Code & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-pink-50 text-[#550036]">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-mono font-bold text-gray-900 text-xs tracking-wider">
                          {p.code}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{p.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Incentive */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-[#FAF5F7] text-[#550036] border border-pink-100">
                      {p.discountValue}
                    </span>
                  </td>

                  {/* Eligible Corridors */}
                  <td className="py-3.5 px-4 font-semibold text-gray-700">
                    {p.applicableRoute}
                  </td>

                  {/* Validity Window */}
                  <td className="py-3.5 px-4">
                    <div className="text-gray-900 font-medium">{p.validUntil}</div>
                    <div className="text-[10px] text-gray-400">from {p.validFrom}</div>
                  </td>

                  {/* Redemption Progress */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>{p.usedCount} / {p.maxRedemptions}</span>
                      <span className="text-[11px] text-gray-400">
                        {Math.round((p.usedCount / p.maxRedemptions) * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-28 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#550036] rounded-full"
                        style={{ width: `${(p.usedCount / p.maxRedemptions) * 100}%` }}
                      />
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePromoStatus(p.id)}
                      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        p.status === "Active" ? "bg-[#550036]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          p.status === "Active" ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="block text-[10px] text-gray-400 mt-1">{p.status}</span>
                  </td>

                  {/* Disbursed Value */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900">
                    {p.totalDiscountDisbursed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Create Promotional Campaign</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. FLASH30"
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                  className="w-full px-3 py-2 uppercase font-mono bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  placeholder="e.g. Weekend Flash Deal"
                  value={newPromo.name}
                  onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Discount Value</label>
                  <input
                    type="text"
                    placeholder="e.g. 20% or SAR 50"
                    value={newPromo.discountValue}
                    onChange={(e) => setNewPromo({ ...newPromo, discountValue: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Max Redemptions</label>
                  <input
                    type="number"
                    value={newPromo.maxRedemptions}
                    onChange={(e) => setNewPromo({ ...newPromo, maxRedemptions: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Expiration Date</label>
                <input
                  type="date"
                  value={newPromo.validUntil}
                  onChange={(e) => setNewPromo({ ...newPromo, validUntil: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#550036] hover:bg-[#760046] text-white font-bold transition-all shadow-sm"
                >
                  Activate Campaign
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

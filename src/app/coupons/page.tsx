"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Tag,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Gift,
  Coins,
  Percent,
  Copy,
  Check
} from "lucide-react";
import { initialPromoCodes, PromoCode } from "@/data/mockData";

export default function CouponsPage() {
  const [promos, setPromos] = useState<PromoCode[]>(initialPromoCodes);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [newPromo, setNewPromo] = useState({
    code: "",
    discountType: "Percentage" as PromoCode["discountType"],
    value: 15,
    minSpend: 100,
    maxDiscount: 50,
    validUntil: "2024-12-31",
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PromoCode = {
      id: `promo-${Date.now()}`,
      code: newPromo.code.toUpperCase(),
      discountType: newPromo.discountType,
      value: Number(newPromo.value),
      minSpend: Number(newPromo.minSpend),
      maxDiscount: Number(newPromo.maxDiscount),
      validUntil: newPromo.validUntil,
      totalRedemptions: 0,
      status: "Active",
    };
    setPromos([created, ...promos]);
    setIsAddModalOpen(false);
  };

  const filtered = promos.filter((p) =>
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            Promotions & Discount Coupons
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-[#B20163] font-bold">
              {promos.length} Coupons Configured
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and track promotional discount campaigns, partner vouchers, and seasonal fare discounts.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#550036] via-[#760046] to-[#950250] hover:opacity-95 shadow-md shadow-[#550036]/20 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-gold-light" />
          Create Promo Code
        </button>
      </div>

      {/* KPI Cards from Figma (Screen 602:3897) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Active Campaigns
          </span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">24</div>
          <div className="text-xs text-gray-500 mt-2">Running across GCC web & apps</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Total Redemptions
          </span>
          <div className="text-3xl font-extrabold text-[#550036] mt-1">18,490</div>
          <div className="text-xs text-emerald-600 mt-2 font-medium">+8.1% passenger conversion</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Total Savings Granted
          </span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">SAR 142.5k</div>
          <div className="text-xs text-gray-500 mt-2">Platform subsidized customer rewards</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Highest Converting
          </span>
          <div className="text-2xl font-black text-brand-primary mt-1 font-mono">EID2024</div>
          <div className="text-xs text-gray-500 mt-2">4,210 successful bookings</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stroke shadow-card flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by promo code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
          />
        </div>
      </div>

      {/* Promos Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF5F7] border-b border-stroke text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Promo Voucher</th>
                <th className="py-3 px-6">Discount Value</th>
                <th className="py-3 px-6">Min. Spend</th>
                <th className="py-3 px-6">Max. Cap</th>
                <th className="py-3 px-6">Total Redemptions</th>
                <th className="py-3 px-6">Expiry Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke/60 font-medium text-gray-800">
              {filtered.map((p) => {
                const isExpired = p.status === "Expired";
                return (
                  <tr key={p.id} className="hover:bg-pink-50/20 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-[#550036] bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100">
                          {p.code}
                        </span>
                        <button
                          onClick={() => handleCopy(p.code)}
                          className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                          title="Copy Code"
                        >
                          {copiedCode === p.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-extrabold text-gray-900 text-sm">
                      {p.discountType === "Percentage"
                        ? `${p.value}% OFF`
                        : `${p.value} SAR FLAT`}
                    </td>
                    <td className="py-3.5 px-6 text-gray-600">{p.minSpend || 0} SAR</td>
                    <td className="py-3.5 px-6 text-gray-600">{p.maxDiscount || 0} SAR</td>
                    <td className="py-3.5 px-6 font-bold text-gray-900">
                      {p.totalRedemptions.toLocaleString()} used
                    </td>
                    <td className="py-3.5 px-6 text-gray-500">{p.validUntil}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          isExpired
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button className="px-3 py-1 rounded-lg border border-stroke text-xs font-semibold text-gray-600 hover:bg-gray-50">
                        Deactivate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Promo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <h3 className="text-xl font-black text-brand-primary">Create New Promo Campaign</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPromo} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Voucher Code (e.g. SUMMER50, VIP2024)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DESERTDEAL"
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs font-mono font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Discount Type</label>
                  <select
                    value={newPromo.discountType}
                    onChange={(e) => setNewPromo({ ...newPromo, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed (SAR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={newPromo.value}
                    onChange={(e) => setNewPromo({ ...newPromo, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Min Spend (SAR)
                  </label>
                  <input
                    type="number"
                    value={newPromo.minSpend}
                    onChange={(e) => setNewPromo({ ...newPromo, minSpend: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Max Discount Cap (SAR)
                  </label>
                  <input
                    type="number"
                    value={newPromo.maxDiscount}
                    onChange={(e) => setNewPromo({ ...newPromo, maxDiscount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newPromo.validUntil}
                  onChange={(e) => setNewPromo({ ...newPromo, validUntil: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs"
                />
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
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#550036] to-[#B20163]"
                >
                  Publish Promo Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

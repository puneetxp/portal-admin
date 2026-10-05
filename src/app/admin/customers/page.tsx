"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Wallet,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Eye,
  ShieldAlert,
  ArrowUpRight,
  Phone,
  Mail,
  Ticket
} from "lucide-react";
import { initialCustomers, Customer } from "@/data/mockData";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const toggleStatus = (id: string) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === id) {
          const next = c.status === "Active" ? "Suspended" : "Active";
          return { ...c, status: next };
        }
        return c;
      })
    );
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Platform Governance</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">User Management</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            Registered Travelers & Wallets
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-[#B20163] font-bold">
              12,842 Total
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage passenger directories, loyalty status, wallet balances, and account integrity across all carriers.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Total Customers
          </span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">12,842</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>+4.2%</span>
            <span className="text-gray-400 font-normal">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Active Now
          </span>
          <div className="text-3xl font-extrabold text-[#550036] mt-1">1,104</div>
          <div className="text-xs text-gray-500 mt-2">Live sessions on mobile apps</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Suspended
          </span>
          <div className="text-3xl font-extrabold text-rose-600 mt-1">142</div>
          <div className="text-xs text-rose-700 mt-2 font-medium">Requires review & KYC</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stroke shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Wallet Credits
          </span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">SAR 482k</div>
          <div className="text-xs text-gray-500 mt-2">Floating customer balance</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-stroke shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by passenger name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF5F7] border border-stroke rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {["ALL", "Active", "Suspended"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                statusFilter === st
                  ? "bg-[#550036] text-white shadow-xs font-bold"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Travelers Table */}
      <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF5F7] border-b border-stroke text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Traveler</th>
                <th className="py-3 px-6">Contact Details</th>
                <th className="py-3 px-6">Loyalty Tier</th>
                <th className="py-3 px-6">Total Trips</th>
                <th className="py-3 px-6">Wallet Balance</th>
                <th className="py-3 px-6">Last Active</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke/60 font-medium text-gray-800">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-pink-50/20 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-extrabold text-gray-900 text-sm">{cust.name}</div>
                    <div className="text-[11px] text-gray-400">Nationality: {cust.nationality}</div>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="font-semibold text-gray-800">{cust.phone}</div>
                    <div className="text-[11px] text-gray-400">{cust.email}</div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        cust.loyaltyTier === "Gold VIP"
                          ? "bg-amber-50 text-amber-900 border-amber-300"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {cust.loyaltyTier}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-bold text-gray-900">
                    {cust.totalBookings} Bookings
                  </td>
                  <td className="py-3.5 px-6 font-black text-[#550036] text-sm">
                    {cust.walletBalance} SAR
                  </td>
                  <td className="py-3.5 px-6 text-gray-500">{cust.lastActive}</td>
                  <td className="py-3.5 px-6">
                    <button
                      onClick={() => toggleStatus(cust.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border transition-colors ${
                        cust.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                      }`}
                    >
                      {cust.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#550036] hover:bg-pink-100 transition-colors"
                      title="Inspect Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stroke animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Traveler Profile & Wallet
                </span>
                <h3 className="text-xl font-black text-[#550036]">{selectedCustomer.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF5F7] border border-stroke flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Wallet Stored Balance</span>
                  <div className="text-2xl font-black text-[#550036] mt-0.5">
                    {selectedCustomer.walletBalance} SAR
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full font-extrabold text-[11px]">
                  {selectedCustomer.loyaltyTier}
                </span>
              </div>

              <div className="border border-stroke rounded-2xl p-4 space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone Number:</span>
                  <span className="font-bold text-gray-800">{selectedCustomer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email Address:</span>
                  <span className="font-semibold text-gray-800">{selectedCustomer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Bookings Completed:</span>
                  <span className="font-bold text-gray-900">{selectedCustomer.totalBookings} Trips</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since:</span>
                  <span className="font-medium text-gray-800">{selectedCustomer.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stroke flex justify-end gap-2.5">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#550036] hover:bg-[#760046]"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

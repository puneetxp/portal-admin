"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Users,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Star,
  Bus as BusIcon,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Award,
  IdCard,
  Clock,
  MoreVertical,
} from "lucide-react";

interface TeamMember {
  id: string;
  employeeId: string;
  name: string;
  role: "Chief Operator" | "Fleet Dispatcher" | "Senior Captain (Driver)" | "Station Lead";
  phone: string;
  email: string;
  assignedBusPlate: string;
  primaryRoute: string;
  licenseNumber: string;
  licenseExpiry: string;
  dutyStatus: "On Trip" | "Available" | "Resting" | "On Leave";
  safetyRating: number;
  totalTripsCompleted: number;
}

const initialTeam: TeamMember[] = [
  {
    id: "staff-1",
    employeeId: "AFS-OP-001",
    name: "Ahmed Hassan",
    role: "Chief Operator",
    phone: "+966 50 123 4567",
    email: "a.hassan@arabiafleet.sa",
    assignedBusPlate: "HQ Command",
    primaryRoute: "Network Wide Oversight",
    licenseNumber: "MOT-DIR-88129",
    licenseExpiry: "2026-12-31",
    dutyStatus: "Available",
    safetyRating: 5.0,
    totalTripsCompleted: 1420,
  },
  {
    id: "staff-2",
    employeeId: "AFS-DRV-102",
    name: "Tariq Mansour",
    role: "Senior Captain (Driver)",
    phone: "+966 54 882 1199",
    email: "t.mansour@arabiafleet.sa",
    assignedBusPlate: "KSA 4812",
    primaryRoute: "Riyadh ⇄ Jeddah Express",
    licenseNumber: "CDL-SA-994120",
    licenseExpiry: "2025-08-14",
    dutyStatus: "On Trip",
    safetyRating: 4.9,
    totalTripsCompleted: 342,
  },
  {
    id: "staff-3",
    employeeId: "AFS-DRV-105",
    name: "Ibrahim Khalid",
    role: "Senior Captain (Driver)",
    phone: "+966 56 312 9081",
    email: "i.khalid@arabiafleet.sa",
    assignedBusPlate: "DXB 7731",
    primaryRoute: "Dubai ⇄ Abu Dhabi Rapid",
    licenseNumber: "CDL-UAE-551209",
    licenseExpiry: "2025-11-20",
    dutyStatus: "On Trip",
    safetyRating: 4.85,
    totalTripsCompleted: 289,
  },
  {
    id: "staff-4",
    employeeId: "AFS-DSP-012",
    name: "Sami Al-Farsi",
    role: "Fleet Dispatcher",
    phone: "+966 55 901 2284",
    email: "s.farsi@arabiafleet.sa",
    assignedBusPlate: "Terminal Control",
    primaryRoute: "Olaya Hub Dispatch",
    licenseNumber: "MOT-DSP-33419",
    licenseExpiry: "2026-05-10",
    dutyStatus: "Available",
    safetyRating: 4.95,
    totalTripsCompleted: 890,
  },
  {
    id: "staff-5",
    employeeId: "AFS-DRV-108",
    name: "Fahad Al-Zahrani",
    role: "Senior Captain (Driver)",
    phone: "+966 50 671 4452",
    email: "f.zahrani@arabiafleet.sa",
    assignedBusPlate: "KSA 9021",
    primaryRoute: "Riyadh ⇄ Dammam Coastal",
    licenseNumber: "CDL-SA-661208",
    licenseExpiry: "2025-04-18",
    dutyStatus: "Resting",
    safetyRating: 4.9,
    totalTripsCompleted: 198,
  },
  {
    id: "staff-6",
    employeeId: "AFS-STL-003",
    name: "Omar Al-Ghamdi",
    role: "Station Lead",
    phone: "+966 53 441 8830",
    email: "o.ghamdi@arabiafleet.sa",
    assignedBusPlate: "Gate 3 Ground",
    primaryRoute: "Jeddah Corniche Terminal",
    licenseNumber: "MOT-GATE-1102",
    licenseExpiry: "2026-09-01",
    dutyStatus: "Available",
    safetyRating: 4.8,
    totalTripsCompleted: 450,
  },
];

export default function OperatorTeamManagementPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  // New member form
  const [newMember, setNewMember] = useState({
    name: "",
    role: "Senior Captain (Driver)" as TeamMember["role"],
    phone: "",
    email: "",
    assignedBusPlate: "KSA 4812",
    primaryRoute: "Riyadh ⇄ Jeddah Express",
    licenseNumber: "",
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TeamMember = {
      id: `staff-${Date.now()}`,
      employeeId: `AFS-DRV-${Math.floor(200 + Math.random() * 800)}`,
      name: newMember.name,
      role: newMember.role,
      phone: newMember.phone || "+966 50 000 0000",
      email: newMember.email || `${newMember.name.toLowerCase().replace(/\s+/g, ".")}@arabiafleet.sa`,
      assignedBusPlate: newMember.assignedBusPlate,
      primaryRoute: newMember.primaryRoute,
      licenseNumber: newMember.licenseNumber || "CDL-SA-999000",
      licenseExpiry: "2026-01-01",
      dutyStatus: "Available",
      safetyRating: 5.0,
      totalTripsCompleted: 0,
    };
    setTeam([...team, created]);
    setShowAddModal(false);
    setNewMember({
      name: "",
      role: "Senior Captain (Driver)",
      phone: "",
      email: "",
      assignedBusPlate: "KSA 4812",
      primaryRoute: "Riyadh ⇄ Jeddah Express",
      licenseNumber: "",
    });
  };

  const filteredTeam = team.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.assignedBusPlate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "ALL" || member.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || member.dutyStatus === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
              <span>Operations & Fleet</span>
              <span>/</span>
              <span className="text-[#950250]">Team & Captains</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Operations Roster & Captains
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage Arabia Fleet Services drivers, dispatch officers, and station ground crew
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#FFE26D]" />
            <span>Add Team Member</span>
          </button>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Operations Staff</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900">{team.length}</span>
              <span className="text-xs text-emerald-600 font-semibold">Active</span>
            </div>
            <span className="text-[11px] text-gray-500 mt-2 block">Captains, dispatch & station crew</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Currently On Road</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#550036]">
                {team.filter((m) => m.dutyStatus === "On Trip").length}
              </span>
              <span className="text-xs text-emerald-600 font-semibold">Live in Transit</span>
            </div>
            <span className="text-[11px] text-gray-500 mt-2 block">GPS tracking & active timetable</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Avg Safety Score</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-600">4.92</span>
              <span className="text-xs text-amber-600 font-semibold">★ / 5.0</span>
            </div>
            <span className="text-[11px] text-gray-500 mt-2 block">Zero safety infractions this quarter</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-xs">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">MOT Compliance</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-700">100%</span>
              <span className="text-xs text-emerald-600 font-semibold">Verified</span>
            </div>
            <span className="text-[11px] text-gray-500 mt-2 block">All licenses and permits up to date</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-stroke shadow-xs flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, employee ID, license, or bus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#550036]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="Senior Captain (Driver)">Captains (Drivers)</option>
              <option value="Fleet Dispatcher">Dispatchers</option>
              <option value="Station Lead">Station Leads</option>
              <option value="Chief Operator">Chief Operator</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option value="ALL">All Duty Statuses</option>
              <option value="On Trip">On Trip</option>
              <option value="Available">Available</option>
              <option value="Resting">Resting</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        {/* Roster Table */}
        <div className="bg-white rounded-2xl border border-stroke shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Staff Member</th>
                  <th className="py-3.5 px-4">Role / Position</th>
                  <th className="py-3.5 px-4">Assigned Vehicle</th>
                  <th className="py-3.5 px-4">Primary Corridor</th>
                  <th className="py-3.5 px-4">MOT License</th>
                  <th className="py-3.5 px-4 text-center">Safety Rating</th>
                  <th className="py-3.5 px-4 text-center">Duty Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-pink-50/20 transition-colors">
                    {/* Name & ID */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#550036]/10 text-[#550036] font-black text-xs flex items-center justify-center">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{member.name}</p>
                          <p className="text-[11px] font-mono text-gray-400">{member.employeeId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4 font-semibold text-gray-700">
                      {member.role}
                    </td>

                    {/* Bus Plate */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-gray-800">
                        <BusIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span>{member.assignedBusPlate}</span>
                      </div>
                    </td>

                    {/* Primary Route */}
                    <td className="py-3.5 px-4 text-gray-600 font-medium">
                      {member.primaryRoute}
                    </td>

                    {/* License */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono text-gray-800 font-semibold">{member.licenseNumber}</span>
                        <p className="text-[10px] text-gray-400">Exp: {member.licenseExpiry}</p>
                      </div>
                    </td>

                    {/* Safety Rating */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {member.safetyRating.toFixed(1)}
                      </span>
                    </td>

                    {/* Duty Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          member.dutyStatus === "On Trip"
                            ? "bg-purple-100 text-purple-800 animate-pulse"
                            : member.dutyStatus === "Available"
                            ? "bg-emerald-100 text-emerald-800"
                            : member.dutyStatus === "Resting"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.dutyStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => alert(`Reviewing telemetry & shift log for ${member.name}`)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Team Member Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stroke">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-base font-black text-gray-900">Add Team Member / Driver</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddMember} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Youssef Al-Harbi"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:border-[#550036]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Role / Designation</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value as any })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                    >
                      <option value="Senior Captain (Driver)">Senior Captain (Driver)</option>
                      <option value="Fleet Dispatcher">Fleet Dispatcher</option>
                      <option value="Station Lead">Station Lead</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      placeholder="+966 50 111 2233"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none focus:border-[#550036]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Vehicle Assignment</label>
                    <input
                      type="text"
                      placeholder="e.g. KSA 4812"
                      value={newMember.assignedBusPlate}
                      onChange={(e) => setNewMember({ ...newMember, assignedBusPlate: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Commercial License #</label>
                    <input
                      type="text"
                      placeholder="e.g. CDL-SA-883102"
                      value={newMember.licenseNumber}
                      onChange={(e) => setNewMember({ ...newMember, licenseNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
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
                    Register Crew Member
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

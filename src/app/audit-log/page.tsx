"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Terminal,
  Activity,
  Layers,
  User,
  Globe,
  Monitor,
  X,
  FileCode,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

interface AuditLogRecord {
  id: string;
  timestamp: string;
  timeAgo: string;
  userName: string;
  userInitials: string;
  userRole: string;
  userEmail: string;
  orgType: "Platform Admin" | "Operator" | "Support Center" | "System Engine";
  module: "Payouts" | "Trips" | "Buses" | "Bookings" | "Security" | "Discounts";
  action: string;
  actionType: "CRITICAL" | "STANDARD" | "WARNING";
  changeDetails: {
    summary: string;
    oldValue?: string;
    newValue?: string;
    referenceId?: string;
  };
  sourceIp: string;
  deviceInfo: string;
  jsonPayload?: string;
}

const mockAuditLogs: AuditLogRecord[] = [
  {
    id: "LOG-99281",
    timestamp: "Oct 24, 2023 14:32:10",
    timeAgo: "12m ago",
    userName: "Khalid Mahmud",
    userInitials: "KM",
    userRole: "Super Admin",
    userEmail: "khalid.m@busarabia.com",
    orgType: "Platform Admin",
    module: "Payouts",
    action: "COMMISSION_RATE_UPDATE",
    actionType: "CRITICAL",
    changeDetails: {
      summary: "Operator SAPTCO commission revised",
      oldValue: "12.0%",
      newValue: "15.0%",
      referenceId: "PYT-9928",
    },
    sourceIp: "192.168.1.45",
    deviceInfo: "Chrome 118 / macOS Sonoma",
    jsonPayload: JSON.stringify(
      {
        operatorId: "OP-001",
        operator: "SAPTCO Transit",
        previousCommission: 0.12,
        newCommission: 0.15,
        effectiveDate: "2023-11-01T00:00:00Z",
        authorizedBy: "Khalid Mahmud (UID: ADM-01)",
        reason: "Contract annual rate renegotiation",
      },
      null,
      2
    ),
  },
  {
    id: "LOG-99280",
    timestamp: "Oct 24, 2023 14:15:22",
    timeAgo: "29m ago",
    userName: "Tariq Al-Mansoor",
    userInitials: "TM",
    userRole: "Operations Lead",
    userEmail: "tariq.m@busarabia.com",
    orgType: "Operator",
    module: "Trips",
    action: "TRIP_REROUTE_APPROVED",
    actionType: "STANDARD",
    changeDetails: {
      summary: "Route Express 01 adjusted for roadworks",
      oldValue: "Express 01",
      newValue: "Express 01-B (Via Bypass)",
      referenceId: "TRP-4402",
    },
    sourceIp: "10.0.4.122",
    deviceInfo: "Safari 17 / iOS 17.1",
    jsonPayload: JSON.stringify(
      {
        tripId: "TRP-4402",
        originalRoute: ["Riyadh Central", "Al-Kharj Highway", "Dammam South"],
        newRoute: ["Riyadh Central", "North Ring Road Bypass", "Dammam South"],
        delayEstimateMinutes: 15,
        notifiedPassengersCount: 42,
      },
      null,
      2
    ),
  },
  {
    id: "LOG-99279",
    timestamp: "Oct 24, 2023 13:58:05",
    timeAgo: "46m ago",
    userName: "Automated Dispatch Daemon",
    userInitials: "SYS",
    userRole: "Engine Service",
    userEmail: "system.cron@busarabia.internal",
    orgType: "System Engine",
    module: "Bookings",
    action: "BOOKING_AUTO_CANCEL_EXPIRED",
    actionType: "STANDARD",
    changeDetails: {
      summary: "Unpaid checkout expired after 15m hold",
      oldValue: "Status: PENDING",
      newValue: "Status: CANCELLED",
      referenceId: "BKG-77192",
    },
    sourceIp: "127.0.0.1",
    deviceInfo: "Cron Job Daemon / Linux Ubuntu",
    jsonPayload: JSON.stringify(
      {
        bookingRef: "BKG-77192",
        seatsReleased: ["Seat 12A", "Seat 12B"],
        tripId: "TRP-8821",
        reason: "Payment window TTL (900s) reached without verification",
      },
      null,
      2
    ),
  },
  {
    id: "LOG-99278",
    timestamp: "Oct 24, 2023 13:20:44",
    timeAgo: "1h 24m ago",
    userName: "Noura Al-Hassan",
    userInitials: "NH",
    userRole: "Finance Auditor",
    userEmail: "noura.h@busarabia.com",
    orgType: "Platform Admin",
    module: "Payouts",
    action: "OPERATOR_HOLD_ENACTED",
    actionType: "WARNING",
    changeDetails: {
      summary: "Disbursement freeze applied for compliance",
      oldValue: "Active Payouts",
      newValue: "Compliance Hold",
      referenceId: "OP-004",
    },
    sourceIp: "192.168.1.18",
    deviceInfo: "Edge 117 / Windows 11",
    jsonPayload: JSON.stringify(
      {
        operatorId: "OP-004",
        operator: "Al Qassim Lines",
        frozenAmountSAR: 9200,
        triggerCondition: "ZATCA e-invoicing certificate renewal missing",
        actionBy: "Noura Al-Hassan",
      },
      null,
      2
    ),
  },
  {
    id: "LOG-99277",
    timestamp: "Oct 24, 2023 12:45:10",
    timeAgo: "2h ago",
    userName: "Fahad Al-Otaibi",
    userInitials: "FO",
    userRole: "Security Admin",
    userEmail: "fahad.o@busarabia.com",
    orgType: "Platform Admin",
    module: "Security",
    action: "ADMIN_MFA_RESET",
    actionType: "CRITICAL",
    changeDetails: {
      summary: "Second-factor biometric re-enrolled",
      oldValue: "Hardware Key #21",
      newValue: "Authenticator TOTP",
      referenceId: "SEC-881",
    },
    sourceIp: "172.16.0.4",
    deviceInfo: "Chrome 118 / macOS Sonoma",
    jsonPayload: JSON.stringify(
      {
        targetAdminId: "ADM-08",
        targetAdminName: "Sara Al-Harbi",
        verifiedViaGovSSO: true,
        nafathVerificationRef: "NAF-994821",
      },
      null,
      2
    ),
  },
];

export default function AuditLogPage() {
  const [selectedLog, setSelectedLog] = useState<AuditLogRecord | null>(null);
  const [dateRange, setDateRange] = useState("Last 24 Hours");
  const [moduleFilter, setModuleFilter] = useState("All Modules");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [orgFilter, setOrgFilter] = useState("All Orgs");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = mockAuditLogs.filter((log) => {
    if (moduleFilter !== "All Modules" && log.module !== moduleFilter) return false;
    if (orgFilter !== "All Orgs" && log.orgType !== orgFilter) return false;
    if (
      searchQuery &&
      !log.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.sourceIp.includes(searchQuery) &&
      !log.changeDetails.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setDateRange("Last 24 Hours");
    setModuleFilter("All Modules");
    setRoleFilter("All Roles");
    setOrgFilter("All Orgs");
    setSearchQuery("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20">
        {/* Sophisticated Header - Figma 1479:5885 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DCBFC8] shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#564148] mb-1">
              <span>Governance & Compliance</span>
              <span>/</span>
              <span className="text-[#550036] font-bold">Audit Trail</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1C1B1B] tracking-tight font-heading">
              Audit Log
            </h1>
            <p className="text-sm text-[#564148] mt-1">
              Immutable ledger of administrative actions, policy mutations, and security events.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 bg-white text-[#1C1B1B] text-sm font-semibold px-4 py-2.5 rounded-xl border border-[#DCBFC8] hover:border-[#550036] shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#550036]" />
              <span>{dateRange}</span>
              <ChevronDown className="w-4 h-4 text-[#564148]" />
            </button>

            <button
              onClick={() => alert("Cryptographically signed CSV audit report downloaded.")}
              className="flex items-center gap-2 bg-[#550036] hover:bg-[#43002a] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* KPI Cards - Figma 1476:5382 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* KPI 1: Total Actions (24h) */}
          <div className="bg-white rounded-xl p-6 border border-[#DCBFC8] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#564148]">
                Total Actions (24h)
              </span>
              <div className="text-3xl font-black text-[#1C1B1B] font-heading mt-2">
                12,492
              </div>
              <p className="text-xs text-gray-500 mt-1">100% cryptographic checksum pass</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFD9E5] flex items-center justify-center text-[#64003B]">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          {/* KPI 2: Security Alerts */}
          <div className="bg-white rounded-xl p-6 border border-[#DCBFC8] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#564148]">
                Security Alerts
              </span>
              <div className="text-3xl font-black text-[#BA1A1A] font-heading mt-2">
                47
              </div>
              <p className="text-xs text-gray-500 mt-1">3 required two-person authorization</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFDAD6] flex items-center justify-center text-[#93000A]">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          {/* KPI 3: Financial Mutations */}
          <div className="bg-white rounded-xl p-6 border border-[#DCBFC8] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#564148]">
                Financial Mutations
              </span>
              <div className="text-3xl font-black text-[#1C1B1B] font-heading mt-2">
                3,812
              </div>
              <p className="text-xs text-gray-500 mt-1">Rates, discounts, & payout approvals</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FFD979] flex items-center justify-center text-[#795D01]">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filters - Figma 1476:5343 */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCBFC8] shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filter 1: Date Range */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#564148] mb-1.5">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-[#FDF8F8] border border-[#DCBFC8] rounded-md px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
              >
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Current Quarter</option>
              </select>
            </div>

            {/* Filter 2: Module */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#564148] mb-1.5">
                Module
              </label>
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="w-full bg-[#FDF8F8] border border-[#DCBFC8] rounded-md px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
              >
                <option>All Modules</option>
                <option value="Payouts">Payouts</option>
                <option value="Trips">Trips</option>
                <option value="Buses">Buses</option>
                <option value="Bookings">Bookings</option>
                <option value="Security">Security</option>
                <option value="Discounts">Discounts</option>
              </select>
            </div>

            {/* Filter 3: User Role */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#564148] mb-1.5">
                User Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-[#FDF8F8] border border-[#DCBFC8] rounded-md px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
              >
                <option>All Roles</option>
                <option>Super Admin</option>
                <option>Operations Lead</option>
                <option>Finance Auditor</option>
                <option>Support Agent</option>
                <option>Engine Service</option>
              </select>
            </div>

            {/* Filter 4: Org Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#564148] mb-1.5">
                Org Type
              </label>
              <select
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
                className="w-full bg-[#FDF8F8] border border-[#DCBFC8] rounded-md px-3 py-2 text-xs font-semibold text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
              >
                <option>All Orgs</option>
                <option value="Platform Admin">Platform Admin</option>
                <option value="Operator">Operator</option>
                <option value="Support Center">Support Center</option>
                <option value="System Engine">System Engine</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
            <div className="w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by admin, action, IP, or change..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FDF8F8] border border-[#DCBFC8] rounded-md px-3 py-2 text-xs text-[#1C1B1B] focus:outline-none focus:ring-1 focus:ring-[#8A0D54]"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#564148] px-4 py-2 rounded-md text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
              <button
                onClick={() => {}}
                className="flex items-center gap-1.5 bg-[#8A0D54] hover:bg-[#6c0a42] text-white px-5 py-2 rounded-md text-xs font-bold shadow-xs transition-colors"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table - Figma 1476:5411 */}
        <div className="bg-white rounded-2xl border border-[#DCBFC8] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#DCBFC8] bg-[#FAF7F8] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#564148]">
              Showing {filteredLogs.length} Verified Log Entries
            </span>
            <span className="text-[11px] font-mono text-[#550036] font-bold">
              HMAC-SHA256: VALID
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F2F2] text-[#564148] font-bold border-b border-[#DCBFC8] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">User Details</th>
                  <th className="py-3.5 px-4">Org Type</th>
                  <th className="py-3.5 px-4">Module</th>
                  <th className="py-3.5 px-4">Action Performed</th>
                  <th className="py-3.5 px-4">Change Details</th>
                  <th className="py-3.5 px-4">Source Info</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLogs.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedLog(row)}
                    className="hover:bg-pink-50/20 cursor-pointer transition-colors"
                  >
                    {/* Timestamp */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-semibold text-[#1C1B1B]">{row.timestamp}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{row.timeAgo}</div>
                    </td>

                    {/* User Details */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#550036]/10 text-[#550036] font-extrabold flex items-center justify-center text-xs">
                          {row.userInitials}
                        </div>
                        <div>
                          <div className="font-bold text-[#1C1B1B]">{row.userName}</div>
                          <span className="inline-block text-[10px] px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 font-medium">
                            {row.userRole}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Org Type */}
                    <td className="py-4 px-4 text-[#564148] font-medium whitespace-nowrap">
                      {row.orgType}
                    </td>

                    {/* Module */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-[#1C1B1B]">{row.module}</span>
                    </td>

                    {/* Action Performed Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold ${
                          row.actionType === "CRITICAL"
                            ? "bg-rose-50 text-[#BA1A1A] border border-rose-200"
                            : row.actionType === "WARNING"
                            ? "bg-amber-50 text-[#765B00] border border-amber-200"
                            : "bg-pink-50 text-[#550036] border border-pink-200"
                        }`}
                      >
                        {row.action}
                      </span>
                    </td>

                    {/* Change Details */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="text-[#1C1B1B] font-medium truncate">
                        {row.changeDetails.summary}
                      </div>
                      {row.changeDetails.oldValue && row.changeDetails.newValue && (
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                          <span className="line-through text-rose-500">{row.changeDetails.oldValue}</span>
                          {" → "}
                          <span className="text-emerald-700 font-bold">{row.changeDetails.newValue}</span>
                        </div>
                      )}
                    </td>

                    {/* Source Info */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-mono text-[11px] text-[#1C1B1B]">{row.sourceIp}</div>
                      <div className="text-[10px] text-gray-400">{row.deviceInfo}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLog(row);
                        }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#550036] hover:text-white text-[#550036] bg-pink-50/70 transition-colors"
                        title="Inspect Audit Record"
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

        {/* Audit Record Inspection Bento Drawer/Modal - Figma 1476:5614 */}
        {selectedLog && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#DCBFC8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-[#550036] to-[#760046] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 font-black text-white flex items-center justify-center text-sm">
                    {selectedLog.userInitials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{selectedLog.action}</h3>
                    <p className="text-xs text-pink-200 font-mono">
                      Log ID: {selectedLog.id} • {selectedLog.timestamp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bento Grid Modal Content */}
              <div className="p-6 space-y-5 overflow-y-auto">
                {/* Bento Section 1: Primary Action & Quick Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF7F8] p-4 rounded-xl border border-[#DCBFC8]/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#564148]">
                      Initiating Actor
                    </span>
                    <div className="text-sm font-bold text-[#1C1B1B]">{selectedLog.userName}</div>
                    <div className="text-xs text-gray-500 font-mono">{selectedLog.userEmail}</div>
                    <div className="pt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFD9E5] text-[#64003B]">
                        {selectedLog.userRole}
                      </span>
                      <span className="text-[11px] text-gray-600 font-medium">
                        {selectedLog.orgType}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#FAF7F8] p-4 rounded-xl border border-[#DCBFC8]/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#564148]">
                      Security & Network Origin
                    </span>
                    <div className="text-sm font-bold text-[#1C1B1B] font-mono flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#550036]" />
                      {selectedLog.sourceIp}
                    </div>
                    <div className="text-xs text-gray-500">{selectedLog.deviceInfo}</div>
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Signed by Authority KMS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bento Section 2: Mutation Diff */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">
                    Audit Description & Changes
                  </span>
                  <div className="text-xs font-semibold text-gray-900">
                    {selectedLog.changeDetails.summary}
                  </div>
                  {selectedLog.changeDetails.oldValue && selectedLog.changeDetails.newValue && (
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                      <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-900">
                        <span className="text-[10px] uppercase font-bold text-rose-600 block mb-0.5">
                          Previous State
                        </span>
                        {selectedLog.changeDetails.oldValue}
                      </div>
                      <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-0.5">
                          New Committed State
                        </span>
                        {selectedLog.changeDetails.newValue}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bento Section 3: Raw JSON Payload */}
                {selectedLog.jsonPayload && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#564148]">
                      <span className="flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-[#550036]" />
                        Structured Audit Event (JSON)
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedLog.jsonPayload || "")}
                        className="text-[11px] text-[#550036] hover:underline"
                      >
                        Copy JSON
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-pink-200 p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
                      {selectedLog.jsonPayload}
                    </pre>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Forensic audit dossier for ${selectedLog.id} exported.`)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#550036] hover:bg-[#43002a] text-white shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Forensic Dossier</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

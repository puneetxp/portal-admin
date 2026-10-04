"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Edit3,
  MapPin,
  Mail,
  Phone,
  Landmark,
  Headphones,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react";
import { mockOperatorProfile } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function OperatorProfilePage() {
  const profile = mockOperatorProfile;

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span>Operator Portal</span>
            <span>/</span>
            <span className="text-[#950250]">Company Profile</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Detailed Operator Company Profile
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Owner View — Registered corporate entity, legal authorizations & financial settlement records
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/profile/edit"
            className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* Company Identity & Compliance Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#550036] flex items-center justify-center text-white font-black text-2xl shadow-md flex-shrink-0">
              AFS
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-black text-gray-900">{profile.companyName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Operator
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-600">
                  {profile.operatorId}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 max-w-2xl leading-relaxed">
                {profile.companyDescription}
              </p>
            </div>
          </div>

          {/* Compliance Status Badge */}
          <div className="flex items-center gap-3 bg-[#FAF5F7] p-4 rounded-xl border border-pink-100 flex-shrink-0">
            <ShieldCheck className="w-8 h-8 text-[#B20163]" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Compliance Rating</div>
              <div className="text-sm font-black text-[#550036]">{profile.complianceStatus}</div>
              <div className="text-[11px] text-gray-400">Last Audit: {profile.lastKycAudit}</div>
            </div>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Monthly Volume</span>
            <p className="text-base font-black text-gray-900 mt-0.5">{profile.monthlyPayouts}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Active Fleet Size</span>
            <p className="text-base font-black text-gray-900 mt-0.5">24 Luxury Buses</p>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">License Expiry</span>
            <p className="text-base font-black text-emerald-700 mt-0.5">{profile.crExpiryDate}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Support SLA</span>
            <p className="text-base font-black text-[#550036] mt-0.5">{profile.averageResponseTime}</p>
          </div>
        </div>
      </div>

      {/* Grid of 4 Detailed Information Cards matching Figma 840:2521 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Corporate Legal Details */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="p-2 rounded-xl bg-pink-50 text-[#B20163]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Corporate & Licensing Details</h3>
              <p className="text-xs text-gray-400">Government commercial authorizations</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Commercial Registration (CR)</span>
              <span className="font-bold text-gray-900">{profile.commercialRegistration}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">CR Expiration Date</span>
              <span className="font-bold text-gray-900">{profile.crExpiryDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Transport Operator License</span>
              <span className="font-bold text-gray-900">{profile.transportLicense}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500 font-medium">Tax Registration Number (TRN)</span>
              <span className="font-bold text-gray-900">{profile.taxRegistrationNumber}</span>
            </div>
          </div>
        </div>

        {/* 2. Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="p-2 rounded-xl bg-pink-50 text-[#B20163]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Contact Information</h3>
              <p className="text-xs text-gray-400">Designated representative for operational notices</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Primary Contact</span>
              <span className="font-bold text-gray-900">{profile.contactPerson}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Corporate Email</span>
              <a href={`mailto:${profile.corporateEmail}`} className="font-bold text-[#B20163] hover:underline">
                {profile.corporateEmail}
              </a>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Verified Mobile</span>
              <span className="font-bold text-gray-900">{profile.verifiedMobile}</span>
            </div>
            <div className="flex justify-between items-start py-2">
              <span className="text-gray-500 font-medium">Head Office</span>
              <span className="font-semibold text-gray-800 text-right max-w-xs">{profile.officeAddress}</span>
            </div>
          </div>
        </div>

        {/* 3. Financial & Banking Details */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="p-2 rounded-xl bg-pink-50 text-[#B20163]">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Financial & Banking Settlement</h3>
              <p className="text-xs text-gray-400">Verified bank account for automated ticket disbursements</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Designated Bank</span>
              <span className="font-bold text-gray-900">{profile.bankName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Account Title</span>
              <span className="font-bold text-gray-900">{profile.accountName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">IBAN Number</span>
              <span className="font-mono font-bold text-gray-900">{profile.ibanNumber}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500 font-medium">SWIFT / BIC Code</span>
              <span className="font-mono font-bold text-gray-900">{profile.swiftCode}</span>
            </div>
          </div>
        </div>

        {/* 4. Dedicated Support & Hotline */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="p-2 rounded-xl bg-pink-50 text-[#B20163]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Dedicated Operator Support</h3>
              <p className="text-xs text-gray-400">Direct escalation desk with Bus Arabia team</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Toll-Free Hotline</span>
              <span className="font-bold text-gray-900">{profile.supportHotline}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Support Email</span>
              <span className="font-bold text-[#B20163]">{profile.supportEmail}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-gray-500 font-medium">WhatsApp Dispatch Desk</span>
              <span className="font-bold text-emerald-700">{profile.whatsappSupport}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500 font-medium">Average Resolution SLA</span>
              <span className="font-bold text-gray-900">{profile.averageResponseTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Scope & Corridors */}
      <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Operational Scope & Permitted Cities</h3>
        <p className="text-xs text-gray-500">
          Cities and intercity routes where Arabia Fleet Services is licensed to operate:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {profile.operatingCities.map((city) => (
            <span
              key={city}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF5F7] text-[#550036] border border-pink-100 flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B20163]" />
              {city}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">
            Primary High-Traffic Corridors
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {profile.primaryRoutes.map((r) => (
              <div key={r.route} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <p className="font-bold text-gray-900 truncate">{r.route}</p>
                <div className="flex items-center justify-between text-gray-500 text-[11px] mt-1.5">
                  <span>{r.tripsPerWeek} trips/wk</span>
                  <span className="text-emerald-700 font-bold">{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

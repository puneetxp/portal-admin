"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  MapPin,
  Landmark,
  AlertTriangle,
  ArrowLeft,
  Check,
  Save,
} from "lucide-react";
import { mockOperatorProfile } from "@/data/mockData";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function EditOperatorProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"corporate" | "contact" | "scope" | "banking">("corporate");
  const [isSaved, setIsSaved] = useState(false);

  // Form states initialized with mockOperatorProfile
  const [formData, setFormData] = useState({
    companyName: mockOperatorProfile.companyName,
    companyDescription: mockOperatorProfile.companyDescription,
    commercialRegistration: mockOperatorProfile.commercialRegistration,
    crExpiryDate: mockOperatorProfile.crExpiryDate,
    transportLicense: mockOperatorProfile.transportLicense,
    taxRegistrationNumber: mockOperatorProfile.taxRegistrationNumber,
    contactPerson: mockOperatorProfile.contactPerson,
    corporateEmail: mockOperatorProfile.corporateEmail,
    verifiedMobile: mockOperatorProfile.verifiedMobile,
    alternateContact: mockOperatorProfile.alternateContact,
    officeAddress: mockOperatorProfile.officeAddress,
    bankName: mockOperatorProfile.bankName,
    accountName: mockOperatorProfile.accountName,
    ibanNumber: mockOperatorProfile.ibanNumber,
    swiftCode: mockOperatorProfile.swiftCode,
    supportHotline: mockOperatorProfile.supportHotline,
    supportEmail: mockOperatorProfile.supportEmail,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      router.push("/profile");
    }, 1200);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="p-2.5 rounded-xl bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-[#550036] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">
              Edit Operator Profile
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Update legal registration, administrative contacts, and banking channels
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Advisory Notice matching Figma */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <p className="font-bold">Verification Notice</p>
          <p className="text-amber-800 leading-relaxed">
            Modifications to Commercial Registration (CR), Transport License, or Settlement IBAN details require formal re-verification by the Bus Arabia Compliance & Legal team. Payout disbursements will continue as normal during review.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/60 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("corporate")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "corporate"
              ? "bg-white text-[#550036] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Corporate Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "contact"
              ? "bg-white text-[#550036] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Information</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scope")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "scope"
              ? "bg-white text-[#550036] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Operational Scope</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("banking")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "banking"
              ? "bg-white text-[#550036] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Financial & Banking</span>
        </button>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-7 rounded-2xl border border-stroke shadow-xs space-y-6">
        {activeTab === "corporate" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
              Corporate Legal Entity
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company Legal Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Commercial Registration (CR)</label>
                <input
                  type="text"
                  value={formData.commercialRegistration}
                  onChange={(e) => setFormData({ ...formData, commercialRegistration: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">CR Expiration Date</label>
                <input
                  type="text"
                  value={formData.crExpiryDate}
                  onChange={(e) => setFormData({ ...formData, crExpiryDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Transport License No.</label>
                <input
                  type="text"
                  value={formData.transportLicense}
                  onChange={(e) => setFormData({ ...formData, transportLicense: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tax Registration Number (TRN)</label>
                <input
                  type="text"
                  value={formData.taxRegistrationNumber}
                  onChange={(e) => setFormData({ ...formData, taxRegistrationNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company Description</label>
              <textarea
                rows={3}
                value={formData.companyDescription}
                onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
              />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
              Authorized Representatives & Office
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Representative</label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Email</label>
                <input
                  type="email"
                  value={formData.corporateEmail}
                  onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Verified Mobile</label>
                <input
                  type="text"
                  value={formData.verifiedMobile}
                  onChange={(e) => setFormData({ ...formData, verifiedMobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alternate Phone</label>
                <input
                  type="text"
                  value={formData.alternateContact}
                  onChange={(e) => setFormData({ ...formData, alternateContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Headquarters Office Address</label>
              <textarea
                rows={2}
                value={formData.officeAddress}
                onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                required
              />
            </div>
          </div>
        )}

        {activeTab === "scope" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
              Operational Scope & City Permissions
            </h3>

            <p className="text-xs text-gray-500">
              Active operating cities linked to your Commercial Transport License:
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {mockOperatorProfile.operatingCities.map((city) => (
                <span
                  key={city}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FAF5F7] text-[#550036] border border-pink-100 flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {city}
                </span>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mt-4 text-xs text-gray-600">
              To request route expansions or register new regional hubs, contact your Bus Arabia account representative.
            </div>
          </div>
        )}

        {activeTab === "banking" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
              Designated Bank for Automated Settlements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Account Title</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">IBAN Number</label>
              <input
                type="text"
                value={formData.ibanNumber}
                onChange={(e) => setFormData({ ...formData, ibanNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">SWIFT / BIC Code</label>
              <input
                type="text"
                value={formData.swiftCode}
                onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                required
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <Link
            href="/profile"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSaved}
            className="flex items-center gap-2 bg-[#550036] hover:bg-[#760046] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 disabled:opacity-50"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved & Submitted!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Submit for Approval</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
}

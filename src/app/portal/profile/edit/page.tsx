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
    operatingCities: mockOperatorProfile.operatingCities.join(", "),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      router.push("/portal/profile");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/portal/profile"
            className="p-2.5 rounded-xl bg-gray-50 hover:bg-pink-50 text-gray-600 hover:text-[#5C0030] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
              <Link href="/portal/profile" className="hover:text-gray-600">Company Profile</Link>
              <span>/</span>
              <span className="text-[#950250]">Edit Corporate Details</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Edit Operator Profile
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Update statutory registration, commercial contacts, and financial depository records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/profile"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaved}
            className="flex items-center gap-2 bg-[#5C0030] hover:bg-[#72003c] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-98 disabled:opacity-50"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4 text-[#FFE26D]" />}
            <span>{isSaved ? "Saved Successfully!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200/60 w-fit">
        <button
          onClick={() => setActiveTab("corporate")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "corporate"
              ? "bg-white text-[#5C0030] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Legal & Registration</span>
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "contact"
              ? "bg-white text-[#5C0030] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Details</span>
        </button>
        <button
          onClick={() => setActiveTab("banking")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "banking"
              ? "bg-white text-[#5C0030] shadow-xs"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Banking & Settlements</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="bg-white p-7 rounded-2xl border border-stroke shadow-xs space-y-6">
        {activeTab === "corporate" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Corporate & Licensing Authorizations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Company Registered Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Commercial Registration (CR)</label>
                <input
                  type="text"
                  name="commercialRegistration"
                  value={formData.commercialRegistration}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">CR Expiry Date</label>
                <input
                  type="text"
                  name="crExpiryDate"
                  value={formData.crExpiryDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Transport Operator License</label>
                <input
                  type="text"
                  name="transportLicense"
                  value={formData.transportLicense}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1 text-xs">Company Overview</label>
              <textarea
                name="companyDescription"
                rows={3}
                value={formData.companyDescription}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Operational & Dispatch Contacts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Representative</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Corporate Email</label>
                <input
                  type="email"
                  name="corporateEmail"
                  value={formData.corporateEmail}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Verified Mobile</label>
                <input
                  type="text"
                  name="verifiedMobile"
                  value={formData.verifiedMobile}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Head Office Address</label>
                <input
                  type="text"
                  name="officeAddress"
                  value={formData.officeAddress}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "banking" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Settlement Depository Bank (SARIE)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Designated Bank</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Account Holder Legal Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">IBAN Number</label>
                <input
                  type="text"
                  name="ibanNumber"
                  value={formData.ibanNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">SWIFT / BIC</label>
                <input
                  type="text"
                  name="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <Link
            href="/portal/profile"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#5C0030] text-white text-xs font-bold hover:bg-[#72003c] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

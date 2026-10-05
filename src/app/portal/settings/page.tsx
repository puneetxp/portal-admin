"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Landmark,
  ShieldCheck,
  Bell,
  Save,
  Check,
  Wrench,
  Truck,
  MessageSquare,
} from "lucide-react";

export default function OperatorSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  // Carrier Profile State
  const [carrierProfile, setCarrierProfile] = useState({
    companyName: "Arabia Fleet Transport Ltd.",
    commercialRegistration: "1010482910",
    motLicense: "MOT-KSA-99201",
    vatNumber: "300482910200003",
    dispatchPhone: "+966 11 482 9900",
    supportEmail: "dispatch@arabiafleet.com.sa",
    headquarters: "Al-Aziziyah District, Riyadh, Kingdom of Saudi Arabia",
  });

  // Depots & Maintenance Yards
  const [depots, setDepots] = useState([
    { name: "Riyadh Central Depot & Maintenance Hub", capacity: "24 Coaches", location: "Al-Aziziyah, Riyadh" },
    { name: "Jeddah South Maintenance Yard", capacity: "12 Coaches", location: "Al-Balad South, Jeddah" },
    { name: "Dammam Transit Bay & Depot", capacity: "8 Coaches", location: "Corniche Logistics, Dammam" },
  ]);

  // Notifications & Dispatch Preferences
  const [preferences, setPreferences] = useState({
    smsAlertsOnDelay: true,
    whatsAppBoardingPasses: true,
    tgaTelemetryPush: true,
    notifyCaptain45MinBefore: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Company Profile & Depots</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-[#5C0030] tracking-tight flex items-center gap-2.5">
            Carrier Settings & Terminal Preferences
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your legal entity credentials, MOT commercial permits, maintenance depot bays, and passenger alerts.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5C0030] hover:bg-[#72003c] text-white text-xs font-bold transition-all shadow-md active:scale-98"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-[#FFE26D]" />
              <span>Profile Updated!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-[#FFE26D]" />
              <span>Save Carrier Profile</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legal Entity & MOT Credentials */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#5C0030]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">Legal Entity & MOT Licenses</h2>
              <p className="text-[11px] text-gray-400">Official commercial registration and Ministry permits</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Company Registered Legal Name</label>
              <input
                type="text"
                value={carrierProfile.companyName}
                onChange={(e) => setCarrierProfile({ ...carrierProfile, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7F8] border border-gray-200 rounded-xl font-bold text-gray-900 text-xs focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Commercial Registration (CR)</label>
                <input
                  type="text"
                  value={carrierProfile.commercialRegistration}
                  disabled
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-600 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">MOT Commercial Permit</label>
                <input
                  type="text"
                  value={carrierProfile.motLicense}
                  disabled
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-600 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Dispatch Control Phone</label>
                <input
                  type="text"
                  value={carrierProfile.dispatchPhone}
                  onChange={(e) => setCarrierProfile({ ...carrierProfile, dispatchPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F8] border border-gray-200 rounded-xl font-mono text-xs focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Operational Support Email</label>
                <input
                  type="email"
                  value={carrierProfile.supportEmail}
                  onChange={(e) => setCarrierProfile({ ...carrierProfile, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F8] border border-gray-200 rounded-xl font-mono text-xs focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Depository Settlement Bank */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">SARIE Direct Deposit Account</h2>
              <p className="text-[11px] text-gray-400">Account for weekly platform ticket revenue remittances</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Corporate Bank:</span>
              <span className="font-bold text-gray-900">Al Rajhi Banking Corporation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">IBAN:</span>
              <span className="font-mono font-bold text-gray-900">SA44 8000 0412 8820 9912 3410</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Verification Status:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> SAMA Verified
              </span>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 italic">
            To change your registered bank account or corporate IBAN, contact Bus Arabia Partner Compliance.
          </p>
        </div>

        {/* Fleet Depot & Maintenance Yards */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">Registered Coach Depots & Yards</h2>
              <p className="text-[11px] text-gray-400">Overnight stabling, fuel points, and maintenance bays</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {depots.map((depot, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-900 block">{depot.name}</span>
                  <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {depot.location}
                  </span>
                </div>
                <span className="font-mono font-bold text-[#5C0030] bg-pink-50 px-2 py-0.5 rounded text-[11px]">
                  {depot.capacity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Passenger Notifications */}
        <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">Automated Passenger & Crew Alerts</h2>
              <p className="text-[11px] text-gray-400">Real-time messaging channels for Arabia Fleet dispatches</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800">Send WhatsApp Boarding Passes</p>
                <p className="text-[10px] text-gray-400">Directly dispatch QR code tickets to passenger WhatsApp</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.whatsAppBoardingPasses}
                onChange={(e) => setPreferences({ ...preferences, whatsAppBoardingPasses: e.target.checked })}
                className="rounded text-[#5C0030] focus:ring-[#5C0030] h-4 w-4"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-gray-800">SMS Alerts on Highway Delays</p>
                <p className="text-[10px] text-gray-400">Notify booked passengers if coach is delayed &gt;15 minutes</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.smsAlertsOnDelay}
                onChange={(e) => setPreferences({ ...preferences, smsAlertsOnDelay: e.target.checked })}
                className="rounded text-[#5C0030] focus:ring-[#5C0030] h-4 w-4"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-gray-800">Alert Captain 45 Mins Before Departure</p>
                <p className="text-[10px] text-gray-400">Push dispatch notification to driver's terminal app</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.notifyCaptain45MinBefore}
                onChange={(e) => setPreferences({ ...preferences, notifyCaptain45MinBefore: e.target.checked })}
                className="rounded text-[#5C0030] focus:ring-[#5C0030] h-4 w-4"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

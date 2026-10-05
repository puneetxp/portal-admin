"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronDown,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function OperatorSupportCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "Normal",
    category: "Operations",
    description: "",
  });

  const faqs = [
    {
      q: "How are bi-weekly carrier payouts calculated?",
      a: "Operator payouts are calculated at the end of each 14-day settlement cycle. Platform commission (standard 7.5% or tier-negotiated) and customer cancellation refunds are deducted from gross bookings before direct SARIE/IBAN bank transfer.",
      category: "Payouts"
    },
    {
      q: "How does the passenger QR ticket boarding scanner work?",
      a: "Captains and gate agents can open the Boarding Manifest from their mobile device or kiosk tablet, select the scheduled departure, and click 'Scan Passenger Ticket' to activate camera scanning.",
      category: "Operations"
    },
    {
      q: "What is the policy for passenger cancellations and seat recoveries?",
      a: "When a traveler cancels, the seat is immediately returned to your inventory pool under Seat Recoveries with an active countdown timer, allowing you to re-list it or assign it to standby passengers.",
      category: "Recoveries"
    },
    {
      q: "How can I configure new coach seating configurations?",
      a: "Go to Fleet Management, select or add a coach, and choose between '2+2 Standard VIP' or '2+1 Platinum Sleeper'. The interactive seat map simulator automatically reflects row numbers and seat availability.",
      category: "Fleet"
    },
    {
      q: "Who do I contact for emergency highway breakdown support?",
      a: "Use the 24/7 dedicated Operator Emergency Dispatch hotline at +966 800 123 4567 or click the Emergency WhatsApp Desk button to immediately reach the Bus Arabia logistics response team.",
      category: "Emergency"
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketForm({
        subject: "",
        priority: "Normal",
        category: "Operations",
        description: "",
      });
    }, 4000);
  };

  const filteredFaqs = faqs.filter(f => {
    const matchesSearch = f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
            <span className="text-gray-500">Arabia Fleet Operations</span>
            <span>/</span>
            <span className="text-[#950250] font-bold">Support & Dispatch Desk</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-[#5C0030] tracking-tight flex items-center gap-2.5">
            Operator Support & Help Desk
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5C0030] text-[#FFE26D]">
              Arabia Fleet
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Dedicated assistance for carrier operations, driver assignments, and settlement inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/966501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Dispatch Desk</span>
          </a>
        </div>
      </div>

      {/* Emergency & Urgent Support Banner */}
      <div className="bg-gradient-to-r from-[#5C0030] to-[#7C0051] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-[#FFE26D]" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">24/7 Fleet Operations Command Hotline</h3>
            <p className="text-xs text-pink-100 mt-0.5">
              Urgent route interruptions, accident recovery, or immediate terminal assistance.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-mono text-base font-bold text-[#FFE26D]">+966 800 123 4567</span>
              <span className="text-xs text-pink-200">Average wait time: &lt; 45 seconds</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl text-xs font-semibold text-white border border-white/20">
          <Clock className="w-4 h-4 text-[#FFE26D]" />
          <span>Priority SLA: 15 Mins</span>
        </div>
      </div>

      {/* Grid: Submit Ticket + FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Support Ticket Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Open an Operator Ticket</h3>
            <p className="text-xs text-gray-400 mt-0.5">Our operations controller will respond via email & portal.</p>
          </div>

          {ticketSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ticket Submitted Successfully!</span>
              </div>
              <p>Reference: <strong className="font-mono">#TKT-{Math.floor(10000 + Math.random() * 90000)}</strong></p>
              <p className="text-[11px] text-emerald-700">An email notification has been dispatched to your operations team.</p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule dispute on Route AF-R101"
                  value={ticketForm.subject}
                  onChange={e => setTicketForm({...ticketForm, subject: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#950250]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={e => setTicketForm({...ticketForm, category: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white"
                  >
                    <option value="Operations">Operations</option>
                    <option value="Payouts">Payouts & VAT</option>
                    <option value="Fleet">Coach & Fleet</option>
                    <option value="Technical">Portal Technical</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Urgency</label>
                  <select
                    value={ticketForm.priority}
                    onChange={e => setTicketForm({...ticketForm, priority: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent (Departing &lt; 4h)</option>
                    <option value="Critical">Critical Breakdown</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Details & Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide coach number, trip ID, or affected booking references..."
                  value={ticketForm.description}
                  onChange={e => setTicketForm({...ticketForm, description: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#950250]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#5C0030] hover:bg-[#72003c] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>

        {/* Knowledgebase & FAQ */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stroke shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Frequently Asked Questions</h3>
              <p className="text-xs text-gray-400">Common operator inquiries and regulatory guidelines.</p>
            </div>
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <details key={i} className="group border border-gray-100 rounded-xl p-3.5 [&_summary::-webkit-details-marker]:hidden bg-gray-50/50 hover:bg-pink-50/20 transition-colors">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-xs font-bold text-gray-900">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 transition duration-300 group-open:-rotate-180 flex-shrink-0" />
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 pt-2 border-t border-gray-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

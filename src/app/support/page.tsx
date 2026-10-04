"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
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

export default function SupportCenterPage() {
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
      q: "How does the manual bank transfer verification queue work?",
      a: "When a passenger chooses Bank Wire at checkout, their reservation is marked 'PENDING_PAYMENT'. Admin agents have 2 hours to inspect the uploaded deposit receipt counterfoil under 'Payment Verification' and approve or reject it.",
      category: "Payments"
    },
    {
      q: "What is the policy for passenger cancellations and wallet credits?",
      a: "Cancellations made >24 hours prior to trip departure qualify for a 100% refund. Cancellations between 4 and 24 hours incur a 10% penalty fee. Approved refunds can be credited immediately to the traveler's digital wallet or reversed to their card.",
      category: "Refunds"
    },
    {
      q: "How can I configure new coach seating configurations?",
      a: "Go to Fleet Management, select or add a coach, and choose between '2+2 Standard VIP' or '2+1 Platinum Sleeper'. The interactive seat map simulator automatically reflects row numbers and seat availability.",
      category: "Fleet"
    },
    {
      q: "Can fleet operators manage their own schedules?",
      a: "Yes, verified operators have access to the Operator Hub where they can create single and recurring trip runs, assign drivers, and monitor passenger manifests in real time.",
      category: "Operations"
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketForm({ subject: "", priority: "Normal", category: "Operations", description: "" });
    }, 4000);
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      (selectedCategory === "ALL" || f.category === selectedCategory) &&
      (f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stroke shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
              <span>System & Governance</span>
              <span>/</span>
              <span className="text-[#950250]">Help & Support Desk</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              Enterprise Support & Operations Helpdesk
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              24/7 dedicated dispatch support, knowledge base, operational SLA escalation, and technical incident reporting.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Dispatch Hotline: 24/7 Live
            </span>
          </div>
        </div>

        {/* Quick Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-card flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#550036] to-[#760046] text-white">
              <Phone className="w-5 h-5 text-gold-light" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Toll-Free Dispatch</span>
              <p className="text-base font-extrabold text-gray-900 mt-1">800-ARABIA-BUS</p>
              <p className="text-xs text-gray-500 mt-0.5">+966 11 400 9922 (KSA / GCC)</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-card flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#00897B] to-[#004D40] text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Priority WhatsApp</span>
              <p className="text-base font-extrabold text-gray-900 mt-1">+966 55 982 1000</p>
              <p className="text-xs text-emerald-600 font-semibold mt-0.5">Avg reply time: &lt; 3 mins</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stroke shadow-card flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Support Email</span>
              <p className="text-base font-extrabold text-gray-900 mt-1">ops@busarabia.com</p>
              <p className="text-xs text-gray-500 mt-0.5">SLA response: Under 1 hour</p>
            </div>
          </div>
        </div>

        {/* FAQ & Ticket Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-base font-extrabold text-gray-900">Frequently Asked Questions</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Operational protocols and administrative workflows</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
                  {["ALL", "Payouts", "Payments", "Refunds", "Fleet", "Operations"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        selectedCategory === cat
                          ? "bg-[#550036] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mb-4">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles and operational guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                />
              </div>

              <div className="space-y-3">
                {filteredFaqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-[#B20163]">
                        {faq.category}
                      </span>
                      <h3 className="text-xs font-bold text-gray-900">{faq.q}</h3>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed pl-1">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Incident / Ticket Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-stroke shadow-xs">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">Create Support Ticket</h2>
              <p className="text-xs text-gray-500 mb-5">Open an urgent ticket with the central engineering & dispatch team</p>

              {ticketSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">Ticket Dispatched Successfully!</p>
                  <p className="text-[11px] text-emerald-700">Ticket Ref #TCK-88219 has been assigned to operations duty engineer.</p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Issue Category</label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                    >
                      <option value="Operations">Operations / Dispatch</option>
                      <option value="Payment Verification">Payment Verification Delay</option>
                      <option value="Payout Reconciliation">Payout Reconciliation</option>
                      <option value="GPS / Bus Telematics">GPS / Bus Telematics</option>
                      <option value="Booking Modification">Booking Modification Dispute</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Priority Level</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                    >
                      <option value="Normal">Normal — Standard response</option>
                      <option value="High">High — Operations affected</option>
                      <option value="Urgent">Urgent — Departure blocked</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Passenger payment slip unreadable on BK-982"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Include relevant PNR, trip number, coach plate, or timestamp..."
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#550036] via-[#760046] to-[#950250] hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Ticket</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

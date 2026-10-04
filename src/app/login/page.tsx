"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bus,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@busarabia.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(["7", "2", "4", "1", "9", "0"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FCF9F8]">
      {/* Left Column: Brand Showcase (From Figma Screen 602:14872) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#320120] via-[#550036] to-[#760046] p-12 text-white flex-col justify-between overflow-hidden">
        {/* Subtle decorative background rings */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#B20163]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-gold to-gold-light p-0.5 shadow-lg shadow-black/30">
              <div className="w-full h-full bg-[#3B0227] rounded-[14px] flex items-center justify-center">
                <Bus className="w-6 h-6 text-gold" />
              </div>
            </div>
            <div>
              <span className="font-black text-xl tracking-wider text-white">BUS ARABIA</span>
              <span className="text-[10px] font-bold block tracking-widest text-gold uppercase">
                ADMIN ENTERPRISE
              </span>
            </div>
          </div>
        </div>

        {/* Brand Message (Exact text from Figma) */}
        <div className="relative z-10 max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-gold">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Gold Class Fleet Network</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-black leading-tight tracking-tight text-white">
            Experience Desert Luxury.
          </h1>

          <p className="text-pink-100/80 text-sm leading-relaxed">
            Seamless journeys across the Emirates with the comfort you deserve. Manage operations,
            regional transit routes, fleet telematics, and operator settlements with precision.
          </p>

          <div className="pt-4 grid grid-cols-3 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-xl font-black text-white">142+</div>
              <div className="text-[11px] text-pink-200">GCC Express Routes</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-xl font-black text-white">156</div>
              <div className="text-[11px] text-pink-200">Luxury Coaches</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-xl font-black text-white">99.4%</div>
              <div className="text-[11px] text-pink-200">On-Time Dispatch</div>
            </div>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="relative z-10 text-xs text-pink-200/70 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Protected by AES-256 TLS Encryption & SARIE Direct Settlement</span>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-8 animate-in fade-in">
          <div>
            <div className="lg:hidden flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gold to-gold-light p-0.5">
                <div className="w-full h-full bg-[#3B0227] rounded-[10px] flex items-center justify-center">
                  <Bus className="w-5 h-5 text-gold" />
                </div>
              </div>
              <span className="font-black text-lg text-[#550036]">BUS ARABIA PRO</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {!otpStep ? "Welcome to Admin Portal" : "Two-Factor Verification"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {!otpStep
                ? "Enter your executive credentials to access the central management hub."
                : "Enter the 6-digit security code sent to your registered authenticator."}
            </p>
          </div>

          {!otpStep ? (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-stroke rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163] shadow-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">Password</label>
                  <a href="#" className="text-[11px] font-semibold text-[#B20163] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-stroke rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B20163] shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-[#550036] accent-[#550036]"
                  />
                  <span className="text-xs text-gray-600">Remember credentials for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#550036] via-[#760046] to-[#950250] hover:opacity-95 shadow-lg shadow-[#550036]/25 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Admin Hub</span>
                    <ArrowRight className="w-4 h-4 text-gold-light" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-3 text-center">
                  6-Digit Authenticator Token
                </label>
                <div className="flex justify-center gap-2.5">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otpCode];
                        newOtp[idx] = e.target.value;
                        setOtpCode(newOtp);
                      }}
                      className="w-12 h-13 text-center font-black text-xl rounded-xl border border-stroke bg-white shadow-xs focus:ring-2 focus:ring-[#B20163] focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#550036] via-[#760046] to-[#950250] hover:opacity-95 shadow-lg shadow-[#550036]/25 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? "Verifying..." : "Confirm & Enter Dashboard"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="text-xs text-gray-500 hover:text-gray-800 underline"
                >
                  ← Back to Email Sign In
                </button>
              </div>
            </form>
          )}

          <div className="pt-6 border-t border-stroke/80 text-center text-[11px] text-gray-400">
            Bus Arabia Enterprise Network • Operations & Transport Oversight © 2024
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { OperatorSidebar } from "./OperatorSidebar";
import { OperatorHeader } from "./OperatorHeader";

interface OperatorLayoutProps {
  children: React.ReactNode;
}

export function OperatorLayout({ children }: OperatorLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas font-sans antialiased text-gray-800">
      {/* Desktop Fixed Height Operator Sidebar */}
      <div className="hidden lg:flex flex-col flex-shrink-0 h-screen w-64 z-30">
        <OperatorSidebar />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 h-full w-64 transform lg:hidden transition-transform duration-200 ease-in-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <OperatorSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <OperatorHeader onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

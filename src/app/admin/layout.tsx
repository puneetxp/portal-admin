import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";

export const metadata = {
  title: "Bus Arabia | Enterprise Super Admin",
  description: "Platform Governance, Carrier Fleets, Settlement Queues & Ticketing Ledgers",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}

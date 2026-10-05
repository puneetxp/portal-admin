import React from "react";
import { OperatorLayout } from "@/components/layout/OperatorLayout";

export const metadata = {
  title: "Bus Arabia | Carrier Fleet Command",
  description: "Arabia Fleet Operations, Daily Departures, Crew & Financial Command",
};

export default function PortalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OperatorLayout>{children}</OperatorLayout>;
}

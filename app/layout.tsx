import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "BMSCE Alumni Network",
  description: "Connect BMS College of Engineering students and alumni for mentorship, referrals, events, and community."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "High-Performance Paid Ads Strategy | GTS Media House",
  description:
    "Strategic paid advertising management and high-performing ad creative for growing brands. GTS Media House helps businesses scale social media ad campaigns with better strategy and better content.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brandBg text-white cursor-none">
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}




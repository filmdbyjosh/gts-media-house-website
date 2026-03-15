import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Brand Development & Marketing Systems Built to Scale | GTS Media House",
  description:
    "GTS Media House helps businesses build strong brands and scalable marketing systems. From brand identity, visual direction, marketing strategy and content. Designed to create a brand that attracts attention and grows.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Brand Development & Marketing Systems Built to Scale | GTS Media House",
    description:
      "GTS Media House helps businesses build strong brands and scalable marketing systems. From brand identity, visual direction, marketing strategy and content. Designed to create a brand that attracts attention and grows.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GTS Media House High-Performance Ads",
      },
    ],
    type: "website",
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
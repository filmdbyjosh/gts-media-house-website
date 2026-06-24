import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} | Digital Marketing Agency`,
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: `${site.name} | Digital Marketing Agency`,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GTS Media House",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GTS Media House",
              url: "https://gtsmediahouse.com",
              sameAs: ["https://instagram.com/gtsmediahouse"],
            }),
          }}
        />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-form",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.metaTitle,
    template: "%s",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: site.metaTitle,
    description: site.description,
    url: site.url,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="bg-[#0c0b0a] text-white antialiased">
        <SiteChrome />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Done-for-you content production",
              description: site.description,
              url: site.url,
              isPartOf: {
                "@type": "WebSite",
                name: site.legalName,
                url: site.url,
              },
              about: {
                "@type": "ProfessionalService",
                name: site.legalName,
                description: site.description,
                url: site.url,
                telephone: site.phone,
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "AZ",
                  addressCountry: "US",
                },
                sameAs: [
                  site.social.instagram,
                  site.social.facebook,
                  site.social.linkedin,
                ],
              },
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

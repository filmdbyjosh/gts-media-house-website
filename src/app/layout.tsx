import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "GTS Media House | Brand Design, Video Creation & Digital Marketing",
  description:
    "Brand design, video creation, and digital marketing built to help your business stand out and grow.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "GTS Media House | Brand Design, Video Creation & Digital Marketing",
    description:
      "Brand design, video creation, and digital marketing built to help your business stand out and grow.",
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
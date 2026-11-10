import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  ogImage,
  organizationSchema,
  siteDescription,
  siteName,
  siteUrl,
  themeColor,
  websiteSchema,
} from "@/data/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | GLINTIC",
  },
  description: siteDescription,
  applicationName: "GLINTIC",
  generator: "Next.js",
  keywords: [
    "sports support manufacturer",
    "knee sleeve supplier",
    "yoga equipment manufacturer",
    "foam roller OEM",
    "pilates accessories wholesale",
    "Shanghai yoga supplier",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GLINTIC",
    locale: "en_US",
    url: "/",
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "GLINTIC — Sports Support & Yoga Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-white text-ink">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <AnnouncementBar />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

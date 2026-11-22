import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RfqProvider from "@/components/RfqProvider";
import JsonLd from "@/components/JsonLd";
import { ogImage, organizationSchema, siteDescription, siteName, siteUrl, themeColor, websiteSchema } from "@/data/site";
// 文档允许范围内的开发字体组合，最终品牌字体仍可由业务方确认。
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | GLINTIC Studio" },
  description: siteDescription,
  applicationName: "GLINTIC Studio",
  keywords: ["yoga studio supplies", "pilates studio equipment", "private label yoga props", "studio grip socks", "OEM ODM studio accessories", "GLINTIC Studio"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "GLINTIC Studio", locale: "en_US", url: "/", title: siteName, description: siteDescription, images: [{ url: ogImage, width: 1200, height: 630, alt: "GLINTIC Studio — Yoga & Pilates Studio Supply" }] },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription, images: [ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { themeColor, width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return <html lang="en" className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}><body><JsonLd data={organizationSchema} /><JsonLd data={websiteSchema} /><RfqProvider><a href="#main-content" className="skip-link">Skip to content</a><AnnouncementBar /><Navbar />{children}<Footer /></RfqProvider></body></html>;
}

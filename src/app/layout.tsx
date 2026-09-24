import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"),
  title: { default: "CLINTIC — Find Your Flow", template: "%s | CLINTIC" },
  description: "Yoga and Pilates wear, considered training essentials and recovery tools. Discover the CLINTIC collection for your everyday movement.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "CLINTIC — Find Your Flow",
    description: "Considered essentials for yoga, Pilates and life in motion.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

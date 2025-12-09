import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://iconembededcontrols.com'),
  title: {
    default: "Icon Embedded Controls - Industrial Equipment & Digital Tyre Inflators",
    template: "%s | Icon Embedded Controls"
  },
  description: "Leading manufacturer of digital tyre inflators, nitrogen generators, air compressors, and industrial equipment. Serving fuel stations, garages, and industries across India and internationally.",
  keywords: [
    "digital tyre inflator",
    "nitrogen tyre inflator",
    "nitrogen generator",
    "air compressor",
    "garage equipment",
    "fuel station equipment",
    "panel boards",
    "PLC control panels",
    "digital engine oil dispenser",
    "DEF AdBlue dispenser",
    "industrial equipment India",
    "Coimbatore industrial equipment"
  ],
  authors: [{ name: "Icon Embedded Controls" }],
  creator: "Icon Embedded Controls",
  publisher: "Icon Embedded Controls",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://iconembededcontrols.com",
    siteName: "Icon Embedded Controls",
    title: "Icon Embedded Controls - Industrial Equipment & Digital Tyre Inflators",
    description: "Leading manufacturer of digital tyre inflators, nitrogen generators, air compressors, and industrial equipment. Serving fuel stations, garages, and industries.",
    images: [
      {
        url: "/images/highres/8. Logos/logo.png",
        width: 1200,
        height: 630,
        alt: "Icon Embedded Controls Logo"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Icon Embedded Controls - Industrial Equipment & Digital Tyre Inflators",
    description: "Leading manufacturer of digital tyre inflators, nitrogen generators, air compressors, and industrial equipment.",
    images: ["/images/highres/8. Logos/logo.png"],
  },
  icons: {
    icon: '/site_icon.svg',
    shortcut: '/site_icon.svg',
    apple: '/site_icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en-IN',
    },
  },
  verification: {
    google: '',
  },
};

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import FloatingCallButton from "@/components/FloatingCallButton";

import DisableRightClick from "@/components/DisableRightClick";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <FloatingCallButton />
        </ThemeProvider>
        <DisableRightClick />
      </body>
    </html>
  );
}

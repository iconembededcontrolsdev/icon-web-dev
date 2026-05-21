import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // eslint-disable-line
import "./globals.css";
import ThemeScript from "@/components/ThemeScript"; // eslint-disable-line
import Navbar from "@/components/Navbar"; // eslint-disable-line
import { ThemeProvider } from "@/contexts/ThemeContext"; // eslint-disable-line
import FloatingCallButton from "@/components/FloatingCallButton";
import DisableRightClick from "@/components/DisableRightClick";
import SwapLowToHigh from "@/components/SwapLowToHigh";

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
  metadataBase: new URL("https://www.iconembededcontrols.com"),
  title: {
    default:
      "Icon Embeded Controls - Industrial Equipment",
    template: "%s | Icon Embeded Controls",
  },
  description:
    "Manufacturer of digital tyre inflators, nitrogen generators, and industrial equipment. Serving fuel stations and industries worldwide.",
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
    "Coimbatore industrial equipment",
    // Additional SEO keywords requested
    "N2 inflator",
    "tyre inflator India",
    "IOCL approved inflator",
    "BPCL approved inflator",
    "tyre inflator export",
  ],
  authors: [{ name: "Icon Embeded Controls" }],
  creator: "Icon Embeded Controls",
  publisher: "Icon Embeded Controls",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.iconembededcontrols.com",
    siteName: "Icon Embeded Controls",
    title:
      "Icon Embeded Controls - Industrial Equipment",
    description:
      "Manufacturer of digital tyre inflators, nitrogen generators, and industrial equipment. Serving fuel stations and industries worldwide.",
    images: [
      {
        url: "/images/lowres/7.%20Extras/logo-low.png",
        width: 1200,
        height: 630,
        alt: "Icon Embeded Controls Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Icon Embeded Controls - Industrial Equipment & Digital Tyre Inflators",
    description:
      "Leading manufacturer of digital tyre inflators, nitrogen generators, air compressors, and industrial equipment.",
    images: ["/images/lowres/7.%20Extras/logo-low.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.iconembededcontrols.com",
    languages: {
      "en": "/",
      "en-IN": "/en-IN",
    },
  },
  verification: {
    google: "tofT2lz_IlPj6f9JUhMGBuirdokA3CKcacWDEp4q4IM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="tofT2lz_IlPj6f9JUhMGBuirdokA3CKcacWDEp4q4IM"
        />
        <meta
          name="description"
          content="Manufacturer of digital tyre inflators, nitrogen generators, and industrial equipment. Serving fuel stations and industries worldwide."
        />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <ThemeScript />
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
        <SwapLowToHigh />
      </body>
    </html>
  );
}

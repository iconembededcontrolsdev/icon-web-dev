import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description: "Contact Icon Embedded Controls for inquiries about digital tyre inflators, nitrogen generators, and industrial equipment. Located in Coimbatore, Tamil Nadu, India. Call +91-422-2596032",
  keywords: [
    "contact Icon Embedded Controls",
    "digital tyre inflator inquiry",
    "Coimbatore industrial equipment",
    "nitrogen generator contact",
    "fuel station equipment supplier contact",
    "industrial equipment inquiry India"
  ],
  openGraph: {
    title: "Contact Icon Embedded Controls - Digital Tyre Inflator Manufacturer",
    description: "Get in touch with Icon Embedded Controls for all your industrial equipment needs. Located in Coimbatore, Tamil Nadu.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Icon Embedded Controls",
    description: "Get in touch for digital tyre inflators and industrial equipment inquiries.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

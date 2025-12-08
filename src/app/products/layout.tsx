import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Products - Industrial Equipment & Digital Tyre Inflators",
  description: "Browse our complete range of digital tyre inflators, nitrogen generators, air compressors, panel boards, and garage equipment. High-quality industrial solutions for fuel stations, garages, and industries.",
  keywords: [
    "industrial equipment catalog",
    "digital tyre inflator products",
    "nitrogen generator models",
    "air compressor range",
    "panel boards industrial",
    "garage equipment products",
    "fuel station equipment",
    "DEF AdBlue dispenser",
    "engine oil dispenser"
  ],
  openGraph: {
    title: "Industrial Equipment Products - Icon Embedded Controls",
    description: "Complete range of digital tyre inflators, nitrogen generators, air compressors, and industrial equipment for fuel stations and industries.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Equipment Products - Icon Embedded Controls",
    description: "Browse our complete range of industrial equipment and solutions.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

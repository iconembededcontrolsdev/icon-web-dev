import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - Leading Digital Tyre Inflator Manufacturer",
  description: "Icon Embedded Controls has been manufacturing reliable digital tyre inflators since 2007. Trusted by major companies like IOCL, BPCL, HPCL, MRF, and Michelin across India.",
  keywords: [
    "about Icon Embedded Controls",
    "digital tyre inflator manufacturer",
    "tyre inflator since 2007",
    "IOCL supplier",
    "BPCL supplier",
    "MRF partner",
    "Michelin partner",
    "industrial equipment manufacturer India"
  ],
  openGraph: {
    title: "About Icon Embedded Controls - Digital Tyre Inflator Manufacturer Since 2007",
    description: "Leading manufacturer of digital tyre inflators and industrial equipment. Trusted by major companies across India since 2007.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Icon Embedded Controls - Digital Tyre Inflator Manufacturer",
    description: "Leading manufacturer of digital tyre inflators and industrial equipment since 2007.",
  },
  alternates: {
    canonical: '/about',
  },
};


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Us</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Leading the way in embeded control solutions since 2007.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Our Story</h2>
            <p className="text-lg text-muted leading-relaxed">
              We are the leading Manufacturer and supplier for Electronic Digital Tyre Inflator all over India since the year 2007.
              Our Electronic Digital Tyre Inflator is reliable, durable and accurate, thus meeting the requirement of each and every horizon related to vehicle tyre pressure inflation.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Our Inflators are used by major tyre manufacturers as well as vehicle manufacturers in their production line up.
              Our Electronic Digital Tyre Inflator meets the accuracy suggested by tyre manufacturer's pressure standards.
            </p>
          </div>
          <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-lg bg-white p-8 flex items-center justify-center">
            {/* Placeholder for an about image or logo */}
            <Image
              src="/images/highres/8. Logos/logo.png"
              alt="Icon Embeded Controls"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Quality Assurance</h3>
            <p className="text-muted">
              Our control panel Enclosure meets the Ingress Protection standard IP65, ensuring durability and reliability in all conditions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Innovation</h3>
            <p className="text-muted">
              We continuously innovate our product line, from Digital Nitrogen Tyre Inflators to advanced Automation Panels.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Client Trust</h3>
            <p className="text-muted">
              Trusted by major companies like IOCL, BPCL, HPCL, MRF, Michelin, and many more across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import DynamicGrid from '@/components/DynamicGrid';
import NitrogenShowcase from '@/components/NitrogenShowcase';
import ClientLogos from '@/components/ClientLogos';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import StructuredData from '@/components/StructuredData';
import { generateOrganizationSchema, organizationData } from '@/utils/seo';

interface Block {
  type: 'hero' | 'grid-2' | 'grid-3' | 'hero-product' | 'nitrogen-showcase';
  [key: string]: any;
}

const showcaseData: Block[] = [
  // Hero Section - Full Width
  {
    type: 'hero',
    // title: 'Welcome to Icon Embeded Controls',
    // subtitle: 'With some brilliant products and splendid services, we have carved a niche for ourselves in both domestic as well as international markets. Our range includes Digital Tyre Inflator, Digital Nitrogen Tyre Inflator, Nitrogen Generator, Air Compressor, and many more.',
    img: '/images/highres/8. Logos/logo.png',
    // ctaButtons: [
    //   { text: 'Learn more', link: '/about', variant: 'primary' },
    //   { text: 'View Products', link: '/products', variant: 'outline' }
    // ]
  },

  // Nitrogen Showcase
  {
    type: 'nitrogen-showcase'
  },

  // Product Categories Grid
  {
    type: 'grid-3',
    items: [
      {
        id: 'digital-tyre-inflator-pedestal',
        title: 'Digital Tyre Inflator (Pedestal)',
        subtitle: 'Pedestal mounted digital tyre inflators suitable for fuel stations and heavy duty applications.',
        img: '/images/highres/1. Digital Tyre Inflator/1E.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/digital-tyre-inflator-pedestal', variant: 'primary' },
          { text: 'Buy', link: '/products/digital-tyre-inflator-pedestal', variant: 'outline' }
        ]
      },
      {
        id: 'digital-engine-oil-dispenser',
        title: 'Digital Engine Oil Dispenser',
        subtitle: 'Digital engine oil dispenser with secure preset operation and precise oil measurement in litres and millilitres.',
        img: '/images/highres/10. Digital Engine Oil Dispenser/10A.png',
        ctaButtons: [
          { text: 'Learn more', link: '/products/digital-engine-oil-dispenser', variant: 'primary' },
          { text: 'Buy', link: '/products/digital-engine-oil-dispenser', variant: 'outline' }
        ]
      },
      {
        id: 'engine-oil-changer',
        title: 'Engine Oil Changer',
        subtitle: 'Pump based suction oil changer for 2T/4T engine oil removal.',
        img: '/images/highres/11. Engine Oil Changer/11A.png',
        ctaButtons: [
          { text: 'Learn more', link: '/products/engine-oil-changer', variant: 'primary' },
          { text: 'Buy', link: '/products/engine-oil-changer', variant: 'outline' }
        ]
      },
      {
        id: 'digital-tyre-inflator',
        title: 'Digital Tyre Inflator (Wall Mountable)',
        subtitle: 'Reliable and accurate electronic digital tyre inflators for fuel stations and garages. Features automatic tyre sensing and high-speed inflation.',
        img: '/images/highres/1. Digital Tyre Inflator/1A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/digital-tyre-inflator', variant: 'primary' },
          { text: 'Buy', link: '/products/digital-tyre-inflator', variant: 'outline' }
        ]
      },
      {
        id: 'digital-def-adblue-dispenser',
        title: 'Digital DEF/AdBlue Dispenser',
        subtitle: 'Digital diesel exhaust fluid dispenser with precise measurement and secure dispensing.',
        img: '/images/highres/9. Digital DEF/9a.png',
        ctaButtons: [
          { text: 'Learn more', link: '/products/digital-def-adblue-dispenser', variant: 'primary' },
          { text: 'Buy', link: '/products/digital-def-adblue-dispenser', variant: 'outline' }
        ]
      },
      {
        id: 'air-compressor',
        title: 'Air Compressor',
        subtitle: 'Single and two-stage oil lubricated reciprocating air compressors designed for low maintenance and high efficiency.',
        img: '/images/highres/3. Air Compressor/3A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/air-compressor', variant: 'primary' },
          { text: 'Buy', link: '/products/air-compressor', variant: 'outline' }
        ]
      },
      {
        id: 'nitrogen-generator',
        title: 'Nitrogen Generator',
        subtitle: 'Industrial grade nitrogen generators using PSA technology for high purity nitrogen production.',
        img: '/images/highres/4. Nitrogen Generator/4A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/nitrogen-generator', variant: 'primary' },
          { text: 'Buy', link: '/products/nitrogen-generator', variant: 'outline' }
        ]
      },
      {
        id: 'panel-board',
        title: 'Panel Boards',
        subtitle: 'Custom designed PLC Control Panels, APFC Panels, and Switch Gear Panels for industrial automation.',
        img: '/images/highres/5. Panel Board/5A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/panel-board', variant: 'primary' },
          { text: 'Buy', link: '/products/panel-board', variant: 'outline' }
        ]
      },
      {
        id: 'garage-equipment',
        title: 'Garage Equipment',
        subtitle: 'Essential garage equipment including two wheeler ramps, pneumatic grease pumps, and manual oil dispensers.',
        img: '/images/highres/6. Garage Equipment/6A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/garage-equipment', variant: 'primary' },
          { text: 'Buy', link: '/products/garage-equipment', variant: 'outline' }
        ]
      }
    ]
  }
];

export default function Home() {
  const router = useRouter();

  const navigateToProduct = (product: any) => {
    const productId = product.id || product.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/products/${productId}`);
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'hero':
        return <Hero
          key={index}
          title={block.title}
          subtitle={block.subtitle}
          img={block.img}
          ctaButtons={block.ctaButtons}
        />;
      case 'hero-product':
        return (
          <div
            key={index}
            onClick={() => navigateToProduct(block)}
            className="cursor-pointer"
          >
            <Hero
              title={block.title}
              subtitle={block.subtitle}
              img={block.img}
              ctaButtons={block.ctaButtons}
            />
          </div>
        );
      case 'grid-2':
      case 'grid-3':
        return <DynamicGrid
          key={index}
          title={block.title}
          subtitle={block.subtitle}
          items={block.items}
          onItemClick={(item) => navigateToProduct(item)}
        />;
      case 'nitrogen-showcase':
        return <NitrogenShowcase key={index} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationSchema(organizationData)} />
      
      {/* Main Content */}
      <main className="pt-12 bg-background">
        {/* Hero Section */}
        {renderBlock(showcaseData[0], 0)}

        {/* Client Logos Carousel */}


        {/* Remaining Blocks */}
        <div className="mt-1">
          {showcaseData.slice(1).map((block, index) => (
            <div key={index + 1} className="mt-0">
              {renderBlock(block, index + 1)}
            </div>
          ))}
        </div>



        {/* Footer */}
        <footer className="bg-background">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Products</h3>
                <ul className="space-y-1">
                  <li><Link href="/products/digital-nitrogen-tyre-inflator" className="text-muted hover:text-accent transition-colors">Digital Nitrogen Tyre Inflator</Link></li>
                  <li><Link href="/products/digital-tyre-inflator-pedestal" className="text-muted hover:text-accent transition-colors">Digital Tyre Inflator (Pedestal)</Link></li>
                  <li><Link href="/products/digital-engine-oil-dispenser" className="text-muted hover:text-accent transition-colors">Digital Engine Oil Dispenser</Link></li>
                  <li><Link href="/products/engine-oil-changer" className="text-muted hover:text-accent transition-colors">Engine Oil Changer</Link></li>
                  <li><Link href="/products/digital-tyre-inflator" className="text-muted hover:text-accent transition-colors">Digital Tyre Inflator (Wall Mountable)</Link></li>
                  <li><Link href="/products/digital-def-adblue-dispenser" className="text-muted hover:text-accent transition-colors">Digital DEF/AdBlue Dispenser</Link></li>
                  <li><Link href="/products/air-compressor" className="text-muted hover:text-accent transition-colors">Air Compressor</Link></li>
                  <li><Link href="/products/nitrogen-generator" className="text-muted hover:text-accent transition-colors">Nitrogen Generator</Link></li>
                  <li><Link href="/products/panel-board" className="text-muted hover:text-accent transition-colors">Panel Boards</Link></li>
                  <li><Link href="/products/garage-equipment" className="text-muted hover:text-accent transition-colors">Garage Equipment</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
                <ul className="space-y-2 text-muted">
                  <li>
                    <a href="tel:+914222596032" className="hover:text-accent transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91 422-2596032
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@iconembededcontrols.com" className="hover:text-accent transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      info@iconembededcontrols.com
                    </a>
                  </li>
                  <li className="flex items-start gap-2 pt-2">
                    <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm">GST No. 33AACFI3490A1ZX</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Address</h3>
                <ul className="space-y-1 text-muted text-sm">
                  <li className="font-semibold text-primary">Icon Embedded Controls</li>
                  <li>No. 374/2, Jyothi Nagar,<br />2nd Street, Ramanuja Nagar Extension,<br />Uppilipalayam Post,<br />Coimbatore - 641015,<br />Tamil Nadu, India</li>
                  <li className="pt-2">
                    <Link href="/contact" className="text-accent hover:text-accent-hover transition-colors font-medium">View Full Details →</Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <div className="relative w-40 h-16 mb-4">
                  <Image
                    src="/images/highres/8. Logos/logo.png"
                    alt="Icon Embedded Controls"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-full h-48 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.284721862546!2d77.02629303656019!3d11.019608060235385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85765ea8ff1e3%3A0x297b424b515ef933!2sIcon%20Embeded%20Controls!5e0!3m2!1sen!2sin!4v1765110091224!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-muted text-sm">
              <p>© {new Date().getFullYear()} Icon Embeded Controls. All rights reserved.</p>
              <p className="mt-2 md:mt-0">India</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

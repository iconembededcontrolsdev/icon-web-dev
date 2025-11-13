'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Grid2 from '@/components/Grid2';
import Grid3 from '@/components/Grid3';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Block {
  type: 'hero' | 'grid-2' | 'grid-3' | 'hero-product';
  [key: string]: any;
}

const showcaseData: Block[] = [
  // Hero Section
  {
    type: 'hero',
    title: 'Welcome to Icon Embedded Controls',
    subtitle: 'With some brilliant products and splendid services, we have carved a niche for ourselves in both domestic as well as international markets. Our range includes Digital Tyre Inflator, Digital Nitrogen Tyre Inflator, Nitrogen Generator, Air Compressor, and many more.',
    img: '/images/logo.png',
    ctaButtons: [
      { text: 'Learn more', link: '/about', variant: 'primary' },
      { text: 'View Products', link: '/products', variant: 'outline' }
    ]
  },
  
  // First Product - Full Width
  {
    type: 'hero-product',
    id: 'digital-tyre-inflator',
    title: 'Digital Tyre Inflator',
    subtitle: 'Reliable, durable and accurate electronic digital tyre inflators meeting tyre manufacturer pressure standards. Used by major tyre and vehicle manufacturers in their production line.',
    img: '/images/1. Digital Tyre Inflator/1A.jpeg',
    fullDescription: 'Our Electronic Digital Tyre Inflator is reliable, durable and accurate, thus meet the requirement of each and every horizon related to vehicle tyre pressure inflation. Our Inflators are used by major tyre manufacturers as well as vehicle manufacturers in their production line up. Our Electronic Digital Tyre Inflator meets the accuracy suggested by tyre manufacturer\'s pressure standards. Our control panel Enclosure meets the Ingress Protection standard IP65.',
    features: [
      'Two digital readouts for set pressure and tyre pressure',
      'LCD display with LED backlight for good visibility',
      'Display remains at same set pressure value even after power on-off cycle',
      'Audible and visual end of cycle signal indicators',
      'Automatic tyre sensing system',
      'IP65 protection standard'
    ],
    applications: [
      'Wheel Alignment Shop',
      'Automotive Garage',
      'Small vehicle Depot',
      'Puncture Shop',
      'Apartments',
      'Commercial Parking Lot'
    ],
    ctaButtons: [
      { text: 'Learn more', link: '/products/digital-tyre-inflator', variant: 'primary' },
      { text: 'Buy', link: '/products/digital-tyre-inflator', variant: 'outline' }
    ]
  },
  
  // Next Two Products - 2-Column Grid
  {
    type: 'grid-2',
    items: [
      {
        id: 'digital-nitrogen-tyre-inflator',
        title: 'Digital Nitrogen Tyre Inflator',
        subtitle: 'Reliable and accurate electronic digital nitrogen tyre inflators. Nitrogen production based on cost-efficient PSA technology with 95-99% purity suitable for vehicle nitrogen inflation.',
        img: '/images/2. Digital Nitrogen Tyre Inflator/2A.jpeg',
        fullDescription: 'We are the leading Manufacturer and supplier for Electronic Digital Nitrogen Tyre Inflator all over India since the year 2007. Our Electronic Digital Nitrogen Tyre Inflator is reliable, durable and accurate, thus meet the requirement of each and every horizon related to vehicle tyre pressure inflation. Nitrogen production is based on reliable and cost efficient PSA technology. Nitrogen Purity may vary from 95-99% suitable for vehicle nitrogen purity suggestions.',
        features: [
          'PSA Technology for nitrogen generation',
          '95-99% purity (adjustable)',
          'Automatic vacuum cum nitrogen inflation',
          'Pressure switch for automatic nitrogen generation cut-off',
          'Tyre counter and error codes available',
          'IP65 protection standard'
        ],
        applications: [
          'Fuel Station',
          'Wheel Alignment Shop',
          'Automotive Garage',
          'Puncture Shop',
          'Commercial Parking Lot'
        ],
        ctaButtons: [
          { text: 'Learn more', link: '/products/digital-nitrogen-tyre-inflator', variant: 'primary' },
          { text: 'Buy', link: '/products/digital-nitrogen-tyre-inflator', variant: 'outline' }
        ]
      },
      {
        id: 'air-compressor',
        title: 'Air Compressor',
        subtitle: 'Single and two-stage oil lubricated reciprocating air compressors known for reliability and performance. Preferred choice for fuel stations, automotive garages, and industrial applications.',
        img: '/images/3. Air Compressor/3a.jpeg',
        fullDescription: 'The ICON EMBEDED CONTROLS single & two stage Oil Lubricated Reciprocating air compressors are known for their reliability and performance, making them the preferred choice for industrial applications.',
        features: [
          'Standard leak proof fittings',
          'Electrical Starter with stop switch latch for safety',
          'Belt/Fan Guard for Safety',
          'Pressure Switch with Differential Pressure Setting',
          'Auto Drain Valve Option available',
          'Safety Pressure Relief Valve'
        ],
        applications: [
          'Fuel Station',
          'Automotive Garages',
          'Textile Industries',
          'Food Processing Industries'
        ],
        ctaButtons: [
          { text: 'Learn more', link: '/products/air-compressor', variant: 'primary' },
          { text: 'Buy', link: '/products/air-compressor', variant: 'outline' }
        ]
      }
    ]
  },
  
  // Next Two Products - 2-Column Grid
  {
    type: 'grid-2',
    items: [
      {
        id: 'panel-board',
        title: 'Panel Boards',
        subtitle: 'PLC Control Panels, Automatic Power Factor Control Panels, and Switch Gear Panels. Complete electrical solutions for automation, power factor correction, and industrial control.',
        img: '/images/5. Panel Board/5a.jpeg',
        fullDescription: 'We provide various PLC Control panel with automation solution for Industries. We offer Automatic Power Factor Control Panel for any loads. Power factor is the ratio between the KW and the KVA drawn by an electrical load where the KW is the actual load power and the KVA is the apparent load power.',
        features: [
          'PLC Control Panels with automation solutions',
          'Automatic Power Factor Control Panel',
          'Switch Gear Panels',
          'Custom electrical solutions',
          'RS-232 & RS-485 compatible',
          'Remote Panel operation available'
        ],
        applications: [
          'All Kind of Industries',
          'Hotels',
          'Banks',
          'Fuel Station',
          'Shopping Mall'
        ],
        ctaButtons: [
          { text: 'Learn more', link: '/products/panel-board', variant: 'primary' },
          { text: 'Buy', link: '/products/panel-board', variant: 'outline' }
        ]
      },
      {
        id: 'nitrogen-generator',
        title: 'Nitrogen Generator',
        subtitle: 'Easy to convert ordinary digital tyre inflator to digital nitrogen tyre inflator using this module. Reliable PSA method for nitrogen generation with 95-99% purity suitable for vehicle nitrogen inflation.',
        img: '/images/4. Nitrogen Generator/4a.jpeg',
        fullDescription: 'Easy to convert ordinary digital tyre inflator to digital nitrogen tyre inflator using this module. Reliable PSA method for nitrogen generation with 95-99% purity suitable for vehicle nitrogen inflation. Air and nitrogen input pressure option available in single machine.',
        features: [
          'PSA Technology for nitrogen generation',
          '95-99% purity (adjustable)',
          'Pressure switch for automatic nitrogen generation cut-off',
          'Safety pressure relief valve',
          'Wheel base option available',
          'Computer power chord adapter with fuse protection'
        ],
        applications: [
          'Wheel Alignment Shop',
          'Automotive Garage',
          'Depot',
          'Puncture Shop',
          'Apartments',
          'Commercial Parking Lot'
        ],
        ctaButtons: [
          { text: 'Learn more', link: '/products/nitrogen-generator', variant: 'primary' },
          { text: 'Buy', link: '/products/nitrogen-generator', variant: 'outline' }
        ]
      }
    ]
  },
  
  // Remaining Products - 3-Column Grid
  {
    type: 'grid-3',
    items: [
      {
        id: 'garage-equipment',
        title: 'Garage Equipment',
        subtitle: 'High quality two wheeler ramps, pneumatic grease pumps, and manual oil dispensers. Professional tools and equipment for automotive workshops and garages.',
        img: '/images/6. Garage Equipment/6a.jpeg',
        fullDescription: 'We manufacture High Quality Two Wheeler Ramp suitable for all kind of two wheeler. We also manufacture Pneumatic Grease Pump of capacity 15kg, 25kg and 50kg, and manual 2T oil dispenser.',
        features: [
          'Two Wheeler Ramp with 300kg lifting capacity',
          'Foot operated hydraulic piston',
          'Pneumatic Grease Pump (15kg, 25kg, 50kg)',
          'Manual 2T Oil Dispenser',
          'Textured sheet metal for extra grip',
          'Zero oil spillage design'
        ],
        applications: [
          'Automotive Workshops',
          'Two Wheeler Service Stations',
          'Garages',
          'Depots'
        ],
        ctaButtons: [
          { text: 'Learn more', link: '/products/garage-equipment', variant: 'primary' },
          { text: 'Buy', link: '/products/garage-equipment', variant: 'outline' }
        ]
      },
      {
        id: 'industrial-solutions',
        title: 'Industrial Solutions',
        subtitle: 'Comprehensive range of industrial automation and control solutions. Custom designed panels and systems for various industrial applications.',
        img: '/images/placeholder.svg',
        fullDescription: 'Comprehensive range of industrial automation and control solutions. Custom designed panels and systems for various industrial applications. We provide complete electrical solutions for automation, power factor correction, and industrial control.',
        features: [
          'Custom designed panels',
          'Industrial automation solutions',
          'Process control systems',
          'Monitoring systems',
          'Complete electrical solutions'
        ],
        applications: [
          'Manufacturing Industries',
          'Process Industries',
          'Automation Systems',
          'Control Panels'
        ],
        ctaButtons: [
          { text: 'Learn more', link: '/products', variant: 'primary' },
          { text: 'Buy', link: '/products', variant: 'outline' }
        ]
      },
      {
        id: 'automation-panels',
        title: 'Automation Panels',
        subtitle: 'Advanced automation panels with PLC integration. Complete solutions for industrial automation, process control, and monitoring systems.',
        img: '/images/placeholder.svg',
        fullDescription: 'Advanced automation panels with PLC integration. Complete solutions for industrial automation, process control, and monitoring systems. We provide various PLC Control panel with automation solution for Industries.',
        features: [
          'PLC integration',
          'Advanced automation',
          'Process control',
          'Monitoring systems',
          'RS-232 & RS-485 compatible',
          'Remote operation available'
        ],
        applications: [
          'Industrial Automation',
          'Process Control',
          'Monitoring Systems',
          'PLC Control'
        ],
        ctaButtons: [
          { text: 'Learn more', link: '/products', variant: 'primary' },
          { text: 'Buy', link: '/products', variant: 'outline' }
        ]
      }
    ]
  }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        return <Grid2 
          key={index} 
          title={block.title}
          subtitle={block.subtitle}
          items={block.items}
          onItemClick={(item) => navigateToProduct(item)}
        />;
      case 'grid-3':
        return <Grid3 
          key={index} 
          title={block.title}
          subtitle={block.subtitle}
          items={block.items}
          onItemClick={(item) => navigateToProduct(item)}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <Image 
                  src="/images/logo.png" 
                  alt="Icon Embedded Controls" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-bold text-gray-900">Icon Embedded Controls</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-gray-700 hover:text-accent transition-colors">Products</Link>
              <Link href="/about" className="text-gray-700 hover:text-accent transition-colors">About Us</Link>
              <Link 
                href="/contact" 
                className="bg-accent text-white px-6 py-2 rounded-full hover:bg-accent/90 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-accent focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">Products</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">About Us</Link>
              <Link 
                href="/contact" 
                className="block w-full text-center bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 bg-gray-50">
        {showcaseData.map((block, index) => (
          <div key={index} className={index > 0 ? 'mt-0' : ''}>
            {renderBlock(block, index)}
          </div>
        ))}
        
        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
                <ul className="space-y-3">
                  <li><Link href="/products/digital-tyre-inflator" className="text-gray-600 hover:text-accent transition-colors">Digital Tyre Inflator</Link></li>
                  <li><Link href="/products/digital-nitrogen-tyre-inflator" className="text-gray-600 hover:text-accent transition-colors">Digital Nitrogen Tyre Inflator</Link></li>
                  <li><Link href="/products/nitrogen-generator" className="text-gray-600 hover:text-accent transition-colors">Nitrogen Generator</Link></li>
                  <li><Link href="/products/air-compressor" className="text-gray-600 hover:text-accent transition-colors">Air Compressor</Link></li>
                  <li><Link href="/products/panel-board" className="text-gray-600 hover:text-accent transition-colors">Panel Boards</Link></li>
                  <li><Link href="/products/garage-equipment" className="text-gray-600 hover:text-accent transition-colors">Garage Equipment</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-gray-600 hover:text-accent transition-colors">About Us</Link></li>
                  <li><Link href="/products" className="text-gray-600 hover:text-accent transition-colors">Our Products</Link></li>
                  <li><Link href="/contact" className="text-gray-600 hover:text-accent transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>M/S. ICON EMBEDED CONTROLS</li>
                  <li>374/2, JothiNagar 2nd Street,<br />Ramnujam Nagar Extension,<br />Uppilipalayam Post,<br />Coimbatore - 641015, TamilNadu, India</li>
                  <li className="pt-2">
                    <Link href="/contact" className="text-accent hover:text-accent-hover transition-colors">View Full Details →</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Valued Clients</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li>IOCL, BPCL, HPCL</li>
                  <li>Bridgestone, Michelin, MRF Tyres</li>
                  <li>Caterpillar, Mahindra & Mahindra</li>
                  <li>Apollo Tyres, BKT Tires</li>
                  <li>And many more...</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Icon Embedded Controls. All rights reserved.</p>
              <p className="mt-2">Established 2007 | Coimbatore, TamilNadu, India</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

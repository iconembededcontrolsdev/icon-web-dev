// SEO Utility functions for generating structured data

export interface Organization {
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    telephone: string;
    contactType: string;
    email: string;
    areaServed: string;
    availableLanguage: string;
  };
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export function generateOrganizationSchema(org: Organization) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    description: org.description,
    url: org.url,
    logo: org.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: org.contactPoint.telephone,
      contactType: org.contactPoint.contactType,
      email: org.contactPoint.email,
      areaServed: org.contactPoint.areaServed,
      availableLanguage: org.contactPoint.availableLanguage,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.address.streetAddress,
      addressLocality: org.address.addressLocality,
      addressRegion: org.address.addressRegion,
      postalCode: org.address.postalCode,
      addressCountry: org.address.addressCountry,
    },
    ...(org.sameAs && { sameAs: org.sameAs }),
  };
}

export interface Product {
  name: string;
  description: string;
  image: string;
  brand: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    ...(product.offers && {
      offers: {
        '@type': 'Offer',
        price: product.offers.price,
        priceCurrency: product.offers.priceCurrency || 'INR',
        availability: product.offers.availability || 'https://schema.org/InStock',
      },
    }),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const organizationData: Organization = {
  name: 'Icon Embedded Controls',
  description: 'Leading manufacturer of digital tyre inflators, nitrogen generators, air compressors, and industrial equipment. Serving fuel stations, garages, and industries across India and internationally.',
  url: 'https://iconembededcontrols.com',
  logo: 'https://iconembededcontrols.com/images/highres/8. Logos/logo.png',
  contactPoint: {
    telephone: '+91-422-2596032',
    contactType: 'Customer Service',
    email: 'info@iconembededcontrols.com',
    areaServed: 'IN',
    availableLanguage: 'en',
  },
  address: {
    streetAddress: 'No. 374/2, Jyothi Nagar, 2nd Street, Ramanuja Nagar Extension, Uppilipalayam Post',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641015',
    addressCountry: 'IN',
  },
};

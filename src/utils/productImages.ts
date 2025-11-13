// Helper function to get all images for a product from their folder
export const getProductImages = (productId: string): string[] => {
  // Map product IDs to their folder names in public/images
  const folderMap: Record<string, string> = {
    'digital-tyre-inflator': '1. Digital Tyre Inflator',
    'digital-nitrogen-tyre-inflator': '2. Digital Nitrogen Tyre Inflator',
    'air-compressor': '3. Air Compressor',
    'nitrogen-generator': '4. Nitrogen Generator',
    'panel-board': '5. Panel Board',
    'garage-equipment': '6. Garage Equipment',
    'industrial-solutions': 'placeholder',
    'automation-panels': 'placeholder',
  };

  const folderName = folderMap[productId];
  if (!folderName || folderName === 'placeholder') {
    return ['/images/placeholder.svg'];
  }

  // Define all images for each product based on actual folder contents
  const imageMap: Record<string, string[]> = {
    '1. Digital Tyre Inflator': [
      '/images/1. Digital Tyre Inflator/1A.jpeg',
      '/images/1. Digital Tyre Inflator/1B.jpeg',
      '/images/1. Digital Tyre Inflator/1C.jpeg',
      '/images/1. Digital Tyre Inflator/1D.jpeg',
      '/images/1. Digital Tyre Inflator/1E.jpeg',
      '/images/1. Digital Tyre Inflator/1F.jpeg',
      '/images/1. Digital Tyre Inflator/1G.jpeg',
      '/images/1. Digital Tyre Inflator/1H.jpeg',
      '/images/1. Digital Tyre Inflator/1I.jpeg',
      '/images/1. Digital Tyre Inflator/1J.jpeg',
      '/images/1. Digital Tyre Inflator/1K.jpeg',
      '/images/1. Digital Tyre Inflator/1L.jpeg',
    ],
    '2. Digital Nitrogen Tyre Inflator': [
      '/images/2. Digital Nitrogen Tyre Inflator/2A.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2B.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2C.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2D.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2E.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2F.jpeg',
    ],
    '3. Air Compressor': [
      '/images/3. Air Compressor/3a.jpeg',
      '/images/3. Air Compressor/3b.jpeg',
    ],
    '4. Nitrogen Generator': [
      '/images/4. Nitrogen Generator/4a.jpeg',
    ],
    '5. Panel Board': [
      '/images/5. Panel Board/5a.jpeg',
      '/images/5. Panel Board/5b.jpeg',
      '/images/5. Panel Board/5b2.jpeg',
      '/images/5. Panel Board/5c1.jpeg',
      '/images/5. Panel Board/5c2.jpeg',
      '/images/5. Panel Board/5c3.jpeg',
      '/images/5. Panel Board/5d.jpeg',
    ],
    '6. Garage Equipment': [
      '/images/6. Garage Equipment/6a.jpeg',
      '/images/6. Garage Equipment/6b.jpeg',
      '/images/6. Garage Equipment/6c.jpeg',
    ],
  };

  return imageMap[folderName] || ['/images/placeholder.svg'];
};


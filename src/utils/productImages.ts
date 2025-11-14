// Helper function to get all images for a product from their folder
export const getProductImages = (productId: string): string[] => {
  // Map product IDs to their specific images
  // For variant products, return the specific image, otherwise return all images from the category
  const imageMap: Record<string, string[]> = {
    // Category 1: Digital Tyre Inflator variants
    'digital-tyre-inflator-1a': ['/images/1. Digital Tyre Inflator/1A.jpeg'],
    'digital-tyre-inflator-1b': ['/images/1. Digital Tyre Inflator/1B.jpeg'],
    'digital-tyre-inflator-1c': ['/images/1. Digital Tyre Inflator/1C.jpeg'],
    'digital-tyre-inflator-1d': ['/images/1. Digital Tyre Inflator/1D.jpeg'],
    'digital-tyre-inflator-1e': ['/images/1. Digital Tyre Inflator/1E.jpeg'],
    'digital-tyre-inflator-1f': ['/images/1. Digital Tyre Inflator/1F.jpeg'],
    'digital-tyre-inflator-1g': ['/images/1. Digital Tyre Inflator/1G.jpeg'],
    'digital-tyre-inflator-1h': ['/images/1. Digital Tyre Inflator/1H.jpeg'],
    'digital-tyre-inflator-1i': ['/images/1. Digital Tyre Inflator/1I.jpeg'],
    'digital-tyre-inflator-1j': ['/images/1. Digital Tyre Inflator/1J.jpeg'],
    'digital-tyre-inflator-1k': ['/images/1. Digital Tyre Inflator/1K.jpeg'],
    'digital-tyre-inflator-1l': ['/images/1. Digital Tyre Inflator/1L.jpeg'],
    'digital-tyre-inflator': [
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
    
    // Category 2: Digital Nitrogen Tyre Inflator variants
    'digital-nitrogen-tyre-inflator-2a': ['/images/2. Digital Nitrogen Tyre Inflator/2A.jpeg'],
    'digital-nitrogen-tyre-inflator-2c': ['/images/2. Digital Nitrogen Tyre Inflator/2C.jpeg'],
    'digital-nitrogen-tyre-inflator-2d': ['/images/2. Digital Nitrogen Tyre Inflator/2D.jpeg'],
    'digital-nitrogen-tyre-inflator-2e': ['/images/2. Digital Nitrogen Tyre Inflator/2E.jpeg'],
    'digital-nitrogen-tyre-inflator-2f': ['/images/2. Digital Nitrogen Tyre Inflator/2F.jpeg'],
    'digital-nitrogen-tyre-inflator': [
      '/images/2. Digital Nitrogen Tyre Inflator/2A.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2B.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2C.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2D.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2E.jpeg',
      '/images/2. Digital Nitrogen Tyre Inflator/2F.jpeg',
    ],
    
    // Category 3: Air Compressor variants
    'air-compressor-ic109': ['/images/3. Air Compressor/IC-109.jpeg'],
    'air-compressor-ic209': ['/images/3. Air Compressor/IC-209.jpeg'],
    'air-compressor-ic312': ['/images/3. Air Compressor/IC-312.jpeg'],
    'air-compressor-ic512': ['/images/3. Air Compressor/IC-512.jpeg'],
    'air-compressor-ic1012': ['/images/3. Air Compressor/IC-1012.jpeg'],
    'air-compressor': [
      '/images/3. Air Compressor/3a.jpeg',
      '/images/3. Air Compressor/3b.jpeg',
    ],
    
    // Category 4: Nitrogen Generator
    'nitrogen-generator-4a': ['/images/4. Nitrogen Generator/4A.jpeg'],
    'nitrogen-generator': [
      '/images/4. Nitrogen Generator/4a.jpeg',
    ],
    
    // Category 5: Panel Board variants
    'panel-board-5a': ['/images/5. Panel Board/5a.jpeg'],
    'panel-board-5b': ['/images/5. Panel Board/5b.jpeg'],
    'panel-board-5c': ['/images/5. Panel Board/5c1.jpeg'],
    'panel-board-5d': ['/images/5. Panel Board/5d.jpeg'],
    'panel-board': [
      '/images/5. Panel Board/5a.jpeg',
      '/images/5. Panel Board/5b.jpeg',
      '/images/5. Panel Board/5b2.jpeg',
      '/images/5. Panel Board/5c1.jpeg',
      '/images/5. Panel Board/5c2.jpeg',
      '/images/5. Panel Board/5c3.jpeg',
      '/images/5. Panel Board/5d.jpeg',
    ],
    
    // Category 6: Garage Equipment variants
    'garage-equipment-6a': ['/images/6. Garage Equipment/6a.jpeg'],
    'garage-equipment-6b': ['/images/6. Garage Equipment/6b.jpeg'],
    'garage-equipment-6c': ['/images/6. Garage Equipment/6c.jpeg'],
    'garage-equipment': [
      '/images/6. Garage Equipment/6a.jpeg',
      '/images/6. Garage Equipment/6b.jpeg',
      '/images/6. Garage Equipment/6c.jpeg',
    ],
  };

  return imageMap[productId] || ['/images/placeholder.svg'];
};


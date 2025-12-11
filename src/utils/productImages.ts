// Helper function to get all images for a product from their folder
export const getProductImages = (productId: string): string[] => {
  // Map product IDs to their specific images
  // For variant products, return the specific image, otherwise return all images from the category
  const imageMap: Record<string, string[]> = {
    // Category 1: Digital Tyre Inflator variants
    "digital-tyre-inflator-1a": [
      "/images/highres/1. Digital Tyre Inflator/1A.jpg",
    ],
    "digital-tyre-inflator-1b": [
      "/images/highres/1. Digital Tyre Inflator/1B.jpg",
    ],
    "digital-tyre-inflator-1c": [
      "/images/highres/1. Digital Tyre Inflator/1C.jpg",
    ],
    "digital-tyre-inflator-1d": [
      "/images/highres/1. Digital Tyre Inflator/1D.jpg",
    ],
    "digital-tyre-inflator-1e": [
      "/images/highres/1. Digital Tyre Inflator/1E.jpg",
    ],
    "digital-tyre-inflator-1f": [
      "/images/highres/1. Digital Tyre Inflator/1F.jpg",
    ],
    "digital-tyre-inflator-1g": [
      "/images/highres/1. Digital Tyre Inflator/1G.jpg",
    ],
    "digital-tyre-inflator-1h": [
      "/images/highres/1. Digital Tyre Inflator/1H.jpg",
    ],
    "digital-tyre-inflator-1i": [
      "/images/highres/1. Digital Tyre Inflator/1I.jpg",
    ],
    "digital-tyre-inflator-1j": [
      "/images/highres/1. Digital Tyre Inflator/1J.jpg",
    ],
    "digital-tyre-inflator-1k": [
      "/images/highres/1. Digital Tyre Inflator/1K.jpg",
    ],
    "digital-tyre-inflator-1l": [
      "/images/highres/1. Digital Tyre Inflator/1L.jpg",
    ],
    "digital-tyre-inflator": [
      "/images/highres/1. Digital Tyre Inflator/1A.jpg",
      "/images/highres/1. Digital Tyre Inflator/1B.jpg",
      "/images/highres/1. Digital Tyre Inflator/1C.jpg",
      "/images/highres/1. Digital Tyre Inflator/1D.jpg",
      "/images/highres/1. Digital Tyre Inflator/1E.jpg",
      "/images/highres/1. Digital Tyre Inflator/1F.jpg",
      "/images/highres/1. Digital Tyre Inflator/1G.jpg",
      "/images/highres/1. Digital Tyre Inflator/1H.jpg",
      "/images/highres/1. Digital Tyre Inflator/1I.jpg",
      "/images/highres/1. Digital Tyre Inflator/1J.jpg",
      "/images/highres/1. Digital Tyre Inflator/1K.jpg",
      "/images/highres/1. Digital Tyre Inflator/1L.jpg",
    ],

    // Category 2: Digital Nitrogen Tyre Inflator variants
    "digital-nitrogen-tyre-inflator-2a": [
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2A.jpg",
    ],
    "digital-nitrogen-tyre-inflator-2c": [
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2C.jpg",
    ],
    "digital-nitrogen-tyre-inflator-2d": [
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2D.jpg",
    ],
    "digital-nitrogen-tyre-inflator-2e": [
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2E.jpg",
    ],
    "digital-nitrogen-tyre-inflator-2f": [
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2F.jpg",
    ],
    "digital-nitrogen-tyre-inflator": [
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2A.jpg",
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2B.jpg",
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2C.jpg",
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2D.jpg",
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2E.jpg",
      "/images/highres/2. Digital Nitrogen Tyre Inflator/2F.jpg",
    ],

    // Category 3: Air Compressor variants
    "air-compressor-ic109": ["/images/highres/3. Air Compressor/IC-109.jpg"],
    "air-compressor-ic209": ["/images/highres/3. Air Compressor/IC-209.jpg"],
    "air-compressor-ic312": ["/images/highres/3. Air Compressor/IC-312.jpg"],
    "air-compressor-ic512": ["/images/highres/3. Air Compressor/IC-512.jpg"],
    "air-compressor-ic1012": ["/images/highres/3. Air Compressor/IC-1012.jpg"],
    "air-compressor": [
      "/images/highres/3. Air Compressor/3A.jpg",
      "/images/highres/3. Air Compressor/3B.jpg",
    ],

    // Category 4: Nitrogen Generator
    "nitrogen-generator-4a": ["/images/highres/Nitrogen Generator/4A.jpg"],
    "nitrogen-generator": ["/images/highres/Nitrogen Generator/4A.jpg"],

    // Category 5: Panel Board variants
    "panel-board-5a": ["/images/highres/5. Panel Board/5A.jpg"],
    "panel-board-5b": ["/images/highres/5. Panel Board/5B.jpg"],
    "panel-board-5c": ["/images/highres/5. Panel Board/5C1.jpg"],
    "panel-board-5d": ["/images/highres/5. Panel Board/5D.jpg"],
    "panel-board": [
      "/images/highres/5. Panel Board/5A.jpg",
      "/images/highres/5. Panel Board/5B.jpg",
      "/images/highres/5. Panel Board/5B2.jpeg",
      "/images/highres/5. Panel Board/5C1.jpg",
      "/images/highres/5. Panel Board/5C2.jpg",
      "/images/highres/5. Panel Board/5C3.jpg",
      "/images/highres/5. Panel Board/5D.jpg",
    ],

    // Category 6: Garage Equipment variants
    "garage-equipment-6a": ["/images/highres/6. Garage Equipment/6A.jpg"],
    "garage-equipment-6b": ["/images/highres/6. Garage Equipment/6B.jpg"],
    "garage-equipment-6c": ["/images/highres/6. Garage Equipment/6C.jpg"],
    "garage-equipment": [
      "/images/highres/6. Garage Equipment/6A.jpg",
      "/images/highres/6. Garage Equipment/6B.jpg",
      "/images/highres/6. Garage Equipment/6C.jpg",
    ],
  };

  return imageMap[productId] || ['/images/placeholder.svg'];
};


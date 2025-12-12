// Helper function to get all images for a product from their folder
export const getProductImages = (productId: string): string[] => {
  const imageMap: Record<string, string[]> = {
    // 1. Digital Nitrogen Tyre Inflator
    "digital-nitrogen-tyre-inflator": [
      "/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-lcv-h.jpg", // Setting a good default/first image
      "/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-hmv-c.jpg",
      "/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-hmv.jpg",
      "/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-lcv-p.jpg",
      "/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-2000-lcv-p.jpg",
      "/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-6000-lcv-4h.jpg",
    ],
    // Models
    "nitrojet-1000-hmv-c": ["/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-hmv-c.jpg"],
    "nitrojet-1000-hmv": ["/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-hmv.jpg"],
    "nitrojet-1000-lcv-h": ["/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-lcv-h.jpg"],
    "nitrojet-1000-lcv-p": ["/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-1000-lcv-p.jpg"],
    "nitrojet-2000-lcv-p": ["/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-2000-lcv-p.jpg"],
    "nitrojet-6000-lcv-4h": ["/images/highres/Digital Nitrogen Tyre Inflator/nitrojet-6000-lcv-4h.jpg"],

    // 2. Digital Tyre Inflator
    "digital-tyre-inflator": [
      "/images/highres/Digital Tyre Inflator/airojet-1000-lcv-w.jpg",
      "/images/highres/Digital Tyre Inflator/airojet-2000-lcv-w.jpg",
      "/images/highres/Digital Tyre Inflator/airojet-6000-lcv-w.jpg",
    ],
    // Models
    "airojet-1000-lcv-w": ["/images/highres/Digital Tyre Inflator/airojet-1000-lcv-w.jpg"],
    "airojet-2000-lcv-w": ["/images/highres/Digital Tyre Inflator/airojet-2000-lcv-w.jpg"],
    "airojet-6000-lcv-w": ["/images/highres/Digital Tyre Inflator/airojet-6000-lcv-w.jpg"],

    // 3. Nitrogen Generator
    "nitrogen-generator": ["/images/highres/Nitrogen Generator/nitrogen-generator.jpg"],

    // 4. Air Compressor
    "air-compressor": [
      "/images/highres/Air Compressor/ic-209.jpg",
      "/images/highres/Air Compressor/ic-109.jpg",
    ],
    // Models
    "ic-109": ["/images/highres/Air Compressor/ic-109.jpg"],
    "ic-209": ["/images/highres/Air Compressor/ic-209.jpg"],

    // 5. Digital DEF / AdBlue Dispenser
    "digital-def-adblue-dispenser": [
      "/images/highres/Digital DEF/adu-501-indianoil.png",
      "/images/highres/Digital DEF/adu-501-bpcl.png",
      "/images/highres/Digital DEF/adu-501-hp.png",
    ],
    // Models
    "adu-501-bpcl": ["/images/highres/Digital DEF/adu-501-bpcl.png"],
    "adu-501-hp": ["/images/highres/Digital DEF/adu-501-hp.png"],
    "adu-501-indianoil": ["/images/highres/Digital DEF/adu-501-indianoil.png"],

    // 6. Digital Engine Oil Dispenser
    "digital-engine-oil-dispenser": ["/images/highres/Digital Engine Oil Dispenser/digital-engine-oil-dispenser.png"],

    // 7. Digital Tyre Inflator Pedestal
    "digital-tyre-inflator-pedestal": [
      "/images/highres/Digital Tyre Inflator Pedestal/airojet-1000-lcv-p.jpg",
      "/images/highres/Digital Tyre Inflator Pedestal/airojet-1000-lcv-hp.jpg",
      "/images/highres/Digital Tyre Inflator Pedestal/airojet-6000-lcv-p.jpg",
      "/images/highres/Digital Tyre Inflator Pedestal/airojet-6000-lcv-hp.jpg",
    ],
    // Models
    "airojet-1000-lcv-hp": ["/images/highres/Digital Tyre Inflator Pedestal/airojet-1000-lcv-hp.jpg"],
    "airojet-1000-lcv-p": ["/images/highres/Digital Tyre Inflator Pedestal/airojet-1000-lcv-p.jpg"],
    "airojet-6000-lcv-hp": ["/images/highres/Digital Tyre Inflator Pedestal/airojet-6000-lcv-hp.jpg"],
    "airojet-6000-lcv-p": ["/images/highres/Digital Tyre Inflator Pedestal/airojet-6000-lcv-p.jpg"],

    // 8. Engine Oil Changer
    "engine-oil-changer": ["/images/highres/Engine Oil Changer/engine-oil-changer.png"],

    // 9. Garage Equipment
    "garage-equipment": [
      "/images/highres/Garage Equipment/two-wheeler-ramp.jpg",
      "/images/highres/Garage Equipment/pneumatic-grease-pump.jpg",
      "/images/highres/Garage Equipment/manual-2t-oil-dispenser.jpg",
    ],
    // Models
    "manual-2t-oil-dispenser": ["/images/highres/Garage Equipment/manual-2t-oil-dispenser.jpg"],
    "pneumatic-grease-pump": ["/images/highres/Garage Equipment/pneumatic-grease-pump.jpg"],
    "two-wheeler-ramp": ["/images/highres/Garage Equipment/two-wheeler-ramp.jpg"],

    // 10. Panel Board
    "panel-board": [
      "/images/highres/Panel Board/plc-control-panel.jpg",
      "/images/highres/Panel Board/automatic-power-factor-control-panel.jpg",
      "/images/highres/Panel Board/electrical-control-panel.jpeg",
      "/images/highres/Panel Board/5C1.jpg",
      "/images/highres/Panel Board/5C2.jpg",
      "/images/highres/Panel Board/5C3.jpg",
      "/images/highres/Panel Board/5D.jpg",
    ],
    // Models
    "5c1": ["/images/highres/Panel Board/5C1.jpg"],
    "5c2": ["/images/highres/Panel Board/5C2.jpg"],
    "5c3": ["/images/highres/Panel Board/5C3.jpg"],
    "5d": ["/images/highres/Panel Board/5D.jpg"],
    "automatic-power-factor-control-panel": ["/images/highres/Panel Board/automatic-power-factor-control-panel.jpg"],
    "electrical-control-panel": ["/images/highres/Panel Board/electrical-control-panel.jpeg"],
    "plc-control-panel": ["/images/highres/Panel Board/plc-control-panel.jpg"],
  };

  // Check for direct match
  if (imageMap[productId]) {
    return imageMap[productId];
  }

  // Fallback: Try to find a partial match or handle slugified versions if needed
  // For now, return placeholder if no match
  return ['/images/placeholder.svg'];
};

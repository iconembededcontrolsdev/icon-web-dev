/**
 * Script to duplicate images in model arrays for testing thumbnail gallery
 * Each model's image will be repeated twice so we can see the thumbnail gallery in action
 */

const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../public/content/products.json");

function duplicateModelImages() {
  try {
    // Read the products JSON
    const data = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    // Process each product
    data.products.forEach((product) => {
      if (product.models && Array.isArray(product.models)) {
        // Process each model
        product.models.forEach((model) => {
          if (
            model.images &&
            Array.isArray(model.images) &&
            model.images.length > 0
          ) {
            // Duplicate each image in the array
            const originalImages = [...model.images];
            model.images = [];
            originalImages.forEach((img) => {
              model.images.push(img);
              model.images.push(img); // Duplicate for gallery testing
            });
            console.log(`✓ Duplicated images for model: ${model.model}`);
          } else if (model.image) {
            // If only single image, create array with duplicates
            model.images = [model.image, model.image];
            console.log(`✓ Created image array for model: ${model.model}`);
          }
        });
      }
    });

    // Write back to file
    fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
    console.log(
      "\n✓ Successfully updated products.json with duplicated model images"
    );
  } catch (error) {
    console.error("Error updating products.json:", error.message);
    process.exit(1);
  }
}

duplicateModelImages();

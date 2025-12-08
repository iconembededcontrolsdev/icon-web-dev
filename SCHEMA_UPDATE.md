# Product Schema Update - Model-Specific Data

## Overview
Updated the product schema to support model-specific specifications, features, and applications across **ALL product categories**. This allows each product model to have its own unique set of data instead of sharing category-level data.

## Schema Changes

### Previous Schema (Category-Level Only)
```json
{
  "id": "air-compressor",
  "title": "Air Compressor",
  "features": [...],
  "specifications": {...},
  "applications": [...],
  "models": [
    {
      "model": "IC-109",
      "specifications": {...}  // Only basic specs
    }
  ]
}
```

### New Schema (Model-Specific Support)
```json
{
  "id": "air-compressor",
  "title": "Air Compressor",
  "features": [...],           // Category-level fallback
  "specifications": {...},     // Category-level fallback
  "applications": [...],       // Category-level fallback
  "models": [
    {
      "model": "IC-109",
      "description": "...",
      "subtitle": "...",
      "fullDescription": "...",
      "features": [...],       // Model-specific features
      "specifications": {...}, // Model-specific specifications
      "applications": [...],   // Model-specific applications
      "images": [...]          // Model-specific images
    }
  ]
}
```

## Model Fields

Each model can now have the following fields:

- **model** (required): Model identifier (e.g., "IC-109", "AIROJET 1000 LCV W")
- **type**: Model type/variant
- **description**: Short description
- **subtitle**: Subtitle for the model
- **fullDescription**: Detailed description
- **features**: Array of feature strings
- **specifications**: Object with specification key-value pairs
- **applications**: Array of application strings
- **image**: Single image path (legacy support)
- **images**: Array of image paths

## Data Priority

The application now uses the following priority when displaying data:

1. **Model-specific data** (if available)
2. **Category-level data** (fallback)

This applies to:
- Features
- Specifications
- Applications
- Images

## Products Updated

### 1. Digital Tyre Inflator (7 models)
- **AIROJET 1000 LCV W** - Wall Mountable - Normal
- **AIROJET 6000 LCV W** - Wall Mountable - Heavy
- **AIROJET 2000 LCV W** - Wall Mountable - LED
- **AIROJET 1000 LCV P** - Pedestal - Normal (IOCL/BPCL)
- **AIROJET 1000 LCV HP** - HPCL Pedestal - Normal
- **AIROJET 6000 LCV P** - Pedestal - Heavy (IOCL/BPCL)
- **AIROJET 6000 LCV HP** - HPCL Pedestal - Heavy

Each model has unique:
- Features (11-14 items per model)
- Specifications (different pressure ranges, displays, dimensions)
- Applications (tailored to model type)
- Images (model-specific photos)

### 2. Air Compressor (5 models)
- **IC-109** - 1 HP Single Stage
- **IC-209** - 2 HP Single Stage
- **IC-312** - 3 HP Two Stage
- **IC-512** - 5 HP Two Stage
- **IC-1012** - 10 HP Two Stage

Each model has unique:
- Features (9 items per model)
- Complete specifications (14 fields including rotation direction)
- Specific applications (4-5 items)
- Dedicated image path

### 3. Garage Equipment (3 models)
- **Two Wheeler Ramp** - Hydraulic Lift
- **Pneumatic Grease Pump** - Grease Dispensing Equipment
- **Manual 2T Oil Dispenser** - Oil Dispensing Equipment

Each model has unique:
- Features (4-7 items per model)
- Specifications (capacity, dimensions, operation type)
- Applications (3 items per model)
- Model-specific images

### 4. Panel Boards (3 models)
- **PLC Control Panel** - Automation Panel
- **Automatic Power Factor Control Panel** - APFC Panel
- **Electrical Control Panel** - Control Panel

Each model has unique:
- Features (4-10 items per model)
- Specifications (panel type, function, benefits)
- Applications (3-5 items per model)
- Model-specific images

### 5. Nitrogen Generator
- Single product (NITROJET)
- Already has category-level specifications and features
- No models array needed (single product variant)

## Files Updated

### 1. `public/content/products.json`
- Updated **Digital Tyre Inflator** models (7 models with complete data)
- Updated **Air Compressor** models (5 models with complete data)
- Added **Garage Equipment** models array (3 models)
- Added **Panel Boards** models array (3 models)
- Maintained backward compatibility with category-level data

### 2. `src/app/products/[id]/page.tsx`
- Updated `ProductModel` TypeScript type to include all model-specific fields
- Updated modal image display to prioritize model images
- Updated applications display to prioritize model applications
- Updated features display to prioritize model features
- Updated model card image display

## Benefits

1. **Flexibility**: Each model can have unique specifications and features
2. **Accuracy**: Model-specific data is more precise than category-level data
3. **Backward Compatibility**: Falls back to category-level data if model-specific data is not available
4. **Scalability**: Easy to add new models with their own unique data
5. **Consistency**: All product categories now follow the same schema pattern

## Statistics

- **Total Products**: 5 categories
- **Total Models**: 18 models with complete model-specific data
- **Data Points**: Each model has 4-14 specifications, 4-14 features, and 3-9 applications
- **Images**: Each model has dedicated image paths

## Migration Notes

To add model-specific data for other products:

1. Add the desired fields to the model object in `products.json`
2. The UI will automatically use model-specific data when available
3. Category-level data will still be used as fallback
4. No code changes required - the schema is flexible

## Testing

Test the following scenarios:
1. ✅ View Digital Tyre Inflator category page - should show all 7 models
2. ✅ Click on AIROJET 1000 LCV W model - modal should show model-specific features and specs
3. ✅ View Air Compressor category page - should show all 5 models
4. ✅ Click on IC-109 model - modal should show IC-109 specific features and specs
5. ✅ View Garage Equipment category page - should show all 3 equipment types
6. ✅ View Panel Boards category page - should show all 3 panel types
7. ✅ Check applications section - should show model-specific applications
8. ✅ Verify images are model-specific
9. ✅ Test other products to ensure backward compatibility
10. ✅ Build completed successfully with no errors


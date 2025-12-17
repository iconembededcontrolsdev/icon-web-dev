// SEO Metadata Generator for Products
// This utility helps retrieve SEO metadata from products.json

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export interface ModelSEO {
  title: string;
  description: string;
  keywords: string[];
}

export function generateProductMetadata(product: any): ProductSEO {
  // If product has seo field, use it; otherwise generate from product data
  if (product.seo) {
    return product.seo;
  }

  // Auto-generate from product data
  const keywords = [
    product.title,
    ...(product.features?.slice(0, 5) || []),
    ...(product.applications?.slice(0, 3) || []),
  ].filter(Boolean);

  return {
    title: `${product.title} - Icon Embeded Controls`,
    description: product.subtitle || product.description || '',
    keywords,
    ogTitle: product.title,
    ogDescription: product.subtitle || product.description || '',
    ogImage: product.mainImage || product.images?.[0] || '',
  };
}

export function generateModelMetadata(model: any, productTitle: string): ModelSEO {
  // If model has seo field, use it; otherwise generate from model data
  if (model.seo) {
    return model.seo;
  }

  // Auto-generate from model data
  const keywords = [
    model.model,
    productTitle,
    model.type,
    ...(model.features?.slice(0, 3) || []),
  ].filter(Boolean);

  return {
    title: `${model.model} - ${productTitle} - Icon Embeded Controls`,
    description: model.subtitle || model.description || '',
    keywords,
  };
}

export function getProductSEOById(productId: string, productsData: any): ProductSEO | null {
  const product = productsData.products?.find((p: any) => p.id === productId);
  if (!product) return null;

  return generateProductMetadata(product);
}

export function getModelSEO(productId: string, modelId: string, productsData: any): ModelSEO | null {
  const product = productsData.products?.find((p: any) => p.id === productId);
  if (!product) return null;

  const model = product.models?.find((m: any) =>
    m.model === modelId || m.model.toLowerCase().replace(/\s+/g, '-') === modelId
  );

  if (!model) return null;

  return generateModelMetadata(model, product.title);
}

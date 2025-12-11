import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import ProductDetailsClient, { ProductData } from '@/components/ProductDetailsClient';
import StructuredData from '@/components/StructuredData';
import { generateProductSchema } from '@/utils/seo';

async function getProducts(): Promise<ProductData[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'content', 'products.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = await JSON.parse(fileContent);
    return data.products || [];
  } catch (error) {
    console.error('Error reading products.json:', error);
    return [];
  }
}

async function getProduct(id: string): Promise<ProductData | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: 'Product Not Found | Icon Embedded Controls',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title} | Icon Embedded Controls`,
    description: product.description || `Learn more about ${product.title} from Icon Embedded Controls.`,
    openGraph: {
      title: `${product.title} | Icon Embedded Controls`,
      description: product.description || `Learn more about ${product.title} from Icon Embedded Controls.`,
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    return <ProductDetailsClient initialProduct={null} />;
  }

  // Generate structured data for this product
  const productSchema = generateProductSchema({
    name: product.title,
    description: product.description || '',
    image: product.images?.[0] || '',
    brand: 'Icon Embedded Controls',
    // offers logic could be here if prices existed
  });

  return (
    <>
      <StructuredData data={productSchema} />
      <ProductDetailsClient initialProduct={product} />
    </>
  );
}

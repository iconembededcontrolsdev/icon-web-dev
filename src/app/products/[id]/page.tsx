import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import Link from "next/link";
import ProductDetailsClient, {
  ProductData,
} from "@/components/ProductDetailsClient";
import StructuredData from "@/components/StructuredData";
import { generateProductSchema } from "@/utils/seo";

async function getProducts(): Promise<ProductData[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "content",
      "products.json"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = await JSON.parse(fileContent);
    return data.products || [];
  } catch (error) {
    return [];
  }
}

async function getProduct(id: string): Promise<ProductData | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",
      images: product.images ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Product not found
          </h2>
          <Link href="/products" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductDetailsClient initialProduct={product} />
    </>
  );
}

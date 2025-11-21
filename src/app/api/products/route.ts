import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read from the consolidated products.json file
    const productsFilePath = path.join(process.cwd(), 'public', 'content', 'products.json');
    
    if (!fs.existsSync(productsFilePath)) {
      console.error('products.json not found');
      return NextResponse.json({ products: [] });
    }

    const fileContent = fs.readFileSync(productsFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Return the full products array
    return NextResponse.json({ products: data.products || [] });
  } catch (error) {
    console.error('Error reading products.json:', error);
    
    return NextResponse.json(
      { error: 'Failed to read products', products: [] },
      { status: 500 }
    );
  }
}


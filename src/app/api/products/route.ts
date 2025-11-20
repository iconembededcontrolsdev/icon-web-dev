import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const productsDirectory = path.join(process.cwd(), 'public', 'content', 'products');
    
    // Check if directory exists
    if (!fs.existsSync(productsDirectory)) {
      // Fallback: try to read from index.json
      const indexPath = path.join(productsDirectory, 'index.json');
      if (fs.existsSync(indexPath)) {
        const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        return NextResponse.json({ products: indexData.products || [] });
      }
      return NextResponse.json({ products: [] });
    }

    // Read all files in the products directory
    const files = fs.readdirSync(productsDirectory);
    
    // Filter only JSON files (excluding index.json) and extract product IDs
    const productIds = files
      .filter(file => file.endsWith('.json') && file !== 'index.json')
      .map(file => file.replace('.json', ''))
      .sort(); // Sort alphabetically for consistent ordering

    return NextResponse.json({ products: productIds });
  } catch (error) {
    console.error('Error reading products directory:', error);
    
    // Fallback: try to read from index.json
    try {
      const productsDirectory = path.join(process.cwd(), 'public', 'content', 'products');
      const indexPath = path.join(productsDirectory, 'index.json');
      if (fs.existsSync(indexPath)) {
        const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        return NextResponse.json({ products: indexData.products || [] });
      }
    } catch (fallbackError) {
      console.error('Error reading index.json fallback:', fallbackError);
    }
    
    return NextResponse.json(
      { error: 'Failed to read products directory', products: [] },
      { status: 500 }
    );
  }
}


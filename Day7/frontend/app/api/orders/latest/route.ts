import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    // Path to orders.json in backend directory
    const ordersPath = join(process.cwd(), '..', 'backend', 'orders.json');
    
    const fileContent = await readFile(ordersPath, 'utf-8');
    const orders = JSON.parse(fileContent);

    if (!orders || orders.length === 0) {
      return NextResponse.json({ order: null });
    }

    // Return the last order
    const lastOrder = orders[orders.length - 1];
    
    return NextResponse.json({ order: lastOrder });
  } catch (error) {
    console.error('Error reading orders:', error);
    return NextResponse.json({ order: null });
  }
}

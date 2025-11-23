import { NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const ordersDir = join(process.cwd(), '..', 'backend', 'orders');
    
    // Get all order files
    const files = await readdir(ordersDir);
    const orderFiles = files.filter(f => f.startsWith('order_') && f.endsWith('.json'));
    
    if (orderFiles.length === 0) {
      return NextResponse.json({ order: null, orderId: null });
    }
    
    // Sort by filename (which includes timestamp) to get the latest
    orderFiles.sort().reverse();
    const latestFile = orderFiles[0];
    const orderId = latestFile.replace('.json', '');
    
    // Read the order data
    const orderPath = join(ordersDir, latestFile);
    const orderData = await readFile(orderPath, 'utf-8');
    const order = JSON.parse(orderData);
    
    return NextResponse.json({ 
      order, 
      orderId,
      timestamp: order.timestamp 
    });
  } catch (error) {
    console.error('Error reading latest order:', error);
    return NextResponse.json({ order: null, orderId: null });
  }
}

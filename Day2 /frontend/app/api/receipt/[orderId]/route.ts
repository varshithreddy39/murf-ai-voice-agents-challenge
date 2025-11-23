import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId;
    
    // Path to backend orders directory
    const orderPath = join(process.cwd(), '..', 'backend', 'orders', `${orderId}.json`);
    
    const orderData = await readFile(orderPath, 'utf-8');
    const order = JSON.parse(orderData);
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error reading order:', error);
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    );
  }
}

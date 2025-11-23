import { notFound } from 'next/navigation';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { ReceiptView } from '@/components/app/receipt-view';

interface OrderData {
  drinkType: string;
  size: string;
  milk: string;
  extras: string[];
  name: string;
  timestamp: string;
  status: string;
}

async function getOrder(orderId: string): Promise<OrderData | null> {
  try {
    const orderPath = join(process.cwd(), '..', 'backend', 'orders', `${orderId}.json`);
    const orderData = await readFile(orderPath, 'utf-8');
    return JSON.parse(orderData);
  } catch (error) {
    return null;
  }
}

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return <ReceiptView order={order} orderId={orderId} />;
}

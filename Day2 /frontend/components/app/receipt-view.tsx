'use client';

import { useRouter } from 'next/navigation';
import { Coffee, Check, ArrowLeft, Printer, X } from '@phosphor-icons/react';
import { Button } from '@/components/livekit/button';
import { cn } from '@/lib/utils';

interface OrderData {
  drinkType: string;
  size: string;
  milk: string;
  extras: string[];
  name: string;
  timestamp: string;
  status: string;
}

interface ReceiptViewProps {
  order: OrderData;
  orderId: string;
}

// Generate sequential order number from timestamp
function getOrderNumber(orderId: string): string {
  // Extract time from orderId (e.g., order_20251123_162138_Name)
  const parts = orderId.split('_');
  if (parts.length >= 3) {
    const time = parts[2]; // HHMMSS format
    // Convert to simple sequential number (last 3 digits)
    const num = parseInt(time.slice(-3));
    return String(num).padStart(3, '0');
  }
  return '001';
}

export function ReceiptView({ order, orderId }: ReceiptViewProps) {
  const router = useRouter();
  
  const orderNumber = getOrderNumber(orderId);
  
  // Format timestamp
  const orderDate = new Date(order.timestamp);
  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header Actions - Hidden on print */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackHome}
            className="gap-2 hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="size-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Receipt Container */}
      <div className="mx-auto max-w-xl px-4 py-20 print:max-w-full print:py-4">
        {/* Main Receipt Card */}
        <div className="bg-card relative overflow-hidden rounded-3xl shadow-2xl print:rounded-none print:shadow-none">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>

          {/* Header */}
          <div className="relative border-b-2 border-dashed border-border/50 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-muted/10 px-6 py-6 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-muted/10 print:py-4">
            <div className="mb-5 flex items-center justify-center gap-3 print:mb-3">
              <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 print:size-10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
                <Coffee className="relative size-7 text-white print:size-5" weight="fill" />
              </div>
              <div className="text-center">
                <h1 className="text-foreground mb-0.5 text-2xl font-black tracking-tight print:text-xl">Byte & Brew</h1>
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest print:text-[10px]">Cafe & Coffee Shop</p>
              </div>
            </div>
            
            {/* Order Number Badge */}
            <div className="flex justify-center">
              <div className="bg-primary text-primary-foreground relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 shadow-lg print:px-4 print:py-2">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative text-[10px] font-bold uppercase tracking-widest opacity-90">Order Number</span>
                <span className="relative text-2xl font-black tracking-tight print:text-xl">{orderNumber}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="relative space-y-4 p-6 print:space-y-3 print:p-4">
            {/* Date & Time */}
            <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 print:px-3 print:py-2">
              <div>
                <p className="text-muted-foreground mb-0.5 text-[10px] font-medium uppercase tracking-wider">
                  Date
                </p>
                <p className="text-foreground text-xs font-semibold">{formattedDate}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground mb-0.5 text-[10px] font-medium uppercase tracking-wider">
                  Time
                </p>
                <p className="text-foreground text-sm font-bold">{formattedTime}</p>
              </div>
            </div>

            {/* Customer Name */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-border bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-inner dark:from-amber-950/30 dark:to-orange-950/20">
              <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 blur-2xl" />
              <p className="text-muted-foreground relative mb-3 text-xs font-bold uppercase tracking-widest">
                For
              </p>
              <p className="text-foreground relative text-4xl font-black capitalize tracking-tight">{order.name}</p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="border-border h-px flex-1 border-t-2 border-dashed" />
              <Coffee className="text-muted-foreground size-5" weight="fill" />
              <div className="border-border h-px flex-1 border-t-2 border-dashed" />
            </div>

            {/* Order Details */}
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                <span className="bg-primary/10 text-primary rounded-lg px-3 py-1">Your Order</span>
              </h2>

              <div className="space-y-4 rounded-3xl border-2 border-border bg-gradient-to-br from-muted/30 to-muted/10 p-8 shadow-inner">
                {/* Main Drink */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-foreground mb-3 text-2xl font-black capitalize leading-tight">
                      {order.size} {order.drinkType}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-2.5 text-base capitalize">
                      <span className="size-2 rounded-full bg-amber-500" />
                      {order.milk}
                    </p>
                  </div>
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
                    <Coffee className="size-8 text-white" weight="fill" />
                  </div>
                </div>

                {/* Extras */}
                {order.extras && order.extras.length > 0 && (
                  <div className="border-border border-t-2 border-dashed pt-4">
                    <p className="text-muted-foreground mb-3 text-xs font-bold uppercase tracking-wider">
                      Add-ons
                    </p>
                    <div className="space-y-2">
                      {order.extras.map((extra, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="bg-primary size-2 rounded-full" />
                          <span className="text-foreground capitalize">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Success Message */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-green-500/30 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-10 text-center shadow-inner dark:from-green-950/40 dark:via-emerald-950/30 dark:to-teal-950/20">
              <div className="absolute left-1/2 top-0 size-64 -translate-x-1/2 -translate-y-32 rounded-full bg-gradient-to-b from-green-400/20 to-transparent blur-3xl" />
              <div className="relative z-10">
                <div className="mx-auto mb-5 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-500/50">
                  <Check className="size-12 text-white" weight="bold" />
                </div>
                <h3 className="mb-3 text-3xl font-black text-green-700 dark:text-green-400">
                  Order Confirmed!
                </h3>
                <p className="text-lg font-medium text-green-600 dark:text-green-500">
                  Your drink will be ready shortly
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-border space-y-3 border-t-2 border-dashed pt-6 text-center">
              <p className="text-foreground text-base font-semibold">
                Thank you for choosing Byte & Brew Cafe!
              </p>
              <p className="text-muted-foreground text-sm">
                We'll call your name when your order is ready
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Coffee className="text-primary size-5" weight="fill" />
                <span className="text-muted-foreground text-xs">Enjoy your coffee!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions - Hidden on print */}
        <div className="print:hidden mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" size="lg" onClick={handleBackHome} className="gap-2">
            <ArrowLeft className="size-4" />
            Place Another Order
          </Button>
          <Button variant="default" size="lg" onClick={handlePrint} className="gap-2">
            <Printer className="size-4" />
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Download, CheckCircle } from '@phosphor-icons/react';
import type { CartItem } from './cart-drawer';

export interface LastOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  total: number;
}

interface OrderReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: LastOrder | null;
}

export function OrderReceiptModal({ isOpen, onClose, order }: OrderReceiptModalProps) {
  const handleDownloadJSON = () => {
    if (!order) return;

    const dataStr = JSON.stringify(order, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${order.orderId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-2xl bg-neutral-900 shadow-2xl border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X size={24} weight="bold" />
              </button>

              {/* Content */}
              <div className="p-6">
                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-500/10 p-3">
                    <CheckCircle size={48} weight="fill" className="text-green-500" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold text-white mb-2">
                  Order Placed Successfully!
                </h2>

                {/* Order Details */}
                <div className="space-y-4 mt-6">
                  <div className="rounded-lg bg-neutral-800/50 p-4 border border-neutral-700/50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-neutral-400">Order ID:</div>
                      <div className="text-right font-mono text-white">{order.orderId}</div>
                      <div className="text-neutral-400">Time:</div>
                      <div className="text-right text-white">
                        {new Date(order.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-400 mb-2">Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm rounded-lg bg-neutral-800/30 px-3 py-2"
                        >
                          <span className="text-white">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold text-green-400">
                            ₹{(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-green-400">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleDownloadJSON}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-neutral-800 px-4 py-3 font-semibold text-white transition-colors hover:bg-neutral-700"
                  >
                    <Download size={20} weight="bold" />
                    Download JSON
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

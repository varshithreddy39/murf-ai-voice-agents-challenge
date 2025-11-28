'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export function CartDrawer({ isOpen, onClose, items }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-neutral-900 shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Current Cart</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <X size={24} weight="bold" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-neutral-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg bg-neutral-800/50 p-4 border border-neutral-700/50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-white">{item.name}</h3>
                            <p className="text-sm text-neutral-400 mt-1">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-400">
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </p>
                            <p className="text-xs text-neutral-500">₹{item.price} each</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-neutral-800 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">Subtotal</span>
                    <span className="text-2xl font-bold text-green-400">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion } from 'motion/react';

interface CartStatusWidgetProps {
  itemCount: number;
  total: number;
  onClick: () => void;
}

export function CartStatusWidget({ itemCount, total, onClick }: CartStatusWidgetProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-40 rounded-2xl bg-neutral-900/80 border border-green-500/40 px-4 py-3 shadow-lg backdrop-blur-sm transition-all hover:border-green-500/60 md:bottom-32 md:right-12"
    >
      <div className="text-left">
        <div className="text-xs font-semibold text-green-400 mb-1">Cart</div>
        <div className="text-sm text-white">
          <div>Items: {itemCount}</div>
          <div className="font-semibold">Total: ₹{total.toFixed(2)}</div>
        </div>
      </div>
    </motion.button>
  );
}

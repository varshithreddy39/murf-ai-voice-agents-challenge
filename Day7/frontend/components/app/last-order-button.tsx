'use client';

import { motion } from 'motion/react';
import { Receipt } from '@phosphor-icons/react';

interface LastOrderButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function LastOrderButton({ onClick, disabled = false }: LastOrderButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className="fixed bottom-24 left-6 z-40 flex items-center gap-2 rounded-2xl bg-neutral-900/80 border border-neutral-700/40 px-4 py-3 shadow-lg backdrop-blur-sm transition-all hover:border-neutral-600/60 disabled:opacity-50 disabled:cursor-not-allowed md:bottom-32 md:left-12"
      title={disabled ? 'No orders yet' : 'View last order'}
    >
      <Receipt size={20} weight="bold" className="text-neutral-400" />
      <span className="text-sm font-medium text-white">View Last Order</span>
    </motion.button>
  );
}

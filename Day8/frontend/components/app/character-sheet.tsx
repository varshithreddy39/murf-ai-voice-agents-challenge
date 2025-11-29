'use client';

import { Heart, Sword, Brain, Clover, Backpack } from '@phosphor-icons/react';
import { motion } from 'motion/react';

interface CharacterSheetProps {
  character?: {
    name: string;
    class: string;
    hp: number;
    max_hp: number;
    status: string;
    stats: {
      strength: number;
      intelligence: number;
      luck: number;
    };
    inventory: Array<{ name: string; description?: string }>;
    gold: number;
  };
}

export function CharacterSheet({ character }: CharacterSheetProps) {
  if (!character) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel rounded-2xl p-6 border-glow-cyan"
      >
        <h3 className="mb-3 text-lg font-gaming-display text-cyan-400">CHARACTER SHEET</h3>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="spinner-gaming"
          />
          <p className="text-sm font-gaming-body text-gray-400">Awaiting hero creation...</p>
        </div>
      </motion.div>
    );
  }

  const hpPercent = (character.hp / character.max_hp) * 100;
  const hpColor =
    hpPercent > 50 ? 'from-green-500 to-emerald-600' : 
    hpPercent > 25 ? 'from-yellow-500 to-orange-600' : 
    'from-red-500 to-rose-600';

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-2xl p-6 border-glow-cyan space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-gaming-display text-neon-cyan"
          >
            {character.name}
          </motion.h3>
          <p className="text-sm font-gaming-body text-gray-400">{character.class}</p>
        </div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="avatar-glow w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center text-3xl"
        >
          ⚔️
        </motion.div>
      </div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/50"
      >
        <span className="text-xs font-gaming-body text-cyan-300">
          STATUS: {character.status.toUpperCase()}
        </span>
      </motion.div>

      {/* HP Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-gaming-body">
          <span className="flex items-center gap-2 text-red-400">
            <Heart weight="fill" size={20} />
            HEALTH POINTS
          </span>
          <span className="text-white font-gaming-display">
            {character.hp}/{character.max_hp}
          </span>
        </div>
        <div className="relative h-4 overflow-hidden rounded-full bg-black/50 border border-red-500/30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hpPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`stat-bar-fill h-full bg-gradient-to-r ${hpColor} energy-bar`}
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
            }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-panel rounded-xl p-3 text-center border border-orange-500/30 hover:border-orange-500/60 transition-all"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sword className="mx-auto mb-2 text-orange-400" size={24} weight="fill" />
          </motion.div>
          <p className="text-xs font-gaming-body text-gray-400 mb-1">STRENGTH</p>
          <p className="text-2xl font-gaming-display text-neon-yellow">{character.stats.strength}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-panel rounded-xl p-3 text-center border border-blue-500/30 hover:border-blue-500/60 transition-all"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="mx-auto mb-2 text-blue-400" size={24} weight="fill" />
          </motion.div>
          <p className="text-xs font-gaming-body text-gray-400 mb-1">INTELLIGENCE</p>
          <p className="text-2xl font-gaming-display text-neon-cyan">{character.stats.intelligence}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="glass-panel rounded-xl p-3 text-center border border-green-500/30 hover:border-green-500/60 transition-all"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Clover className="mx-auto mb-2 text-green-400" size={24} weight="fill" />
          </motion.div>
          <p className="text-xs font-gaming-body text-gray-400 mb-1">LUCK</p>
          <p className="text-2xl font-gaming-display text-neon-green">{character.stats.luck}</p>
        </motion.div>
      </div>

      {/* Inventory */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-gaming-body text-magenta-400">
          <Backpack size={20} weight="fill" />
          <span>INVENTORY ({character.inventory.length})</span>
        </div>
        <div className="glass-panel max-h-32 overflow-y-auto rounded-xl p-3 border border-magenta-500/30 scanlines">
          {character.inventory.length === 0 ? (
            <p className="text-xs font-gaming-body text-gray-500 text-center py-2">
              No items yet...
            </p>
          ) : (
            <ul className="space-y-2">
              {character.inventory.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 text-xs font-gaming-body text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <span className="text-cyan-500">▸</span>
                  {item.name}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Gold */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="glass-panel rounded-xl p-3 text-center border border-yellow-500/30"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl mb-1"
        >
          💰
        </motion.div>
        <p className="text-2xl font-gaming-display text-neon-yellow">
          {character.gold} GOLD
        </p>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { MapPin, Scroll, Flag, Compass } from '@phosphor-icons/react';
import { motion } from 'motion/react';

interface WorldInfoProps {
  world?: {
    current_location?: { name: string; description?: string };
    locations_visited: string[];
    events: Array<{ description: string; timestamp: string }>;
    quests: Array<{ name: string; description: string; status: string }>;
  };
}

export function WorldInfo({ world }: WorldInfoProps) {
  if (!world) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel rounded-2xl p-6 border-glow-magenta"
      >
        <h3 className="mb-3 text-lg font-gaming-display text-magenta-400">WORLD INFO</h3>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Compass size={48} className="text-magenta-400" weight="fill" />
          </motion.div>
          <p className="text-sm font-gaming-body text-gray-400 text-center">
            Exploring the unknown...
          </p>
        </div>
      </motion.div>
    );
  }

  const activeQuests = world.quests.filter((q) => q.status === 'active');
  const recentEvents = world.events.slice(-5).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {/* Current Location */}
      {world.current_location && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-5 border-glow-cyan"
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin size={24} weight="fill" className="text-cyan-400" />
            </motion.div>
            <span className="text-sm font-gaming-body text-cyan-400">CURRENT LOCATION</span>
          </div>
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-gaming-display text-neon-cyan mb-2"
          >
            {world.current_location.name}
          </motion.h4>
          {world.current_location.description && (
            <p className="text-sm font-gaming-body text-gray-400 leading-relaxed">
              {world.current_location.description}
            </p>
          )}
          
          {/* Location Marker Animation */}
          <div className="mt-3 flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              style={{ boxShadow: '0 0 10px #00ffff' }}
            />
            <span className="text-xs font-gaming-body text-gray-500">
              {world.locations_visited.length} locations discovered
            </span>
          </div>
        </motion.div>
      )}

      {/* Active Quests */}
      {activeQuests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-5 border-glow-magenta"
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Scroll size={24} weight="fill" className="text-magenta-400" />
            </motion.div>
            <span className="text-sm font-gaming-body text-magenta-400">
              ACTIVE QUESTS ({activeQuests.length})
            </span>
          </div>
          <ul className="space-y-3">
            {activeQuests.map((quest, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="quest-marker glass-panel rounded-xl p-3 border border-yellow-500/30 hover:border-yellow-500/60 transition-all"
              >
                <div className="flex items-start gap-2">
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-yellow-400 text-lg"
                  >
                    ⭐
                  </motion.span>
                  <div className="flex-1">
                    <p className="text-sm font-gaming-display text-neon-yellow mb-1">
                      {quest.name}
                    </p>
                    <p className="text-xs font-gaming-body text-gray-400">
                      {quest.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recent Events */}
      {recentEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-5 border-glow-yellow scanlines"
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Flag size={24} weight="fill" className="text-green-400" />
            </motion.div>
            <span className="text-sm font-gaming-body text-green-400">EVENT LOG</span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {recentEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-2 text-xs font-gaming-body"
              >
                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  className="text-green-400 mt-0.5"
                >
                  ▸
                </motion.span>
                <span className="text-gray-400 flex-1">{event.description}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel rounded-2xl p-4 border border-cyan-500/30"
      >
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-gaming-display text-neon-cyan mb-1"
            >
              {world.events.length}
            </motion.div>
            <div className="text-xs font-gaming-body text-gray-400">Events</div>
          </div>
          <div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-2xl font-gaming-display text-neon-magenta mb-1"
            >
              {world.quests.length}
            </motion.div>
            <div className="text-xs font-gaming-body text-gray-400">Quests</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Custom Scrollbar Styles */
<style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #00ffff, #ff00ff);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #00ffff, #ffff00);
  }
`}</style>

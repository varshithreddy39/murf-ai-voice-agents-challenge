'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { AppConfig } from '@/app-config';
import { ChatTranscript } from '@/components/app/chat-transcript';
import { PreConnectMessage } from '@/components/app/preconnect-message';
import { TileLayout } from '@/components/app/tile-layout';
import { CharacterSheet } from '@/components/app/character-sheet';
import { WorldInfo } from '@/components/app/world-info';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/livekit/agent-control-bar/agent-control-bar';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useConnectionTimeout } from '@/hooks/useConnectionTimout';
import { useDebugMode } from '@/hooks/useDebug';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../livekit/scroll-area/scroll-area';

const MotionBottom = motion.create('div');

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const BOTTOM_VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: 'easeOut',
  },
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}
interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  useConnectionTimeout(200_000);
  useDebugMode({ enabled: IN_DEVELOPMENT });

  const messages = useChatMessages();
  const [chatOpen, setChatOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Mock game state - in production, this would come from agent metadata
  const [gameState, setGameState] = useState<any>(null);
  
  // Parse game state from agent messages (simplified)
  useEffect(() => {
    const lastMessage = messages.at(-1);
    if (lastMessage?.message) {
      // In a real implementation, the agent would send structured data
      // For now, we'll show a placeholder
      if (lastMessage.message.includes('Character created')) {
        setGameState({
          character: {
            name: 'Adventurer',
            class: 'Warrior',
            hp: 100,
            max_hp: 100,
            status: 'Healthy',
            stats: { strength: 15, intelligence: 12, luck: 14 },
            inventory: [],
            gold: 50
          },
          world: {
            current_location: { name: 'Starting Area' },
            locations_visited: [],
            events: [],
            quests: []
          }
        });
      }
    }
  }, [messages]);

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
  };

  useEffect(() => {
    const lastMessage = messages.at(-1);
    const lastMessageIsLocal = lastMessage?.from?.isLocal === true;

    if (scrollAreaRef.current && lastMessageIsLocal) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="relative z-10 h-full w-full overflow-hidden bg-black" {...props}>
      {/* Epic Gaming Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 100, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-500/30 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-magenta-500/30 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-yellow-500/20 rounded-full blur-[150px]"
        />

        {/* Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-10" />

        {/* Hexagon Pattern */}
        <div className="absolute inset-0 hex-pattern opacity-5" />

        {/* Scan Lines */}
        <div className="absolute inset-0 scanlines opacity-20" />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px #00ffff',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Epic Status Indicator - Top Center */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]"
      >
        <div className="glass-panel border-glow-cyan rounded-2xl px-10 py-4 shadow-2xl flex items-center gap-4">
          {/* Animated Dice Icon */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="text-3xl">🎲</div>
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-cyan-400 rounded-full blur-xl"
            />
          </motion.div>

          {/* Title */}
          <div className="flex flex-col">
            <motion.span
              animate={{
                textShadow: [
                  '0 0 10px #a855f7',
                  '0 0 20px #a855f7, 0 0 30px #a855f7',
                  '0 0 10px #a855f7',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl font-gaming-display text-purple-400"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              GAME MASTER
            </motion.span>
            <span className="text-xs font-gaming-body text-gray-400">Voice Adventure System</span>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />

          {/* Status Badge */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="relative"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <motion.div
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 bg-green-400 rounded-full"
              />
            </motion.div>
            <span className="text-green-400 font-gaming-body text-sm font-bold uppercase tracking-wider">
              ACTIVE
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Character Sheet - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="fixed left-4 top-24 z-30 w-64 max-h-[calc(100vh-200px)] overflow-y-auto"
      >
        <CharacterSheet character={gameState?.character} />
      </motion.div>

      {/* World Info - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="fixed right-4 top-24 z-30 w-64 max-h-[calc(100vh-200px)] overflow-y-auto"
      >
        <WorldInfo world={gameState?.world} />
      </motion.div>

      {/* Chat Transcript */}
      <div
        className={cn(
          'fixed inset-0 grid grid-cols-1 grid-rows-1 z-10',
          !chatOpen && 'pointer-events-none'
        )}
      >
        <Fade top className="absolute inset-x-4 top-0 h-48 z-20" />
        <ScrollArea ref={scrollAreaRef} className="px-4 pt-32 pb-[150px] md:px-6 md:pt-36 md:pb-[180px]">
          <ChatTranscript
            hidden={!chatOpen}
            messages={messages}
            className="mx-auto max-w-3xl space-y-4 transition-opacity duration-300 ease-out mt-8"
          />
        </ScrollArea>
      </div>

      {/* Tile Layout */}
      <TileLayout chatOpen={chatOpen} />

      {/* Bottom Control Bar */}
      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="fixed inset-x-3 bottom-0 z-50 md:inset-x-12"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-4" />
        )}
        <div className="relative mx-auto max-w-3xl pb-3 md:pb-12">
          <Fade bottom className="absolute inset-x-0 top-0 h-4 -translate-y-full" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="glass-panel border-glow-magenta rounded-3xl shadow-2xl p-6 relative overflow-hidden"
          >
            {/* Animated Energy Lines */}
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
            <motion.div
              animate={{
                x: ['100%', '-100%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-magenta-400 to-transparent"
            />

            {/* Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-magenta-400" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-magenta-400" />

            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-magenta-500/5 to-yellow-500/5 pointer-events-none" />
            
            <div className="relative z-10">
              <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
            </div>
          </motion.div>
        </div>
      </MotionBottom>
    </section>
  );
};

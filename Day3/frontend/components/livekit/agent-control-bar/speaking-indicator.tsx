'use client';

import { motion } from 'motion/react';
import { useRemoteParticipants, useIsSpeaking } from '@livekit/components-react';
import { cn } from '@/lib/utils';

const MotionDiv = motion.create('div');

export function SpeakingIndicator() {
  const participants = useRemoteParticipants();
  const agentParticipant = participants.find((p) => p.isAgent);
  
  // Pass undefined if no participant, useIsSpeaking will handle it
  const isAgentSpeaking = useIsSpeaking(agentParticipant ?? undefined);

  if (!agentParticipant) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300',
        isAgentSpeaking
          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30'
          : 'bg-muted/30 border border-border/20'
      )}
    >
      {/* Animated Bars */}
      <div className="flex items-center gap-1 h-4">
        {[0, 1, 2].map((i) => (
          <MotionDiv
            key={i}
            className={cn(
              'w-1 rounded-full',
              isAgentSpeaking
                ? 'bg-green-500'
                : 'bg-muted-foreground/30'
            )}
            animate={{
              height: isAgentSpeaking
                ? ['4px', '16px', '4px']
                : '4px',
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Status Text */}
      <span
        className={cn(
          'text-xs font-medium transition-colors duration-300',
          isAgentSpeaking
            ? 'text-green-600 dark:text-green-400'
            : 'text-muted-foreground/60'
        )}
      >
        {isAgentSpeaking ? 'Agent speaking...' : 'Agent listening'}
      </span>
    </MotionDiv>
  );
}

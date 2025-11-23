'use client';

import { AnimatePresence, motion } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { ShimmerText } from '@/components/livekit/shimmer-text';
import { cn } from '@/lib/utils';
import { Coffee } from '@phosphor-icons/react';

const MotionMessage = motion.create('div');

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      transition: {
        ease: 'easeIn' as const,
        duration: 0.5,
        delay: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: 'easeIn' as const,
        duration: 0.5,
        delay: 0,
      },
    },
  },
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'hidden' as const,
};

interface PreConnectMessageProps {
  messages?: ReceivedChatMessage[];
  className?: string;
}

export function PreConnectMessage({ className, messages = [] }: PreConnectMessageProps) {
  return (
    <AnimatePresence>
      {messages.length === 0 && (
        <MotionMessage
          {...VIEW_MOTION_PROPS}
          aria-hidden={messages.length > 0}
          className={cn('pointer-events-none flex flex-col items-center gap-3', className)}
        >
          <div className="flex items-center gap-2 text-foreground">
            <Coffee className="size-5 animate-pulse" weight="fill" />
            <ShimmerText className="text-sm font-semibold">
              Your barista is ready
            </ShimmerText>
          </div>
          <p className="text-muted-foreground text-xs">
            Start speaking to place your order
          </p>
        </MotionMessage>
      )}
    </AnimatePresence>
  );
}

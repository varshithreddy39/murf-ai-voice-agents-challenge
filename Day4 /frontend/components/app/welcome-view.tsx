'use client';

import { Button } from '@/components/livekit/button';
import { motion } from 'motion/react';

const MotionDiv = motion.create('div');

function LearningIcon() {
  return (
    <MotionDiv
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      }}
      className="relative w-24 h-24 flex items-center justify-center mb-8"
    >
      {/* Glow effect */}
      <MotionDiv
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-orange-500/30 rounded-full blur-2xl"
      />
      
      {/* Icon */}
      <div className="relative z-10 w-24 h-24 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-2xl shadow-2xl">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
    </MotionDiv>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const modes = [
    {
      icon: '📚',
      title: 'Learn Mode',
      description: 'Clear explanations with Matthew',
      color: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
      delay: 0.2,
    },
    {
      icon: '❓',
      title: 'Quiz Mode',
      description: 'Test your knowledge with Alicia',
      color: 'from-orange-500/10 to-orange-600/10 border-orange-500/20',
      delay: 0.4,
    },
    {
      icon: '🎯',
      title: 'Teach Back',
      description: 'Explain concepts to Ken',
      color: 'from-green-500/10 to-green-600/10 border-green-500/20',
      delay: 0.6,
    },
  ];

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MotionDiv
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"
        />
        <MotionDiv
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto">
        {/* Icon */}
        <LearningIcon />

        {/* Title */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 dark:from-blue-400 dark:via-purple-400 dark:to-orange-400 bg-clip-text text-transparent">
            Teach the Tutor
          </h1>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xl sm:text-2xl font-light text-muted-foreground mb-12">
            Learn by Teaching • Active Recall Coach
          </p>
        </MotionDiv>

        {/* Mode Cards */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 w-full max-w-4xl"
        >
          {modes.map((mode) => (
            <MotionDiv
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: mode.delay }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${mode.color} backdrop-blur-sm border transition-all duration-300`}
            >
              <div className="text-4xl mb-3">{mode.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {mode.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {mode.description}
              </p>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* CTA Button */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 hover:from-blue-700 hover:via-purple-700 hover:to-orange-700 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl flex items-center gap-3 group"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            {startButtonText}
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </MotionDiv>

        {/* Feature Pills */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: '🧠', label: 'Active Recall' },
            { icon: '🎙️', label: 'Voice First' },
            { icon: '📈', label: 'Track Progress' },
            { icon: '🎓', label: '8 Concepts' },
          ].map((item, i) => (
            <MotionDiv
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-full border border-border/50 hover:border-border transition-all duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </MotionDiv>
          ))}
        </MotionDiv>
      </section>

      {/* Footer */}
      <div className="fixed bottom-6 left-0 right-0 flex items-center justify-center px-6">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <p className="text-muted-foreground/60 text-xs text-center">
            The best way to learn is to teach • Powered by AI Voice Agents
          </p>
        </MotionDiv>
      </div>
    </div>
  );
};

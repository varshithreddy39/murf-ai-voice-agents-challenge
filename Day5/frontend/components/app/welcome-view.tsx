'use client';

import { motion } from 'motion/react';
import { LeadSummaryCard } from './LeadSummaryCard';
import { ParticleBackground } from './ParticleBackground';
import { cn } from '@/lib/utils';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs - New Vibrant Colors */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-teal-500/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-orange-500/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-fuchsia-500/25 rounded-full blur-3xl"
        />

        {/* Diagonal Stripes Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[size:60px_60px]" />
        
        {/* Particle Effects */}
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section - New Layout: Split Screen */}
        <section className="grid md:grid-cols-2 gap-12 items-center px-6 md:px-12 py-20 md:py-32 min-h-screen max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-400/30 rounded-full"
            >
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-teal-300 text-sm font-semibold tracking-wide">AI-POWERED SALES</span>
            </motion.div>

            {/* Main Title - New Font Style */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Meet Your
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative inline-block"
              >
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  AI SDR
                </span>
              </motion.div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Transform your sales process with an AI assistant that qualifies leads, 
              answers questions, and closes deals through natural voice conversations.
            </motion.p>

            {/* CTA Buttons - New Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartCall}
                className="group relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="relative z-10">{startButtonText}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white/5 backdrop-blur-sm text-white font-semibold text-lg px-10 py-4 rounded-2xl border-2 border-white/20 hover:border-teal-400/50 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn More</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", type: "spring" }}
            className="relative hidden md:flex items-center justify-center"
          >
            {/* Hexagon Orbs - New Animation Pattern */}
            <div className="relative w-96 h-96">
              {/* Center Orb */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl rotate-45 shadow-2xl shadow-teal-500/50" />
              </motion.div>
              
              {/* Orbiting Elements */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                  className="absolute inset-0"
                  style={{
                    transformOrigin: 'center',
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    className={cn(
                      "absolute w-12 h-12 rounded-full",
                      i % 3 === 0 && "bg-gradient-to-br from-teal-400 to-cyan-500",
                      i % 3 === 1 && "bg-gradient-to-br from-orange-400 to-amber-500",
                      i % 3 === 2 && "bg-gradient-to-br from-fuchsia-400 to-pink-500"
                    )}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translateY(-${120 + i * 10}px)`,
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Pulsing Rings */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border-4 border-teal-400/30 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 border-4 border-orange-400/20 rounded-full"
              />
            </div>
          </motion.div>

          {/* Stats/Features Grid - New Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl"
          >
            {[
              { icon: "⚡", label: "Response Time", value: "<500ms", color: "teal" },
              { icon: "🎯", label: "Lead Capture", value: "100%", color: "orange" },
              { icon: "💰", label: "Smart Pricing", value: "Auto", color: "fuchsia" },
              { icon: "🤖", label: "AI Powered", value: "24/7", color: "violet" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1 + i * 0.1, 
                  duration: 0.5,
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-white/30 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={cn(
                  "text-3xl font-bold mb-1",
                  stat.color === "teal" && "text-teal-400",
                  stat.color === "orange" && "text-orange-400",
                  stat.color === "fuchsia" && "text-fuchsia-400",
                  stat.color === "violet" && "text-violet-400"
                )}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                
                {/* Hover glow */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl",
                  stat.color === "teal" && "bg-teal-500/20",
                  stat.color === "orange" && "bg-orange-500/20",
                  stat.color === "fuchsia" && "bg-fuchsia-500/20",
                  stat.color === "violet" && "bg-violet-500/20"
                )} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Lead Summary Card */}
        <section className="px-6 pb-20">
          <LeadSummaryCard />
        </section>

        {/* Footer */}
        <div className="pb-12 flex flex-col items-center justify-center px-6 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400/30" />
            <p className="text-blue-300/60 text-sm text-center">
              Powered by LiveKit • AssemblyAI • Gemini • Murf
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400/30" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-white/40 text-xs"
          >
            © 2025 Zoho CRM. All rights reserved.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

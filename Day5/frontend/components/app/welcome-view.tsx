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
    <div ref={ref} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Particle Effects */}
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 min-h-screen">
          {/* Logo/Icon with Pulse Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Rotating glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60"
              />
              
              {/* Pulsing rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl"
              />
              
              {/* Main icon container */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-8 rounded-3xl shadow-2xl border border-white/20"
              >
                <motion.svg 
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </motion.svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Title with Letter Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Zoho CRM
            </motion.span>
            <br />
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative inline-block"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Sales Assistant
              </span>
              <motion.span
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] bg-clip-text"
              />
            </motion.span>
          </motion.h1>

          {/* Subtitle with Typing Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl leading-relaxed"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Experience the future of CRM sales conversations.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-white font-semibold mt-2"
            >
              Speak naturally, get instant expert answers.
            </motion.p>
          </motion.div>

          {/* CTA Button with Advanced Animations */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.3 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 60px rgba(59, 130, 246, 0.6), 0 0 100px rgba(168, 85, 247, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartCall}
            className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-bold text-xl px-16 py-5 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-4 overflow-hidden border-2 border-white/20"
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              animate={{ 
                x: ["-100%", "200%"],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 1
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
            
            <span className="relative z-10 flex items-center gap-4">
              <motion.svg 
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-7 h-7" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </motion.svg>
              <span className="group-hover:tracking-wider transition-all duration-300">
                {startButtonText}
              </span>
            </span>
          </motion.button>

          {/* Feature Pills with Stagger Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-4 max-w-4xl"
          >
            {[
              { icon: "⚡", text: "Instant Responses", color: "from-yellow-500/20 to-orange-500/20" },
              { icon: "🎯", text: "Lead Qualification", color: "from-red-500/20 to-pink-500/20" },
              { icon: "💰", text: "Pricing Calculator", color: "from-green-500/20 to-emerald-500/20" },
              { icon: "🤖", text: "AI-Powered", color: "from-blue-500/20 to-purple-500/20" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 1 + i * 0.1, 
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.5
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -8,
                  boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
                }}
                className={cn(
                  "relative bg-white/10 backdrop-blur-lg border border-white/30 px-6 py-3 rounded-full text-white font-medium flex items-center gap-3 shadow-lg cursor-default overflow-hidden group",
                  "hover:border-white/50 hover:bg-white/15 transition-all duration-300"
                )}
              >
                {/* Gradient background on hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  feature.color
                )} />
                
                <motion.span 
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                  className="text-2xl relative z-10"
                >
                  {feature.icon}
                </motion.span>
                <span className="relative z-10">{feature.text}</span>
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

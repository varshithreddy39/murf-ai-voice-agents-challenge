'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0f1729 0%, #1a1f3a 50%, #0a0e1a 100%)'
    }}>
      {/* Animated Background with Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Glowing Orbs - Purple theme like the reference */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px]"
        />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Top Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-between px-12 py-6"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 200 200" fill="none">
            {/* Outer orbit ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#logo-gradient)" strokeWidth="8"/>
            
            {/* Dragon/World silhouette */}
            <path d="M100 40 C75 45, 60 65, 60 90 C60 95, 62 100, 65 105 L65 115 C65 135, 80 155, 100 165 C120 155, 135 135, 135 115 L135 105 C138 100, 140 95, 140 90 C140 65, 125 45, 100 40 Z" 
                  fill="url(#logo-gradient)"/>
            
            {/* Dragon wings */}
            <path d="M75 85 L55 75 L60 95 Z M125 85 L145 75 L140 95 Z" 
                  fill="url(#logo-gradient)" opacity="0.8"/>
            
            {/* Orbit dot */}
            <circle cx="165" cy="165" r="10" fill="url(#logo-gradient)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="20s"
                repeatCount="indefinite"/>
            </circle>
            
            <defs>
              <linearGradient id="logo-gradient" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-bold tracking-tight" style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ELDORIA
          </span>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <span className="text-lg">🇬🇧</span>
            <span>EN</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Token price</span>
            <span className="flex items-center gap-1 text-white">
              <span className="text-green-400">💰</span>
              $1.23
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <button className="hover:text-white transition-colors">📱</button>
            <button className="hover:text-white transition-colors">📺</button>
            <button className="hover:text-white transition-colors">📧</button>
            <button className="hover:text-white transition-colors">📷</button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
            }}
          >
            Login
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-20 pt-8">
        {/* Logo Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.svg 
            width="100" 
            height="100" 
            viewBox="0 0 200 200" 
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Outer orbit ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#hero-gradient)" strokeWidth="6"/>
            
            {/* Dragon/World silhouette */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: '100px 100px' }}
            >
              <path d="M100 40 C75 45, 60 65, 60 90 C60 95, 62 100, 65 105 L65 115 C65 135, 80 155, 100 165 C120 155, 135 135, 135 115 L135 105 C138 100, 140 95, 140 90 C140 65, 125 45, 100 40 Z" 
                    fill="url(#hero-gradient)"/>
              
              {/* Dragon wings */}
              <path d="M75 85 L55 75 L60 95 Z M125 85 L145 75 L140 95 Z" 
                    fill="url(#hero-gradient)" opacity="0.8"/>
              
              {/* Dragon eyes */}
              <circle cx="85" cy="90" r="4" fill="#0a0e1a"/>
              <circle cx="115" cy="90" r="4" fill="#0a0e1a"/>
            </motion.g>
            
            {/* Orbit dot */}
            <circle cx="165" cy="165" r="12" fill="url(#hero-gradient)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="20s"
                repeatCount="indefinite"/>
            </circle>
            
            <defs>
              <linearGradient id="hero-gradient" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold mb-3">
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Eldoria
            </span>
            <span className="text-white"> - voice platform</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed"
          >
            Create a password with at least 6 characters. Only Latin letters, numbers,
            and general punctuation symbols are allowed. Let it be complex and original
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartCall}
            className="px-20 py-4 rounded-xl text-base font-semibold text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
            }}
          >
            {startButtonText}
          </motion.button>
        </motion.div>

        {/* Character Showcase - D&D Fantasy Heroes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative w-full max-w-6xl mb-16"
        >
          {/* Purple glow behind characters */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl" 
               style={{ transform: 'translateY(50%)' }} />
          
          {/* Character Cards Container */}
          <div className="relative flex items-end justify-center gap-0">
            {/* Mage Character - Left (Green) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative z-10"
              style={{ marginRight: '-40px' }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{
                  filter: 'drop-shadow(0 15px 40px rgba(34, 197, 94, 0.6))',
                }}
              >
                {/* Mage character with glowing magic effect */}
                <div className="relative w-[280px] h-[380px]">
                  {/* Glowing aura behind character */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-t from-green-600/40 via-emerald-500/40 to-lime-400/40 blur-3xl"
                  />
                  
                  {/* Character illustration */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 300 400" className="w-full h-full">
                      {/* Mage body */}
                      <g>
                        {/* Cape/Cloak */}
                        <path d="M150 100 L100 150 L90 350 L210 350 L200 150 Z" 
                              fill="url(#cape-gradient-left)" opacity="0.9"/>
                        
                        {/* Body */}
                        <ellipse cx="150" cy="180" rx="40" ry="60" fill="#4a5568"/>
                        <rect x="130" y="180" width="40" height="100" fill="#5a6c7d" rx="5"/>
                        
                        {/* Arms */}
                        <ellipse cx="110" cy="200" rx="15" ry="50" fill="#5a6c7d" transform="rotate(-20 110 200)"/>
                        <ellipse cx="190" cy="200" rx="15" ry="50" fill="#5a6c7d" transform="rotate(20 190 200)"/>
                        
                        {/* Staff in left hand */}
                        <line x1="100" y1="150" x2="80" y2="80" stroke="#22c55e" strokeWidth="4"/>
                        <circle cx="80" cy="70" r="10" fill="#10b981" opacity="0.8">
                          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Glowing magic in right hand */}
                        <circle cx="200" cy="220" r="20" fill="url(#magic-gradient-left)">
                          <animate attributeName="r" values="15;25;15" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="200" cy="220" r="15" fill="#84cc16" opacity="0.6">
                          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Head */}
                        <circle cx="150" cy="120" r="25" fill="#d4a574"/>
                        
                        {/* Hood */}
                        <path d="M125 110 Q150 80 175 110 L175 130 Q150 140 125 130 Z" 
                              fill="#6b7280" opacity="0.9"/>
                        
                        {/* Eyes */}
                        <circle cx="140" cy="120" r="3" fill="#22c55e"/>
                        <circle cx="160" cy="120" r="3" fill="#22c55e"/>
                        
                        {/* Magical particles around */}
                        <circle cx="120" cy="150" r="2" fill="#10b981">
                          <animate attributeName="cy" values="150;130;150" dur="3s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="180" cy="160" r="2" fill="#84cc16">
                          <animate attributeName="cy" values="160;140;160" dur="2.5s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="150" cy="140" r="2" fill="#22c55e">
                          <animate attributeName="cy" values="140;120;140" dur="2.8s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                      
                      <defs>
                        <linearGradient id="cape-gradient-left" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4a5568" />
                          <stop offset="50%" stopColor="#5a6c7d" />
                          <stop offset="100%" stopColor="#6b7280" />
                        </linearGradient>
                        <radialGradient id="magic-gradient-left">
                          <stop offset="0%" stopColor="#84cc16" />
                          <stop offset="50%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#10b981" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Mage Character - Center (Larger & Featured) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="relative z-20"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{
                  filter: 'drop-shadow(0 20px 50px rgba(139, 92, 246, 0.8))',
                }}
              >
                {/* Mage character with glowing magic effect */}
                <div className="relative w-[350px] h-[450px]">
                  {/* Glowing aura behind character */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/40 via-blue-500/40 to-cyan-400/40 blur-3xl"
                  />
                  
                  {/* Character illustration - Using CSS to create a mage silhouette */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 300 400" className="w-full h-full">
                      {/* Mage body */}
                      <g>
                        {/* Cape/Cloak */}
                        <path d="M150 100 L100 150 L90 350 L210 350 L200 150 Z" 
                              fill="url(#cape-gradient)" opacity="0.9"/>
                        
                        {/* Body */}
                        <ellipse cx="150" cy="180" rx="40" ry="60" fill="#4a5568"/>
                        <rect x="130" y="180" width="40" height="100" fill="#5a6c7d" rx="5"/>
                        
                        {/* Arms */}
                        <ellipse cx="110" cy="200" rx="15" ry="50" fill="#5a6c7d" transform="rotate(-20 110 200)"/>
                        <ellipse cx="190" cy="200" rx="15" ry="50" fill="#5a6c7d" transform="rotate(20 190 200)"/>
                        
                        {/* Staff in left hand */}
                        <line x1="100" y1="150" x2="80" y2="80" stroke="#8b5cf6" strokeWidth="4"/>
                        <circle cx="80" cy="70" r="10" fill="#a855f7" opacity="0.8">
                          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Glowing magic in right hand */}
                        <circle cx="200" cy="220" r="20" fill="url(#magic-gradient)">
                          <animate attributeName="r" values="15;25;15" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="200" cy="220" r="15" fill="#06b6d4" opacity="0.6">
                          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Head */}
                        <circle cx="150" cy="120" r="25" fill="#d4a574"/>
                        
                        {/* Hood */}
                        <path d="M125 110 Q150 80 175 110 L175 130 Q150 140 125 130 Z" 
                              fill="#6b7280" opacity="0.9"/>
                        
                        {/* Eyes */}
                        <circle cx="140" cy="120" r="3" fill="#8b5cf6"/>
                        <circle cx="160" cy="120" r="3" fill="#8b5cf6"/>
                        
                        {/* Magical particles around */}
                        <circle cx="120" cy="150" r="2" fill="#a855f7">
                          <animate attributeName="cy" values="150;130;150" dur="3s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="180" cy="160" r="2" fill="#06b6d4">
                          <animate attributeName="cy" values="160;140;160" dur="2.5s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="150" cy="140" r="2" fill="#8b5cf6">
                          <animate attributeName="cy" values="140;120;140" dur="2.8s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                      
                      <defs>
                        <linearGradient id="cape-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4a5568" />
                          <stop offset="50%" stopColor="#5a6c7d" />
                          <stop offset="100%" stopColor="#6b7280" />
                        </linearGradient>
                        <radialGradient id="magic-gradient">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Necromancer Character - Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative z-10"
              style={{ marginLeft: '-40px' }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{
                  filter: 'drop-shadow(0 15px 40px rgba(220, 38, 38, 0.6))',
                }}
              >
                {/* Necromancer character with dark magic effect */}
                <div className="relative w-[280px] h-[380px]">
                  {/* Dark red aura behind character */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-t from-red-600/40 via-red-500/30 to-orange-500/20 blur-3xl"
                  />
                  
                  {/* Character illustration */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 300 400" className="w-full h-full">
                      {/* Necromancer body */}
                      <g>
                        {/* Long dark robes */}
                        <path d="M150 120 L110 160 L95 380 L205 380 L190 160 Z" 
                              fill="url(#necro-robe-gradient)" opacity="0.95"/>
                        
                        {/* Tattered robe edges */}
                        <path d="M95 380 L100 370 L105 380 L110 375 L115 380 L120 370 L125 380" 
                              stroke="#4a1d34" strokeWidth="2" fill="none"/>
                        <path d="M175 380 L180 370 L185 380 L190 375 L195 380 L200 370 L205 380" 
                              stroke="#4a1d34" strokeWidth="2" fill="none"/>
                        
                        {/* Shoulder armor plates */}
                        <path d="M120 140 L100 150 L105 165 L125 155 Z" fill="#5a4a5a" opacity="0.9"/>
                        <path d="M180 140 L200 150 L195 165 L175 155 Z" fill="#5a4a5a" opacity="0.9"/>
                        
                        {/* Body/torso */}
                        <ellipse cx="150" cy="200" rx="35" ry="55" fill="#6b3a5a"/>
                        <rect x="135" y="200" width="30" height="80" fill="#5a2d4a" rx="3"/>
                        
                        {/* Belt with skull ornament */}
                        <rect x="130" y="270" width="40" height="10" fill="#8b4513" rx="2"/>
                        <ellipse cx="150" cy="275" rx="12" ry="10" fill="#e8d4b8"/>
                        <circle cx="145" cy="273" r="2" fill="#1a1a1a"/>
                        <circle cx="155" cy="273" r="2" fill="#1a1a1a"/>
                        <path d="M145 278 L150 280 L155 278" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
                        
                        {/* Left arm (pale/wrapped) */}
                        <ellipse cx="115" cy="220" rx="12" ry="45" fill="#d4c5b0" transform="rotate(-15 115 220)"/>
                        <line x1="110" y1="200" x2="115" y2="210" stroke="#8b7355" strokeWidth="2"/>
                        <line x1="110" y1="215" x2="115" y2="225" stroke="#8b7355" strokeWidth="2"/>
                        <line x1="110" y1="230" x2="115" y2="240" stroke="#8b7355" strokeWidth="2"/>
                        
                        {/* Right arm (pale/wrapped) holding flame */}
                        <ellipse cx="185" cy="220" rx="12" ry="45" fill="#d4c5b0" transform="rotate(15 185 220)"/>
                        <line x1="190" y1="200" x2="185" y2="210" stroke="#8b7355" strokeWidth="2"/>
                        <line x1="190" y1="215" x2="185" y2="225" stroke="#8b7355" strokeWidth="2"/>
                        <line x1="190" y1="230" x2="185" y2="240" stroke="#8b7355" strokeWidth="2"/>
                        
                        {/* Flaming orb in right hand */}
                        <circle cx="195" cy="250" r="18" fill="url(#necro-flame-gradient)">
                          <animate attributeName="r" values="16;22;16" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="195" cy="250" r="12" fill="#ff4444" opacity="0.8">
                          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Flame wisps from orb */}
                        <path d="M195 232 Q190 220 192 210" stroke="#ff6b6b" strokeWidth="2" fill="none" opacity="0.7">
                          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.2s" repeatCount="indefinite"/>
                        </path>
                        <path d="M195 232 Q200 220 198 210" stroke="#ff8888" strokeWidth="2" fill="none" opacity="0.6">
                          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.4s" repeatCount="indefinite"/>
                        </path>
                        
                        {/* Neck/collar */}
                        <rect x="140" y="130" width="20" height="15" fill="#5a2d4a" rx="2"/>
                        
                        {/* Flaming head - base */}
                        <ellipse cx="150" cy="100" rx="22" ry="28" fill="#4a1d34"/>
                        
                        {/* Helmet/armor on head */}
                        <path d="M130 95 L150 85 L170 95 L165 110 L135 110 Z" fill="#6b5a6a" opacity="0.9"/>
                        <rect x="145" y="95" width="10" height="8" fill="#5a4a5a"/>
                        
                        {/* Flames on head - multiple layers */}
                        <path d="M150 85 Q145 70 148 55 Q150 65 152 55 Q155 70 150 85" 
                              fill="url(#necro-head-flame)" opacity="0.9">
                          <animate attributeName="d" 
                                   values="M150 85 Q145 70 148 55 Q150 65 152 55 Q155 70 150 85;
                                           M150 85 Q143 68 146 52 Q150 63 154 52 Q157 68 150 85;
                                           M150 85 Q145 70 148 55 Q150 65 152 55 Q155 70 150 85"
                                   dur="1.5s" repeatCount="indefinite"/>
                        </path>
                        <path d="M145 80 Q140 65 143 50 Q145 60 147 50 Q150 65 145 80" 
                              fill="#ff6b6b" opacity="0.7">
                          <animate attributeName="d" 
                                   values="M145 80 Q140 65 143 50 Q145 60 147 50 Q150 65 145 80;
                                           M145 80 Q138 63 141 48 Q145 58 149 48 Q152 63 145 80;
                                           M145 80 Q140 65 143 50 Q145 60 147 50 Q150 65 145 80"
                                   dur="1.3s" repeatCount="indefinite"/>
                        </path>
                        <path d="M155 80 Q160 65 157 50 Q155 60 153 50 Q150 65 155 80" 
                              fill="#ff8888" opacity="0.7">
                          <animate attributeName="d" 
                                   values="M155 80 Q160 65 157 50 Q155 60 153 50 Q150 65 155 80;
                                           M155 80 Q162 63 159 48 Q155 58 151 48 Q148 63 155 80;
                                           M155 80 Q160 65 157 50 Q155 60 153 50 Q150 65 155 80"
                                   dur="1.4s" repeatCount="indefinite"/>
                        </path>
                        
                        {/* Smoke wisps from flames */}
                        <path d="M148 50 Q145 40 147 30" stroke="#9ca3af" strokeWidth="1.5" fill="none" opacity="0.4">
                          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/>
                        </path>
                        <path d="M152 50 Q155 40 153 30" stroke="#9ca3af" strokeWidth="1.5" fill="none" opacity="0.3">
                          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.2s" repeatCount="indefinite"/>
                        </path>
                        
                        {/* Dark particles around character */}
                        <circle cx="120" cy="180" r="2" fill="#dc2626">
                          <animate attributeName="cy" values="180;160;180" dur="3s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="180" cy="190" r="2" fill="#ef4444">
                          <animate attributeName="cy" values="190;170;190" dur="2.7s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;0.8;0" dur="2.7s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="150" cy="160" r="1.5" fill="#f87171">
                          <animate attributeName="cy" values="160;140;160" dur="2.5s" repeatCount="indefinite"/>
                          <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                      
                      <defs>
                        <linearGradient id="necro-robe-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#5a2d4a" />
                          <stop offset="50%" stopColor="#4a1d34" />
                          <stop offset="100%" stopColor="#3a1528" />
                        </linearGradient>
                        <radialGradient id="necro-flame-gradient">
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="40%" stopColor="#f87171" />
                          <stop offset="100%" stopColor="#dc2626" />
                        </radialGradient>
                        <linearGradient id="necro-head-flame" x1="0%" y1="100%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="50%" stopColor="#f87171" />
                          <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Dark shadow/platform under characters */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-black/60 to-transparent blur-2xl" />
        </motion.div>

        {/* Upcoming Adventures Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="w-full max-w-6xl text-center"
        >
          <h2 className="text-4xl font-bold mb-3">
            <span className="text-white">Upcoming </span>
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Adventures
            </span>
          </h2>
          <p className="text-sm text-gray-400 mb-12">
            Choose a quest right now. Participate in battles or place bets online
          </p>

          {/* Quest Cards */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: '🐉', title: 'DRAGON\'S LAIR', quests: '531 quests', gradient: 'from-red-600/20 to-orange-600/20' },
              { icon: '⚔️', title: 'ARENA BATTLE', quests: '281 quests', gradient: 'from-purple-600/20 to-pink-600/20' },
              { icon: '🏰', title: 'CASTLE SIEGE', quests: '812 quests', gradient: 'from-blue-600/20 to-cyan-600/20' },
            ].map((quest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${quest.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                
                {/* Content */}
                <div className="relative p-8 text-center">
                  <div className="text-7xl mb-4 filter drop-shadow-lg">{quest.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{quest.title}</h3>
                  <p className="text-sm text-gray-400">{quest.quests}</p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/0 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative z-10 text-center pb-6"
      >
        <p className="text-xs font-gaming-body text-gray-600">
          Powered by <span className="text-purple-400">Murf AI Falcon</span> • 
          Built with <span className="text-cyan-400">LiveKit Agents</span>
        </p>
        <p className="text-xs font-gaming-body text-gray-700 mt-2">
          🎮 Day 8 - Murf AI Voice Agent Challenge 🎮
        </p>
      </motion.div>
    </div>
  );
};

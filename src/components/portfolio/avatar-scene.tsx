"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Monitor, Coffee, Code, Cpu, Zap, Play, Pause } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  duration_ms: number;
  progress_ms: number;
  is_playing: boolean;
  image_url?: string;
}

interface AvatarSceneProps {
  spotifyTrack?: SpotifyTrack;
  className?: string;
}

const FloatingParticle: React.FC<{ delay: number; duration: number }> = ({ delay, duration }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary/30 rounded-full"
    initial={{ 
      x: Math.random() * 400,
      y: Math.random() * 300,
      opacity: 0 
    }}
    animate={{
      x: Math.random() * 400,
      y: Math.random() * 300,
      opacity: [0, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const CodeSymbol: React.FC<{ icon: React.ReactNode; delay: number }> = ({ icon, delay }) => (
  <motion.div
    className="absolute text-primary/40 text-xs"
    initial={{ 
      x: Math.random() * 300,
      y: Math.random() * 200,
      opacity: 0,
      scale: 0.5
    }}
    animate={{
      x: Math.random() * 300,
      y: Math.random() * 200,
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.5],
      rotate: [0, 360]
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {icon}
  </motion.div>
);

const VisualizerBar: React.FC<{ height: number; delay: number }> = ({ height, delay }) => (
  <motion.div
    className="bg-gradient-to-t from-primary/60 to-secondary/40 rounded-sm"
    style={{ width: '3px' }}
    animate={{
      height: [height * 0.3, height, height * 0.5, height * 0.8, height * 0.2]
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export const AvatarScene: React.FC<AvatarSceneProps> = ({ spotifyTrack, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [screenGlow, setScreenGlow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenGlow(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const codeSymbols = [
    <Code key="code" className="w-3 h-3" />,
    <Cpu key="cpu" className="w-3 h-3" />,
    <Zap key="zap" className="w-3 h-3" />,
    <Monitor key="monitor" className="w-3 h-3" />
  ];

  return (
    <Card 
      className={`relative overflow-hidden bg-card border-border/50 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            duration={6 + Math.random() * 4} 
          />
        ))}
        
        {/* Floating Code Symbols */}
        {Array.from({ length: 8 }).map((_, i) => (
          <CodeSymbol 
            key={i}
            icon={codeSymbols[i % codeSymbols.length]}
            delay={i * 1.2}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        {/* Main Scene */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Avatar & Desk Scene */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Desk Surface */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Desk */}
              <motion.div 
                className="h-24 bg-gradient-to-r from-card via-accent to-card rounded-lg shadow-lg border border-border/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Monitors */}
              <div className="absolute -top-16 left-4 right-4 flex gap-2 justify-center">
                {[1, 2, 3].map((monitor, i) => (
                  <motion.div
                    key={monitor}
                    className="relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div 
                      className={`w-16 h-12 rounded-sm border-2 border-border/40 bg-card relative overflow-hidden ${
                        screenGlow ? 'shadow-lg shadow-primary/20' : 'shadow-md shadow-secondary/10'
                      }`}
                    >
                      {/* Screen Content */}
                      <div className="p-1">
                        <div className="w-full h-1 bg-primary/60 rounded mb-1" />
                        <div className="w-3/4 h-1 bg-muted/40 rounded mb-1" />
                        <div className="w-1/2 h-1 bg-secondary/60 rounded" />
                      </div>
                      
                      {/* Screen Glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"
                        animate={{ opacity: screenGlow ? 0.8 : 0.3 }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                    
                    {/* Monitor Stand */}
                    <div className="w-2 h-3 bg-muted/60 mx-auto rounded-b" />
                  </motion.div>
                ))}
              </div>

              {/* Avatar Character */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-card shadow-lg"
                animate={{ 
                  y: isHovered ? -2 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Coffee Cup */}
              <motion.div
                className="absolute top-2 right-8 flex items-center gap-1 text-muted-foreground"
                whileHover={{ scale: 1.1 }}
              >
                <Coffee className="w-4 h-4" />
                <motion.div
                  className="w-1 h-4 bg-muted/40 rounded-full"
                  animate={{ height: [16, 8, 16] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Keyboard */}
              <div className="absolute top-12 left-8 right-8 h-2 bg-muted/40 rounded shadow-sm" />
            </div>
          </motion.div>

          {/* Spotify Integration */}
          <motion.div 
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 bg-accent/50 border-border/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Music className="w-4 h-4 text-background" />
                </motion.div>
                <h3 className="font-semibold text-foreground">Now Playing</h3>
              </div>

              <AnimatePresence mode="wait">
                {spotifyTrack ? (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      {spotifyTrack.image_url && (
                        <img 
                          src={spotifyTrack.image_url} 
                          alt="Album cover"
                          className="w-12 h-12 rounded-md shadow-sm"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {spotifyTrack.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {spotifyTrack.artist}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {spotifyTrack.is_playing ? (
                          <Pause className="w-4 h-4 text-primary" />
                        ) : (
                          <Play className="w-4 h-4 text-primary" />
                        )}
                      </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${(spotifyTrack.progress_ms / spotifyTrack.duration_ms) * 100}%` 
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {Math.floor(spotifyTrack.progress_ms / 60000)}:
                          {String(Math.floor((spotifyTrack.progress_ms % 60000) / 1000)).padStart(2, '0')}
                        </span>
                        <span>
                          {Math.floor(spotifyTrack.duration_ms / 60000)}:
                          {String(Math.floor((spotifyTrack.duration_ms % 60000) / 1000)).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-4"
                  >
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Tuning into productivity...
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Music Visualizer */}
              <div className="flex items-end justify-center gap-1 mt-4 h-8">
                {Array.from({ length: 12 }).map((_, i) => (
                  <VisualizerBar 
                    key={i}
                    height={20 + Math.random() * 12}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Lo-fi Aesthetic Text */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.p 
            className="text-sm text-muted-foreground font-mono"
            animate={{ 
              textShadow: isHovered 
                ? "0 0 8px rgba(0, 255, 198, 0.3)" 
                : "none" 
            }}
            transition={{ duration: 0.3 }}
          >
            // Coding in the zone...
          </motion.p>
        </motion.div>
      </div>

      {/* Ambient Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none"
        animate={{ 
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.5 }}
      />
    </Card>
  );
};
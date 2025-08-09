"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if theme preference exists in localStorage
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      const isDark = storedTheme === 'dark';
      setIsDarkMode(isDark);
      applyTheme(isDark);
    } else {
      // Default to dark mode as specified
      setIsDarkMode(true);
      applyTheme(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={`relative h-9 w-9 rounded-full p-0 ${className}`}
        disabled
      >
        <div className="h-4 w-4 opacity-50">
          <Moon className="h-4 w-4" />
        </div>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`relative h-9 w-9 rounded-full border border-border/40 bg-background/80 p-0 backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:border-border hover:shadow-lg hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDarkMode}
      role="switch"
    >
      <div className="relative h-4 w-4 overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            rotate: isDarkMode ? 0 : 180,
            scale: isDarkMode ? 1 : 0.8,
            opacity: isDarkMode ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.3,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-4 w-4 text-foreground" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            rotate: isDarkMode ? -180 : 0,
            scale: isDarkMode ? 0.8 : 1,
            opacity: isDarkMode ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.3,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-4 w-4 text-foreground" />
        </motion.div>
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300"
        whileHover={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
      />
    </Button>
  );
};

export default ThemeToggle;
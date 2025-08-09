"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  isInteracting: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  velocity: {
    x: number;
    y: number;
  };
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    isInteracting: false,
  });
  
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 700, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 700, mass: 0.5 });
  
  const particleIdRef = useRef<number>(0);
  const rippleIdRef = useRef<number>(0);
  const lastParticleTime = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  // Detect touch devices
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Hide default cursor and show custom cursor
  useEffect(() => {
    if (isTouchDevice) return;

    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
      
      a, button, [role="button"], input, textarea, select, .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isTouchDevice]);

  // Create trailing particles
  const createParticle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastParticleTime.current < 50) return; // Throttle particle creation
    
    lastParticleTime.current = now;
    
    const newParticle: Particle = {
      id: ++particleIdRef.current,
      x,
      y,
      opacity: 0.6,
      size: Math.random() * 3 + 2,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
    };
    
    setParticles(prev => [...prev.slice(-20), newParticle]);
  }, []);

  // Create click ripples
  const createRipple = useCallback((x: number, y: number) => {
    const newRipple: Ripple = {
      id: ++rippleIdRef.current,
      x,
      y,
      scale: 0,
      opacity: 1,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  // Update particle positions and remove old ones
  const updateParticles = useCallback(() => {
    setParticles(prev => 
      prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          opacity: particle.opacity * 0.95,
          velocity: {
            x: particle.velocity.x * 0.98,
            y: particle.velocity.y * 0.98,
          },
        }))
        .filter(particle => particle.opacity > 0.05)
    );
  }, []);

  // Animation loop for particles
  useEffect(() => {
    const animate = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    if (!isTouchDevice) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateParticles, isTouchDevice]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isTouchDevice) return;
    
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
    
    setIsVisible(true);
    createParticle(clientX, clientY);
  }, [mouseX, mouseY, createParticle, isTouchDevice]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsVisible(false);
  }, [isTouchDevice]);

  // Mouse click handlers
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (isTouchDevice) return;
    
    setCursorState(prev => ({ ...prev, isClicking: true }));
    createRipple(e.clientX, e.clientY);
  }, [createRipple, isTouchDevice]);

  const handleMouseUp = useCallback(() => {
    if (isTouchDevice) return;
    setCursorState(prev => ({ ...prev, isClicking: false }));
  }, [isTouchDevice]);

  // Detect interactive elements
  const handleElementHover = useCallback((isHovering: boolean, isInteracting: boolean = false) => {
    setCursorState(prev => ({
      ...prev,
      isHovering,
      isInteracting,
    }));
  }, []);

  // Event listeners
  useEffect(() => {
    if (isTouchDevice) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Interactive elements detection
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    );

    const mouseEnterHandler = (e: Event) => {
      const element = e.target as HTMLElement;
      const isButton = element.tagName === 'BUTTON' || element.getAttribute('role') === 'button';
      handleElementHover(true, isButton);
    };

    const mouseLeaveHandler = () => handleElementHover(false);

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', mouseEnterHandler);
      element.addEventListener('mouseleave', mouseLeaveHandler);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', mouseEnterHandler);
        element.removeEventListener('mouseleave', mouseLeaveHandler);
      });
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseDown, handleMouseUp, handleElementHover, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: cursorState.isClicking 
              ? 0.8 
              : cursorState.isHovering 
                ? cursorState.isInteracting 
                  ? 1.5 
                  : 1.2 
                : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
        >
          {/* Inner dot */}
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: cursorState.isClicking ? 1.5 : 1,
            }}
            transition={{ type: "spring", damping: 15, stiffness: 400 }}
          />
          
          {/* Outer glow ring */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-primary/30 rounded-full"
            animate={{
              scale: cursorState.isHovering ? 2 : 1,
              borderColor: cursorState.isInteracting ? '#FF6B6B' : '#00FFC6',
            }}
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
          />
          
          {/* Pulsing outer ring for interactive elements */}
          <AnimatePresence>
            {cursorState.isHovering && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-primary/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: cursorState.isInteracting ? 3 : 2, 
                  opacity: 1,
                  borderColor: cursorState.isInteracting ? '#FF6B6B' : '#00FFC6',
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
              />
            )}
          </AnimatePresence>
          
          {/* Glowing effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/20 rounded-full blur-sm"
            animate={{
              scale: cursorState.isClicking 
                ? 2 
                : cursorState.isHovering 
                  ? 1.8 
                  : 1.2,
              backgroundColor: cursorState.isInteracting ? '#FF6B6B33' : '#00FFC633',
            }}
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
          />
        </motion.div>
      </motion.div>

      {/* Trailing Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998] w-1 h-1 bg-primary/60 rounded-full"
            style={{
              x: particle.x - 2,
              y: particle.y - 2,
            }}
            animate={{
              opacity: particle.opacity,
              scale: particle.size / 4,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </AnimatePresence>

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed top-0 left-0 pointer-events-none z-[9997] border border-primary/40 rounded-full"
            style={{
              x: ripple.x,
              y: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: 15, 
              opacity: 0,
              borderWidth: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              scale: { type: "spring", damping: 15, stiffness: 200 }
            }}
          >
            <div className="w-4 h-4" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
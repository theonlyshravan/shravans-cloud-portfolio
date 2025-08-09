"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const bootSequence = [
  "System Boot v2.4.1",
  "Loading kernel modules...",
  "Initializing hardware drivers...",
  "Starting network services...",
  "Loading portfolio system...",
  "Authentication successful",
  "Welcome "
];

export default function BootUpHero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [nameTyped, setNameTyped] = useState("");
  const [taglineTyped, setTaglineTyped] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const name = "Shravan Kumar Satapathy";
  const tagline = "Cloud Computing & DevOps Enthusiast | Postman API Fundamentals Student Expert | AI-Enabled Student | Seeking Innovative Roles";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    bootSequence.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);

        if (index === bootSequence.length - 1) {
          setTimeout(() => setBootComplete(true), 800);
        }
      }, index * 600);

      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!bootComplete) return;

    // Reset states
    setNameTyped("");
    setTaglineTyped("");
    setShowButtons(false);

    let timeout: NodeJS.Timeout;
    let index = 0;

    const typeCharacter = () => {
      if (index < name.length) {
        setNameTyped(name.substring(0, index + 1));
        index++;
        timeout = setTimeout(typeCharacter, 80);
      } else {
        setTimeout(typeTagline, 500);
      }
    };

    const typeTagline = () => {
      let taglineIndex = 0;
      const typeTaglineChar = () => {
        if (taglineIndex < tagline.length) {
          setTaglineTyped(tagline.substring(0, taglineIndex + 1));
          taglineIndex++;
          setTimeout(typeTaglineChar, 40);
        } else {
          setTimeout(() => setShowButtons(true), 800);
        }
      };
      typeTaglineChar();
    };

    typeCharacter();

    return () => clearTimeout(timeout);
  }, [bootComplete]);

  const scrollToProjects = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Cursor Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          background: "radial-gradient(circle, rgba(0, 255, 198, 0.3) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 198, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 198, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${80 + Math.random() * 20}%`
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Boot Sequence Terminal */}
        {!bootComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-8 mb-8 font-mono text-left max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-muted"></div>
              <span className="ml-2 text-sm text-muted-foreground">Terminal</span>
            </div>

            {displayedLines.map((line, idx) => (
              <div key={idx} className="mb-2 text-foreground text-sm">
                <span className="text-primary">$</span> {line}
              </div>
            ))}

            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary ml-1"
            />
          </motion.div>
        )}

        {/* Main Content */}
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Name */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl md:text-7xl font-bold font-[var(--font-display)] bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {nameTyped}
                {nameTyped.length > 0 && nameTyped.length < name.length && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-primary"
                  >
                    |
                  </motion.span>
                )}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {taglineTyped}
                {taglineTyped.length > 0 && taglineTyped.length < tagline.length && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-primary"
                  >
                    |
                  </motion.span>
                )}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              >
                <Button
                  onClick={scrollToProjects}
                  className="group relative bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                </Button>

                <Button
                  variant="outline"
                  className="group relative border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
                  onClick={() => {
                    window.open("/resume.pdf", "_blank");
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">Download Resume</span>
                  <div className="absolute inset-0 border border-primary rounded-full blur-sm opacity-30 group-hover:opacity-60 transition-opacity" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showButtons && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="cursor-pointer"
            onClick={scrollToProjects}
          >
            <ChevronDown className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Scroll to explore</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Lightbulb, Music, Gamepad2, Heart, User } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-[var(--font-display)] font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Avatar + Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start mb-8"
            >
              <div className="relative">
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                    <User className="w-20 h-20 text-primary" />
                  </div>
                </motion.div>
                
                {/* Status Indicator */}
                <motion.div
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>

            <div className="prose prose-lg max-w-none">
              <p className="text-foreground text-lg leading-relaxed mb-6">
                My journey in technology began with a fascinating transition from traditional science education to the dynamic world of Cloud Computing and DevOps. What started as curiosity about artificial intelligence and machine learning gradually evolved into a deep passion for cloud infrastructure and automated deployment solutions.
              </p>
              
              <p className="text-foreground text-lg leading-relaxed mb-6">
                As a Computer Science and Engineering student specializing in Cloud Computing and DevOps, I've discovered my true calling in building scalable, resilient systems that bridge the gap between development and operations. My expertise spans across AWS and GCP platforms, where I design CI/CD pipelines, manage containerized applications, and implement Infrastructure as Code.
              </p>
              
              <p className="text-foreground text-lg leading-relaxed mb-6">
                What drives me most is the intersection of{" "}
                <span className="text-primary font-semibold">AI-driven automation</span> with traditional DevOps practices. I'm passionate about leveraging machine learning to optimize deployment workflows, predict system failures, and create intelligent monitoring solutions that enhance operational efficiency.
              </p>
              
              <p className="text-muted text-lg leading-relaxed">
                Beyond the technical realm, I find balance through gaming, music, and anime - hobbies that fuel my creativity and provide fresh perspectives for problem-solving in complex cloud architectures.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Personal Interests Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border p-8 relative overflow-hidden">
              {/* Background Glow Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-[var(--font-display)] font-bold text-primary">
                    Beyond Code
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <p className="text-foreground text-lg leading-relaxed">
                    My unique journey from science to technology has shaped my analytical approach to DevOps challenges, combining scientific methodology with engineering innovation.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                      <Gamepad2 className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">Gaming enthusiast</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                      <Music className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">Music lover</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">Anime aficionado</span>
                    </div>
                  </div>
                  
                  <div className="bg-accent/50 rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-foreground font-medium">
                      These hobbies fuel my creativity and provide fresh perspectives that I bring to complex cloud architecture problems and automation challenges.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, BadgeCheck, Code, Cloud, Settings, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Certification {
  id: string;
  title: string;
  provider: string;
  year: number;
  credentialUrl: string;
  icon: any;
  description: string;
  category: 'development' | 'cloud' | 'api' | 'architecture';
  skills: string[];
}

const certifications: Certification[] = [
  {
    id: 'python-3',
    title: 'Python 3 Certificate of Completion',
    provider: 'Codedx',
    year: 2024,
    credentialUrl: 'https://www.codedx.io/certificates/e14ff780-07f1-4848-8180-d4cb7f12f1f3',
    icon: Code,
    description: 'Comprehensive Python programming certification covering advanced concepts, data structures, and best practices.',
    category: 'development',
    skills: ['Python', 'Data Structures', 'OOP', 'Algorithms']
  },
  {
    id: 'genai-academy',
    title: 'GenAI Academy',
    provider: 'Google Cloud',
    year: 2024,
    credentialUrl: 'https://certificate.hack2skill.com/user/genai4/2025H2S04GENAI-A400221',
    icon: Cloud,
    description: 'Advanced training in Generative AI technologies, machine learning, and cloud-based AI solutions.',
    category: 'cloud',
    skills: ['Generative AI', 'Machine Learning', 'Google Cloud', 'AI/ML']
  },
  {
    id: 'postman-api',
    title: 'Certified Postman API Fundamentals Student Expert',
    provider: 'Postman/LetsUpgrade',
    year: 2024,
    credentialUrl: 'https://drive.google.com/file/d/1fGB0iviK7Q40BvcKFw6C4R04pCCLA3kd/view?usp=sharing',
    icon: Settings,
    description: 'Expert-level certification in API development, testing, and documentation using Postman platform.',
    category: 'api',
    skills: ['REST APIs', 'API Testing', 'Postman', 'API Documentation']
  },
  {
    id: 'solutions-architecture',
    title: 'Solutions Architecture Job Simulation Certificate of Completion',
    provider: 'Forage',
    year: 2024,
    credentialUrl: 'https://acrobat.adobe.com/id/urn:aaid:sc:ap:8dc5ad18-eb51-4da1-b9e0-d0a9002abe6d',
    icon: Briefcase,
    description: 'Real-world solutions architecture experience through hands-on job simulation and practical projects.',
    category: 'architecture',
    skills: ['System Design', 'Architecture', 'Cloud Solutions', 'Problem Solving']
  }
];

const categoryColors = {
  development: 'bg-primary/10 text-primary border-primary/20',
  cloud: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  api: 'bg-green-500/10 text-green-400 border-green-500/20',
  architecture: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  idle: { 
    scale: 1, 
    rotate: 0,
    filter: "drop-shadow(0 0 0px rgba(0, 255, 198, 0))"
  },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    filter: "drop-shadow(0 0 10px rgba(0, 255, 198, 0.3))",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{Math.floor(count)}</span>;
};

export default function Certifications() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Award className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-bold text-foreground">
              Professional Certifications
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Validated expertise across development, cloud computing, and architecture
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary">
                <AnimatedCounter target={certifications.length} />
              </div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </motion.div>
            <div className="w-px h-12 bg-border" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-secondary">2024</div>
              <div className="text-sm text-muted-foreground">Year Earned</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {certifications.map((cert) => {
            const IconComponent = cert.icon;
            
            return (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                onHoverStart={() => setHoveredCard(cert.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
              >
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5"
                    animate={{
                      background: hoveredCard === cert.id 
                        ? `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`
                        : 'transparent'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <motion.div
                        variants={iconVariants}
                        initial="idle"
                        whileHover="hover"
                        className="p-3 rounded-lg bg-primary/10 border border-primary/20"
                      >
                        <IconComponent className="w-6 h-6 text-primary" />
                      </motion.div>
                      
                      <Badge className={`${categoryColors[cert.category]} capitalize`}>
                        {cert.category}
                      </Badge>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-muted-foreground font-medium">
                          {cert.provider}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{cert.year}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {cert.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cert.skills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-md border border-border"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Credential Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <BadgeCheck className="w-4 h-4" />
                          View Credential
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </a>
                      </Button>
                    </motion.div>
                  </CardContent>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={false}
                    animate={{
                      boxShadow: hoveredCard === cert.id 
                        ? '0 0 30px rgba(0, 255, 198, 0.1), inset 0 0 30px rgba(0, 255, 198, 0.05)'
                        : '0 0 0px rgba(0, 255, 198, 0)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BadgeCheck className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-primary font-medium">
              Continuously expanding expertise through professional development
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
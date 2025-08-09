"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { 
  Cloud, 
  Settings, 
  Code, 
  Package, 
  Monitor, 
  Zap,
  ChevronRight
} from "lucide-react"

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  id: string
  title: string
  icon: React.ReactNode
  skills: Skill[]
  color: string
}

const skillsData: SkillCategory[] = [
  {
    id: "cloud",
    title: "Cloud Platforms",
    icon: <Cloud className="w-6 h-6" />,
    skills: [
      { name: "AWS", level: 85 },
      { name: "GCP", level: 80 },
      { name: "Vertex AI", level: 70 }
    ],
    color: "text-primary"
  },
  {
    id: "devops",
    title: "DevOps Tools",
    icon: <Settings className="w-6 h-6" />,
    skills: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 75 },
      { name: "CI/CD", level: 85 },
      { name: "Git", level: 95 }
    ],
    color: "text-secondary"
  },
  {
    id: "programming",
    title: "Programming",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Shell Scripting", level: 85 },
      { name: "HTML/CSS", level: 85 }
    ],
    color: "text-primary"
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    icon: <Package className="w-6 h-6" />,
    skills: [
      { name: "Terraform", level: 80 },
      { name: "Ansible", level: 75 }
    ],
    color: "text-secondary"
  },
  {
    id: "monitoring",
    title: "Tools & Platforms",
    icon: <Monitor className="w-6 h-6" />,
    skills: [
      { name: "Postman", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Linux", level: 85 },
      { name: "Command Line", level: 90 }
    ],
    color: "text-primary"
  },
  {
    id: "other",
    title: "Other Technologies",
    icon: <Zap className="w-6 h-6" />,
    skills: [
      { name: "Artificial Intelligence", level: 70 },
      { name: "Flask", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Gemini", level: 65 }
    ],
    color: "text-secondary"
  }
]

export default function SkillsGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group"
            onMouseEnter={() => setHoveredCard(category.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative bg-card border border-border rounded-lg p-6 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className={`${category.color} transition-all duration-300`}
                  animate={hoveredCard === category.id ? { 
                    scale: 1.1,
                    rotate: 5
                  } : { 
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground font-[var(--font-display)]">
                  {category.title}
                </h3>
                <motion.div
                  className="ml-auto text-muted"
                  animate={hoveredCard === category.id ? { 
                    x: 4,
                    opacity: 1
                  } : { 
                    x: 0,
                    opacity: 0.5
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1 + skillIndex * 0.05,
                      duration: 0.3
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${category.color === "text-primary" ? "bg-primary" : "bg-secondary"}`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: hoveredCard === category.id ? `${skill.level}%` : "0%"
                        }}
                        transition={{ 
                          delay: hoveredCard === category.id ? skillIndex * 0.1 : 0,
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-lg opacity-0 pointer-events-none ${
                  category.color === "text-primary" 
                    ? "bg-gradient-to-br from-primary/5 to-transparent" 
                    : "bg-gradient-to-br from-secondary/5 to-transparent"
                }`}
                animate={{
                  opacity: hoveredCard === category.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
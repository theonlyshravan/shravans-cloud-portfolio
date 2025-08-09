"use client"

import { motion } from "motion/react"
import { Calendar, MapPin, ExternalLink, GraduationCap, Award, Building2 } from "lucide-react"

interface TimelineItem {
  id: string
  type: 'experience'
  date: string
  institution: string
  title: string
  description: string
  location?: string
  status?: string
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    type: "experience",
    date: "Current",
    institution: "Student",
    title: "DevOps & Cloud Computing Enthusiast",
    description: "Actively learning and implementing DevOps practices, cloud infrastructure automation, and AI-driven solutions. Building hands-on experience through personal projects and practical implementations.",
    status: "Current"
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'experience':
      return <Building2 className="h-5 w-5" />
    default:
      return <Calendar className="h-5 w-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'experience':
      return 'bg-primary text-primary-foreground'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export default function ExperienceTimeline() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-[var(--font-display)] text-4xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey in building expertise through hands-on learning and practical projects
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start"
              >
                {/* Timeline dot */}
                <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${getTypeColor(item.type)} shadow-lg`}>
                  {getIcon(item.type)}
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-[var(--font-mono)]">{item.date}</span>
                          {item.status && (
                            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md font-medium">
                              {item.status}
                            </span>
                          )}
                        </div>
                        <h3 className="font-[var(--font-display)] text-xl font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-medium">{item.institution}</span>
                          {item.location && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span className="text-sm">{item.location}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Type badge */}
                    <div className="mt-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary`}>
                        {getIcon(item.type)}
                        <span className="capitalize">{item.type}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Personal Projects</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">3</div>
            <div className="text-sm text-muted-foreground">Cloud Platforms</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Commitment to Learning</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
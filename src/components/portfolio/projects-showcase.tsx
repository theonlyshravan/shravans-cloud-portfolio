"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ChevronRight, Cloud, Network, Bot, Server, Database, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const projects: Project[] = [
  {
    id: "aws-cicd-pipeline",
    title: "AWS CI/CD DevOps Pipeline NextWork Web App",
    description: "Built & automated CI/CD pipeline to deploy Java web app from GitHub to EC2. Configured buildspec.yml, appspec.yml, and Bash scripts for build & deployment. Integrated CodeArtifact for secure dependencies & S3 for artifact storage.",
    techStack: ["AWS EC2", "CodePipeline", "CodeBuild", "CodeDeploy", "S3", "CodeArtifact", "IAM", "GitHub", "Bash", "Maven"],
    githubUrl: "https://github.com/theonlyshravan/nextwork-web-shravan",
    icon: Cloud,
    category: "DevOps"
  },
  {
    id: "aws-networking-vpc",
    title: "AWS Networking Project VPC Configuration",
    description: "Currently setting up a secure, isolated Virtual Private Cloud (VPC) on AWS for backend hosting. Exploring configuration of public/private subnets, routing, and internet access controls.",
    techStack: ["AWS VPC", "Route Tables", "Security Groups", "NAT Gateway", "Internet Gateway", "Subnets"],
    githubUrl: "https://www.linkedin.com/posts/shravan-kumar-satapathy_build-a-virtual-private-cloud-activity-7341408190279913475-vyVY",
    icon: Network,
    category: "Cloud Architecture"
  },
  {
    id: "bankerbot-chatbot",
    title: "BankerBot Amazon Lex Chatbot",
    description: "Designing an intelligent banking assistant chatbot using Amazon Lex and Lambda functions. Currently building intents, slots, and responses to handle balance checks, account types, and more.",
    techStack: ["Amazon Lex", "AWS Lambda", "Python", "NLP", "Serverless"],
    demoUrl: "https://acrobat.adobe.com/id/urn:aaid:sc:ap:b307fb1c-0677-4315-a7f5-1ba57cf827d5",
    icon: Bot,
    category: "AI/ML"
  },
  {
    id: "s3-static-website",
    title: "Amazon S3 Static Website Deployment",
    description: "Configured S3 bucket for hosting with public access policies. Enabled versioned, cost-effective web hosting for static HTML/CSS site with proper ACLs and security configurations.",
    techStack: ["Amazon S3", "Static Website Hosting", "ACLs", "HTML", "CSS", "JavaScript"],
    demoUrl: "https://acrobat.adobe.com/id/urn:aaid:sc:ap:3277d457-7c1e-421a-93bf-de5c7cb747d4",
    icon: Server,
    category: "Web Development"
  },
  {
    id: "flask-mongodb-app",
    title: "Full-Stack Flask Application with MongoDB Atlas",
    description: "Built a full-stack form-based web app to store user data in MongoDB Atlas. Implemented basic validation, modular structure, and .env support for environment variables.",
    techStack: ["Flask", "MongoDB Atlas", "Python", "HTML", "Environment Variables", "Form Validation"],
    githubUrl: "https://github.com/theonlyshravan/MyDevOpsProject",
    icon: Database,
    category: "Full-Stack"
  },
  {
    id: "skymood-weather-app",
    title: "Skymood Weather Application",
    description: "Created a responsive web app to display real-time weather and 5-day forecast. Integrated with open weather APIs and focused on clean UI/UX design with responsive layout.",
    techStack: ["JavaScript", "Weather API", "HTML", "CSS", "Responsive Design", "API Integration"],
    githubUrl: "https://github.com/theonlyshravan/skymood",
    icon: Sun,
    category: "Frontend"
  }
];

export default function ProjectsShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-[var(--font-display)] font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Explore my portfolio of cloud infrastructure, DevOps automation, and full-stack development projects 
            that demonstrate expertise in modern technologies and best practices.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full group overflow-hidden relative">
                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-accent overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <project.icon className="w-16 h-16 text-primary/80" />
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-card/90 text-card-foreground border-border">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-background/90 flex items-center justify-center gap-3"
                  >
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  {/* Project Title */}
                  <h3 className="text-xl font-[var(--font-display)] font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-border text-muted hover:border-primary/50 hover:text-primary transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="outline" className="text-xs border-border text-muted">
                        +{project.techStack.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border hover:border-primary hover:text-primary group"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 group"
                        asChild
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>

                {/* Gradient Border Effect on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -z-10 blur-xl"
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 group px-8"
            asChild
          >
            <a href="https://github.com/theonlyshravan" target="_blank" rel="noopener noreferrer">
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
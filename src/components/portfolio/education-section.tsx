"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const educationData = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Konark Institute of Science and Technology",
    location: "Bhubaneswar, Odisha",
    duration: "2022 - 2026",
    cgpa: "7.2",
    status: "Currently Pursuing",
    description: "Specialized in software engineering, data structures, algorithms, and modern development practices. Active in coding competitions and technical projects."
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate in Science",
    institution: "University Higher Secondary School",
    location: "Odisha",
    duration: "2020 - 2022",
    cgpa: null,
    status: "Completed",
    description: "Focused on Physics, Chemistry, Mathematics, and Computer Science. Built strong analytical and problem-solving foundation."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
};

export default function Education() {
  return (
    <section className="py-20 px-4 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="p-3 rounded-full bg-primary/10 border border-primary/20"
            >
              <GraduationCap className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Education
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Academic journey building the foundation for a career in technology and innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {educationData.map((education, index) => (
            <motion.div
              key={education.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </motion.div>
                        {education.status === "Currently Pursuing" && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            Current
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {education.degree}
                      </CardTitle>
                      <p className="text-muted-foreground text-lg font-medium mb-4">
                        {education.institution}
                      </p>
                    </div>
                    
                    {education.cgpa && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 text-center"
                      >
                        <p className="text-primary font-semibold text-lg">
                          {education.cgpa}
                        </p>
                        <p className="text-muted-foreground text-sm">CGPA</p>
                      </motion.div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span>{education.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span>{education.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground leading-relaxed">
                    {education.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Academic Excellence
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Committed to continuous learning and academic growth, with a strong foundation 
              in computer science principles and hands-on experience in modern technologies. 
              Actively participating in technical projects and maintaining a solid academic record.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
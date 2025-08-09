import BootUpHero from "@/components/portfolio/boot-up-hero";
import AboutSection from "@/components/portfolio/about-section";
import { AvatarScene } from "@/components/portfolio/avatar-scene";
import SkillsGrid from "@/components/portfolio/skills-grid";
import ProjectsShowcase from "@/components/portfolio/projects-showcase";
import Education from "@/components/portfolio/education-section";
import Certifications from "@/components/portfolio/certifications-section";
import ExperienceTimeline from "@/components/portfolio/experience-timeline";
import { FloatingNavbar } from "@/components/navbars/floating-navbar";
import { CardContactForm } from "@/components/contact/card-contact-form";
import { MinimalCenteredFooter } from "@/components/footers/minimal-centered-footer";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function HomePage() {
  return (
    <main className="relative">
      <FloatingNavbar />
      
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <BootUpHero />
      
      <section id="about">
        <AboutSection />
      </section>

      {/* Avatar Scene Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <AvatarScene />
        </div>
      </section>
      
      <section id="skills" className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[var(--font-display)] font-bold text-foreground mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise across cloud platforms, DevOps tools, and programming languages
            </p>
          </div>
          <SkillsGrid />
        </div>
      </section>
      
      <section id="projects">
        <ProjectsShowcase />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="certifications">
        <Certifications />
      </section>
      
      <section id="experience">
        <ExperienceTimeline />
      </section>
      
      <section id="contact">
        <CardContactForm />
      </section>
      
      <MinimalCenteredFooter />
    </main>
  );
}
"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <section className="absolute top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border border-[#30363D] bg-[#161B22]/70 backdrop-blur-md lg:top-12">
      <div className="flex items-center justify-between px-6 py-3">
        <a href="#" className="flex shrink-0 items-center gap-2" title="Shravan Kumar">
          <span className="text-2xl font-bold text-[#00FFC6]">SK</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="max-lg:hidden">
          <ul className="flex items-center gap-4">
            {ITEMS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-[#E0E0E0] hover:text-[#00FFC6] transition-colors px-2 py-1 rounded-md hover:bg-[#21262D]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle and Hamburger Menu */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm" 
            onClick={toggleTheme}
            className="border-[#30363D] bg-transparent text-[#E0E0E0] hover:bg-[#21262D] hover:text-[#00FFC6]"
          >
            {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="relative flex size-8 text-[#E0E0E0] lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border border-[#30363D] bg-[#161B22] p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="flex flex-1 flex-col divide-y divide-[#30363D]">
          {ITEMS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-4 text-base font-medium text-[#E0E0E0] transition-colors first:pt-0 last:pb-0 hover:text-[#00FFC6]"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};

export { FloatingNavbar };
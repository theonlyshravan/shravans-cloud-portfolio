"use client";

import { ArrowUpRight } from "lucide-react";

const MinimalCenteredFooter = () => {
  const navigation = [
    { name: "About", href: "#" },
    { name: "Skills", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Experience", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const social = [
    { name: "LinkedIn", href: "https://linkedin.com/in/shravan-kumar-satapathy" },
    { name: "GitHub", href: "https://github.com/shravan-kumar-satapathy" },
  ];

  return (
    <section className="flex flex-col items-center gap-14 py-32 bg-background">
      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-0.5 font-medium text-foreground transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <div className="text-sm text-muted-foreground">
          © 2024 Shravan Kumar Satapathy. All rights reserved.
        </div>
      </nav>
    </section>
  );
};

export { MinimalCenteredFooter };
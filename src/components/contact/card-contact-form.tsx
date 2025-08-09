"use client"

import React from "react";
import { Linkedin, Github } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CardContactForm = () => {
  return (
    <section className="bg-[#0D1117] py-32">
      <div className="container">
        <Card className="rounded-4xl bg-[#161B22] w-full border-none">
          <CardContent className="lg:px-18 relative overflow-hidden py-12 lg:py-24">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <p className="text-[#8B949E] text-sm font-semibold tracking-tight">
                  PORTFOLIO
                </p>
                <div className="size-30 bg-[#E0E0E0] relative flex items-center justify-center rounded-3xl p-2.5 shadow-xl">
                  <div className="bg-[#161B22] flex size-full items-center justify-center rounded-2xl p-4">
                    <div className="size-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00FFC6] to-[#FF6B6B] rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#161B22] rounded-md flex items-center justify-center">
                          <div className="w-4 h-4 bg-[#00FFC6] rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="text-[#E0E0E0] text-5xl font-bold tracking-tighter font-[var(--font-display)]">
                  Contact Shravan
                </h1>

                <ul className="max-w-lg space-y-2 tracking-tight">
                  <li className="flex items-center">
                    <span className="mr-2 font-bold text-[#E0E0E0]">Email:</span>{" "}
                    <span className="text-[#00FFC6] underline">
                      satapathyshravankumar@gmail.com
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 font-bold text-[#E0E0E0]">Phone:</span>{" "}
                    <span className="text-[#8B949E]">
                      +916372450451
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 font-bold text-[#E0E0E0]">Location:</span>
                    <span className="text-[#8B949E]">
                      Bhubaneswar, Odisha, India
                    </span>
                  </li>
                </ul>

                <div className="flex items-center space-x-4 pt-4">
                  <a 
                    href="https://linkedin.com/in/shravan-kumar-satapathy" 
                    className="group relative p-3 bg-[#0D1117] rounded-full border border-[#30363D] hover:border-[#00FFC6] transition-all duration-300"
                  >
                    <Linkedin className="h-6 w-6 text-[#8B949E] group-hover:text-[#00FFC6] transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-full bg-[#00FFC6] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                  </a>
                  <a 
                    href="https://github.com/shravan-kumar-satapathy" 
                    className="group relative p-3 bg-[#0D1117] rounded-full border border-[#30363D] hover:border-[#00FFC6] transition-all duration-300"
                  >
                    <Github className="h-6 w-6 text-[#8B949E] group-hover:text-[#00FFC6] transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-full bg-[#00FFC6] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                  </a>
                </div>
              </div>
              <div className="mt-6 flex h-auto flex-col gap-2 space-y-3 md:pl-3">
                <Input 
                  placeholder="Name" 
                  className="bg-[#0D1117] border-[#30363D] p-6 text-[#E0E0E0] placeholder:text-[#8B949E] focus:border-[#00FFC6] focus:ring-[#00FFC6]" 
                />
                <Input 
                  placeholder="Phone" 
                  className="bg-[#0D1117] border-[#30363D] p-6 text-[#E0E0E0] placeholder:text-[#8B949E] focus:border-[#00FFC6] focus:ring-[#00FFC6]" 
                />

                <Button className="h-10 w-fit bg-[#00FFC6] text-[#0D1117] hover:bg-[#00FFC6]/90 font-semibold">
                  Contact Shravan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { CardContactForm };
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Settings {
  projectsCompleted: string;
  happyClients: string;
  yearsExperience: string;

  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryButton: string;
  heroSecondaryButton: string;
}

export default function Hero() {
  const [settings, setSettings] = useState<Settings>({
    projectsCompleted: "250+",
    happyClients: "500+",
    yearsExperience: "10+",

    heroBadge: "Trusted Construction & Engineering Company",

    heroHeading:
      "Building Beyond\nStructures.\nBuilding Trust.",

    heroDescription:
      "BuildDom delivers innovative engineering, architecture and construction solutions across Nepal with an unwavering commitment to quality, safety and sustainable development.",

    heroPrimaryButton: "Request Consultation",

    heroSecondaryButton: "View Projects",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/public/settings");
      const data = await res.json();

      if (data.success && data.settings) {
        setSettings({
          projectsCompleted:
            data.settings.projectsCompleted || "250+",

          happyClients:
            data.settings.happyClients || "500+",

          yearsExperience:
            data.settings.yearsExperience || "10+",

          heroBadge:
            data.settings.heroBadge ||
            "Trusted Construction & Engineering Company",

          heroHeading:
            data.settings.heroHeading ||
            "Building Beyond\nStructures.\nBuilding Trust.",

          heroDescription:
            data.settings.heroDescription ||
            "BuildDom delivers innovative engineering, architecture and construction solutions across Nepal with an unwavering commitment to quality, safety and sustainable development.",

          heroPrimaryButton:
            data.settings.heroPrimaryButton ||
            "Request Consultation",

          heroSecondaryButton:
            data.settings.heroSecondaryButton ||
            "View Projects",
        });
      }
    } catch (error) {
      console.error("Failed to load hero settings:", error);
    }
  }

  const stats = [
    {
      value: settings.projectsCompleted,
      label: "Projects Completed",
    },
    {
      value: settings.happyClients,
      label: "Happy Clients",
    },
    {
      value: settings.yearsExperience,
      label: "Years Experience",
    },
  ];

  const headingLines = settings.heroHeading
    .split("\n")
    .filter((line) => line.trim());

  return (
    <section
      id="home"
      className="relative min-h-[105vh] overflow-hidden bg-[#071A31]"
    >
      {/* Background */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/hero.jpg"
          alt="BuildDom Construction"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A31]/95 via-[#071A31]/82 to-[#071A31]/65" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#071A31] via-[#071A31]/80 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[105vh] max-w-7xl items-center px-6 pb-56 pt-32 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-[#F58220]" />

            {settings.heroBadge}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {headingLines.map((line, index) => {
              const isLastLine =
                index === headingLines.length - 1;

              if (isLastLine && line.includes("Trust")) {
                const parts = line.split("Trust");

                return (
                  <span
                    key={index}
                    className="block"
                  >
                    {parts[0]}

                    <span className="bg-gradient-to-r from-[#F58220] to-[#ff9b4a] bg-clip-text text-transparent">
                      Trust
                    </span>

                    {parts[1]}
                  </span>
                );
              }

              return (
                <span
                  key={index}
                  className="block"
                >
                  {line}
                </span>
              );
            })}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl"
          >
            {settings.heroDescription}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#F58220] px-7 py-4 font-semibold text-white shadow-lg shadow-orange-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e87512]"
            >
              {settings.heroPrimaryButton}

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#0B2341]"
            >
              {settings.heroSecondaryButton}
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.55,
            }}
            className="mt-8 flex flex-wrap gap-x-7 gap-y-3 pb-24 text-sm text-slate-200"
          >
            <span>✓ Licensed Engineers</span>
            <span>✓ Quality Construction</span>
            <span>✓ Free Consultation</span>
          </motion.div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="absolute bottom-16 left-0 right-0 z-20 px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.7 + index * 0.15,
              }}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-center shadow-xl backdrop-blur-xl"
            >
              <div className="text-3xl font-bold text-[#F58220]">
                {stat.value}
              </div>

              <div className="mt-1 text-sm font-medium text-slate-200">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <Link
        href="#about"
        className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center text-white/70 transition hover:text-white md:flex"
      >
        <span className="mb-2 text-xs uppercase tracking-[0.3em]">
          Scroll
        </span>

        <ChevronDown
          size={22}
          className="animate-bounce"
        />
      </Link>
    </section>
  );
}
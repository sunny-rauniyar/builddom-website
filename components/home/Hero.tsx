"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  { value: "250+", label: "Projects Completed" },
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src="/images/hero/hero.jpg"
          alt="BuildDom Construction"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071A31]/95 via-[#071A31]/82 to-[#071A31]/65" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-28 lg:pt-40">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#F58220]">
            Trusted Construction & Engineering Company
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 max-w-5xl text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Building Beyond
          <br />
          Structures.
          <br />
          Building{" "}
          <span className="bg-gradient-to-r from-[#F58220] to-[#FFA63D] bg-clip-text text-transparent">
            Trust.
          </span>
        </motion.h1>

        <div className="mt-6 h-1 w-32 rounded-full bg-[#F58220]" />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg"
        >
          BuildDom delivers innovative engineering, architecture and
          construction solutions across Nepal with an unwavering commitment to
          quality, safety and sustainable development.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="#contact"
            aria-label="Request Consultation"
            className="rounded-2xl bg-[#F58220] px-8 py-4 text-center font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/40"
          >
            Request Consultation
          </Link>

          <Link
            href="#projects"
            aria-label="View Projects"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#071A31]"
          >
            View Projects
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-5 text-sm text-white/90"
        >
          <span>✔ Licensed Engineers</span>
          <span>✔ Quality Construction</span>
          <span>✔ Free Consultation</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 grid gap-5 sm:grid-cols-3"
        >
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-4xl font-bold text-[#F58220]"
              >
                {item.value}
              </motion.h3>

              <p className="mt-2 text-gray-200">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <Link href="#about" aria-label="Scroll to About section">
          <ChevronDown
            size={36}
            className="text-white transition hover:text-[#F58220]"
          />
        </Link>
      </motion.div>
    </section>
  );
}
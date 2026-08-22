"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0.2,
      }
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/95 shadow-xl backdrop-blur-xl"
          : "bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3">

          <Image
            src="/images/logo/logo.jpeg"
            alt="BuildDom"
            width={64}
            height={64}
            priority
            className="h-14 w-14 rounded-full object-cover lg:h-16 lg:w-16"
          />

          <div>
            <h1 className="text-2xl font-extrabold lg:text-3xl">
              <span className={scrolled ? "text-[#0B2341]" : "text-white"}>
                buil
              </span>

              <span className="text-[#F58220]">D</span>

              <span className={scrolled ? "text-[#0B2341]" : "text-white"}>
                om
              </span>
            </h1>

            <p
              className={`text-xs lg:text-sm ${
                scrolled ? "text-gray-500" : "text-gray-200"
              }`}
            >
              Build{" "}
              <span className="font-semibold text-[#F58220]">
                Better
              </span>{" "}
              Together
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const isActive =
              activeSection === item.href.replace("#", "");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-[#F58220]"
                    : scrolled
                    ? "text-[#0B2341]"
                    : "text-white"
                }`}
              >
                {item.name}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-[#F58220] transition-all duration-300 ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="#contact"
          className="hidden rounded-2xl bg-[#F58220] px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/30 md:flex"
        >
          Get a Quote
        </Link>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${
            scrolled ? "text-[#0B2341]" : "text-white"
          }`}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden bg-white shadow-xl transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 border-t" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-8 py-8">

          {navItems.map((item) => {
            const isActive =
              activeSection === item.href.replace("#", "");

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`font-semibold transition ${
                  isActive
                    ? "text-[#F58220]"
                    : "text-[#0B2341] hover:text-[#F58220]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl bg-[#F58220] py-3 text-center font-semibold text-white transition hover:bg-orange-600"
          >
            Get a Quote
          </Link>

        </div>
      </div>
    </header>
  );
}
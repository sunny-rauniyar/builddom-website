
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

interface Settings {
  companyName: string;
  tagline: string;
  logo: string;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Default BuildDom settings
  const [settings, setSettings] = useState<Settings>({
    companyName: "BuildDom",
    tagline: "Build Better Together...",
    logo: "/images/logo/logo.jpeg",
  });

  useEffect(() => {
    // Load dynamic settings
    loadSettings();

    // Detect scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    // Detect active section
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

  // Load settings from database/API
  async function loadSettings() {
    try {
      const res = await fetch("/api/public/settings", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch settings");
      }

      const data = await res.json();

      if (data.success && data.settings) {
        setSettings({
          companyName:
            data.settings.companyName?.trim() ||
            "BuildDom",

          tagline:
            data.settings.tagline?.trim() ||
            "Build Better Together...",

          logo:
            data.settings.logo?.trim() ||
            "/images/logo/logo.jpeg",
        });
      }
    } catch (error) {
      console.error("Failed to load website settings:", error);
    }
  }

  // ----------------------------------------------------
  // BuildDom Logo Text
  // Keeps the original orange "D"
  // ----------------------------------------------------
  const renderCompanyName = () => {
    const companyName = settings.companyName;

    // Preserve original BuildDom branding
    if (companyName.toLowerCase() === "builddom") {
      return (
        <>
          <span
            className={
              scrolled ? "text-[#0B2341]" : "text-white"
            }
          >
            buil
          </span>

          <span className="text-[#F58220]">
            D
          </span>

          <span
            className={
              scrolled ? "text-[#0B2341]" : "text-white"
            }
          >
            om
          </span>
        </>
      );
    }

    // For another company name, display normally
    return (
      <span
        className={
          scrolled ? "text-[#0B2341]" : "text-white"
        }
      >
        {companyName}
      </span>
    );
  };

  // ----------------------------------------------------
  // Dynamic Tagline
  // Keeps "Better" orange for BuildDom tagline
  // ----------------------------------------------------
  const renderTagline = () => {
    const tagline = settings.tagline;

    // Preserve original BuildDom tagline
    if (
      tagline.toLowerCase().replace(/\s/g, "") ===
      "buildbettertogether..."
    ) {
      return (
        <>
          Build{" "}
          <span className="font-semibold text-[#F58220]">
            Better
          </span>{" "}
          Together...
        </>
      );
    }

    // Otherwise display dynamic tagline
    return tagline;
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/95 shadow-xl backdrop-blur-xl"
          : "bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* =========================================
            LOGO
        ========================================= */}
        <Link
          href="#home"
          className="flex items-center gap-3"
          onClick={() => {
            setActiveSection("home");
            setMenuOpen(false);
          }}
        >
          {/* Logo Image */}
          <Image
            src={
              settings.logo ||
              "/images/logo/logo.jpeg"
            }
            alt={settings.companyName}
            width={64}
            height={64}
            priority
            className="h-14 w-14 rounded-full object-cover lg:h-16 lg:w-16"
          />

          {/* Company Name + Tagline */}
          <div>
            <h1 className="text-2xl font-extrabold lg:text-3xl">
              {renderCompanyName()}
            </h1>

            <p
              className={`text-xs lg:text-sm ${
                scrolled
                  ? "text-gray-500"
                  : "text-gray-200"
              }`}
            >
              {renderTagline()}
            </p>
          </div>
        </Link>

        {/* =========================================
            DESKTOP NAVIGATION
        ========================================= */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const isActive =
              activeSection ===
              item.href.replace("#", "");

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

                {/* Active / Hover Underline */}
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

        {/* =========================================
            DESKTOP CTA
        ========================================= */}
        <Link
          href="#contact"
          className="hidden rounded-2xl bg-[#F58220] px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/30 md:flex"
        >
          Get a Quote
        </Link>

        {/* =========================================
            MOBILE MENU BUTTON
        ========================================= */}
        <button
          type="button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className={`md:hidden ${
            scrolled
              ? "text-[#0B2341]"
              : "text-white"
          }`}
        >
          {menuOpen ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>
      </div>

      {/* =========================================
          MOBILE MENU
      ========================================= */}
      <div
        className={`overflow-hidden bg-white shadow-xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-96 border-t"
            : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-6 px-8 py-8">

          {/* Mobile Navigation Links */}
          {navItems.map((item) => {
            const isActive =
              activeSection ===
              item.href.replace("#", "");

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setMenuOpen(false);
                  setActiveSection(
                    item.href.replace("#", "")
                  );
                }}
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

          {/* Mobile CTA */}
          <Link
            href="#contact"
            onClick={() =>
              setMenuOpen(false)
            }
            className="rounded-xl bg-[#F58220] py-3 text-center font-semibold text-white transition hover:bg-orange-600"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}

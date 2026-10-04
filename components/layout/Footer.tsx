
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

interface Settings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  footerText: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "builDom",
    tagline: "Build Better Together...",
    email: "",
    phone: "",
    address: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    footerText: "© builDom. All Rights Reserved.",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/public/settings", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success && data.settings) {
        setSettings({
          companyName:
            data.settings.companyName || "builDom",
          tagline:
            data.settings.tagline || "Build Better Together",
          email:
            data.settings.email || "",
          phone:
            data.settings.phone || "",
          address:
            data.settings.address || "",
          whatsapp:
            data.settings.whatsapp || "",
          facebook:
            data.settings.facebook || "",
          instagram:
            data.settings.instagram || "",
          linkedin:
            data.settings.linkedin || "",
          footerText:
            data.settings.footerText ||
            "© builDom. All Rights Reserved.",
        });
      }
    } catch (error) {
      console.error("Failed to load footer settings:", error);
    }
  }

  // ==========================================
  // BUILDOM BRANDING
  // D IS ALWAYS ORANGE
  // ==========================================
  const renderCompanyName = () => {
    return (
      <>
        <span className="text-white">
          buil
        </span>

        <span className="text-[#F58220]">
          D
        </span>

        <span className="text-white">
          om
        </span>
      </>
    );
  };

  // ==========================================
  // TAGLINE
  // BETTER IS ALWAYS ORANGE
  // ==========================================
  const renderTagline = () => {
    const tagline = settings.tagline;

    if (
      tagline
        .toLowerCase()
        .replace(/\s/g, "") ===
      "buildbettertogether"
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

    if (
      tagline
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/\./g, "") ===
      "buildbettertogether"
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

    return tagline;
  };

  return (
    <footer className="bg-[#071A31] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* ==========================================
            MAIN FOOTER
        ========================================== */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ========================================
              COMPANY
          ======================================== */}
          <div>

            <h2 className="text-3xl font-extrabold">
              {renderCompanyName()}
            </h2>

            <p className="mt-6 leading-8 text-gray-300">
              {renderTagline()}
              <br />
              <br />
              We deliver high-quality construction,
              architecture and engineering solutions
              across Nepal with innovation, trust and
              excellence.
            </p>

            {/* Social Media */}
            <div className="mt-8 flex gap-4">

              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#F58220]"
                >
                  <FaFacebookF size={18} />
                </a>
              )}

              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#F58220]"
                >
                  <FaInstagram size={18} />
                </a>
              )}

              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#F58220]"
                >
                  <FaLinkedinIn size={18} />
                </a>
              )}

            </div>
          </div>

          {/* ========================================
              QUICK LINKS
          ======================================== */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Quick Links
            </h3>

            <div className="space-y-4">

              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Services", "#services"],
                ["Projects", "#projects"],
                ["Contact", "#contact"],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="flex items-center gap-2 text-gray-300 transition hover:text-[#F58220]"
                >
                  <ArrowRight size={16} />
                  {name}
                </Link>
              ))}

            </div>
          </div>

          {/* ========================================
              SERVICES
          ======================================== */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Our Services
            </h3>

            <div className="space-y-4 text-gray-300">
              <p>Building Construction</p>
              <p>Architecture Design</p>
              <p>Civil Engineering</p>
              <p>Project Management</p>
              <p>Interior Design</p>
            </div>

          </div>

          {/* ========================================
              CONTACT
          ======================================== */}
          <div>

            <h3 className="mb-6 text-xl font-bold">
              Contact Info
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">
                <MapPin
                  className="mt-1 shrink-0 text-[#F58220]"
                  size={20}
                />

                <span className="text-gray-300">
                  {settings.address ||
                    "Address not available"}
                </span>
              </div>

              <div className="flex gap-3">
                <Phone
                  className="mt-1 shrink-0 text-[#F58220]"
                  size={20}
                />

                <span className="text-gray-300">
                  {settings.phone ||
                    "Phone not available"}
                </span>
              </div>

              <div className="flex gap-3">
                <Mail
                  className="mt-1 shrink-0 text-[#F58220]"
                  size={20}
                />

                <span className="text-gray-300">
                  {settings.email ||
                    "Email not available"}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            COPYRIGHT
        ========================================== */}
        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-center text-gray-400 md:flex-row">

            <p>
              ©{" "}
              <span className="text-white">
                buil
              </span>
              <span className="text-[#F58220]">
                D
              </span>
              <span className="text-white">
                om
              </span>
              . All Rights Reserved.
            </p>

            <p>
              {renderTagline()}
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}

